import PageHeader from "../components/PageHeader";
import RoleBadge from "../components/RoleBadge";
import SectionCard from "../components/SectionCard";
import { useAuth } from "../hooks/useAuth";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";

function ProfilePage() {
  const { user, logout, authLoading } = useAuth();

  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Your local development identity, access context, and workspace session details."
      />

      <SectionCard title="User Details" subtitle="Current local auth profile loaded from the temporary development session.">
        {authLoading ? <Loader message="Loading profile..." /> : null}
        {!authLoading && user ? (
          <div className="stack">
            <div><strong>Name:</strong> {user.name || "Not available"}</div>
            <div><strong>Email:</strong> {user.email || "Not available"}</div>
            <div className="split-actions">
              <strong>Role</strong>
              <RoleBadge value={user.role || "Not available"} />
            </div>
            <div className="btn-row" style={{ marginTop: 8 }}>
              <button type="button" className="btn" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        ) : null}
        {!authLoading && !user ? (
          <EmptyState
            title="No profile data"
            description="User details will appear here after authentication succeeds."
          />
        ) : null}
      </SectionCard>
    </>
  );
}

export default ProfilePage;
