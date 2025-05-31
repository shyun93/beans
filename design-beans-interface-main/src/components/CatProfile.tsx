import React, { useState } from 'react';
import { Calendar, FileText, Image, Edit3, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const CatProfile = () => {
  const [selectedCat, setSelectedCat] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const cats = [
    {
      name: 'Whiskers',
      breed: 'British Shorthair',
      age: '3 years',
      weight: '12 lbs',
      gender: 'Male (Neutered)',
      microchip: 'Yes'
    },
    {
      name: 'Luna',
      breed: 'Persian',
      age: '5 years',
      weight: '10 lbs',
      gender: 'Female (Spayed)',
      microchip: 'Yes'
    },
    {
      name: 'Milo',
      breed: 'Maine Coon',
      age: '2 years',
      weight: '15 lbs',
      gender: 'Male (Neutered)',
      microchip: 'No'
    }
  ];

  const currentCat = cats[selectedCat];

  return (
    <div className="p-4 space-y-6">
      {/* Cat Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedCat(selectedCat > 0 ? selectedCat - 1 : cats.length - 1)}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
        >
          <ChevronLeft size={20} className="text-blue-600" />
        </button>
        
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-800">Cat Profile</h2>
          <p className="text-sm text-slate-500">{selectedCat + 1} of {cats.length}</p>
        </div>
        
        <button
          onClick={() => setSelectedCat(selectedCat < cats.length - 1 ? selectedCat + 1 : 0)}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
        >
          <ChevronRight size={20} className="text-blue-600" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl hover:bg-blue-300 transition-colors cursor-pointer">
            🐱
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{currentCat.name}</h2>
          <p className="text-slate-600">{currentCat.breed}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Age</p>
            <p className="font-semibold text-slate-800">{currentCat.age}</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Weight</p>
            <p className="font-semibold text-slate-800">{currentCat.weight}</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Gender</p>
            <p className="font-semibold text-slate-800">{currentCat.gender}</p>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-500">Microchip</p>
            <p className="font-semibold text-slate-800">{currentCat.microchip}</p>
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-800">Medical Information</h3>
        
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={20} className="text-blue-600" />
            <h4 className="font-medium text-slate-800">Vaccinations</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-emerald-50 rounded-lg">
              <span className="text-slate-600">FVRCP</span>
              <span className="text-emerald-600 font-medium">Up to date</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-emerald-50 rounded-lg">
              <span className="text-slate-600">Rabies</span>
              <span className="text-emerald-600 font-medium">Up to date</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <FileText size={20} className="text-purple-600" />
            <h4 className="font-medium text-slate-800">Current Medications</h4>
          </div>
          <p className="text-slate-500 text-sm italic">No current medications</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <Image size={20} className="text-rose-600" />
            <h4 className="font-medium text-slate-800">Known Allergies</h4>
          </div>
          <p className="text-slate-500 text-sm italic">No known allergies</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <Edit3 size={20} />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
        
        <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2">
          <Plus size={20} />
          Add New Cat
        </button>
      </div>
    </div>
  );
};

export default CatProfile;
