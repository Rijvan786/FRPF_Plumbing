import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TechnicianProfile() {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <h1 className="text-lg font-black text-slate-900">My Profile</h1>
          
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${isAvailable ? 'text-green-600' : 'text-slate-400'}`}>
              {isAvailable ? 'Available' : 'Offline'}
            </span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative w-12 h-6 rounded-full transition-colors ${isAvailable ? 'bg-green-600' : 'bg-slate-300'}`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Profile Card */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-6">
            <img 
              src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&q=80" 
              alt="Profile" 
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Rizwan Manihar</h2>
                  <p className="text-slate-600">Senior Hardware Technician</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">VERIFIED</span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm font-bold text-slate-900">4.9</span>
                  <span className="text-sm text-slate-600">(214 reviews)</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">📍 MP Nagar, Bhopal • 6 Years Experience</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6 text-center">
            <p className="text-3xl font-black text-blue-600">1,248</p>
            <p className="text-sm text-slate-600 font-bold mt-1">Total Jobs</p>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6 text-center">
            <p className="text-3xl font-black text-blue-600">98%</p>
            <p className="text-sm text-slate-600 font-bold mt-1">Completion Rate</p>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-lg p-6 text-center">
            <p className="text-3xl font-black text-blue-600">₹42.8k</p>
            <p className="text-sm text-slate-600 font-bold mt-1">This Month</p>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6 mb-8">
          <h3 className="font-black text-slate-900 mb-6">Weekly Earnings</h3>
          <div className="flex items-end gap-2 h-32">
            {[3200, 5400, 2800, 6100, 4900, 3600, 7200].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-colors cursor-default"
                  style={{ height: `${(val / 7200) * 100}%` }}
                  title={`₹${val}`}
                />
                <span className="text-xs text-slate-600 font-bold">
                  {['M','T','W','T','F','S','S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="font-black text-slate-900 mb-4">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            {['Apple MacBook', 'Dell', 'HP', 'Motherboard Repair', 'Screen Replacement'].map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-bold rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
