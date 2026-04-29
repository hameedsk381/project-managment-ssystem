import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { UserRole } from '../../types/auth';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login({
        user: {
          id: '1',
          name: 'John Doe',
          email,
          role: UserRole.ADMIN,
          isEmailVerified: true,
          createdAt: new Date().toISOString(),
        },
        token: 'mock_jwt_token_123',
      });
      setIsLoading(false);
      navigate('/dashboard/workspace');
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md p-8 bg-secondary/50 backdrop-blur-md rounded-xl border border-border/50 shadow-2xl"
    >
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-center text-foreground tracking-tight">Welcome back</h2>
      <p className="text-sm text-muted-foreground text-center mb-8">Sign in to your workspace</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
          <input
            type="email"
            required
            placeholder="name@company.com"
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-foreground transition-shadow placeholder:text-muted-foreground/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium text-foreground">Password</label>
            <Link to="/auth/forgot-password" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">Forgot password?</Link>
          </div>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-foreground transition-shadow placeholder:text-muted-foreground/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </motion.div>
  );
}
