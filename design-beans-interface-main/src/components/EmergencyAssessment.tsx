
import React, { useState } from 'react';
import { AlertTriangle, Phone, Brain, Clock, Check } from 'lucide-react';
import { assessEmergencySymptoms } from '../services/aiService';

const EmergencyAssessment = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const symptoms = [
    'Difficulty breathing', 'Blood in urine', 'Seizure or convulsions', 'Unconscious or unresponsive',
    'Severe vomiting', 'Inability to urinate', 'Severe lethargy', 'High fever',
    'Severe pain or distress', 'Bleeding that won\'t stop', 'Pale or blue gums', 'Rapid breathing',
    'Not eating for 24+ hours', 'Diarrhea with blood', 'Swollen abdomen', 'Difficulty walking'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
    setAssessment(null);
  };

  const performAssessment = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setLoading(true);
    try {
      const result = await assessEmergencySymptoms(selectedSymptoms);
      setAssessment(result);
    } catch (error) {
      console.error('Assessment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-rose-500 text-white';
      case 'high': return 'bg-rose-100 text-rose-700 border-rose-300';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      default: return 'bg-stone-100 text-stone-700 border-stone-300';
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-rose-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <AlertTriangle size={32} className="text-rose-600" />
        </div>
        <h1 className="text-2xl font-bold text-stone-700 mb-2">Emergency Assessment</h1>
        <p className="text-stone-500">AI-powered symptom evaluation for your cat</p>
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Phone size={20} className="text-rose-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-rose-800 mb-1">Emergency Contact</h3>
            <p className="text-sm text-rose-700">
              If your cat is in immediate danger, call your emergency vet clinic right away.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-stone-700 mb-4">Select Symptoms</h3>
        <div className="grid grid-cols-1 gap-2">
          {symptoms.map((symptom, index) => (
            <button
              key={index}
              onClick={() => handleSymptomToggle(symptom)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                selectedSymptoms.includes(symptom)
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-white bg-white'
                    : 'border-stone-300'
                }`}>
                  {selectedSymptoms.includes(symptom) && (
                    <Check size={14} className="text-rose-500" />
                  )}
                </div>
                <span className="font-medium">{symptom}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedSymptoms.length > 0 && (
        <button
          onClick={performAssessment}
          disabled={loading}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Brain size={20} />
          {loading ? 'Analyzing Symptoms...' : 'Get AI Assessment'}
        </button>
      )}

      {assessment && (
        <div className="space-y-4">
          <div className={`rounded-xl p-4 border-2 ${getUrgencyColor(assessment.urgencyLevel)}`}>
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle size={24} />
              <div>
                <h4 className="font-bold text-lg">
                  {assessment.urgencyLevel === 'emergency' ? 'EMERGENCY' : 
                   assessment.urgencyLevel.charAt(0).toUpperCase() + assessment.urgencyLevel.slice(1)} Priority
                </h4>
                <p className="text-sm opacity-90">AI Assessment Result</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-stone-200">
            <h4 className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <Brain size={18} className="text-blue-500" />
              Recommendations
            </h4>
            <div className="space-y-2">
              {assessment.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-stone-600">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {assessment.shouldContactVet && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-amber-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">Veterinary Contact Recommended</h4>
                  <p className="text-sm text-amber-700">
                    Based on the symptoms selected, it's recommended to contact your veterinarian for professional evaluation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-medium text-blue-800 mb-2">💡 How AI Assessment Works:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Analyzes symptom combinations and severity</li>
          <li>• Cross-references with veterinary databases</li>
          <li>• Provides evidence-based recommendations</li>
          <li>• Cannot replace professional veterinary diagnosis</li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyAssessment;
