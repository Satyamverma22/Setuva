import React from 'react';

export default function TestimonialCard({ name, ageRole, testimonial, rating, initials, avatarBg }) {
  return (
    <div className="glass-card bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group h-full">
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 right-8 text-brand-light opacity-50 group-hover:opacity-100 group-hover:text-brand-primary/20 transition-all duration-300">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Star Rating */}
      <div className="flex items-center space-x-1.5 mb-6">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-brand-primary fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Quote */}
      <p className="text-slate-700 text-base md:text-lg italic leading-relaxed font-normal mb-8 relative z-10">
        "{testimonial}"
      </p>

      {/* Profile Bio */}
      <div className="flex items-center space-x-4 border-t border-slate-100 pt-6">
        {/* Styled Initial Avatar */}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-bold shadow-md select-none shrink-0 ${avatarBg}`}>
          {initials}
        </div>
        <div className="text-left">
          <h4 className="text-base font-bold text-slate-900 leading-tight">
            {name}
          </h4>
          <p className="text-xs text-slate-500 font-medium">
            {ageRole}
          </p>
        </div>
      </div>
    </div>
  );
}
