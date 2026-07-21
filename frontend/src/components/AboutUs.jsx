import React from 'react';

export default function AboutUs({ onSignUpClick }) {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">

      {/* 1. Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-amber-100/30 to-blue-100/30 rounded-full blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-6">
          <span className="inline-flex items-center space-x-1.5 bg-brand-light/60 border border-brand-primary/10 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-hover tracking-wide uppercase">
            <span>✨ Introducing Setu</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Bridging Generations, <br />
            <span className="text-brand-primary">Preserving Wisdom</span>
          </h1>
          <p className="text-base text-slate-550 leading-relaxed font-normal max-w-2xl mx-auto">
            Setu is a digital bridge built to unite the curiosity of youth with the deep, lived experiences of our elders. By passing down life stories, language dialects, and ancestral crafts, we keep the torch of human wisdom lit for generations to come.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-20">

        {/* 2. Why Setu Section */}
        <section className="text-left space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Why Setu?</h2>
            <p className="text-xs text-slate-400 max-w-xl font-normal">
              Addressing the widening cracks in our cultural fabric and local communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-3xs hover:shadow-xs transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-lg">💡</div>
              <h3 className="font-bold text-slate-800 text-sm">The Fading of Traditional Wisdom</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                For centuries, knowledge was passed down through stories and hands-on lessons. Today, agricultural techniques, natural herbal remedies, and traditional dialects are rapidly disappearing, replaced by generic, industrial alternatives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-3xs hover:shadow-xs transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg">❤️</div>
              <h3 className="font-bold text-slate-800 text-sm">Loneliness Among Our Elders</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                As families become more nuclear and move to cities, our seniors are often left isolated in villages and quiet neighborhoods. They hold a lifetime of insights and stories, yet have fewer opportunities to feel heard, valued, and integrated.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-3xs hover:shadow-xs transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-lg">🌐</div>
              <h3 className="font-bold text-slate-800 text-sm">The Widening Generational Gap</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Youth grow up in a hyper-digital, fast-paced world, while seniors navigate a slower rhythm. Without a common space to meet, the empathy and respect that naturally grow from personal storytelling are replaced by distance and misunderstandings.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-3xs hover:shadow-xs transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-lg">📚</div>
              <h3 className="font-bold text-slate-800 text-sm">Lost Cultural Heritage</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Local history is not just found in textbooks; it lives in the memories of those who lived through it. When an elder passes away without sharing their experience, an entire library of history, folklore, and local dialects goes out with them.
              </p>
            </div>
          </div>
        </section>

        {/* 3. How It Works Section */}
        <section className="text-left space-y-8 bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-3xs">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">How It Works</h2>
            <p className="text-xs text-slate-400 font-normal">
              A simple, secure path to connection and collaborative learning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="space-y-3">
              <div className="text-2xl font-black text-brand-primary/20">01</div>
              <h4 className="font-bold text-xs text-slate-800">Create Account</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                Register your profile and specify what you want to learn, or the traditional wisdom and skills you wish to share.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-2xl font-black text-brand-primary/20">02</div>
              <h4 className="font-bold text-xs text-slate-800">Connect Safely</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                Browse our community feed, send connection requests to stories you love, and form mutual mentorship agreements.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-2xl font-black text-brand-primary/20">03</div>
              <h4 className="font-bold text-xs text-slate-800">Share or Learn</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                Use our private messaging system to discuss crafts, record voice notes of dialects, or write joint learning journals.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-2xl font-black text-brand-primary/20">04</div>
              <h4 className="font-bold text-xs text-slate-800">Build Lasting Bonds</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                Forge lifelong friendships that ground the younger generation in history and give our elders an active, valued voice.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Core Values Section */}
        <section className="text-left space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Our Core Values</h2>
            <p className="text-xs text-slate-400 font-normal">
              The ethical compass that guides every interaction on Setu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-3">
              <span className="text-xl">🤝</span>
              <h4 className="font-bold text-xs text-slate-800">Respect</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                We approach our elders with deep respect for their lived histories, recognizing them as active custodians of wisdom.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-3">
              <span className="text-xl">💬</span>
              <h4 className="font-bold text-xs text-slate-800">Connection</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                We believe that mutual storytelling breaks down isolation, nurturing empathy, dialogue, and cross-generational friendships.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-3">
              <span className="text-xl">🔖</span>
              <h4 className="font-bold text-xs text-slate-800">Preservation</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                We actively capture traditional practices, dying dialects, and recipes, keeping heritage relevant in a digital age.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-3">
              <span className="text-xl">🏡</span>
              <h4 className="font-bold text-xs text-slate-800">Community</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
                We foster a safe, warm, and supportive village environment where knowledge is shared freely and every user finds belonging.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Impact/Stats Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-md">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-xl font-bold uppercase tracking-wider text-blue-100">Setu Impact Archive</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-3xl font-black">1,240+</p>
                <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Stories Shared</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black">860+</p>
                <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Mentorships Formed</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black">48+</p>
                <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Dialects Logged</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black">280+</p>
                <p className="text-[10px] text-blue-100 font-semibold uppercase tracking-wider">Crafts Preserved</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Team Section */}
        <section className="text-left space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Our Builders & Advisors</h2>
            <p className="text-xs text-slate-400 font-normal">
              The minds behind the bridge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-100 p-6 rounded-3xl flex items-center space-x-4 shadow-3xs text-left">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
                alt="Ananya Sharma"
                className="w-16 h-16 rounded-full object-cover border border-slate-100"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Ananya Sharma</h4>
                <p className="text-[10px] text-brand-primary font-semibold uppercase tracking-wider">Founder & Tech Director</p>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal pt-1">
                  Passionate about applying modern tech to solve social isolation and catalog oral heritage histories.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-3xl flex items-center space-x-4 shadow-3xs text-left">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
                alt="Dr. Ramesh Prasad"
                className="w-16 h-16 rounded-full object-cover border border-slate-100"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Dr. Ramesh Prasad</h4>
                <p className="text-[10px] text-brand-primary font-semibold uppercase tracking-wider">Elder Advisor & Historian</p>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal pt-1">
                  Guiding historical authenticity, community relations, and standardizing dialect recordings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Closing Call-To-Action (CTA) */}
        <section className="bg-white border border-slate-150 rounded-3xl p-8 md:p-12 text-center shadow-xs space-y-6">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900">Be a Part of the Story</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Whether you hold a lifetime of wisdom to share or have a deep curiosity to learn and preserve the past, your voice has a home here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
            <button
              onClick={onSignUpClick}
              className="w-full sm:w-auto px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
            >
              Join as Mentor (Elder)
            </button>
            <button
              onClick={onSignUpClick}
              className="w-full sm:w-auto px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center shadow-md shadow-brand-primary/10"
            >
              Join as Mentee (Youth)
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
