import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Hero Section */}
        <section className="text-center py-12 sm:py-20 mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light mb-6 sm:mb-8 text-slate-800 tracking-tight">
            EventSphere
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed">
            Create, manage, and discover events with ease. <br />
            Simple. Beautiful. Effortless.
          </p>
          <Link to ="/events" ><button className="px-8 sm:px-12 py-3 sm:py-4 bg-slate-800 text-white font-medium rounded-full hover:bg-slate-700 transition duration-300 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Started
          </button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="mb-16 sm:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                title: 'Create',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                ),
                desc: 'Set up your events in minutes with our intuitive interface',
              },
              {
                title: 'Manage',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                ),
                desc: 'Keep track of all your events and updates in one place',
              },
              {
                title: 'Discover',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                ),
                desc: 'Find interesting events happening around you',
              },
            ].map(({ title, icon, desc }) => (
              <div
                key={title}
                className="text-center p-6 sm:p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition duration-300 border border-slate-100"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {icon}
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-3 text-slate-800">{title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 mb-16 sm:mb-24 shadow-sm border border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              ['50K+', 'Users'],
              ['10K+', 'Events'],
              ['120+', 'Cities'],
              ['24/7', 'Support'],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl sm:text-3xl font-light mb-1 sm:mb-2 text-slate-800">{value}</div>
                <div className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="text-center mb-16 sm:mb-24">
          <div className="max-w-2xl sm:max-w-3xl mx-auto px-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-700 mb-6 sm:mb-8 leading-relaxed italic">
              "EventSphere made organizing our community events incredibly simple and enjoyable."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              <div className="text-center sm:text-left">
                <div className="font-medium text-slate-800">Sarah Johnson</div>
                <div className="text-slate-500 text-sm">Community Organizer</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-12 sm:py-16 px-6 bg-slate-800 rounded-3xl text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-6">Ready to begin?</h2>
          <p className="text-slate-300 mb-6 sm:mb-8 text-base sm:text-lg font-light max-w-2xl mx-auto">
            Join our community and start creating memorable events today.
          </p>
          <button className="px-8 sm:px-12 py-3 sm:py-4 bg-white text-slate-800 font-medium rounded-full hover:bg-slate-100 transition duration-300 text-base sm:text-lg shadow-lg">
            Start Creating
          </button>
        </section>

      </div>
    </div>
  );
};

export default Home;
