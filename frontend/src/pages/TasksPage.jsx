import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../api/userApi";
import { assignTaskUser, createTask, getTaskActivity, getTasks, updateTaskStatus } from "../api/taskApi";
import ActivityTimeline from "../components/ActivityTimeline";
import DataTable from "../components/DataTable";
import Drawer from "../components/Drawer";
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

const initialTaskForm = {
  title: "",
  description: "",
  projectId: "",
  assigneeId: "",
  status: "",
  priority: "",
  dueDate: "",
};

function TasksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskActivity, setTaskActivity] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(searchParams.get("create") === "task");
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState(initialTaskForm);

  useEffect(() => {
    async function loadTasksPage() {
      try {
        setLoading(true);
        setError(null);
        const [tasksResponse, usersResponse] = await Promise.all([
          getTasks({
            status: statusFilter || undefined,
            priority: priorityFilter || undefined,
            search: searchValue || undefined,
          }),
          getUsers(),
        ]);

        setTasks(asCollection(tasksResponse));
        setUsers(asCollection(usersResponse));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadTasksPage();
  }, [statusFilter, priorityFilter, searchValue]);

  useEffect(() => {
    setShowCreateModal(searchParams.get("create") === "task");
  }, [searchParams]);

  useEffect(() => {
    async function loadTaskActivity() {
      if (!selectedTask?.id) return;

      try {
        setActivityLoading(true);
        const response = await getTaskActivity(selectedTask.id);
        setTaskActivity(asCollection(response));
      } catch (err) {
        setTaskActivity([]);
      } finally {
        setActivityLoading(false);
      }
    }

    loadTaskActivity();
  }, [selectedTask]);

  async function handleStatusChange(taskId, status) {
    try {
      await updateTaskStatus(taskId, { status });
    } catch (err) {
      setError(err);
    }
  }

  async function handleAssign(taskId, assigneeId) {
    try {
      await assignTaskUser(taskId, { assignee_id: assigneeId || null });
    } catch (err) {
      setError(err);
    }
  }

  function closeCreateModal() {
    setShowCreateModal(false);
    if (searchParams.get("create")) {
      const next = new URLSearchParams(searchParams);
      next.delete("create");
      setSearchParams(next);
    }
  }

  async function handleCreateTask(event) {
    event.preventDefault();

    try {
      await createTask(formData);
      setFormData(initialTaskForm);
      closeCreateModal();
    } catch (err) {
      setError(err);
    }
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (row) => (
        <button type="button" className="table-link-button" onClick={() => setSelectedTask(row)}>
          {row.title || "Task"}
        </button>
      ),
    },
    {
      key: "project",
      label: "Project",
      render: (row) => row.project?.name || row.project_name || "—",
    },
    {
      key: "assignee",
      label: "Assignee",
      render: (row) => (
        <select
          defaultValue={row.assignee?.id || row.assignee_id || ""}
          onChange={(event) => handleAssign(row.id, event.target.value)}
        >
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || user.email || "User"}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => <PriorityBadge value={row.priority || "Unspecified"} />,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <select defaultValue={row.status || ""} onChange={(event) => handleStatusChange(row.id, event.target.value)}>
          <option value="">Select status</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
          <option value="blocked">Blocked</option>
        </select>
      ),
    },
    {
      key: "due_date",
      label: "Due Date",
      render: (row) => row.due_date || "—",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <button type="button" className="btn ghost" onClick={() => setSelectedTask(row)}>
          Open
        </button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Tasks"
        subtitle="Operate the execution layer with stronger visibility into ownership, priority, deadlines, and progress."
        actions={
          <button type="button" className="btn brand" onClick={() => setShowCreateModal(true)}>
            Create Task
          </button>
        }
      />

      <SectionCard title="Filters" subtitle="Refine execution work by status, priority, and title.">
        <div className="filters-grid filters-grid-wide">
          <FormInput
            label="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search tasks"
          />
          <SelectInput label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">All statuses</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
            <option value="blocked">Blocked</option>
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

      {loading ? <LoadingState title="Loading tasks" description="Preparing task execution records and assignee coverage." /> : null}
      {!loading && error && isIntegrationPendingError(error) ? (
        <IntegrationPendingState
          title="Task execution integration pending"
          description="Connect task, status, and assignee endpoints later to activate the operational task table."
        />
      ) : null}
      {!loading && error && !isIntegrationPendingError(error) ? (
        <ErrorState title="Tasks unavailable" description={getErrorMessage(error, "Unable to load tasks.")} />
      ) : null}
      {!loading && !error ? (
        <SectionCard title="Task Table" subtitle="Execution work across projects, owners, deadlines, and state changes.">
          <DataTable
            columns={columns}
            rows={tasks}
            emptyFallback={
              <EmptyState title="No tasks found" description="Tasks will appear here when task APIs are connected." />
            }
          />
        </SectionCard>
      ) : null}

      <Modal isOpen={showCreateModal} title="Create Task" onClose={closeCreateModal}>
        <form className="form-grid" onSubmit={handleCreateTask}>
          <FormInput
            label="Task Title"
            value={formData.title}
            onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
            required
          />
          <FormInput
            label="Description"
            value={formData.description}
            onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
          />
          <div className="form-row">
            <FormInput
              label="Project ID"
              value={formData.projectId}
              onChange={(event) => setFormData((current) => ({ ...current, projectId: event.target.value }))}
            />
            <SelectInput
              label="Assignee"
              value={formData.assigneeId}
              onChange={(event) => setFormData((current) => ({ ...current, assigneeId: event.target.value }))}
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email || "User"}
                </option>
              ))}
            </SelectInput>
          </div>
          <div className="form-row">
            <SelectInput
              label="Status"
              value={formData.status}
              onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}
            >
              <option value="">Select status</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
              <option value="blocked">Blocked</option>
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
          <FormInput
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(event) => setFormData((current) => ({ ...current, dueDate: event.target.value }))}
          />
          <div className="btn-row">
            <button type="submit" className="btn brand">
              Save Task
            </button>
          </div>
        </form>
      </Modal>

      <Drawer
        isOpen={Boolean(selectedTask)}
        title={selectedTask?.title || "Task Detail"}
        subtitle="Detail drawer for execution context, assignment, and activity."
        onClose={() => setSelectedTask(null)}
      >
        {selectedTask ? (
          <div className="stack">
            <SectionCard title="Task Summary" subtitle="Execution context and ownership for the selected task.">
              <div className="meta-grid">
                <div><span className="muted-label">Project</span><strong>{selectedTask.project?.name || selectedTask.project_name || "—"}</strong></div>
                <div><span className="muted-label">Assignee</span><strong>{selectedTask.assignee?.name || selectedTask.assignee_name || "Unassigned"}</strong></div>
                <div><span className="muted-label">Priority</span><PriorityBadge value={selectedTask.priority || "Unspecified"} /></div>
                <div><span className="muted-label">Status</span><StatusBadge value={selectedTask.status || "Unknown"} /></div>
              </div>
              <p>{selectedTask.description || "Task description will appear here once the backend provides it."}</p>
            </SectionCard>

            <SectionCard title="Activity Timeline" subtitle="Assignments, updates, status changes, and notes.">
              {activityLoading ? (
                <LoadingState title="Loading activity" description="Pulling task timeline events." />
              ) : (
                <ActivityTimeline items={taskActivity} />
              )}
            </SectionCard>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}

export default TasksPage;
