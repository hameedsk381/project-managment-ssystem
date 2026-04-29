import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
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
      <h2 className="text-2xl font-bold mb-2 text-center text-foreground tracking-tight">Reset Password</h2>
      <p className="text-sm text-muted-foreground text-center mb-8">
        {isSubmitted ? 'Check your email for a reset link.' : 'Enter your email to receive a password reset link.'}
      </p>
      
      {!isSubmitted ? (
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      ) : (
        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-md text-sm text-green-600 dark:text-green-400 text-center">
          Reset link sent! Please check your inbox.
        </div>
      )}

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/auth/login" className="text-blue-500 hover:text-blue-400 transition-colors font-medium flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to login
        </Link>
      </div>
    </motion.div>
  );
}
