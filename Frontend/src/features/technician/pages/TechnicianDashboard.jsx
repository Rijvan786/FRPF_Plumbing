import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TechnicianDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900">Welcome, Rizwan!</h1>
                <p className="text-sm text-slate-600">Technician Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${isOnline ? 'text-green-600' : 'text-slate-400'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${isOnline ? 'bg-green-600' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isOnline ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
              
              <button onClick={() => navigate('/TechnicianNotification')} className="relative p-2 bg-slate-100 rounded-lg hover:bg-slate-200">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <button onClick={() => navigate('/Technician-Profile')} className="w-9 h-9 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80" alt="" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <p className="text-sm font-bold text-blue-600 mb-1">Today's Jobs</p>
            <p className="text-4xl font-black text-blue-600">4</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <p className="text-sm font-bold text-green-600 mb-1">Today's Earnings</p>
            <p className="text-4xl font-black text-green-600">₹1,200</p>
          </div>
        </div>

        {/* Current Assignment */}
        <section className="mb-8">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Current Assignment</h2>
          <div className="bg-white border-2 border-red-500 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Rahul Sharma</h3>
                <p className="text-slate-600 mt-1 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  A-12, Arera Colony, Bhopal
                  <span className="ml-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded">2.5 km</span>
                </p>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded">HIGH PRIORITY</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <p className="text-sm font-bold text-slate-900 mb-2">Dell Inspiron 15</p>
              <p className="text-sm text-slate-600">Issue: Screen flickering and battery draining fast</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                Accept & Start
              </button>
              <button className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 rounded-lg transition-colors">
                View Location
              </button>
            </div>
          </div>
        </section>

        {/* Upcoming Jobs */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Upcoming Queue</h2>
          <div className="space-y-3">
            {[
              { name: 'Amit Kumar', model: 'HP Pavilion', issue: 'Keyboard not working' },
              { name: 'Priya Singh', model: 'MacBook Air', issue: 'OS Installation' },
            ].map((job, i) => (
              <div key={i} className="bg-white border-2 border-slate-200 rounded-lg p-5 hover:border-blue-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                      {job.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{job.name}</p>
                      <p className="text-sm text-slate-600">{job.model} • {job.issue}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
