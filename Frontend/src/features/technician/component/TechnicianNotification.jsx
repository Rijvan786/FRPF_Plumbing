import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TechnicianNotification() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'new-job',
      title: 'New Repair Request',
      customer: 'Aman Verma',
      laptop: 'Dell XPS 13',
      issue: 'Overheating & unexpected shutdown',
      location: 'Plot 45, MP Nagar Zone-II, Bhopal',
      distance: '1.8 km',
      time: '10 mins ago',
      urgent: true,
      unread: true
    },
    {
      id: 2,
      type: 'new-job',
      title: 'New Repair Request',
      customer: 'Rohit Malviya',
      laptop: 'HP Pavilion 14',
      issue: 'Keyboard keys not responding',
      location: 'House 12, Indrapuri Sector C, Bhopal',
      distance: '3.4 km',
      time: '45 mins ago',
      urgent: true,
      unread: true
    },
    {
      id: 3,
      type: 'new-job',
      title: 'New Repair Request',
      customer: 'Sneha Patel',
      laptop: 'Lenovo IdeaPad Slim 3',
      issue: 'Windows OS crash / boot loop',
      location: 'Flat 302, Arera Colony, Bhopal',
      distance: '2.1 km',
      time: '2 hours ago',
      urgent: false,
      unread: false
    }
  ];

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    if (filter === 'urgent') return n.urgent;
    return true;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className="border-b border-slate-200 sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/Technician-Dashboard')} className="p-2 hover:bg-slate-100 rounded-lg">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-black text-slate-900">Notifications</h1>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>

            <button onClick={() => navigate('/Technician-Profile')} className="w-9 h-9 bg-slate-100 rounded-full overflow-hidden">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80" alt="" className="w-full h-full object-cover" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: `Unread (${unreadCount})` },
              { id: 'urgent', label: 'Urgent' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                  filter === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="space-y-4">
          {filtered.map(notification => (
            <div
              key={notification.id}
              className={`bg-white border-2 rounded-lg overflow-hidden transition-colors ${
                notification.unread 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 flex items-center gap-2">
                        {notification.title}
                        {notification.urgent && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">URGENT</span>
                        )}
                      </h3>
                      <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  {notification.unread && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="p-5 bg-slate-50">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="text-xs text-slate-500 font-bold mb-1">CUSTOMER</p>
                    <p className="font-bold text-slate-900">{notification.customer}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="text-xs text-slate-500 font-bold mb-1">LAPTOP MODEL</p>
                    <p className="font-bold text-slate-900">{notification.laptop}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-slate-200 mb-4">
                  <p className="text-xs text-slate-500 font-bold mb-2">REPORTED ISSUE</p>
                  <p className="text-sm text-slate-700">{notification.issue}</p>
                  <div className="flex items-start gap-2 mt-3 pt-3 border-t border-slate-200 text-sm text-slate-600">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{notification.location}</span>
                    <span className="ml-auto px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded whitespace-nowrap">
                      {notification.distance}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/Technician-Dashboard')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Accept Job
                  </button>
                  <button className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 rounded-lg transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-lg border-2 border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="font-bold text-slate-900 mb-1">No notifications</p>
              <p className="text-sm text-slate-600">Check back later for new repair requests</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
