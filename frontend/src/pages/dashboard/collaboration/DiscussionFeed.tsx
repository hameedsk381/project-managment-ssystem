import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  AtSign, 
  Hash, 
  Plus, 
  Search,
  MoreVertical,
  ThumbsUp,
  Reply,
  Share2
} from 'lucide-react';

const channels = [
  { id: '1', name: 'general', type: 'public' },
  { id: '2', name: 'product-updates', type: 'public' },
  { id: '3', name: 'engineering-talk', type: 'public' },
  { id: '4', name: 'design-feedback', type: 'public' },
];

const mockMessages = [
  {
    id: 'm1',
    user: 'Sarah Lee',
    avatar: 'S',
    content: 'Hey team, I just uploaded the new design mocks for the mobile app in the design-feedback channel. Would love to get some initial thoughts! @designers',
    time: '10:24 AM',
    reactions: 4,
    replies: 2,
  },
  {
    id: 'm2',
    user: 'John Doe',
    avatar: 'J',
    content: 'Looking great! I especially like the new navigation flow. It feels much more intuitive.',
    time: '11:05 AM',
    reactions: 2,
    replies: 0,
  }
];

export default function DiscussionFeed() {
  const [activeChannel, setActiveChannel] = useState('general');

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Channels Sidebar */}
      <div className="w-64 border-r border-border bg-secondary/10 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="font-bold text-foreground">Channels</h2>
          <button className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.name)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${
                activeChannel === channel.name 
                  ? 'bg-blue-600/10 text-blue-500 font-semibold' 
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              }`}
            >
              <Hash size={16} />
              <span>{channel.name}</span>
            </button>
          ))}
          
          <div className="pt-6 pb-2 px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Direct Messages</div>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Sarah Lee</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary/50 hover:text-foreground">
            <div className="w-2 h-2 rounded-full bg-gray-500" />
            <span>Mike Ray</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <Hash className="text-muted-foreground" size={20} />
            <div>
              <h3 className="font-bold text-foreground leading-tight">{activeChannel}</h3>
              <p className="text-xs text-muted-foreground">Company-wide general discussions</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <input 
                type="text" 
                placeholder="Search messages..."
                className="pl-8 pr-3 py-1.5 bg-secondary/30 border border-transparent focus:border-border rounded-md text-xs w-48 focus:outline-none transition-all"
              />
            </div>
            <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {mockMessages.map((msg, i) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex space-x-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-600 flex items-center justify-center text-sm font-bold border border-blue-600/30 shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-foreground">{msg.user}</span>
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed bg-secondary/20 p-4 rounded-xl rounded-tl-none border border-border/50 inline-block max-w-2xl">
                  {msg.content}
                </p>
                <div className="flex items-center space-x-4 mt-2 pl-1">
                  <button className="flex items-center space-x-1.5 text-xs text-muted-foreground hover:text-blue-500 transition-colors">
                    <ThumbsUp size={14} />
                    <span>{msg.reactions}</span>
                  </button>
                  <button className="flex items-center space-x-1.5 text-xs text-muted-foreground hover:text-blue-500 transition-colors">
                    <Reply size={14} />
                    <span>{msg.replies} Replies</span>
                  </button>
                  <button className="p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all">
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-border bg-background/80 backdrop-blur-md">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/5 blur-xl group-focus-within:opacity-100 opacity-0 transition-opacity rounded-xl"></div>
            <div className="relative bg-secondary/30 border border-border rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <textarea 
                placeholder={`Message #${activeChannel}`}
                className="w-full bg-transparent border-none p-3 text-sm focus:outline-none min-h-[100px] resize-none text-foreground"
              />
              <div className="flex items-center justify-between px-2 pb-1 border-t border-border/50 pt-2">
                <div className="flex items-center space-x-1">
                  <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors"><AtSign size={16} /></button>
                  <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors"><Plus size={16} /></button>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2">
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
