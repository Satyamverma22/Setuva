import React, { useState, useRef } from 'react';

const mockSchemes = [
  {
    id: 1,
    title: '👵 Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    category: 'Pension',
    duration: '05:40',
    thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'IGNOAPS provides monthly pension to senior citizens belonging to below poverty line (BPL) households. Learn about eligibility limits, documentation requirements, and how to verify BPL details online.',
    eligibility: [
      'Must be 60 years of age or older.',
      'Must belong to a household living Below Poverty Line (BPL).',
      'Requires identity proof, age certificate, and BPL card.'
    ],
    applyUrl: 'https://nsap.nic.in/'
  },
  {
    id: 2,
    title: '🏥 Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    category: 'Healthcare',
    duration: '07:15',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: "Ayushman Bharat PM-JAY is the world's largest health assurance scheme, offering free hospitalization cover up to ₹5 Lakh per year for eligible families. This video outlines card activation steps for seniors.",
    eligibility: [
      'Families listed in the SECC 2011 social census database.',
      'Covers pre-existing diseases and post-hospitalization costs.',
      'No cap on family size or age of family members.'
    ],
    applyUrl: 'https://pmjay.gov.in/'
  },
  {
    id: 3,
    title: '📈 Senior Citizen Savings Scheme (SCSS)',
    category: 'Financial Assistance',
    duration: '06:12',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'SCSS offers a secure, high-yield investment option for senior citizens backed directly by the Government of India. Understand interest payouts, tax deduction benefits under 80C, and maturity conditions.',
    eligibility: [
      'Individuals aged 60 years or older.',
      'Retirees under VRS aged 55-60 (subject to specific timelines).',
      'Minimum deposit: ₹1,000; Maximum deposit: ₹30 Lakhs.'
    ],
    applyUrl: 'https://www.indiapost.gov.in/'
  },
  {
    id: 4,
    title: '🏠 Pradhan Mantri Awas Yojana (PMAY) - Senior Priority',
    category: 'Housing',
    duration: '08:30',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Under PMAY, special preferences are given to senior citizens and disabled persons in the allocation of ground-floor housing units. Learn about subsidy slabs and priority application portals.',
    eligibility: [
      'Economically Weaker Section (EWS) or Low Income Group (LIG) households.',
      'Family must not own a brick-and-mortar house in India.',
      'Senior members receive preferential ground floor allocations.'
    ],
    applyUrl: 'https://pmaymis.gov.in/'
  },
  {
    id: 5,
    title: '📄 Section 80D Health Insurance Tax Deductions',
    category: 'Tax Benefits',
    duration: '04:55',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'Under Section 80D, senior citizens get enhanced tax deductions on health insurance premiums and medical expenses. Learn how to claim deductions up to ₹50,000 for your annual filings.',
    eligibility: [
      'Senior citizens aged 60 years or older.',
      'Covers health insurance premium paid and preventive health checks.',
      'Max claim limit: ₹50,000 per financial year.'
    ],
    applyUrl: 'https://www.incometax.gov.in/'
  },
  {
    id: 6,
    title: '🚍 State Transport & Railway Concessions',
    category: 'Travel Concessions',
    duration: '05:20',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Various state transportation buses and railway concessions offer discounted fares to senior citizens. This tutorial outlines how to verify age details and book tickets at discounted concessional rates.',
    eligibility: [
      'Women aged 58+ and Men aged 60+.',
      'Requires state-issued Senior Citizen ID card or Aadhaar card.',
      'Discounts range from 30% to 50% on selected state routes.'
    ],
    applyUrl: 'https://www.irctc.co.in/'
  }
];

const categories = [
  'Pension',
  'Healthcare',
  'Housing',
  'Financial Assistance',
  'Tax Benefits',
  'Travel Concessions'
];

