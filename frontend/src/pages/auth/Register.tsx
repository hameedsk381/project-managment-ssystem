import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call for registration
    setTimeout(() => {
      setIsLoading(false);
      navigate('/auth/login');
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
      <h2 className="text-2xl font-bold mb-2 text-center text-foreground tracking-tight">Create Workspace</h2>
      <p className="text-sm text-muted-foreground text-center mb-8">Set up your new admin account</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-foreground transition-shadow placeholder:text-muted-foreground/50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
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
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <Link to="/auth/login" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">Sign in</Link>
      </div>
    </motion.div>
  );
}
