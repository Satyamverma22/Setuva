import React, { useState, useEffect, useRef } from 'react';

const mockVideos = [
  {
    id: 1,
    title: '🌾 The Harvests of 1947: Crossing the Punjab',
    storytellerName: 'Harbhajan Singh',
    category: 'Partition-era stories',
    duration: '12:40',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Harbhajan Singh shares an emotional, first-hand account of crossing the border in 1947 as a young boy. He recalls the kindness of stranger communities, the dry bread shared in cargo wagons, and the resilient spirit of rebuilding his family farm in East Punjab.'
  },
  {
    id: 2,
    title: '🏺 Centering Clay: A Lifetime on the Stone Wheel',
    storytellerName: 'Sita Devi',
    category: 'Craftsmanship',
    duration: '08:15',
    thumbnail: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Master artisan Sita Devi details the tactile philosophy of centered river clay. She explains how the speed of a stone potter wheel mirrors the cycles of nature, and how clay pots keep summer drinking water naturally cold through micro-porous evaporation.'
  },
  {
    id: 3,
    title: '🚂 Early Steam Locomotives and Indian Railways',
    storytellerName: 'K. R. Subramanian',
    category: 'Career journeys',
    duration: '10:32',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Retired railway engineer Subramanian recounts the challenging days of steam boilers and coal tracks. He explains the rigorous mechanics of early locomotive models and the dedication required to maintain safe cross-country transportation in the mid-20th century.'
  },
  {
    id: 4,
    title: '🥣 Ragi Porridge and Traditional Summer Diets',
    storytellerName: 'Savitri Devi',
    category: 'Family traditions',
    duration: '07:50',
    thumbnail: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Grandmother Savitri Devi demonstrates the traditional methods of soaking, sprouting, and slow-cooking finger millets (ragi). She highlights how fermented porridge served as a natural probiotic breakfast that kept farmworkers energized through intense summers.'
  },
  {
    id: 5,
    title: '🌿 The Legend of Sanjeevani: Himalayan Folklore',
    storytellerName: 'Pandit Ram Prasad',
    category: 'Folklore',
    duration: '15:20',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'Pandit Ram Prasad narrates the mythical origins of medicinal herbs in the high valleys of Uttarakhand. He explains the oral traditions passed down through local shepherds and how traditional folklore acts as a catalog of native ecological wisdom.'
  },
  {
    id: 6,
    title: '🧵 Weaving the Warp: Khadi Handloom Physics',
    storytellerName: 'Vikas Devakar',
    category: 'Craftsmanship',
    duration: '09:45',
    thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Vikas details the mathematical calculations involved in setting up the warp yarns on a traditional wooden handloom. He explains the rhythmic coordinate patterns of foot treadles and shuttle throws that turn single raw threads into durable, breathable Khadi cloth.'
  }
];

const categories = [
  'Partition-era stories',
  'Career journeys',
  'Family traditions',
  'Folklore',
  'Craftsmanship'
];

export default function Legacy() {
  const [activeVideo, setActiveVideo] = useState(mockVideos[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const playerRef = useRef(null);

  // Filter videos based on search and category selections
  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.storytellerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectVideo = (video) => {
    setActiveVideo(video);
    // Auto-scroll to the top player section
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Auto-play the new video in the player
    if (playerRef.current) {
      playerRef.current.load();
      playerRef.current.play().catch(err => {
        console.log('Video autoplay prevented by browser permissions.', err);
      });
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        
        {/* Intro header */}
        <div className="text-left space-y-2 max-w-2xl">
          <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200/50 px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wide">
            Legacy Audio & Video Archives
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight pt-1">
            Storyteller Wisdom Archive
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Listen to the direct voices of elder generations sharing life journeys, local traditions, historical events, and craft secrets.
          </p>
        </div>

        {/* 1. Featured Video Player Section (Top) */}
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0 text-left">
          {/* Left Column: Player (7 cols) */}
          <div className="lg:col-span-7 bg-black aspect-video flex items-center justify-center relative">
            <video
              ref={playerRef}
              src={activeVideo.videoUrl}
              poster={activeVideo.thumbnail}
              controls
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Right Column: Description & Metadata (5 cols) */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200/40 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {activeVideo.category}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">⌛ {activeVideo.duration}</span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                {activeVideo.title}
              </h2>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                🗣️ Storyteller: {activeVideo.storytellerName}
              </p>
              <div className="h-px bg-slate-100"></div>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-normal">
                {activeVideo.description}
              </p>
            </div>
            <div className="text-[10px] text-slate-400 italic">
              * Seeded wisdom transcript verified by Setu.
            </div>
          </div>
        </div>

        {/* 2. Control Bar: Search & Category Filter Pills */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 text-left shadow-xs space-y-5">
          <div className="flex items-center bg-slate-50 border border-slate-200/50 rounded-2xl p-1.5 focus-within:bg-white focus-within:border-brand-primary/30 focus-within:ring-2 focus-within:ring-brand-light/50 transition-all duration-300">
            <span className="pl-3 text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search stories by keywords or storyteller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs focus:outline-none px-3 py-2 text-slate-800 placeholder-slate-400 font-medium"
            />
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-amber-600 text-white shadow-3xs'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              All Stories
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? 'All' : cat)}
                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-3xs'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Grid of Video Cards (Bottom) */}
        <div className="space-y-6 text-left">
          <h3 className="font-bold text-sm text-slate-800 pl-1">Wisdom Archives Playlist</h3>
          
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map(video => {
                const isPlaying = activeVideo.id === video.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className={`bg-white rounded-3xl border overflow-hidden flex flex-col hover:shadow-md hover:border-amber-200 transition-all duration-300 cursor-pointer group text-left shadow-2xs ${
                      isPlaying ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-100'
                    }`}
                  >
                    {/* Thumbnail view */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-50">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-60 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-xs transform group-hover:scale-110 transition-transform">
                          {isPlaying ? '⏸️' : '▶️'}
                        </div>
                      </div>
                      
                      {/* Duration Overlay */}
                      <span className="absolute bottom-2.5 right-2.5 bg-black/75 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider font-sans">
                        {video.duration}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-bold text-amber-700 bg-amber-50 border border-amber-200/40 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {video.category}
                          </span>
                          {isPlaying && (
                            <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest animate-pulse">
                              ● Playing
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2 pt-0.5">
                          {video.title}
                        </h4>
                        <p className="text-[10px] font-semibold text-slate-400">
                          Storyteller: {video.storytellerName}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-400 text-xs italic shadow-3xs">
              No storytelling archives match your criteria.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
