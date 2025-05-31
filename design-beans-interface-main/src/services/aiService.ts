
export interface UrineAnalysisResult {
  parameters: {
    name: string;
    value: string;
    status: 'normal' | 'abnormal' | 'borderline';
    confidence: number;
    recommendations?: string[];
  }[];
  overallHealth: 'excellent' | 'good' | 'concerning' | 'urgent';
  aiInsights: string;
  recommendations: string[];
}

export interface HealthTrendAnalysis {
  trend: 'improving' | 'stable' | 'declining';
  riskFactors: string[];
  recommendations: string[];
  urgencyLevel: 'low' | 'medium' | 'high';
}

// Simulate AI analysis of urine test strip
export const analyzeUrineTestStrip = async (imageData: string): Promise<UrineAnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock AI analysis result
  return {
    parameters: [
      { name: 'Protein', value: 'Trace', status: 'borderline', confidence: 0.89, recommendations: ['Monitor closely', 'Retest in 1 week'] },
      { name: 'Glucose', value: 'Negative', status: 'normal', confidence: 0.95 },
      { name: 'Ketones', value: 'Negative', status: 'normal', confidence: 0.92 },
      { name: 'Specific Gravity', value: '1.035', status: 'normal', confidence: 0.88 },
      { name: 'pH', value: '6.8', status: 'normal', confidence: 0.91 },
      { name: 'Blood', value: 'Negative', status: 'normal', confidence: 0.94 },
      { name: 'Leukocytes', value: 'Negative', status: 'normal', confidence: 0.87 }
    ],
    overallHealth: 'good',
    aiInsights: 'The urine test shows mostly normal parameters with a trace amount of protein detected. This could indicate early kidney stress or may be temporary due to diet or exercise. The specific gravity suggests good hydration levels.',
    recommendations: [
      'Monitor protein levels weekly',
      'Ensure adequate fresh water access',
      'Consider kidney-supporting diet',
      'Schedule follow-up with vet if protein persists'
    ]
  };
};

// Simulate health trend analysis
export const analyzeHealthTrends = async (catId: string): Promise<HealthTrendAnalysis> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    trend: 'stable',
    riskFactors: ['Age-related kidney decline', 'Indoor lifestyle'],
    recommendations: [
      'Increase water intake encouragement',
      'Regular exercise sessions',
      'Senior cat health monitoring'
    ],
    urgencyLevel: 'low'
  };
};

// Simulate emergency assessment
export const assessEmergencySymptoms = async (symptoms: string[]): Promise<{
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  recommendations: string[];
  shouldContactVet: boolean;
}> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const highRiskSymptoms = ['difficulty breathing', 'blood in urine', 'seizure', 'unconscious'];
  const hasHighRisk = symptoms.some(symptom => 
    highRiskSymptoms.some(risk => symptom.toLowerCase().includes(risk))
  );
  
  if (hasHighRisk) {
    return {
      urgencyLevel: 'emergency',
      recommendations: ['Seek immediate veterinary care', 'Do not wait', 'Contact emergency vet clinic'],
      shouldContactVet: true
    };
  }
  
  return {
    urgencyLevel: 'medium',
    recommendations: ['Monitor symptoms closely', 'Schedule vet appointment within 24-48 hours'],
    shouldContactVet: true
  };
};
