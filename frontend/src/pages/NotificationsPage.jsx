import { useEffect, useMemo, useState } from "react";
import { getNotifications, markNotificationRead } from "../api/notificationApi";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import IntegrationPendingState from "../components/IntegrationPendingState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import Tabs from "../components/Tabs";
import { getErrorMessage, isIntegrationPendingError } from "../utils/errors";
import { asCollection } from "../utils/placeholders";

const notificationTabs = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Mentions", value: "mentions" },
  { label: "Assignments", value: "assignments" },
  { label: "System", value: "system" },
];

function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);
        setError(null);
        const response = await getNotifications();
        setNotifications(asCollection(response));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  async function handleMarkAsRead(notificationId) {
    try {
      await markNotificationRead(notificationId);
    } catch (err) {
      setError(err);
    }
  }

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications;
    if (activeTab === "unread") return notifications.filter((item) => !item.read);
    return notifications.filter((item) => item.type === activeTab);
  }, [activeTab, notifications]);

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Stay on top of mentions, assignments, system events, and project movement without losing context."
      />

      <Tabs tabs={notificationTabs} activeTab={activeTab} onChange={setActiveTab} />

      {loading ? <LoadingState title="Loading notifications" description="Preparing the workspace signal feed." /> : null}
      {!loading && error && isIntegrationPendingError(error) ? (
        <IntegrationPendingState
          title="Notification feed integration pending"
          description="Connect notification endpoints later to power unread states, tabs, and mark-as-read actions."
        />
      ) : null}
      {!loading && error && !isIntegrationPendingError(error) ? (
        <ErrorState title="Notifications unavailable" description={getErrorMessage(error, "Unable to load notifications.")} />
      ) : null}
      {!loading && !error ? (
        <SectionCard title="Feed" subtitle="Grouped notifications with cleaner emphasis on unread, mentions, and assignments.">
          {filteredNotifications.length ? (
            <div className="list-section">
              {filteredNotifications.map((item) => (
                <div key={item.id} className={`notification-item notification-card${item.read ? "" : " unread-card"}`}>
                  <div className="split-actions">
                    <div>
                      <strong>{item.title || "Notification"}</strong>
                      <div className="muted-text">{item.type || "system"}</div>
                    </div>
                    {!item.read ? (
                      <button type="button" className="btn ghost" onClick={() => handleMarkAsRead(item.id)}>
                        Mark as read
                      </button>
                    ) : (
                      <span className="badge">Read</span>
                    )}
                  </div>
                  <p>{item.message || "Notification details will appear here."}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No notifications in this view"
              description="Notifications will appear here once the feed and filtering backend is connected."
            />
          )}
        </SectionCard>
      ) : null}
    </>
  );
}

export default NotificationsPage;
