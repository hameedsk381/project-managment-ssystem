import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Access Denied</h2>
        <p className="page-description">You do not have permission to view this page.</p>
        <div className="btn-row" style={{ marginTop: 16 }}>
          <Link to="/app" className="btn">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
