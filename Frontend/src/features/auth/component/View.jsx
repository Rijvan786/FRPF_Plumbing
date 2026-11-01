import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BRAND_DATA = {
  apple: {
    name: 'Apple MacBook',
    tagline: 'Premium repairs for premium machines',
    cover: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80',
    badge: 'Apple Authorized Parts',
    services: [
      { id: 1, name: 'Screen Replacement', price: 2499, original: 3200, time: '45 mins', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', popular: true },
      { id: 2, name: 'Battery Replacement', price: 1899, original: 2500, time: '30 mins', icon: 'M13 10V3L4 14h7v7l9-11h-7z', popular: false },
      { id: 3, name: 'OS Installation', price: 499, original: 800, time: '60 mins', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', popular: false },
      { id: 4, name: 'Keyboard Repair', price: 1299, original: 1800, time: '40 mins', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', popular: false },
      { id: 5, name: 'RAM Upgrade', price: 1599, original: 2000, time: '20 mins', icon: 'M13 10V3L4 14h7v7l9-11h-7z', popular: true },
      { id: 6, name: 'Motherboard Diagnosis', price: 699, original: 1000, time: '90 mins', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', popular: false },
    ]
  },
  dell: {
    name: 'Dell Laptop',
    tagline: 'Certified Dell service at your doorstep',
    cover: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&q=80',
    badge: 'Dell Certified Parts',
    services: [
      { id: 1, name: 'Screen Replacement', price: 2199, original: 2800, time: '45 mins', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', popular: true },
      { id: 2, name: 'Battery Replacement', price: 1499, original: 1900, time: '30 mins', icon: 'M13 10V3L4 14h7v7l9-11h-7z', popular: false },
      { id: 3, name: 'OS Installation', price: 399, original: 700, time: '60 mins', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', popular: false },
      { id: 4, name: 'Keyboard Repair', price: 1099, original: 1500, time: '40 mins', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', popular: true },
    ]
  },
  hp: {
    name: 'HP Laptop',
    tagline: 'Fast & reliable HP repairs',
    cover: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&q=80',
    badge: 'HP Genuine Parts',
    services: [
      { id: 1, name: 'Screen Replacement', price: 1999, original: 2600, time: '45 mins', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', popular: false },
      { id: 2, name: 'Battery Replacement', price: 1299, original: 1700, time: '30 mins', icon: 'M13 10V3L4 14h7v7l9-11h-7z', popular: true },
      { id: 3, name: 'OS Installation', price: 399, original: 700, time: '60 mins', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', popular: false },
    ]
  },
  lenovo: {
    name: 'Lenovo Laptop',
    tagline: 'Expert Lenovo service specialists',
    cover: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&q=80',
    badge: 'Lenovo Genuine Parts',
    services: [
      { id: 1, name: 'Screen Replacement', price: 2099, original: 2700, time: '45 mins', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', popular: true },
      { id: 2, name: 'Battery Replacement', price: 1399, original: 1800, time: '30 mins', icon: 'M13 10V3L4 14h7v7l9-11h-7z', popular: false },
      { id: 3, name: 'TrackPad Repair', price: 899, original: 1300, time: '35 mins', icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5', popular: true },
      { id: 4, name: 'OS Installation', price: 399, original: 700, time: '60 mins', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', popular: false },
    ]
  }
};

export default function View() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const brand = BRAND_DATA[brandId] || BRAND_DATA['apple'];

  const [selectedService, setSelectedService] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBook = (service) => {
    setSelectedService(service);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigate('/customer');
  };

  if (showConfirm && selectedService) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-2 border-slate-200 rounded-lg p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2 text-center">Booking Confirmed!</h2>
          <p className="text-slate-600 text-center mb-6">Your repair has been scheduled successfully</p>
          
          <div className="bg-slate-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Service:</span>
              <span className="font-bold text-slate-900">{selectedService.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Brand:</span>
              <span className="font-bold text-slate-900">{brand.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Time:</span>
              <span className="font-bold text-slate-900">{selectedService.time}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
              <span className="font-bold text-slate-900">Total:</span>
              <span className="font-black text-blue-600">₹{selectedService.price.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Brands
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-black text-slate-900">FixItNow</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-64 sm:h-80 bg-slate-900 overflow-hidden">
        <img src={brand.cover} alt={brand.name} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full bg-gradient-to-t from-slate-900 to-transparent p-6 sm:p-8">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded mb-3">
                {brand.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{brand.name}</h1>
              <p className="text-white/80">{brand.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-blue-600">4.9★</p>
              <p className="text-xs text-slate-600 font-bold mt-1">Avg Rating</p>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-600">2,418</p>
              <p className="text-xs text-slate-600 font-bold mt-1">Repairs Done</p>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-600">60 min</p>
              <p className="text-xs text-slate-600 font-bold mt-1">Avg Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8">Available Services</h2>
        
        <div className="grid gap-6">
          {brand.services.map(service => (
            <div
              key={service.id}
              className="bg-white border-2 border-slate-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-lg transition-all"
            >
              {service.popular && (
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-black rounded mb-4">
                  POPULAR
                </span>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-black text-slate-900 mb-2">{service.name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1 text-slate-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.time}
                    </span>
                    <span className="flex items-center gap-1 text-green-600 font-bold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      90-day warranty
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div>
                  <span className="text-2xl font-black text-slate-900">₹{service.price.toLocaleString()}</span>
                  <span className="text-sm text-slate-400 line-through ml-2">₹{service.original.toLocaleString()}</span>
                  <span className="ml-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                    {Math.round((1 - service.price / service.original) * 100)}% off
                  </span>
                </div>
                <button
                  onClick={() => handleBook(service)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-slate-50 border-2 border-slate-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-black text-slate-900 mb-2">Not sure what's wrong?</h3>
          <p className="text-slate-600 mb-6">Get a free diagnosis from our expert technicians</p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
            Free Diagnosis
          </button>
        </div>
      </main>
    </div>
  );
}
