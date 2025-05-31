import React from 'react';
import { Bell, Plus } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-stone-50 text-stone-700 p-4 rounded-b-3xl shadow-lg border-b border-stone-150">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl flex items-center justify-center relative border border-stone-200 shadow-sm">
              {/* Duolingo-style cat mascot */}
              <div className="relative">
                {/* Cat head - main circle */}
                <div className="w-8 h-8 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full relative border border-orange-400/30">
                  {/* Cat ears */}
                  <div className="absolute -top-2 left-1 w-3 h-3 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full transform rotate-45 border border-orange-400/30"></div>
                  <div className="absolute -top-2 right-1 w-3 h-3 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full transform rotate-45 border border-orange-400/30"></div>
                  
                  {/* Inner ears */}
                  <div className="absolute -top-1.5 left-1.5 w-1.5 h-1.5 bg-pink-200 rounded-full transform rotate-45"></div>
                  <div className="absolute -top-1.5 right-1.5 w-1.5 h-1.5 bg-pink-200 rounded-full transform rotate-45"></div>
                  
                  {/* Eyes - large and friendly */}
                  <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-stone-700 rounded-full"></div>
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-stone-700 rounded-full"></div>
                  
                  {/* Eye shine */}
                  <div className="absolute top-1.5 left-2 w-0.5 h-0.5 bg-white rounded-full"></div>
                  <div className="absolute top-1.5 right-2 w-0.5 h-0.5 bg-white rounded-full"></div>
                  
                  {/* Nose */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-pink-400 rounded-full"></div>
                  
                  {/* Mouth - happy expression */}
                  <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-1 border-b-2 border-stone-600 rounded-full"></div>
                  </div>
                  
                  {/* Whiskers */}
                  <div className="absolute top-2.5 -left-1 w-2 h-0.5 bg-stone-500 rounded-full transform -rotate-12"></div>
                  <div className="absolute top-3 -left-1 w-2 h-0.5 bg-stone-500 rounded-full transform rotate-12"></div>
                  <div className="absolute top-2.5 -right-1 w-2 h-0.5 bg-stone-500 rounded-full transform rotate-12"></div>
                  <div className="absolute top-3 -right-1 w-2 h-0.5 bg-stone-500 rounded-full transform -rotate-12"></div>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-700 to-stone-600 bg-clip-text text-transparent">Beans</h1>
          </div>
          <p className="text-stone-500 text-sm">Cat Health Companion</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-stone-100 rounded-2xl hover:bg-stone-200 transition-all duration-200 hover:scale-105 shadow-sm border border-stone-200">
            <Bell size={20} />
          </button>
          <button className="p-2 bg-stone-100 rounded-2xl hover:bg-stone-200 transition-all duration-200 hover:scale-105 shadow-sm border border-stone-200">
            <Plus size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
