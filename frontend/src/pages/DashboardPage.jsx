import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAtRiskItems,
  getDashboardStats,
  getDeliveryConfidence,
  getMyTasksPreview,
  getRecentActivity,
  getUpcomingMilestones,
} from "../api/dashboardApi";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import IntegrationPendingState from "../components/IntegrationPendingState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatsCard from "../components/StatsCard";
import StatusBadge from "../components/StatusBadge";
import { getErrorMessage, isIntegrationPendingError } from "../utils/errors";
import { asCollection } from "../utils/placeholders";

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [atRiskItems, setAtRiskItems] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [deliveryConfidence, setDeliveryConfidence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);
        const [
          statsResponse,
          activityResponse,
          deadlinesResponse,
          riskResponse,
          myTasksResponse,
          confidenceResponse,
        ] = await Promise.all([
          getDashboardStats(),
          getRecentActivity(),
          getUpcomingMilestones(),
          getAtRiskItems(),
          getMyTasksPreview(),
          getDeliveryConfidence(),
        ]);

        setStats(statsResponse);
        setActivity(asCollection(activityResponse));
        setDeadlines(asCollection(deadlinesResponse));
        setAtRiskItems(asCollection(riskResponse));
        setMyTasks(asCollection(myTasksResponse));
        setDeliveryConfidence(confidenceResponse);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const actions = (
    <>
      <Link className="btn brand" to="/app/projects?create=project">
        New Project
      </Link>
      <Link className="btn ghost" to="/app/tasks?create=task">
        New Task
      </Link>
    </>
  );

  return (
    <>
      <PageHeader
        title="Delivery Control Center"
        subtitle="Track execution health, deadlines, risk, and coordination signals across your workspace."
        actions={actions}
      />

      {loading ? <LoadingState title="Loading dashboard" description="Pulling live project signals and summaries." /> : null}
      {!loading && error && !isIntegrationPendingError(error) ? (
        <ErrorState title="Dashboard unavailable" description={getErrorMessage(error, "Unable to load dashboard.")} />
      ) : null}
      {!loading && error && isIntegrationPendingError(error) ? (
        <IntegrationPendingState
          title="Dashboard integration pending"
          description="Dashboard APIs are not connected yet. The product surface is ready for future FastAPI stats, activity, and risk feeds."
        />
      ) : null}

      {!loading && !error ? (
        <>
          <section className="stats-grid">
            <StatsCard title="Projects" value={stats?.projects_total} description="Portfolio count from dashboard stats" />
            <StatsCard title="Tasks" value={stats?.tasks_total} description="Open and tracked work items" />
            <StatsCard title="Completed" value={stats?.tasks_completed} description="Execution throughput snapshot" />
            <StatsCard title="Overdue" value={stats?.tasks_overdue} description="Items needing intervention" />
          </section>

          <section className="content-grid dashboard-grid">
            <SectionCard title="Recent Activity" subtitle="The latest changes moving delivery forward.">
              {activity.length ? (
                <div className="list-section">
                  {activity.map((item) => (
                    <div key={item.id} className="activity-item">
                      <div className="split-actions">
                        <strong>{item.title || item.type || "Activity event"}</strong>
                        {item.status ? <StatusBadge value={item.status} /> : null}
                      </div>
                      <div className="muted-text">{item.description || item.message || "No details available."}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No recent activity"
                  description="Activity events will populate when backend activity feeds are connected."
                />
              )}
            </SectionCard>

            <SectionCard title="Upcoming Deadlines" subtitle="Milestones and due dates coming up next.">
              {deadlines.length ? (
                <div className="list-section">
                  {deadlines.map((item) => (
                    <div key={item.id} className="list-item">
                      <strong>{item.name || item.title || "Upcoming milestone"}</strong>
                      <div className="muted-text">{item.due_date || "Pending due date"}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No upcoming deadlines"
                  description="Upcoming milestones and near-term due dates will appear here."
                />
              )}
            </SectionCard>

            <SectionCard title="At-Risk Items" subtitle="Execution signals that need intervention.">
              {atRiskItems.length ? (
                <div className="list-section">
                  {atRiskItems.map((item) => (
                    <div key={item.id} className="list-item">
                      <div className="split-actions">
                        <strong>{item.name || item.title || "At-risk item"}</strong>
                        <StatusBadge value={item.status || "At Risk"} />
                      </div>
                      <div className="muted-text">{item.reason || item.description || "No risk rationale yet."}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No at-risk items"
                  description="Projects or tasks flagged as at risk will show up here."
                />
              )}
            </SectionCard>

            <SectionCard title="Quick Actions" subtitle="Jump into the operational flows you use most often.">
              <div className="quick-actions-grid">
                <Link className="action-card" to="/app/projects?create=project">
                  <strong>Create Project</strong>
                  <span>Start a new initiative with structure ready for milestones and tasks.</span>
                </Link>
                <Link className="action-card" to="/app/tasks?create=task">
                  <strong>Create Task</strong>
                  <span>Capture execution work quickly and route it to the right owner later.</span>
                </Link>
                <Link className="action-card" to="/app/inbox">
                  <strong>Open Inbox</strong>
                  <span>Triage backlog intake, unassigned work, and pending reviews.</span>
                </Link>
                <Link className="action-card" to="/app/projects">
                  <strong>Review Portfolio</strong>
                  <span>Inspect project health, ownership, and delivery progress across teams.</span>
                </Link>
              </div>
            </SectionCard>

            <SectionCard title="Delivery Confidence" subtitle="Confidence signal from schedule health and execution trends.">
              {deliveryConfidence ? (
                <div className="confidence-card">
                  <div className="confidence-score">{deliveryConfidence.score || "—"}</div>
                  <p className="muted-text">
                    {deliveryConfidence.summary || "Delivery confidence summary will render once the backend is connected."}
                  </p>
                </div>
              ) : (
                <EmptyState
                  title="No confidence signal yet"
                  description="Delivery confidence will appear here when the backend provides forecasting signals."
                />
              )}
            </SectionCard>

            <SectionCard title="My Tasks" subtitle="A preview of the work currently assigned to you.">
              {myTasks.length ? (
                <div className="list-section">
                  {myTasks.map((task) => (
                    <div key={task.id} className="list-item">
                      <div className="split-actions">
                        <strong>{task.title || "Assigned task"}</strong>
                        {task.status ? <StatusBadge value={task.status} /> : null}
                      </div>
                      <div className="muted-text">{task.project?.name || task.project_name || "No project linked yet."}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No assigned tasks"
                  description="Assigned work will show here once personal task views are connected."
                />
              )}
            </SectionCard>
          </section>
        </>
      ) : null}
    </>
  );
}

export default DashboardPage;
