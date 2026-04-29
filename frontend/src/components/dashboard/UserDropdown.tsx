import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Zap,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useAuthStore } from '../../store/auth';

interface UserDropdownProps {
  onClose: () => void;
}

export default function UserDropdown({ onClose }: UserDropdownProps) {
  const { user, logout } = useAuthStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 mt-2 w-64 bg-popover border border-border shadow-2xl rounded-xl overflow-hidden z-[100] p-1"
    >
      <div className="px-3 py-3 border-b border-border bg-secondary/10 flex items-center space-x-3 rounded-t-lg">
        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 font-bold border border-blue-600/30 shrink-0">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground truncate">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
      </div>

      <div className="p-1 space-y-0.5">
        <DropdownItem icon={<User size={14} />} label="My Profile" onClick={onClose} />
        <DropdownItem icon={<Settings size={14} />} label="Workspace Settings" onClick={onClose} />
        <DropdownItem icon={<Zap size={14} />} label="Upgrade Plan" color="text-yellow-500" onClick={onClose} />
      </div>

      <div className="p-1 border-t border-border mt-1">
        <DropdownItem icon={<Shield size={14} />} label="Privacy Policy" onClick={onClose} />
        <DropdownItem icon={<HelpCircle size={14} />} label="Help & Support" onClick={onClose} />
      </div>

      <div className="p-1 border-t border-border mt-1">
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-all font-medium"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>

      <div className="px-4 py-2 text-[10px] text-muted-foreground flex items-center justify-between">
        <span>v2.4.0 (Enterprise)</span>
        <ExternalLink size={10} />
      </div>
    </motion.div>
  );
}

function DropdownItem({ icon, label, onClick, color = 'text-muted-foreground' }: { icon: React.ReactNode; label: string; onClick: () => void; color?: string }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-all group"
    >
      <div className={`${color} group-hover:text-foreground transition-colors`}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}
