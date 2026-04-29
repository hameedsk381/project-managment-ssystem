import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createProjectDecision,
  createProjectMilestone,
  getProjectActivity,
  getProjectById,
  getProjectDecisions,
  getProjectFiles,
  getProjectMilestones,
  getProjectTasks,
  updateProjectMilestone,
} from "../api/projectApi";
import ActivityTimeline from "../components/ActivityTimeline";
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
import Tabs from "../components/Tabs";
import { getErrorMessage, isIntegrationPendingError } from "../utils/errors";
import { asCollection } from "../utils/placeholders";

const detailTabs = [
  { label: "Overview", value: "overview" },
  { label: "Milestones", value: "milestones" },
  { label: "Tasks", value: "tasks" },
  { label: "Activity", value: "activity" },
  { label: "Decisions", value: "decisions" },
  { label: "Files", value: "files" },
];

const initialMilestoneForm = {
  name: "",
  dueDate: "",
  status: "",
  progress: "",
};

const initialDecisionForm = {
  title: "",
  owner: "",
  impact: "",
  notes: "",
};

function ProjectDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activity, setActivity] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState(initialMilestoneForm);
  const [decisionForm, setDecisionForm] = useState(initialDecisionForm);

  useEffect(() => {
    async function loadProjectDetails() {
      try {
        setLoading(true);
        setError(null);
        const [
          projectResponse,
          milestonesResponse,
          tasksResponse,
          activityResponse,
          decisionsResponse,
          filesResponse,
        ] = await Promise.all([
          getProjectById(id),
          getProjectMilestones(id),
          getProjectTasks(id),
          getProjectActivity(id),
          getProjectDecisions(id),
          getProjectFiles(id),
        ]);

        setProject(projectResponse);
        setMilestones(asCollection(milestonesResponse));
        setTasks(asCollection(tasksResponse));
        setActivity(asCollection(activityResponse));
        setDecisions(asCollection(decisionsResponse));
        setFiles(asCollection(filesResponse));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadProjectDetails();
  }, [id]);

  function openCreateMilestone() {
    setEditingMilestone(null);
    setMilestoneForm(initialMilestoneForm);
    setShowMilestoneModal(true);
  }

  function openEditMilestone(milestone) {
    setEditingMilestone(milestone);
    setMilestoneForm({
      name: milestone.name || "",
      dueDate: milestone.due_date || "",
      status: milestone.status || "",
      progress: milestone.progress ?? "",
    });
    setShowMilestoneModal(true);
  }

  async function handleMilestoneSubmit(event) {
    event.preventDefault();

    try {
      if (editingMilestone?.id) {
        await updateProjectMilestone(id, editingMilestone.id, milestoneForm);
      } else {
        await createProjectMilestone(id, milestoneForm);
      }

      setShowMilestoneModal(false);
      setMilestoneForm(initialMilestoneForm);
      setEditingMilestone(null);
    } catch (err) {
      setError(err);
    }
  }

  async function handleDecisionSubmit(event) {
    event.preventDefault();

    try {
      await createProjectDecision(id, decisionForm);
      setShowDecisionModal(false);
      setDecisionForm(initialDecisionForm);
    } catch (err) {
      setError(err);
    }
  }

  if (loading) {
    return <LoadingState title="Loading project details" description="Preparing the project, timeline, and decision context." />;
  }

  if (error && isIntegrationPendingError(error)) {
    return (
      <IntegrationPendingState
        title="Project detail integration pending"
        description="Project, milestones, tasks, activity, decisions, and files are all ready to connect to backend endpoints."
      />
    );
  }

  if (error) {
    return <ErrorState title="Project unavailable" description={getErrorMessage(error, "Unable to load project details.")} />;
  }

  return (
    <>
      <PageHeader
        title={project?.name || "Project Details"}
        subtitle={project?.description || "Dive into project execution, milestones, activity, decisions, and attached files."}
        actions={
          <>
            <StatusBadge value={project?.status || "Unknown"} />
            <PriorityBadge value={project?.priority || "Unspecified"} />
          </>
        }
      />

      <section className="content-grid detail-hero-grid">
        <SectionCard title="Project Summary" subtitle="High-level health, ownership, and schedule context.">
          <div className="meta-grid">
            <div><span className="muted-label">Owner</span><strong>{project?.owner?.name || project?.owner_name || "—"}</strong></div>
            <div><span className="muted-label">Team</span><strong>{project?.team?.name || project?.team_name || "—"}</strong></div>
            <div><span className="muted-label">Start</span><strong>{project?.start_date || "—"}</strong></div>
            <div><span className="muted-label">Target</span><strong>{project?.end_date || "—"}</strong></div>
          </div>
        </SectionCard>

        <SectionCard title="Progress" subtitle="Backend-ready progress surface for timeline confidence and completion tracking.">
          <div className="progress-block">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${project?.progress || 0}%` }} />
            </div>
            <div className="split-actions">
              <strong>{project?.progress ?? 0}%</strong>
              <span className="muted-text">Progress from connected project health signals</span>
            </div>
          </div>
        </SectionCard>
      </section>

      <Tabs tabs={detailTabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" ? (
        <section className="content-grid two-column">
          <SectionCard title="Overview" subtitle="What this initiative is trying to deliver and how it is progressing.">
            <div className="stack">
              <div><strong>Goal:</strong> {project?.goal || "Connect a project goal field later from the backend."}</div>
              <div><strong>Scope:</strong> {project?.scope || "Project scope summary will appear here."}</div>
              <div><strong>Dependencies:</strong> {project?.dependencies || "Dependency tracking will appear here."}</div>
            </div>
          </SectionCard>
          <SectionCard title="Execution Snapshot" subtitle="Key execution signals without leaving the project detail view.">
            <div className="meta-grid">
              <div><span className="muted-label">Tasks</span><strong>{tasks.length || "—"}</strong></div>
              <div><span className="muted-label">Milestones</span><strong>{milestones.length || "—"}</strong></div>
              <div><span className="muted-label">Decisions</span><strong>{decisions.length || "—"}</strong></div>
              <div><span className="muted-label">Files</span><strong>{files.length || "—"}</strong></div>
            </div>
          </SectionCard>
        </section>
      ) : null}

      {activeTab === "milestones" ? (
        <SectionCard
          title="Milestones"
          subtitle="Track decision points, stage gates, and major delivery checkpoints."
          actions={
            <button type="button" className="btn brand" onClick={openCreateMilestone}>
              Add Milestone
            </button>
          }
        >
          {milestones.length ? (
            <div className="list-section">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="list-item">
                  <div className="split-actions">
                    <strong>{milestone.name || "Milestone"}</strong>
                    <button type="button" className="btn ghost" onClick={() => openEditMilestone(milestone)}>
                      Edit
                    </button>
                  </div>
                  <div className="badge-row">
                    <StatusBadge value={milestone.status || "Unknown"} />
                    <span className="badge">{milestone.due_date || "Pending due date"}</span>
                  </div>
                  <div className="progress-inline">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${milestone.progress || 0}%` }} />
                    </div>
                    <span className="muted-text">{milestone.progress ?? 0}% complete</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No milestones yet"
              description="Milestones will appear here with due dates, progress, and status once connected."
            />
          )}
        </SectionCard>
      ) : null}

      {activeTab === "tasks" ? (
        <SectionCard title="Tasks" subtitle="Tasks linked to this project and ready for execution-level drill-down.">
          {tasks.length ? (
            <div className="list-section">
              {tasks.map((task) => (
                <div key={task.id} className="list-item">
                  <div className="split-actions">
                    <strong>{task.title || "Task"}</strong>
                    <div className="badge-row">
                      <PriorityBadge value={task.priority || "Unspecified"} />
                      <StatusBadge value={task.status || "Unknown"} />
                    </div>
                  </div>
                  <div className="muted-text">{task.assignee?.name || task.assignee_name || "Unassigned"}</div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No tasks yet" description="Project tasks will appear here once task endpoints are connected." />
          )}
        </SectionCard>
      ) : null}

      {activeTab === "activity" ? (
        <SectionCard title="Activity" subtitle="Timeline of creation, assignment, status changes, and commentary.">
          <ActivityTimeline items={activity} />
        </SectionCard>
      ) : null}

      {activeTab === "decisions" ? (
        <SectionCard
          title="Decision Log"
          subtitle="Capture key calls, tradeoffs, and their downstream impact."
          actions={
            <button type="button" className="btn brand" onClick={() => setShowDecisionModal(true)}>
              Add Decision
            </button>
          }
        >
          {decisions.length ? (
            <div className="list-section">
              {decisions.map((decision) => (
                <div key={decision.id} className="list-item">
                  <div className="split-actions">
                    <strong>{decision.title || "Decision"}</strong>
                    <span className="badge">{decision.date || decision.created_at || "Pending date"}</span>
                  </div>
                  <div className="muted-text">
                    Owner: {decision.owner?.name || decision.owner_name || "—"} | Impact: {decision.impact || "—"}
                  </div>
                  <p>{decision.notes || "Decision notes will render here once available."}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No decisions logged"
              description="Major product and delivery decisions will appear here with owner, date, impact, and notes."
            />
          )}
        </SectionCard>
      ) : null}

      {activeTab === "files" ? (
        <SectionCard title="Files" subtitle="Relevant project files and references attached to execution.">
          {files.length ? (
            <div className="list-section">
              {files.map((file) => (
                <div key={file.id} className="list-item">
                  <strong>{file.name || "File"}</strong>
                  <div className="muted-text">{file.type || "Unknown type"}</div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No files attached"
              description="Project files and references will appear here when file endpoints are connected."
            />
          )}
        </SectionCard>
      ) : null}

      <Modal
        isOpen={showMilestoneModal}
        title={editingMilestone ? "Edit Milestone" : "Add Milestone"}
        onClose={() => setShowMilestoneModal(false)}
      >
        <form className="form-grid" onSubmit={handleMilestoneSubmit}>
          <FormInput
            label="Milestone Name"
            value={milestoneForm.name}
            onChange={(event) => setMilestoneForm((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <div className="form-row">
            <FormInput
              label="Due Date"
              type="date"
              value={milestoneForm.dueDate}
              onChange={(event) => setMilestoneForm((current) => ({ ...current, dueDate: event.target.value }))}
            />
            <FormInput
              label="Progress"
              type="number"
              value={milestoneForm.progress}
              onChange={(event) => setMilestoneForm((current) => ({ ...current, progress: event.target.value }))}
            />
          </div>
          <SelectInput
            label="Status"
            value={milestoneForm.status}
            onChange={(event) => setMilestoneForm((current) => ({ ...current, status: event.target.value }))}
          >
            <option value="">Select status</option>
            <option value="planned">Planned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </SelectInput>
          <div className="btn-row">
            <button type="submit" className="btn brand">
              Save Milestone
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showDecisionModal} title="Add Decision" onClose={() => setShowDecisionModal(false)}>
        <form className="form-grid" onSubmit={handleDecisionSubmit}>
          <FormInput
            label="Decision Title"
            value={decisionForm.title}
            onChange={(event) => setDecisionForm((current) => ({ ...current, title: event.target.value }))}
            required
          />
          <div className="form-row">
            <FormInput
              label="Owner"
              value={decisionForm.owner}
              onChange={(event) => setDecisionForm((current) => ({ ...current, owner: event.target.value }))}
            />
            <FormInput
              label="Impact"
              value={decisionForm.impact}
              onChange={(event) => setDecisionForm((current) => ({ ...current, impact: event.target.value }))}
            />
          </div>
          <FormInput
            label="Notes"
            value={decisionForm.notes}
            onChange={(event) => setDecisionForm((current) => ({ ...current, notes: event.target.value }))}
          />
          <div className="btn-row">
            <button type="submit" className="btn brand">
              Save Decision
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ProjectDetailsPage;
