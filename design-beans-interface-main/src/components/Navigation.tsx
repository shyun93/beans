
import React from 'react';
import { Calendar, Camera, Clock, FileText, Plus, X, TrendingUp } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', icon: Calendar, label: 'Home' },
    { id: 'profile', icon: FileText, label: 'Profile' },
    { id: 'health', icon: Plus, label: 'Track' },
    { id: 'history', icon: TrendingUp, label: 'History' },
    { id: 'urine', icon: Camera, label: 'Test' },
    { id: 'vet', icon: Clock, label: 'Vet' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              activeTab === item.id
                ? 'text-amber-600 bg-amber-50 shadow-md border border-amber-200'
                : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
      
      {/* Emergency Button - Floating */}
      <button 
        onClick={() => setActiveTab('emergency')}
        className="absolute -top-8 right-4 w-16 h-16 bg-rose-400 hover:bg-rose-500 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 hover:shadow-2xl"
      >
        <Plus size={24} className="rotate-45" />
      </button>
    </nav>
  );
};

export default Navigation;
