import React from 'react';
import FeatureCard from './FeatureCard';

export default function Features() {
  const featuresList = [
    {
      title: 'Knowledge Sharing',
      description: 'Exchange generational skills, cooking recipes, traditional crafts, and historical perspectives in collaborative workspaces.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Voice & Story Archive',
      description: 'Save audio memories and life experiences in a secure, high-fidelity family archive, making family history searchable and perpetual.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      badge: 'Popular',
    },
    {
      title: 'Regional Culture Preservation',
      description: 'Document and celebrate localized folklore, regional festivals, art forms, and distinct cultural practices that shape identities.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'AI-powered Translation',
      description: 'Automatically transcribe regional audio dialects, translate across 25+ languages, and generate readable story summaries.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096L5 14m4 7L13.096 9H21M13.096 9L9 21M13.096 9l-4-4L5 9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 01-12.728 0m12.728 0A9 9 0 005.636 5.636" />
        </svg>
      ),
      badge: 'AI Built-In',
    },
    {
      title: 'Community Mentorship',
      description: 'Link young professionals and ambitious students with veteran experts for regular online coaching and career guidance.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: 'Video & Voice Calls',
      description: 'Enjoy clean, robust audio/video connections custom-optimized for high legibility, low latency, and elder-friendly UI controls.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="communities" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative gradient balls */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -z-10 -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-light/40 rounded-full blur-3xl -z-10 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold text-brand-primary uppercase tracking-widest">
            Features & Capabilities
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for genuine human connections.
          </h3>
          <p className="text-lg text-slate-600 font-normal">
            Every feature on Setu is thoughtfully crafted to make communication and knowledge sharing effortless, pleasant, and accessible for everyone.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              badge={feature.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
