import { useEffect, useState } from "react";
import { createTeam, getTeams, updateTeam } from "../api/teamApi";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import FormInput from "../components/FormInput";
import IntegrationPendingState from "../components/IntegrationPendingState";
import LoadingState from "../components/LoadingState";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import SelectInput from "../components/SelectInput";
import StatusBadge from "../components/StatusBadge";
import { getErrorMessage, isIntegrationPendingError } from "../utils/errors";
import { asCollection } from "../utils/placeholders";

const initialTeamForm = {
  name: "",
  lead: "",
  status: "",
};

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState(initialTeamForm);

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true);
        setError(null);
        const response = await getTeams();
        setTeams(asCollection(response));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  function openCreateModal() {
    setFormData(initialTeamForm);
    setShowCreateModal(true);
  }

  function openEditModal(team) {
    setEditingTeam(team);
    setFormData({
      name: team.name || "",
      lead: team.lead?.name || team.lead_name || "",
      status: team.status || "",
    });
  }

  async function handleCreateTeam(event) {
    event.preventDefault();

    try {
      await createTeam(formData);
      setShowCreateModal(false);
      setFormData(initialTeamForm);
    } catch (err) {
      setError(err);
    }
  }

  async function handleEditTeam(event) {
    event.preventDefault();

    if (!editingTeam?.id) return;

    try {
      await updateTeam(editingTeam.id, formData);
      setEditingTeam(null);
      setFormData(initialTeamForm);
    } catch (err) {
      setError(err);
    }
  }

  return (
    <>
      <PageHeader
        title="Teams"
        subtitle="Keep delivery ownership clear by aligning team leads, capacity, active work, and operating status."
        actions={
          <button type="button" className="btn brand" onClick={openCreateModal}>
            Create Team
          </button>
        }
      />

      {loading ? <LoadingState title="Loading teams" description="Pulling live team structure and ownership data." /> : null}
      {!loading && error && isIntegrationPendingError(error) ? (
        <IntegrationPendingState
          title="Team management integration pending"
          description="Connect team APIs later to populate lead ownership, counts, and edit flows."
        />
      ) : null}
      {!loading && error && !isIntegrationPendingError(error) ? (
        <ErrorState title="Teams unavailable" description={getErrorMessage(error, "Unable to load teams.")} />
      ) : null}

      {!loading && !error ? (
        <section className="card-grid team-grid">
          {teams.length ? (
            teams.map((team) => (
              <SectionCard
                key={team.id}
                title={team.name || "Team"}
                subtitle={team.description || "Team description will appear here once available."}
                actions={
                  <button type="button" className="btn ghost" onClick={() => openEditModal(team)}>
                    Edit
                  </button>
                }
                className="team-card"
              >
                <div className="meta-grid">
                  <div><span className="muted-label">Lead</span><strong>{team.lead?.name || team.lead_name || "Unassigned"}</strong></div>
                  <div><span className="muted-label">Members</span><strong>{team.members_count ?? "—"}</strong></div>
                  <div><span className="muted-label">Projects</span><strong>{team.projects_count ?? "—"}</strong></div>
                  <div><span className="muted-label">Status</span><StatusBadge value={team.status || "Unknown"} /></div>
                </div>
              </SectionCard>
            ))
          ) : (
            <SectionCard title="Team Directory" subtitle="Teams will appear here once the backend is connected.">
              <EmptyState
                title="No teams available"
                description="Team cards will populate here with leads, member counts, and active project load."
              />
            </SectionCard>
          )}
        </section>
      ) : null}

      <Modal isOpen={showCreateModal} title="Create Team" onClose={() => setShowCreateModal(false)}>
        <form className="form-grid" onSubmit={handleCreateTeam}>
          <FormInput
            label="Team Name"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <FormInput
            label="Team Lead"
            value={formData.lead}
            onChange={(event) => setFormData((current) => ({ ...current, lead: event.target.value }))}
          />
          <SelectInput
            label="Status"
            value={formData.status}
            onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="planning">Planning</option>
            <option value="inactive">Inactive</option>
          </SelectInput>
          <div className="btn-row">
            <button type="submit" className="btn brand">
              Save Team
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={Boolean(editingTeam)} title="Edit Team" onClose={() => setEditingTeam(null)}>
        <form className="form-grid" onSubmit={handleEditTeam}>
          <FormInput
            label="Team Name"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <FormInput
            label="Team Lead"
            value={formData.lead}
            onChange={(event) => setFormData((current) => ({ ...current, lead: event.target.value }))}
          />
          <SelectInput
            label="Status"
            value={formData.status}
            onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="planning">Planning</option>
            <option value="inactive">Inactive</option>
          </SelectInput>
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

export default TeamsPage;
