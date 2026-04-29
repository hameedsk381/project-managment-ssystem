import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Lock, 
  Activity, 
  Database, 
  Bell, 
  Globe, 
  Plus,
  MoreVertical,
  Check,
  ChevronRight,
  Settings
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Settings Sidebar */}
      <div className="w-64 border-r border-border bg-secondary/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border">
          <h2 className="font-bold text-foreground flex items-center space-x-2">
            <Settings size={18} className="text-muted-foreground" />
            <span>Settings</span>
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <SettingsNavItem icon={<Users size={16} />} label="Members" active={activeTab === 'members'} onClick={() => setActiveTab('members')} />
          <SettingsNavItem icon={<Shield size={16} />} label="Roles & Permissions" active={activeTab === 'roles'} onClick={() => setActiveTab('roles')} />
          <SettingsNavItem icon={<Lock size={16} />} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
          <SettingsNavItem icon={<Activity size={16} />} label="Audit Logs" active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} />
          <SettingsNavItem icon={<Database size={16} />} label="Data Management" active={activeTab === 'data'} onClick={() => setActiveTab('data')} />
          <div className="pt-6 pb-2 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Configuration</div>
          <SettingsNavItem icon={<Bell size={16} />} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
          <SettingsNavItem icon={<Globe size={16} />} label="Workspace" active={activeTab === 'workspace'} onClick={() => setActiveTab('workspace')} />
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {activeTab === 'members' && <MembersSettings />}
          {activeTab === 'roles' && <RolesSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

function SettingsNavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${
        active 
          ? 'bg-blue-600/10 text-blue-500 font-semibold' 
          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MembersSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Members</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage who has access to this workspace.</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="bg-background rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-secondary/20">
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Member</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
              { name: 'Sarah Lee', email: 'sarah@example.com', role: 'Project Manager' },
              { name: 'Mike Ray', email: 'mike@example.com', role: 'Member' },
            ].map((member, i) => (
              <tr key={i} className="hover:bg-secondary/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-600">{member.name.charAt(0)}</div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded border border-border">{member.role}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 hover:bg-secondary rounded text-muted-foreground">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RolesSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Roles & Permissions</h2>
        <p className="text-sm text-muted-foreground mt-1">Configure role-based access control for your team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Admin', 'Project Manager', 'Team Lead', 'Member'].map((role) => (
          <div key={role} className="p-4 bg-background border border-border rounded-xl hover:border-blue-500/30 transition-all cursor-pointer group shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-blue-500" />
                <h3 className="font-bold text-foreground">{role}</h3>
              </div>
              <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Full access to all settings and project configurations across the workspace.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Security</h2>
        <p className="text-sm text-muted-foreground mt-1">Maintain workspace security and compliance.</p>
      </div>

      <div className="space-y-4">
        <SecurityToggle title="Two-Factor Authentication" description="Require 2FA for all members of the workspace." enabled={true} />
        <SecurityToggle title="Strict Password Policy" description="Enforce complex password requirements and rotation." enabled={false} />
        <SecurityToggle title="Single Sign-On (SSO)" description="Allow members to sign in with Okta or Google Workspace." enabled={false} />
      </div>
    </div>
  );
}

function SecurityToggle({ title, description, enabled }: { title: string; description: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between p-6 bg-background border border-border rounded-xl shadow-sm">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button className={`w-12 h-6 rounded-full transition-all relative ${enabled ? 'bg-blue-600' : 'bg-secondary'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${enabled ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
}


