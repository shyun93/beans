import React, { useState } from 'react';
import { Calendar, Clock, FileText, Plus, Phone, MapPin } from 'lucide-react';

const VetConnect = () => {
  const [showReschedule, setShowReschedule] = useState(false);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Vet Connect</h2>
        <p className="text-slate-600">Manage veterinary care for Whiskers</p>
      </div>

      {/* Primary Vet */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="font-semibold text-slate-800 mb-3">Primary Veterinarian</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText size={24} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-slate-800">Dr. Sarah Johnson</h4>
            <p className="text-sm text-slate-600">Happy Paws Veterinary Clinic</p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <Phone size={14} />
              (555) 123-4567
            </p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105">
            Call
          </button>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-800">Upcoming Appointments</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={20} className="text-blue-600" />
            <h4 className="font-medium text-slate-800">Annual Checkup</h4>
          </div>
          <p className="text-slate-700 mb-2 font-medium">December 15, 2024 at 2:00 PM</p>
          <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">
            <MapPin size={14} />
            Dr. Sarah Johnson • Happy Paws Veterinary Clinic
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowReschedule(!showReschedule)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105"
            >
              Reschedule
            </button>
            <button className="border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm transition-all duration-200">
              Cancel
            </button>
          </div>
          {showReschedule && (
            <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">Reschedule request will be sent to the clinic</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-800">Quick Actions</h3>
        
        <button className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:bg-slate-50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Calendar size={20} className="text-emerald-600" />
          </div>
          <div className="text-left flex-1">
            <p className="font-medium text-slate-800">Schedule Appointment</p>
            <p className="text-sm text-slate-500">Book next visit</p>
          </div>
        </button>
        
        <button className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:bg-slate-50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <FileText size={20} className="text-purple-600" />
          </div>
          <div className="text-left flex-1">
            <p className="font-medium text-slate-800">Share Health Records</p>
            <p className="text-sm text-slate-500">Send complete medical history</p>
          </div>
        </button>
        
        <button className="w-full bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:bg-slate-50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <Plus size={20} className="text-indigo-600" />
          </div>
          <div className="text-left flex-1">
            <p className="font-medium text-slate-800">Add New Vet</p>
            <p className="text-sm text-slate-500">Add specialist or backup vet</p>
          </div>
        </button>
      </div>

      {/* Medical Records */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-800">Recent Records</h3>
        
        <div className="space-y-2">
          <div className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-slate-800">Annual Vaccination</p>
                <p className="text-sm text-slate-500">FVRCP + Rabies</p>
              </div>
              <span className="text-xs text-slate-400">Nov 20, 2024</span>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-3 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-slate-800">Blood Work</p>
                <p className="text-sm text-emerald-600">All values normal</p>
              </div>
              <span className="text-xs text-slate-400">Nov 20, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetConnect;
