import React from 'react';

export default function FeatureCard({ title, description, icon, badge }) {
  return (
    <div className="glass-card glass-card-hover rounded-2xl p-8 flex flex-col items-start text-left relative overflow-hidden group">
      {/* Dynamic glow effect inside the card */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-bl-full -z-10 group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
      
      {/* Icon Container */}
      <div className="p-3.5 bg-brand-light/70 text-brand-primary rounded-xl mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-105 shadow-inner">
        {icon}
      </div>

      {/* Badge (if any) */}
      {badge && (
        <span className="absolute top-6 right-6 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          {badge}
        </span>
      )}

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors">
        {description}
      </p>

      {/* Learn more interactive link */}
      <div className="mt-6 flex items-center text-xs font-semibold text-brand-primary group-hover:text-brand-hover transition-colors cursor-pointer">
        <span>Learn More</span>
        <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
