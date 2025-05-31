
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Heart, Calendar } from 'lucide-react';
import { analyzeHealthTrends, HealthTrendAnalysis } from '../services/aiService';

interface HealthInsightsProps {
  catId: string;
  catName: string;
}

const HealthInsights = ({ catId, catName }: HealthInsightsProps) => {
  const [insights, setInsights] = useState<HealthTrendAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const analysis = await analyzeHealthTrends(catId);
        setInsights(analysis);
      } catch (error) {
        console.error('Failed to load health insights:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, [catId]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="text-emerald-500" />;
      case 'stable': return <Heart className="text-blue-500" />;
      case 'declining': return <AlertTriangle className="text-rose-500" />;
      default: return <Brain className="text-stone-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'bg-emerald-50 border-emerald-200';
      case 'stable': return 'bg-blue-50 border-blue-200';
      case 'declining': return 'bg-rose-50 border-rose-200';
      default: return 'bg-stone-50 border-stone-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'text-emerald-600 bg-emerald-100';
      case 'medium': return 'text-amber-600 bg-amber-100';
      case 'high': return 'text-rose-600 bg-rose-100';
      default: return 'text-stone-600 bg-stone-100';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Brain size={24} className="text-blue-600 animate-pulse" />
          <h3 className="text-lg font-semibold text-stone-700">AI Health Insights</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-stone-200 rounded w-3/4"></div>
          <div className="h-4 bg-stone-200 rounded w-1/2"></div>
          <div className="h-4 bg-stone-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
        <div className="text-center text-stone-500">
          <Brain size={32} className="mx-auto mb-2 opacity-50" />
          <p>Unable to load health insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Brain size={24} className="text-blue-600" />
        <h3 className="text-lg font-semibold text-stone-700">AI Health Insights for {catName}</h3>
      </div>

      {/* Health Trend */}
      <div className={`rounded-xl p-4 border ${getTrendColor(insights.trend)} mb-6`}>
        <div className="flex items-center gap-3 mb-3">
          {getTrendIcon(insights.trend)}
          <div>
            <h4 className="font-semibold text-stone-700">Health Trend</h4>
            <p className="text-sm text-stone-600 capitalize">{insights.trend}</p>
          </div>
          <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(insights.urgencyLevel)}`}>
            {insights.urgencyLevel} priority
          </span>
        </div>
      </div>

      {/* Risk Factors */}
      {insights.riskFactors.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            Identified Risk Factors
          </h4>
          <div className="space-y-2">
            {insights.riskFactors.map((factor, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-amber-800">{factor}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="mb-6">
        <h4 className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
          <Brain size={18} className="text-blue-500" />
          AI Recommendations
        </h4>
        <div className="space-y-2">
          {insights.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-blue-800">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={18} className="text-purple-600" />
          <h4 className="font-semibold text-purple-800">Next Steps</h4>
        </div>
        <p className="text-sm text-purple-700">
          {insights.urgencyLevel === 'high' 
            ? 'Schedule a veterinary consultation within 24-48 hours to address identified concerns.'
            : insights.urgencyLevel === 'medium'
            ? 'Continue monitoring and consider scheduling a routine check-up within the next week.'
            : 'Maintain current care routine and schedule regular health monitoring.'}
        </p>
      </div>
    </div>
  );
};

export default HealthInsights;
