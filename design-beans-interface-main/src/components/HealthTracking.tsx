
import React, { useState } from 'react';
import { Plus, Calendar, Clock, Save } from 'lucide-react';

const HealthTracking = () => {
  const [selectedCategory, setSelectedCategory] = useState('behavior');
  const [energyLevel, setEnergyLevel] = useState(8);
  const [playfulness, setPlayfulness] = useState(7);
  const [affection, setAffection] = useState(9);

  const categories = [
    { id: 'behavior', label: 'Behavior', emoji: '😸' },
    { id: 'eating', label: 'Eating', emoji: '🍽️' },
    { id: 'symptoms', label: 'Symptoms', emoji: '🏥' },
    { id: 'notes', label: 'Notes', emoji: '📝' },
  ];

  const behaviorItems = [
    { label: 'Energy Level', type: 'slider', value: energyLevel, setValue: setEnergyLevel },
    { label: 'Playfulness', type: 'slider', value: playfulness, setValue: setPlayfulness },
    { label: 'Affection', type: 'slider', value: affection, setValue: setAffection },
    { label: 'Vocalization', type: 'options', options: ['Normal', 'More than usual', 'Less than usual'] },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Health Tracking</h2>
        <p className="text-slate-600">Log Whiskers' daily health information</p>
      </div>

      {/* Category Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl border transition-all duration-200 hover:scale-105 ${
              selectedCategory === category.id
                ? 'bg-stone-500 text-white border-stone-500 shadow-md'
                : 'bg-white text-slate-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {selectedCategory === 'behavior' && (
          <div className="space-y-4">
            {behaviorItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200">
                <h4 className="font-medium text-slate-800 mb-3">{item.label}</h4>
                {item.type === 'slider' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={item.value}
                      onChange={(e) => item.setValue?.(parseInt(e.target.value))}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #78716c 0%, #78716c ${item.value * 10}%, #e7e5e4 ${item.value * 10}%, #e7e5e4 100%)`
                      }}
                    />
                    <div className="text-center">
                      <span className="text-lg font-bold text-stone-600">{item.value}/10</span>
                    </div>
                  </div>
                )}
                {item.type === 'options' && (
                  <div className="grid grid-cols-1 gap-2">
                    {item.options?.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-center gap-3 p-3 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors">
                        <input type="radio" name={item.label} value={option} className="text-stone-600" />
                        <span className="text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedCategory === 'eating' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <h4 className="font-medium text-slate-800 mb-3">Appetite</h4>
              <div className="grid grid-cols-3 gap-2">
                {['Poor', 'Normal', 'Excellent'].map((level) => (
                  <button
                    key={level}
                    className="p-3 border border-stone-200 rounded-lg hover:bg-stone-50 hover:border-stone-300 hover:text-stone-700 transition-all duration-200 hover:scale-105"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <h4 className="font-medium text-slate-800 mb-3">Water Intake</h4>
              <div className="grid grid-cols-3 gap-2">
                {['Low', 'Normal', 'High'].map((level) => (
                  <button
                    key={level}
                    className="p-3 border border-stone-200 rounded-lg hover:bg-stone-50 hover:border-stone-300 hover:text-stone-700 transition-all duration-200 hover:scale-105"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedCategory === 'symptoms' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
              <h4 className="font-medium text-slate-800 mb-3">Any symptoms observed?</h4>
              <div className="grid grid-cols-2 gap-3">
                {['Vomiting', 'Diarrhea', 'Lethargy', 'Coughing', 'Sneezing', 'Loss of appetite'].map((symptom) => (
                  <label key={symptom} className="flex items-center gap-2 p-3 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors">
                    <input type="checkbox" className="text-stone-600 rounded" />
                    <span className="text-sm text-slate-700">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedCategory === 'notes' && (
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm">
            <h4 className="font-medium text-slate-800 mb-3">Additional Notes</h4>
            <textarea
              className="w-full p-3 border border-stone-200 rounded-lg resize-none focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all duration-200"
              rows={4}
              placeholder="Any other observations about Whiskers today..."
            />
          </div>
        )}
      </div>

      {/* Save Button */}
      <button className="w-full bg-stone-500 hover:bg-stone-600 text-white font-medium py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
        <Save size={20} />
        Save Health Entry
      </button>
    </div>
  );
};

export default HealthTracking;
