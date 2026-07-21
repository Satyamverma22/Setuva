import React from 'react';
import TestimonialCard from './TestimonialCard';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Aarav Sharma',
      ageRole: '22, Engineering Student & Cultural Enthusiast',
      testimonial: "Setu has connected me with Mr. Gokhale, a retired mechanical engineer. His mentorship goes far beyond simple math; I've learned about our city's mechanical history and regional values that textbooks simply can't offer.",
      rating: 5,
      initials: 'AS',
      avatarBg: 'bg-gradient-to-tr from-sky-400 to-indigo-500',
    },
    {
      name: 'Devendra Gokhale',
      ageRole: '74, Retired Rail Engineer & Local Historian',
      testimonial: "My children reside abroad, and this house was once very quiet. Teaching Aarav about classical mechanics and local heritage has given me a new sense of purpose. I feel like I'm leaving a legacy behind.",
      rating: 5,
      initials: 'DG',
      avatarBg: 'bg-gradient-to-tr from-amber-400 to-rose-500',
    },
  ];

  return (
    <section id="stories" className="py-24 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Decorative blurred background drops */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-light/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold text-brand-primary uppercase tracking-widest">
            Stories & Impact
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hear from our community members.
          </h3>
          <p className="text-lg text-slate-600 font-normal">
            Real stories of wisdom exchanged, skills discovered, and lifelong friendships built across generations.
          </p>
        </div>

        {/* Testimonial Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {testimonials.map((test, index) => (
            <div key={index} className="flex flex-col">
              <TestimonialCard
                name={test.name}
                ageRole={test.ageRole}
                testimonial={test.testimonial}
                rating={test.rating}
                initials={test.initials}
                avatarBg={test.avatarBg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
