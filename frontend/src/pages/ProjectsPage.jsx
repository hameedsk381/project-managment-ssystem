import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createProject, getProjects } from "../api/projectApi";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import FormInput from "../components/FormInput";
import IntegrationPendingState from "../components/IntegrationPendingState";
import LoadingState from "../components/LoadingState";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import PriorityBadge from "../components/PriorityBadge";
import SectionCard from "../components/SectionCard";
import SelectInput from "../components/SelectInput";
import StatusBadge from "../components/StatusBadge";
import { getErrorMessage, isIntegrationPendingError } from "../utils/errors";
import { asCollection } from "../utils/placeholders";

const initialProjectForm = {
  name: "",
  description: "",
  ownerId: "",
  teamId: "",
  status: "",
  priority: "",
  startDate: "",
  endDate: "",
};

function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [showModal, setShowModal] = useState(searchParams.get("create") === "project");
  const [formData, setFormData] = useState(initialProjectForm);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const response = await getProjects({
          search: searchValue || undefined,
          status: statusFilter || undefined,
          priority: priorityFilter || undefined,
        });
        setProjects(asCollection(response));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [searchValue, statusFilter, priorityFilter]);

  useEffect(() => {
    setShowModal(searchParams.get("create") === "project");
  }, [searchParams]);

  function closeModal() {
    setShowModal(false);
    if (searchParams.get("create")) {
      const next = new URLSearchParams(searchParams);
      next.delete("create");
      setSearchParams(next);
    }
  }

  async function handleCreateProject(event) {
    event.preventDefault();

    try {
      await createProject(formData);
      setFormData(initialProjectForm);
      closeModal();
    } catch (err) {
      setError(err);
    }
  }

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Manage portfolio execution with stronger visibility into status, priority, ownership, and schedule."
        actions={
          <button type="button" className="btn brand" onClick={() => setShowModal(true)}>
            Create Project
          </button>
        }
      />

      <SectionCard title="Filters" subtitle="Refine the portfolio by search, status, and priority.">
        <div className="filters-grid filters-grid-wide">
          <FormInput
            label="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search by project name"
          />
          <SelectInput label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">All statuses</option>
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="at-risk">At Risk</option>
          </SelectInput>
          <SelectInput
            label="Priority"
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </SelectInput>
        </div>
      </SectionCard>

      {loading ? <LoadingState title="Loading projects" description="Pulling project records and execution metadata." /> : null}
      {!loading && error && isIntegrationPendingError(error) ? (
        <IntegrationPendingState
          title="Project portfolio integration pending"
          description="Connect project APIs later to populate portfolio cards, filters, and create flows."
        />
      ) : null}
      {!loading && error && !isIntegrationPendingError(error) ? (
        <ErrorState title="Projects unavailable" description={getErrorMessage(error, "Unable to load projects.")} />
      ) : null}

      {!loading && !error ? (
        <section className="card-grid project-grid">
          {projects.length ? (
            projects.map((project) => (
              <Link key={project.id} to={`/app/projects/${project.id}`} className="project-link-card">
                <SectionCard
                  title={project.name || "Project"}
                  subtitle={project.description || "Description will appear once the backend sends project detail."}
                  className="project-card"
                >
                  <div className="badge-row">
                    <StatusBadge value={project.status || "Unknown"} />
                    <PriorityBadge value={project.priority || "Unspecified"} />
                  </div>
                  <div className="meta-grid">
                    <div><span className="muted-label">Team</span><strong>{project.team?.name || project.team_name || "—"}</strong></div>
                    <div><span className="muted-label">Owner</span><strong>{project.owner?.name || project.owner_name || "—"}</strong></div>
                    <div><span className="muted-label">Start</span><strong>{project.start_date || "—"}</strong></div>
                    <div><span className="muted-label">Target</span><strong>{project.end_date || "—"}</strong></div>
                  </div>
                </SectionCard>
              </Link>
            ))
          ) : (
            <SectionCard title="Portfolio" subtitle="Project cards will appear here when the API returns records.">
              <EmptyState
                title="No projects available"
                description="Projects will show up here with status, priority, dates, and ownership once integrated."
              />
            </SectionCard>
          )}
        </section>
      ) : null}

      <Modal isOpen={showModal} title="Create Project" onClose={closeModal}>
        <form className="form-grid" onSubmit={handleCreateProject}>
          <FormInput
            label="Project Name"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <FormInput
            label="Description"
            value={formData.description}
            onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
          />
          <div className="form-row">
            <FormInput
              label="Owner ID"
              value={formData.ownerId}
              onChange={(event) => setFormData((current) => ({ ...current, ownerId: event.target.value }))}
            />
            <FormInput
              label="Team ID"
              value={formData.teamId}
              onChange={(event) => setFormData((current) => ({ ...current, teamId: event.target.value }))}
            />
          </div>
          <div className="form-row">
            <SelectInput
              label="Status"
              value={formData.status}
              onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}
            >
              <option value="">Select status</option>
              <option value="planned">Planned</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </SelectInput>
            <SelectInput
              label="Priority"
              value={formData.priority}
              onChange={(event) => setFormData((current) => ({ ...current, priority: event.target.value }))}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </SelectInput>
          </div>
          <div className="form-row">
            <FormInput
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(event) => setFormData((current) => ({ ...current, startDate: event.target.value }))}
            />
            <FormInput
              label="Target Date"
              type="date"
              value={formData.endDate}
              onChange={(event) => setFormData((current) => ({ ...current, endDate: event.target.value }))}
            />
          </div>
          <div className="btn-row">
            <button type="submit" className="btn brand">
              Save Project
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ProjectsPage;
