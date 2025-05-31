import React, { useState } from 'react';
import { Camera, FileText, Plus, Scan, ChevronLeft, ChevronRight, Edit3, Brain, AlertTriangle } from 'lucide-react';
import ImageCapture from './ImageCapture';
import { analyzeUrineTestStrip, UrineAnalysisResult } from '../services/aiService';

const UrineAnalysis = () => {
  const [analysisMethod, setAnalysisMethod] = useState('camera');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCat, setSelectedCat] = useState(0);
  const [editingParameters, setEditingParameters] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<UrineAnalysisResult | null>(null);
  
  const [parameters, setParameters] = useState([
    { name: 'Protein', value: 'Negative', status: 'normal', range: 'Negative - trace', enabled: true },
    { name: 'Glucose', value: 'Negative', status: 'normal', range: 'Negative', enabled: true },
    { name: 'Ketones', value: 'Negative', status: 'normal', range: 'Negative', enabled: true },
    { name: 'Specific Gravity', value: '1.025', status: 'normal', range: '1.015-1.050', enabled: true },
    { name: 'pH', value: '6.5', status: 'normal', range: '6.0-7.5', enabled: true },
    { name: 'Blood', value: 'Negative', status: 'normal', range: 'Negative', enabled: true },
    { name: 'Leukocytes', value: 'Negative', status: 'normal', range: 'Negative', enabled: true },
    { name: 'Nitrites', value: 'Negative', status: 'normal', range: 'Negative', enabled: true },
  ]);
  
  const cats = [
    { name: 'Whiskers', color: 'amber' },
    { name: 'Luna', color: 'rose' },
    { name: 'Milo', color: 'emerald' }
  ];

  const handleImageCapture = async (imageData: string) => {
    setShowCamera(false);
    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzeUrineTestStrip(imageData);
      setAiAnalysis(analysis);
      
      // Update parameters with AI results
      setParameters(prev => prev.map(param => {
        const aiParam = analysis.parameters.find(p => p.name === param.name);
        return aiParam ? { ...param, value: aiParam.value, status: aiParam.status } : param;
      }));
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-emerald-700 bg-emerald-100';
      case 'abnormal': return 'text-rose-700 bg-rose-100';
      case 'borderline': return 'text-amber-700 bg-amber-100';
      default: return 'text-stone-700 bg-stone-100';
    }
  };

  const getHealthScoreColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-emerald-600';
      case 'good': return 'text-blue-600';
      case 'concerning': return 'text-amber-600';
      case 'urgent': return 'text-rose-600';
      default: return 'text-stone-600';
    }
  };

  const handleStartCamera = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  const toggleParameter = (index: number) => {
    setParameters(prev => prev.map((param, i) => 
      i === index ? { ...param, enabled: !param.enabled } : param
    ));
  };

  const updateParameterValue = (index: number, value: string) => {
    setParameters(prev => prev.map((param, i) => 
      i === index ? { ...param, value } : param
    ));
  };

  const currentCat = cats[selectedCat];
  const enabledParameters = parameters.filter(param => param.enabled);

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
            <h2 className="text-xl font-bold text-stone-700">{currentCat.name}'s Urine Test</h2>
            <p className="text-stone-500 text-sm">AI-Powered Health Analysis</p>
          </div>
          
          <button
            onClick={() => setSelectedCat(selectedCat < cats.length - 1 ? selectedCat + 1 : 0)}
            className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"
          >
            <ChevronRight size={20} className="text-stone-600" />
          </button>
        </div>
      </div>

      {/* AI Analysis Results */}
      {aiAnalysis && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={20} className="text-blue-600" />
            <h3 className="font-semibold text-stone-700">AI Analysis Results</h3>
          </div>
          
          {/* Overall Health Score */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-stone-700">Overall Health Assessment</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthScoreColor(aiAnalysis.overallHealth)} bg-white`}>
                {aiAnalysis.overallHealth.charAt(0).toUpperCase() + aiAnalysis.overallHealth.slice(1)}
              </span>
            </div>
            <p className="text-sm text-stone-600 mb-3">{aiAnalysis.aiInsights}</p>
            
            <div className="space-y-2">
              <h5 className="font-medium text-stone-700 text-sm">AI Recommendations:</h5>
              {aiAnalysis.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-stone-600">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Method Selection */}
      <div className="space-y-3">
        <h3 className="font-semibold text-stone-700">Analysis Method</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setAnalysisMethod('camera')}
            className={`p-4 rounded-xl border transition-all duration-200 hover:scale-105 ${
              analysisMethod === 'camera'
                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Camera size={24} className="mx-auto mb-2" />
            <p className="font-medium">AI Scan Strip</p>
            <p className="text-xs opacity-75">Computer vision analysis</p>
          </button>
          
          <button
            onClick={() => setAnalysisMethod('manual')}
            className={`p-4 rounded-xl border transition-all duration-200 hover:scale-105 ${
              analysisMethod === 'manual'
                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <FileText size={24} className="mx-auto mb-2" />
            <p className="font-medium">Manual Entry</p>
            <p className="text-xs opacity-75">Enter values manually</p>
          </button>
        </div>
      </div>

      {/* Parameter Configuration */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-stone-700">Test Parameters</h3>
          <button
            onClick={() => setEditingParameters(!editingParameters)}
            className="flex items-center gap-2 px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-stone-600"
          >
            <Edit3 size={16} />
            <span className="text-sm font-medium">
              {editingParameters ? 'Done' : 'Edit'}
            </span>
          </button>
        </div>

        {editingParameters && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-medium text-amber-800 mb-3">Select Parameters for Your Strip</h4>
            <div className="grid grid-cols-1 gap-2">
              {parameters.map((param, index) => (
                <label key={index} className="flex items-center gap-3 p-2 hover:bg-amber-100 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={param.enabled}
                    onChange={() => toggleParameter(index)}
                    className="w-4 h-4 text-amber-500 border-amber-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm font-medium text-amber-700">{param.name}</span>
                  <span className="text-xs text-amber-600 ml-auto">{param.range}</span>
                </label>
              ))}
            </div>
            <p className="text-sm text-amber-600 mt-3">
              💡 Select only the parameters available on your urine test strip
            </p>
          </div>
        )}
      </div>

      {/* Camera Capture Section */}
      {analysisMethod === 'camera' && (
        <div className="space-y-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <div className="text-center">
              {isAnalyzing ? (
                <>
                  <Brain size={48} className="mx-auto mb-3 text-blue-600 animate-pulse" />
                  <h4 className="font-semibold text-stone-700 mb-2">AI Analyzing Strip...</h4>
                  <div className="w-full bg-stone-200 rounded-full h-2 mb-4">
                    <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                  </div>
                  <p className="text-sm text-stone-500">Using computer vision to detect parameters...</p>
                </>
              ) : (
                <>
                  <Camera size={48} className="mx-auto mb-3 text-stone-600" />
                  <h4 className="font-semibold text-stone-700 mb-2">AI-Powered Strip Analysis</h4>
                  <p className="text-sm text-stone-500 mb-4">
                    Use your camera to automatically analyze the urine test strip with AI
                  </p>
                </>
              )}
              <button 
                onClick={() => setShowCamera(true)}
                disabled={isAnalyzing}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'Analyzing...' : 'Start AI Analysis'}
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-medium text-blue-800 mb-2">🤖 AI Analysis Features:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Automatic parameter detection</li>
              <li>• Confidence scoring for each reading</li>
              <li>• Health trend analysis</li>
              <li>• Personalized recommendations</li>
            </ul>
          </div>
        </div>
      )}

      {/* Manual Entry Section */}
      {analysisMethod === 'manual' && (
        <div className="space-y-4">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <h4 className="font-semibold text-stone-700 mb-4">Enter Parameter Values</h4>
            <div className="space-y-3">
              {enabledParameters.map((param, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-stone-200">
                  <div>
                    <p className="font-medium text-stone-700">{param.name}</p>
                    <p className="text-xs text-stone-500">Range: {param.range}</p>
                  </div>
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => {
                      const newParams = [...parameters];
                      const paramIndex = parameters.indexOf(param);
                      newParams[paramIndex] = { ...param, value: e.target.value };
                      setParameters(newParams);
                    }}
                    className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Enter value"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Latest Results with AI insights */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-stone-700">Test Results</h3>
          <span className="text-sm text-stone-500">
            {aiAnalysis ? 'AI Analyzed' : 'Manual Entry'} • 2 hours ago
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {enabledParameters.map((param, index) => {
            const aiParam = aiAnalysis?.parameters.find(p => p.name === param.name);
            return (
              <div key={index} className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-700">{param.name}</h4>
                    <p className="text-sm text-stone-500">Range: {param.range}</p>
                    {aiParam?.recommendations && (
                      <div className="mt-2 text-xs text-amber-600">
                        💡 {aiParam.recommendations.join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-stone-700">{param.value}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(param.status)}`}>
                      {param.status}
                    </span>
                    {aiParam?.confidence && (
                      <p className="text-xs text-stone-400 mt-1">
                        {Math.round(aiParam.confidence * 100)}% confidence
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Test Button */}
      <button 
        onClick={() => setShowCamera(true)}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
      >
        <Brain size={20} />
        Start AI Analysis
      </button>

      {/* Camera Component */}
      {showCamera && (
        <ImageCapture
          onImageCapture={handleImageCapture}
          onClose={() => setShowCamera(false)}
          isAnalyzing={isAnalyzing}
        />
      )}
    </div>
  );
};

export default UrineAnalysis;
