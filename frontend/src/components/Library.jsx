import React, { useState, useEffect, useCallback } from 'react';
import LibraryCard from './LibraryCard';
import { getCategoryVisual } from '../utils/categoryVisuals';
import { CATEGORIES as BACKEND_CATEGORIES, listKnowledge, normalizeEntry } from '../api/knowledge';

const categories = BACKEND_CATEGORIES;
const contentTypes = ['All', 'Article', 'Video', 'Audio', 'PDF'];

export default function Library({ onContribute }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedContentType, setSelectedContentType] = useState('All');
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [summaryArticle, setSummaryArticle] = useState(null);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceSearchText, setVoiceSearchText] = useState('');

  // Fetch from the backend whenever the search query or category changes.
  // Content-type filtering stays client-side since the backend doesn't
  // expose a content_type query param on /knowledge.
  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const results = await listKnowledge({
        category: selectedCategory,
        q: searchQuery,
        limit: 60,
      });
      const list = Array.isArray(results) ? results : results?.items || [];
      setItems(list.map(normalizeEntry));
    } catch (err) {
      setLoadError(err.message || 'Could not load the knowledge library. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    // Debounce search-driven refetches so we're not hitting the semantic
    // search endpoint on every keystroke.
    const handle = setTimeout(fetchEntries, searchQuery ? 400 : 0);
    return () => clearTimeout(handle);
  }, [fetchEntries, searchQuery]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedArticle]);

  const handleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bId => bId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const simulateVoiceSearch = () => {
    setIsListeningVoice(true);
    setVoiceSearchText('Listening...');
    setTimeout(() => {
      setVoiceSearchText('Searching your query...');
    }, 1000);
    setTimeout(() => {
      setIsListeningVoice(false);
      setVoiceSearchText('');
    }, 2000);
  };

  // Content-type filter applied on top of the already-fetched (search +
  // category filtered) results from the backend.
  const filteredItems = items.filter(item => {
    const matchesContentType = selectedContentType === 'All' || item.contentType === selectedContentType;
    return matchesContentType;
  });

  // Related knowledge: 3-4 similar entries from the currently loaded set.
  const getRelatedArticles = (currentArt) => {
    let related = items.filter(
      item => item.id !== currentArt.id && item.category === currentArt.category
    );
    if (related.length < 3) {
      const extra = items.filter(
        item => item.id !== currentArt.id && item.category !== currentArt.category
      );
      related = [...related, ...extra];
    }
    return related.slice(0, 3);
  };
  return (
    <div className="pt-24 pb-4 min-h-screen bg-white text-slate-800 transition-colors duration-300">
      
      {/* Voice Search Simulation Modal */}
      {isListeningVoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center text-slate-850">
          <div className="bg-white p-8 rounded-3xl flex flex-col items-center space-y-6 max-w-sm w-full mx-4 shadow-xl text-center border border-slate-100">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl shadow-md">
                🎙️
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-slate-800">Speak Wisdom Query</p>
              <p className="text-sm text-blue-600 font-semibold italic">"{voiceSearchText}"</p>
            </div>
            <button 
              onClick={() => setIsListeningVoice(false)}
              className="text-xs font-semibold px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* AI Summary Modal */}
      {summaryArticle && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl">✨</span>
                <h3 className="font-bold text-md">Setu AI Summary</h3>
              </div>
              <button 
                onClick={() => setSummaryArticle(null)}
                className="text-white hover:text-amber-100 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-left overflow-y-auto max-h-[75vh]">
              <div>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">
                  {summaryArticle.category}
                </span>
                <h4 className="text-md font-bold text-slate-800 mt-2">{summaryArticle.title}</h4>
              </div>
              <div className="h-px bg-slate-100"></div>
              
              <div className="space-y-3.5">
                <div>
                  <h5 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">🌿 Core Practice</h5>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{summaryArticle.traditionalMethod}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">🔬 Scientific Explanation</h5>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{summaryArticle.scientificExplanation}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">✓ Benefits</h5>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{summaryArticle.benefits}</p>
                </div>
                {summaryArticle.precautions && (
                  <div>
                    <h5 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">⚠️ Precaution</h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{summaryArticle.precautions}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSummaryArticle(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Content container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {!selectedArticle ? (
          <>
            {/* 1. Hero Section */}
            <div className="flex flex-col items-center text-center space-y-6 mb-12">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Knowledge Library
              </h1>
              <p className="text-slate-500 text-md md:text-lg max-w-2xl leading-relaxed font-normal">
                Discover traditional wisdom, verified information, and practical knowledge shared by experienced community members.
              </p>

              {/* Search Bar + Voice Search Button */}
              <div className="w-full max-w-xl flex items-center bg-slate-50 border border-slate-200/60 rounded-2xl p-1.5 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100/50 transition-all duration-300">
                <span className="pl-3 text-slate-400">🔍</span>
                <input
                  type="text"
                  placeholder="Ask Setu AI anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none px-3 py-2 text-slate-800 placeholder-slate-400 font-medium"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-slate-400 hover:text-slate-600 text-xs font-semibold mr-1 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={simulateVoiceSearch}
                  className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 text-xs font-bold rounded-xl border border-slate-200 transition-all flex items-center space-x-1 cursor-pointer"
                  title="Voice Search"
                >
                  <span>🎙️</span>
                  <span className="hidden sm:inline">Voice</span>
                </button>
              </div>
            </div>

            {/* 2. Categories chips display */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Filter by Category</span>
                {selectedCategory !== 'All' && (
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className="text-xs font-bold text-amber-500 hover:underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCategory === 'All'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                      : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(isActive ? 'All' : cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                          : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Search & Filter: Content Type */}
            <div className="mb-10 border-b border-slate-100 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Format:</span>
                  <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                    {contentTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedContentType(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          selectedContentType === type
                            ? 'bg-white text-slate-800 shadow-xs border border-slate-200/30'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Showing {filteredItems.length} entries
                </span>
              </div>
            </div>

            {/* 3. Knowledge Cards Grid */}
            {isLoading ? (
              <div className="py-20 text-center">
                <div className="w-10 h-10 mx-auto border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Loading knowledge…</p>
              </div>
            ) : loadError ? (
              <div className="py-16 text-center border-2 border-dashed border-rose-150 rounded-3xl bg-rose-50/40 mb-16">
                <span className="text-3xl">⚠️</span>
                <h4 className="text-md font-bold text-rose-700 mt-4">Couldn't load the library</h4>
                <p className="text-xs text-rose-500 max-w-sm mx-auto mt-2">{loadError}</p>
                <button
                  onClick={fetchEntries}
                  className="mt-5 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredItems.map((item) => (
                  <LibraryCard
                    key={item.id}
                    item={item}
                    onReadMore={setSelectedArticle}
                    onAiSummary={setSummaryArticle}
                    onBookmark={handleBookmark}
                    isBookmarked={bookmarks.includes(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center border-2 border-dashed border-slate-150 rounded-3xl bg-slate-50/50 mb-16">
                <span className="text-3xl">📚</span>
                <h4 className="text-md font-bold text-slate-700 mt-4">No matching records found</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2">
                  We couldn't find any traditional knowledge that matches your search filters. Try selecting a different category, clearing your search, or be the first to contribute here.
                </p>
                <div className="flex items-center justify-center gap-3 mt-5">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedContentType('All');
                    }}
                    className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                  {onContribute && (
                    <button
                      onClick={onContribute}
                      className="px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      + Share Knowledge
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          /* 4. Knowledge Bridge & Article Details View */
          <div className="max-w-4xl mx-auto py-4 text-left space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header / Nav */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="group inline-flex items-center space-x-2 py-2 px-4 border border-slate-200 hover:border-blue-200 rounded-full text-xs font-bold text-slate-600 hover:text-blue-600 bg-white shadow-xs transition-all cursor-pointer"
            >
              <span>←</span>
              <span>Back to Library</span>
            </button>

            {/* Article Top Banner (category placeholder — backend entries have no curated image) */}
            <div className={`relative aspect-video w-full rounded-3xl overflow-hidden border border-slate-100 shadow-xs bg-gradient-to-br ${getCategoryVisual(selectedArticle.category).gradient} flex items-center justify-center`}>
              <span className="text-7xl opacity-80">{getCategoryVisual(selectedArticle.category).emoji}</span>
              {/* Category Badge overlay */}
              <span className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 text-blue-600 shadow-md border border-slate-100">
                {selectedArticle.category}
              </span>
              {selectedArticle.trustScore > 0 && (
                <span className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/95 text-white shadow-md">
                  ✓ {Math.round(selectedArticle.trustScore * 100)}% trusted ({selectedArticle.verificationCount})
                </span>
              )}
            </div>

            {/* Meta and Title */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[11px] uppercase tracking-wide">
                  {selectedArticle.contentType}
                </span>
                <span>By {selectedArticle.contributor}</span>
                <span>⏱️ {selectedArticle.readTime} read</span>
                <button
                  onClick={() => handleBookmark(selectedArticle.id)}
                  className={`ml-auto flex items-center space-x-1 px-3.5 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                    bookmarks.includes(selectedArticle.id)
                      ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-500 hover:text-amber-500'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill={bookmarks.includes(selectedArticle.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>{bookmarks.includes(selectedArticle.id) ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>

              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {selectedArticle.title}
              </h2>

              <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed border-l-4 border-amber-400 pl-4 bg-slate-50/50 py-2 rounded-r-xl">
                {selectedArticle.description}
              </p>
            </div>

            <div className="h-px bg-slate-100 my-8"></div>

            {/* Knowledge Bridge Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Elder's Experience Column */}
              <div className="bg-orange-50/20 border border-orange-100/50 rounded-3xl p-6 md:p-8 space-y-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-amber-700 flex items-center space-x-2 border-b border-orange-100 pb-3">
                    <span className="text-xl">👴</span>
                    <span>Elder's Experience</span>
                  </h3>
                  
                  <div className="space-y-4.5 mt-5">
                    <div>
                      <h4 className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">Traditional Method</h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        {selectedArticle.traditionalMethod}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">Personal Experience</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal italic">
                        "{selectedArticle.personalExperience}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Explanation Column */}
              <div className="bg-blue-50/20 border border-blue-100/50 rounded-3xl p-6 md:p-8 space-y-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-blue-700 flex items-center space-x-2 border-b border-blue-100 pb-3">
                    <span className="text-xl">🤖</span>
                    <span>AI Explanation</span>
                  </h3>
                  
                  <div className="space-y-4.5 mt-5">
                    <div>
                      <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">Scientific Explanation</h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        {selectedArticle.scientificExplanation}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">Benefits</h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {selectedArticle.benefits}
                      </p>
                    </div>

                    {selectedArticle.precautions && (
                      <div>
                        <h4 className="text-[11px] font-bold text-rose-500 uppercase tracking-wider mb-1">Precautions</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-normal">
                          {selectedArticle.precautions}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 my-10"></div>

            {/* 6. Related Knowledge Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                Related Knowledge
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {getRelatedArticles(selectedArticle).map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedArticle(item)}
                    className="bg-white border border-slate-100 hover:border-blue-200 rounded-2xl p-4 shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className={`relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${getCategoryVisual(item.category).gradient} flex items-center justify-center`}>
                        <span className="text-2xl opacity-80 group-hover:scale-110 transition-transform duration-300">{getCategoryVisual(item.category).emoji}</span>
                      </div>
                      <span className="text-[10px] text-blue-500 font-bold uppercase">{item.category}</span>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-50">
                      <span>By {item.contributor}</span>
                      <span>⏱️ {item.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7. Simple Footer */}
      <footer className="mt-20 border-t border-slate-150 py-10 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2 text-slate-800">
            <svg className="w-6 h-6 text-blue-500" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 22C4 17.5817 11.1634 14 20 14C24.4183 14 28 15.7909 28 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M4 22H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-bold text-md text-slate-950">Setu</span>
            <span className="text-slate-400 text-xs">| Preservation & Sharing of Traditional Knowledge</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 font-bold">
            <a href="#about" className="hover:text-blue-600 transition-colors">About Setu</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            <a href="#privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#help" className="hover:text-blue-600 transition-colors">Help</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
