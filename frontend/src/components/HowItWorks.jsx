import React from 'react';
import StepCard from './StepCard';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create Profile',
      description: 'Young adults list learning goals and heritage interests; elders define their areas of life expertise, stories, and skills.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Find Matched Partners',
      description: 'Our system suggests matches based on spoken dialects, cultural interests, skills, or shared hometown regions.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Connect & Communicate',
      description: 'Initiate interaction via safe audio messaging, digital letters, or elder-friendly video calls right inside the web platform.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Preserve Memories',
      description: 'transcribe, summarize, and store key moments and stories into your public or private archives to pass down generationally.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blurred background */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] bg-sky-50 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <h2 className="text-xs font-bold text-brand-primary uppercase tracking-widest">
            Onboarding Flow
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connecting is simple and meaningful.
          </h3>
          <p className="text-lg text-slate-600 font-normal">
            Whether you want to learn, mentor, or capture stories, our guided process ensures a warm, secure, and delightful experience.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[94px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200 -z-0"></div>

          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
