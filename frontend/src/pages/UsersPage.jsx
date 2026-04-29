import { useEffect, useState } from "react";
import { createUser, getUsers, updateUser } from "../api/userApi";
import DataTable from "../components/DataTable";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import FormInput from "../components/FormInput";
import IntegrationPendingState from "../components/IntegrationPendingState";
import LoadingState from "../components/LoadingState";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import RoleBadge from "../components/RoleBadge";
import SectionCard from "../components/SectionCard";
import SelectInput from "../components/SelectInput";
import StatusBadge from "../components/StatusBadge";
import { getErrorMessage, isIntegrationPendingError } from "../utils/errors";
import { asCollection } from "../utils/placeholders";
import { ROLE_OPTIONS } from "../utils/roles";

const initialUserForm = {
  name: "",
  email: "",
  role: "",
  teamId: "",
  status: "",
};

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [formData, setFormData] = useState(initialUserForm);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        const response = await getUsers({
          search: searchValue || undefined,
          role: roleFilter || undefined,
          status: statusFilter || undefined,
        });
        setUsers(asCollection(response));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [searchValue, roleFilter, statusFilter]);

  function openCreateModal() {
    setFormData(initialUserForm);
    setShowCreateModal(true);
  }

  function openEditModal(user) {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      teamId: user.team?.id || user.team_id || "",
      status: user.status || "",
    });
  }

  async function handleCreateUser(event) {
    event.preventDefault();

    try {
      await createUser(formData);
      setShowCreateModal(false);
      setFormData(initialUserForm);
    } catch (err) {
      setError(err);
    }
  }

  async function handleUpdateUser(event) {
    event.preventDefault();

    if (!editingUser?.id) return;

    try {
      await updateUser(editingUser.id, formData);
      setEditingUser(null);
      setFormData(initialUserForm);
    } catch (err) {
      setError(err);
    }
  }

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row) => (
        <div>
          <strong>{row.name || "Unnamed user"}</strong>
          <div className="muted-text">{row.title || "No title assigned"}</div>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (row) => <RoleBadge value={row.role || "Viewer"} />,
    },
    {
      key: "team",
      label: "Team",
      render: (row) => row.team?.name || row.team_name || "—",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge value={row.status || "Pending"} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <button type="button" className="btn ghost" onClick={() => openEditModal(row)}>
          Edit
        </button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="People Directory"
        subtitle="Manage workspace access, role coverage, and team assignment from a single operational view."
        actions={
          <button type="button" className="btn brand" onClick={openCreateModal}>
            Add User
          </button>
        }
      />

      <SectionCard title="Search & Filters" subtitle="Refine people data by identity, role, or active state.">
        <div className="filters-grid filters-grid-wide">
          <FormInput
            label="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search by name or email"
          />
          <SelectInput label="Role" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
            <option value="">All roles</option>
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </SelectInput>
          <SelectInput label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="invited">Invited</option>
            <option value="inactive">Inactive</option>
          </SelectInput>
        </div>
      </SectionCard>

      {loading ? <LoadingState title="Loading users" description="Preparing role, status, and team assignment data." /> : null}
      {!loading && error && isIntegrationPendingError(error) ? (
        <IntegrationPendingState
          title="User directory integration pending"
          description="Connect user endpoints later to power table data, create flows, and edit actions."
        />
      ) : null}
      {!loading && error && !isIntegrationPendingError(error) ? (
        <ErrorState title="Users unavailable" description={getErrorMessage(error, "Unable to load users.")} />
      ) : null}
      {!loading && !error ? (
        <SectionCard title="Workspace Users" subtitle="Coverage across access, roles, and team assignment.">
          <DataTable
            columns={columns}
            rows={users}
            emptyFallback={
              <EmptyState
                title="No users available"
                description="Users will populate here as soon as the backend directory endpoints are available."
              />
            }
          />
        </SectionCard>
      ) : null}

      <Modal isOpen={showCreateModal} title="Add User" onClose={() => setShowCreateModal(false)}>
        <form className="form-grid" onSubmit={handleCreateUser}>
          <FormInput
            label="Full Name"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            required
          />
          <div className="form-row">
            <SelectInput
              label="Role"
              value={formData.role}
              onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))}
              required
            >
              <option value="">Select role</option>
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </SelectInput>
            <SelectInput
              label="Status"
              value={formData.status}
              onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="invited">Invited</option>
              <option value="inactive">Inactive</option>
            </SelectInput>
          </div>
          <FormInput
            label="Team ID"
            value={formData.teamId}
            onChange={(event) => setFormData((current) => ({ ...current, teamId: event.target.value }))}
            placeholder="Link to a backend team id later"
          />
          <div className="btn-row">
            <button type="submit" className="btn brand">
              Create User
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={Boolean(editingUser)} title="Edit User" onClose={() => setEditingUser(null)}>
        <form className="form-grid" onSubmit={handleUpdateUser}>
          <FormInput
            label="Full Name"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            required
          />
          <div className="form-row">
            <SelectInput
              label="Role"
              value={formData.role}
              onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))}
              required
            >
              <option value="">Select role</option>
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </SelectInput>
            <SelectInput
              label="Status"
              value={formData.status}
              onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="invited">Invited</option>
              <option value="inactive">Inactive</option>
            </SelectInput>
          </div>
          <FormInput
            label="Team ID"
            value={formData.teamId}
            onChange={(event) => setFormData((current) => ({ ...current, teamId: event.target.value }))}
          />
          <div className="btn-row">
            <button type="submit" className="btn brand">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default UsersPage;
