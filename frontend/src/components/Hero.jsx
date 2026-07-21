import React from 'react';
import heroImage from '../assets/hero.png';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-orange-100/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-brand-light/35 to-blue-50/40 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Heading, description, and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-brand-light/60 border border-brand-primary/10 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-hover tracking-wide uppercase">
            <span>✨ Introducing Setu</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping"></span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Bridging Generations, <br />
            <span className="bg-gradient-to-r from-brand-primary via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Preserving Wisdom.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
            Setu is a dedicated bridge connecting the vibrant youth of today with the rich experiences of older generations. Share life stories, pass on language dialects, collaborate on cultural traditions, and create lasting personal mentorships.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-brand-primary hover:bg-brand-hover text-white font-semibold rounded-full shadow-lg shadow-brand-primary/25 hover:shadow-brand-hover/40 text-center hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              Sign Up
            </button>
            <a
              href="#stories"
              className="px-8 py-4 bg-white border border-slate-200 hover:border-brand-primary/30 text-slate-705 hover:text-brand-primary font-semibold rounded-full text-center hover:scale-[1.02] transition-all duration-200 shadow-sm"
            >
              Explore Stories
            </a>
          </div>

          {/* Quick Stats/Trust badges */}
          <div className="pt-6 border-t border-slate-100 flex items-center space-x-8 text-slate-500 text-sm">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">EM</div>
              <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">YL</div>
              <div className="w-8 h-8 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">KR</div>
            </div>
            <div>
              <span className="font-semibold text-slate-800">100% Secure</span> & verified connections
            </div>
          </div>
        </div>

        {/* Right Column: Premium SVG Illustration Container */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[450px] aspect-square rounded-[32px] bg-gradient-to-tr from-blue-50 to-orange-50/50 p-6 shadow-xl border border-white/60 flex items-center justify-center overflow-hidden group">
            {/* Soft decorative background circles */}
            <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-brand-light blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-sky-100 blur-xl opacity-70"></div>

            {/* Embedded illustration */}
            <img
              src={heroImage}
              alt="Bridging Generations Illustration"
              className="w-full h-full object-contain max-w-[360px] relative z-10 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Premium details floating on card corners */}
            <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-500 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span>100+ Live Bridges</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
