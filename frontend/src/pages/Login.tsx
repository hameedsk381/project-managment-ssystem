import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await login({ id: '1', name: 'John Doe', email });
    navigate('/workspace');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Sign in to your account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email address</label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          Sign in
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </div>
    </div>
  );
}
