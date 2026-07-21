import React from 'react';

export default function Stats() {
  const statsData = [
    {
      value: '10,000+',
      label: 'Stories Shared',
      description: 'Preserved in the digital archive',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      value: '5,000+',
      label: 'Active Users',
      description: 'Bridging generational gaps daily',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      value: '300+',
      label: 'Local Communities',
      description: 'Active across towns and regions',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      value: '25+',
      label: 'Languages & Dialects',
      description: 'Ensuring absolute preservation',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-.004 1.205-.146 2.404-.428 3.58M9 9a14.77 14.77 0 012.751-3.58m0 0L14.75 8" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative overflow-hidden shadow-2xl">
      {/* Decorative backdrop patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
      <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y-0 divide-x-0 sm:divide-x sm:divide-white/10">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-4 transition-transform duration-300 hover:scale-105"
            >
              {/* Metric Icon */}
              <div className="p-2.5 bg-white/10 rounded-full mb-4 text-brand-primary shadow-inner">
                {stat.icon}
              </div>

              {/* Number */}
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-white">
                {stat.value}
              </span>

              {/* Title */}
              <span className="text-base font-bold text-white/90 mb-1">
                {stat.label}
              </span>

              {/* Mini description */}
              <span className="text-xs text-white/70">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