export default function GovernmentSchemes() {
  const [activeScheme, setActiveScheme] = useState(mockSchemes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLargeText, setIsLargeText] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');

  const playerRef = useRef(null);

  const filteredSchemes = mockSchemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectScheme = (scheme) => {
    setActiveScheme(scheme);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (playerRef.current) {
      playerRef.current.load();
      playerRef.current.play().catch(err => {
        console.log('Video autoplay prevented', err);
      });
    }
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (callbackName && callbackPhone) {
      setCallbackRequested(true);
      setTimeout(() => {
        setCallbackRequested(false);
        setCallbackName('');
        setCallbackPhone('');
      }, 5000);
    }
  };

  return (
    <div className={`pt-24 pb-16 min-h-screen bg-slate-50 text-slate-900 transition-all duration-200 ${isLargeText ? 'text-lg' : 'text-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        
        {/* Intro Header & Accessibility Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6 text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-block text-[10px] bg-blue-100 text-blue-800 border border-blue-200 px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wide">
              Official Welfare Resources
            </span>
            <h1 className={`font-black tracking-tight text-slate-950 pt-1 ${isLargeText ? 'text-4xl' : 'text-3xl'}`}>
              Government Schemes for Seniors
            </h1>
            <p className={`text-slate-500 leading-relaxed font-normal ${isLargeText ? 'text-sm' : 'text-xs'}`}>
              Watch easy explainer videos, check eligibility rules, and find direct links to apply for central and state pension, healthcare, and financial schemes.
            </p>
          </div>
          
          {/* FontSize Toggle */}
          <div className="flex items-center space-x-2 self-start md:self-auto bg-white border border-slate-250/70 p-1.5 rounded-2xl shadow-3xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase pl-2">Aa Text Size:</span>
            <button
              onClick={() => setIsLargeText(false)}
              className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                !isLargeText
                  ? 'bg-slate-900 text-white shadow-3xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setIsLargeText(true)}
              className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                isLargeText
                  ? 'bg-slate-900 text-white shadow-3xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Large (Elderly-Friendly)
            </button>
          </div>
        </div>

        {/* 1. Featured Video Explainer (Top) */}
        <div className="bg-white border-2 border-slate-200/60 rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0 text-left">
          {/* Player (7 cols) */}
          <div className="lg:col-span-7 bg-black aspect-video flex items-center justify-center relative">
            <video
              ref={playerRef}
              src={activeScheme.videoUrl}
              poster={activeScheme.thumbnail}
              controls
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Metadata Card (5 cols) */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-blue-800 bg-blue-50 border border-blue-200/40 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {activeScheme.category}
                </span>
                <span className="text-[10px] text-slate-500 font-bold">⌛ Duration: {activeScheme.duration}</span>
              </div>
              <h2 className={`font-black text-slate-950 leading-snug ${isLargeText ? 'text-xl' : 'text-lg'}`}>
                {activeScheme.title}
              </h2>
              <div className="h-px bg-slate-150"></div>
              <p className={`text-slate-600 leading-relaxed font-normal ${isLargeText ? 'text-sm' : 'text-xs'}`}>
                {activeScheme.description}
              </p>
            </div>
            
            {/* Eligibility Quick-view inside Top Player */}
            <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">📋 Eligibility Requirements:</h4>
              <ul className="list-disc pl-4 space-y-1">
                {activeScheme.eligibility.map((rule, idx) => (
                  <li key={idx} className={`text-slate-500 font-normal leading-normal ${isLargeText ? 'text-xs' : 'text-[11px]'}`}>
                    {rule}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <a
                  href={activeScheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Apply Here ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Controls: Search and Tabs */}
        <div className="bg-white border-2 border-slate-200/60 rounded-3xl p-6 text-left shadow-xs space-y-5">
          <div className="flex items-center bg-slate-50 border-2 border-slate-200 rounded-2xl p-2 focus-within:bg-white focus-within:border-blue-600/40 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-300">
            <span className="pl-3 text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search schemes by pension, health, saving keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none px-3 py-2 text-slate-900 placeholder-slate-450 font-semibold"
            />
          </div>

          <div className="h-px bg-slate-150"></div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer border ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-3xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200/70 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? 'All' : cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-3xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200/70 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Grid of Scheme Cards (Bottom) */}
        <div className="space-y-6 text-left">
          <h3 className="font-extrabold text-slate-800 pl-1 text-sm uppercase tracking-wider">Welfare Schemes Directory</h3>
          
          {filteredSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map(scheme => {
                const isPlaying = activeScheme.id === scheme.id;
                return (
                  <div
                    key={scheme.id}
                    className={`bg-white rounded-3xl border-2 overflow-hidden flex flex-col hover:shadow-md hover:border-blue-300 transition-all duration-300 shadow-2xs ${
                      isPlaying ? 'border-blue-600 ring-4 ring-blue-100' : 'border-slate-200/70'
                    }`}
                  >
                    {/* Thumbnail click plays video */}
                    <div
                      onClick={() => handleSelectScheme(scheme)}
                      className="relative aspect-video w-full overflow-hidden bg-slate-100 cursor-pointer group"
                    >
                      <img
                        src={scheme.thumbnail}
                        alt={scheme.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/35 opacity-70 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-sm transform group-hover:scale-110 transition-transform">
                          {isPlaying ? '⏸️' : '▶️'}
                        </div>
                      </div>
                      
                      {/* Duration Tag */}
                      <span className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-0.5 rounded text-[9px] font-bold text-white uppercase tracking-wider">
                        {scheme.duration}
                      </span>
                    </div>

                    {/* Metadata & Eligibility Text Summary below thumbnail */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-extrabold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wider">
                            {scheme.category}
                          </span>
                          {isPlaying && (
                            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider animate-pulse">
                              ● Playing
                            </span>
                          )}
                        </div>
                        <h4
                          onClick={() => handleSelectScheme(scheme)}
                          className="font-extrabold text-slate-950 hover:text-blue-700 transition-colors leading-snug cursor-pointer line-clamp-2 text-xs"
                        >
                          {scheme.title}
                        </h4>
                        
                        {/* Explainer / Eligibility text summary */}
                        <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl mt-2 text-left space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Eligibility Criteria:</span>
                          <ul className="list-disc pl-3.5 space-y-0.5 text-slate-550 leading-relaxed text-[10px] font-normal">
                            {scheme.eligibility.slice(0, 2).map((item, id) => (
                              <li key={id}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Direct Portal Link */}
                      <div className="pt-2">
                        <a
                          href={scheme.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold px-4 py-2.5 rounded-xl border border-slate-950 transition-all shadow-3xs cursor-pointer"
                        >
                          Apply Here ↗
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-12 text-center text-slate-500 text-xs italic shadow-3xs">
              No government schemes match your criteria.
            </div>
          )}
        </div>

        {/* 4. Support Helpline Box Section */}
        <section className="bg-white border-2 border-slate-250 p-8 md:p-10 rounded-3xl text-left shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Helpline details (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] bg-red-150 text-red-800 border border-red-200 px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                Need Help Applying?
              </span>
              <h3 className="font-extrabold text-slate-950 text-base">Setu Senior Assistance Desk</h3>
              <p className="text-xs text-slate-550 leading-relaxed font-normal">
                Struggling with online portals or documentation? Our youth volunteers are ready to assist you. You can call our toll-free helpline or request an call-back below, and a volunteer will contact you to guide you through the official forms.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="border border-slate-150 p-3 rounded-2xl flex items-center space-x-3 bg-slate-50">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Toll-Free Helpline</p>
                    <p className="text-xs font-extrabold text-slate-900">1800-258-7388</p>
                  </div>
                </div>
                
                <div className="border border-slate-150 p-3 rounded-2xl flex items-center space-x-3 bg-slate-50">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Assistance Email</p>
                    <p className="text-xs font-extrabold text-slate-900">help@setu-welfare.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Request callback form (5 cols) */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Request Callback Support</h4>
              {callbackRequested ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center text-xs font-semibold space-y-1">
                  <p>✔ Callback Request Logged!</p>
                  <p className="text-[10px] text-emerald-600 font-normal">A volunteer will call you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-750 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Request Callback Support
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
