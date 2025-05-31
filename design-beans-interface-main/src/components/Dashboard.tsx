import React, { useState } from 'react';
import { Calendar, Camera, Clock, Plus, ChevronRight, TrendingUp, Brain } from 'lucide-react';
import HealthInsights from './HealthInsights';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [selectedCat, setSelectedCat] = useState(0);
  
  const cats = [
    { id: '1', name: 'Whiskers', breed: 'British Shorthair', age: '3 years', healthScore: 92, status: 'Excellent', lastCheck: '2 hours ago' },
    { id: '2', name: 'Luna', breed: 'Persian', age: '5 years', healthScore: 88, status: 'Good', lastCheck: '1 day ago' },
    { id: '3', name: 'Milo', breed: 'Maine Coon', age: '2 years', healthScore: 95, status: 'Excellent', lastCheck: '4 hours ago' }
  ];

  const currentCat = cats[selectedCat];

  return (
    <div className="p-4 space-y-6">
      {/* Cat Selector */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-stone-700">Your Cats</h2>
          <button 
            onClick={() => onNavigate('profile')}
            className="text-stone-500 hover:text-stone-600"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2">
          {cats.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCat(index)}
              className={`flex-shrink-0 p-3 rounded-xl border-2 transition-all ${
                selectedCat === index
                  ? 'border-amber-300 bg-white shadow-md'
                  : 'border-transparent bg-white/50 hover:bg-white/70'
              }`}
            >
              <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center text-2xl mb-2">
                🐱
              </div>
              <p className="text-sm font-medium text-stone-700">{cat.name}</p>
              <p className="text-xs text-stone-500">{cat.breed}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Cat Info */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center text-2xl">
            🐱
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-700">{currentCat.name}</h2>
            <p className="text-stone-500">{currentCat.breed} • {currentCat.age}</p>
            <p className="text-sm text-stone-500 font-medium">Last check: {currentCat.lastCheck}</p>
          </div>
        </div>
      </div>

      {/* AI Health Insights */}
      <HealthInsights catId={currentCat.id} catName={currentCat.name} />

      {/* Health Status Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
          <div className="text-emerald-600 mb-2">
            <Calendar size={24} />
          </div>
          <h3 className="font-semibold text-stone-700">Health Score</h3>
          <p className="text-2xl font-bold text-emerald-600">{currentCat.healthScore}%</p>
          <p className="text-xs text-stone-500">{currentCat.status}</p>
        </div>
        
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
          <div className="text-stone-600 mb-2">
            <Clock size={24} />
          </div>
          <h3 className="font-semibold text-stone-700">Next Visit</h3>
          <p className="text-sm font-bold text-stone-600">Dec 15</p>
          <p className="text-xs text-stone-500">Annual checkup</p>
        </div>
      </div>

      {/* Quick Actions with AI features */}
      <div className="space-y-3">
        <h3 className="font-semibold text-stone-700">Quick Actions</h3>
        
        <button 
          onClick={() => onNavigate('health')}
          className="w-full bg-white border border-stone-200 rounded-xl p-4 flex items-center gap-3 hover:bg-stone-50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Plus size={20} className="text-amber-600" />
          </div>
          <div className="text-left">
            <p className="font-medium text-stone-700">Log Daily Health</p>
            <p className="text-sm text-stone-500">Eating, drinking, behavior</p>
          </div>
        </button>
        
        <button 
          onClick={() => onNavigate('urine')}
          className="w-full bg-white border border-stone-200 rounded-xl p-4 flex items-center gap-3 hover:bg-stone-50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Brain size={20} className="text-blue-600" />
          </div>
          <div className="text-left">
            <p className="font-medium text-stone-700">AI Urine Test</p>
            <p className="text-sm text-stone-500">Smart strip analysis</p>
          </div>
        </button>
        
        <button 
          onClick={() => onNavigate('emergency')}
          className="w-full bg-white border border-rose-200 rounded-xl p-4 flex items-center gap-3 hover:bg-rose-50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
        >
          <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
            <Brain size={20} className="text-rose-600" />
          </div>
          <div className="text-left">
            <p className="font-medium text-stone-700">Emergency Assessment</p>
            <p className="text-sm text-stone-500">AI symptom evaluation</p>
          </div>
        </button>
        
        <button 
          onClick={() => onNavigate('history')}
          className="w-full bg-white border border-stone-200 rounded-xl p-4 flex items-center gap-3 hover:bg-stone-50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
        >
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <TrendingUp size={20} className="text-emerald-600" />
          </div>
          <div className="text-left">
            <p className="font-medium text-stone-700">View Health History</p>
            <p className="text-sm text-stone-500">Timeline and analytics</p>
          </div>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h3 className="font-semibold text-stone-700">Recent Activity</h3>
        
        <div className="space-y-2">
          <div className="bg-white border border-stone-200 rounded-xl p-3 hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-stone-700">{currentCat.name} - AI Urine Analysis</p>
                <p className="text-sm text-emerald-600">All parameters normal • 95% confidence</p>
              </div>
              <span className="text-xs text-stone-400">2h ago</span>
            </div>
          </div>
          
          <div className="bg-white border border-stone-200 rounded-xl p-3 hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-stone-700">{currentCat.name} - Morning feeding</p>
                <p className="text-sm text-stone-500">Ate 80% of meal</p>
              </div>
              <span className="text-xs text-stone-400">4h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
