
import React, { useState } from 'react';
import { Calendar, Filter, Download, ChevronLeft, ChevronRight, TrendingUp, Activity, Droplets } from 'lucide-react';

const HealthHistory = () => {
  const [selectedCat, setSelectedCat] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  
  const cats = [
    { name: 'Whiskers', color: 'amber' },
    { name: 'Luna', color: 'rose' },
    { name: 'Milo', color: 'emerald' }
  ];

  const filterTypes = [
    { id: 'all', label: 'All Activity' },
    { id: 'behavior', label: 'Behavior' },
    { id: 'urine', label: 'Urine Tests' },
    { id: 'symptoms', label: 'Symptoms' },
    { id: 'vet', label: 'Vet Visits' }
  ];

  const dateRanges = [
    { id: '7days', label: 'Last 7 days' },
    { id: '30days', label: 'Last 30 days' },
    { id: '90days', label: 'Last 3 months' },
    { id: '1year', label: 'Last year' }
  ];

  const historyData = [
    {
      date: '2024-05-30',
      time: '09:30',
      type: 'behavior',
      title: 'Morning feeding',
      details: 'Ate 80% of breakfast, normal energy level',
      status: 'normal'
    },
    {
      date: '2024-05-30',
      time: '07:15',
      type: 'urine',
      title: 'Urine test results',
      details: 'All 8 parameters within normal range',
      status: 'normal'
    },
    {
      date: '2024-05-29',
      time: '19:45',
      type: 'behavior',
      title: 'Evening activity',
      details: 'Played for 15 minutes, used litter box',
      status: 'normal'
    },
    {
      date: '2024-05-29',
      time: '12:00',
      type: 'symptoms',
      title: 'Slight lethargy observed',
      details: 'Less active than usual, still eating normally',
      status: 'attention'
    },
    {
      date: '2024-05-28',
      time: '10:30',
      type: 'vet',
      title: 'Regular checkup',
      details: 'Annual wellness exam, all vitals normal',
      status: 'normal'
    }
  ];

  const currentCat = cats[selectedCat];

  return (
    <div className="p-4 space-y-6">
      {/* Cat Selection Header */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSelectedCat(selectedCat > 0 ? selectedCat - 1 : cats.length - 1)}
            className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-stone-600" />
          </button>
          
          <div className="text-center">
            <div className={`w-16 h-16 bg-${currentCat.color}-100 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl border-2 border-${currentCat.color}-200`}>
              🐱
            </div>
            <h2 className="text-xl font-bold text-stone-700">{currentCat.name}'s Health History</h2>
            <p className="text-stone-500 text-sm">Complete health timeline</p>
          </div>
          
          <button
            onClick={() => setSelectedCat(selectedCat < cats.length - 1 ? selectedCat + 1 : 0)}
            className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"
          >
            <ChevronRight size={20} className="text-stone-600" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-stone-700">Filter History</h3>
          <button className="flex items-center gap-2 px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-stone-600">
            <Download size={16} />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>

        {/* Filter Type */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all ${
                filterType === type.id
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Date Range */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full px-4 py-2 border border-stone-200 rounded-lg text-stone-600 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {dateRanges.map((range) => (
            <option key={range.id} value={range.id}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Health Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
          <TrendingUp size={20} className="mx-auto text-emerald-600 mb-1" />
          <p className="text-xs text-emerald-600 font-medium">Health Score</p>
          <p className="text-lg font-bold text-emerald-600">92%</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
          <Activity size={20} className="mx-auto text-blue-600 mb-1" />
          <p className="text-xs text-blue-600 font-medium">Activities</p>
          <p className="text-lg font-bold text-blue-600">24</p>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
          <Droplets size={20} className="mx-auto text-amber-600 mb-1" />
          <p className="text-xs text-amber-600 font-medium">Tests</p>
          <p className="text-lg font-bold text-amber-600">8</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        <h3 className="font-semibold text-stone-700">Timeline</h3>
        
        <div className="space-y-3">
          {historyData.map((item, index) => (
            <div key={index} className="bg-white border border-stone-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.type === 'behavior' ? 'bg-blue-100 text-blue-600' :
                  item.type === 'urine' ? 'bg-amber-100 text-amber-600' :
                  item.type === 'symptoms' ? 'bg-rose-100 text-rose-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  {item.type === 'behavior' ? <Activity size={16} /> :
                   item.type === 'urine' ? <Droplets size={16} /> :
                   item.type === 'symptoms' ? '⚠️' :
                   '🏥'}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-stone-700">{item.title}</h4>
                    <div className="text-right">
                      <p className="text-xs text-stone-500">{item.date}</p>
                      <p className="text-xs text-stone-400">{item.time}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-stone-600 mb-2">{item.details}</p>
                  
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.status === 'normal' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'attention' ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {item.status === 'normal' ? 'Normal' :
                     item.status === 'attention' ? 'Needs Attention' :
                     'Concerning'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <button className="w-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]">
        Load More History
      </button>
    </div>
  );
};

export default HealthHistory;
