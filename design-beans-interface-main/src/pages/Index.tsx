
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import CatProfile from '@/components/CatProfile';
import HealthTracking from '@/components/HealthTracking';
import HealthHistory from '@/components/HealthHistory';
import UrineAnalysis from '@/components/UrineAnalysis';
import VetConnect from '@/components/VetConnect';
import Emergency from '@/components/Emergency';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'profile':
        return <CatProfile />;
      case 'health':
        return <HealthTracking />;
      case 'history':
        return <HealthHistory />;
      case 'urine':
        return <UrineAnalysis />;
      case 'vet':
        return <VetConnect />;
      case 'emergency':
        return <Emergency />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl">
        <Header />
        <main className="pb-20">
          {renderContent()}
        </main>
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;
