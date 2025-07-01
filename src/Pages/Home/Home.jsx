import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <section className="text-center py-20 mb-20">
          <h1 className="text-5xl md:text-7xl font-light mb-8 text-slate-800 tracking-tight">
            EventSphere
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Create, manage, and discover events with ease. 
            <br />
            Simple. Beautiful. Effortless.
          </p>
          <button className="px-12 py-4 bg-slate-800 text-white font-medium rounded-full hover:bg-slate-700 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Started
          </button>
        </section>

        {/* Features Section */}
        <section className="mb-24">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-slate-800">Create</h3>
              <p className="text-slate-600 leading-relaxed">
                Set up your events in minutes with our intuitive interface
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-slate-800">Manage</h3>
              <p className="text-slate-600 leading-relaxed">
                Keep track of all your events and updates in one place
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-slate-800">Discover</h3>
              <p className="text-slate-600 leading-relaxed">
                Find interesting events happening around you
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white rounded-3xl p-12 mb-24 shadow-sm border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-light mb-2 text-slate-800">50K+</div>
              <div className="text-slate-500 text-sm uppercase tracking-wider">Users</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2 text-slate-800">10K+</div>
              <div className="text-slate-500 text-sm uppercase tracking-wider">Events</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2 text-slate-800">120+</div>
              <div className="text-slate-500 text-sm uppercase tracking-wider">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2 text-slate-800">24/7</div>
              <div className="text-slate-500 text-sm uppercase tracking-wider">Support</div>
            </div>
          </div>
        </section>

        {/* Simple Testimonial */}
        <section className="text-center mb-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-light text-slate-700 mb-8 leading-relaxed italic">
              "EventSphere made organizing our community events incredibly simple and enjoyable."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 bg-slate-200 rounded-full mr-4"></div>
              <div className="text-left">
                <div className="font-medium text-slate-800">Sarah Johnson</div>
                <div className="text-slate-500 text-sm">Community Organizer</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-16 bg-slate-800 rounded-3xl text-white">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to begin?</h2>
          <p className="text-slate-300 mb-8 text-lg font-light max-w-2xl mx-auto">
            Join our community and start creating memorable events today
          </p>
          <button className="px-12 py-4 bg-white text-slate-800 font-medium rounded-full hover:bg-slate-100 transition-all duration-300 text-lg shadow-lg">
            Start Creating
          </button>
        </section>

      </div>
    </div>
  );
};

export default Home;