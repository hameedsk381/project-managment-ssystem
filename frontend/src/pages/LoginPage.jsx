import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ErrorState from "../components/ErrorState";
import FormInput from "../components/FormInput";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { getErrorMessage } from "../utils/errors";

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, authLoading, login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(formData);
      navigate("/app", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Login failed."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="page-header">
          <div>
            <h2>Login</h2>
            <p className="page-description">Temporary local development login. Replace this with backend auth later.</p>
          </div>
          <button
            type="button"
            className="btn ghost theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={updateField}
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={updateField}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="panel" style={{ marginTop: 16 }}>
          <strong>Development Credentials</strong>
          <div className="muted-text">Email: admin@example.com</div>
          <div className="muted-text">Password: admin123</div>
        </div>

        {error ? <ErrorState title="Login error" description={error} /> : null}
      </div>
    </div>
  );
}

export default LoginPage;
