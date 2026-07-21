import React from 'react';

export default function StepCard({ number, title, description, icon }) {
  return (
    <div className="relative flex flex-col items-center md:items-start text-center md:text-left bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group z-10 w-full">
      {/* Number Badge */}
      <div className="absolute -top-5 left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0 w-10 h-10 rounded-full bg-brand-primary text-white font-bold flex items-center justify-center text-sm shadow-md group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>

      {/* Embedded Icon Container */}
      <div className="mt-2 mb-6 p-3 bg-blue-50 text-sky-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>

      {/* Content */}
      <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand-primary transition-colors">
        {title}
      </h4>
      <p className="text-slate-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
