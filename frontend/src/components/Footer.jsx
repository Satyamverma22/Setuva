import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <footer id="contact" className="bg-slate-900 text-slate-400 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle styling lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-800">
          {/* Logo and Tagline Column */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-6">
            <a href="#" className="flex items-center space-x-2 group">
              <svg className="w-8 h-8 text-brand-primary" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 22C4 17.5817 11.1634 14 20 14C24.4183 14 28 15.7909 28 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M4 22H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="9" cy="18" r="1.5" fill="currentColor" />
                <circle cx="23" cy="18" r="1.5" fill="currentColor" />
              </svg>
              <span className="text-2xl font-bold tracking-tight text-white">
                Setu
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              Connecting the generations to learn from each other, share ancient and modern wisdom, and preserve the memories that define us.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {/* Twitter */}
              <a href="#" className="p-2 bg-slate-800 hover:bg-brand-primary text-slate-400 hover:text-white rounded-full transition-colors duration-200" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="p-2 bg-slate-800 hover:bg-brand-primary text-slate-400 hover:text-white rounded-full transition-colors duration-200" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="p-2 bg-slate-800 hover:bg-brand-primary text-slate-400 hover:text-white rounded-full transition-colors duration-200" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="p-2 bg-slate-800 hover:bg-brand-primary text-slate-400 hover:text-white rounded-full transition-colors duration-200" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12.004" cy="11.996" r="3.111" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12.004 2c-2.715 0-3.056.011-4.122.06-1.064.049-1.79.218-2.427.465a4.902 4.902 0 00-1.772 1.153 4.904 4.904 0 00-1.153 1.772c-.247.637-.416 1.363-.465 2.428-.048 1.066-.06 1.407-.06 4.122s.012 3.056.06 4.122c.049 1.065.218 1.79.465 2.427a4.9 4.9 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.637.247 1.363.416 2.427.465 1.066.048 1.407.06 4.122.06s3.056-.012 4.122-.06c1.065-.049 1.79-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.905 4.905 0 001.153-1.772c.247-.637.416-1.363.465-2.427.049-1.066.06-1.407.06-4.122s-.011-3.056-.06-4.122c-.049-1.065-.218-1.79-.465-2.428a4.905 4.905 0 00-1.153-1.772 4.902 4.902 0 00-1.772-1.153c-.637-.247-1.363-.416-2.427-.465-1.066-.049-1.407-.06-4.122-.06zm-8.204 1.8c.884-.04 1.258-.04 2.8-.04h10.8c1.543 0 1.916 0 2.8.04 1.3.06 2 .28 2.47.46.62.24 1.07.53 1.53 1 .47.46.76.91 1 1.53.18.47.4 1.17.46 2.47.04.884.04 1.258.04 2.8v5.4c0 1.543 0 1.916-.04 2.8-.06 1.3-.28 2-.46 2.47-.24.62-.53 1.07-1 1.53-.46.47-.91.76-1.53 1-.47.18-1.17.4-2.47.46-.884.04-1.258.04-2.8.04H8.4c-1.543 0-1.916 0-2.8-.04-1.3-.06-2-.28-2.47-.46-.62-.24-1.07-.53-1.53-1-.47-.46-.76-.91-1-1.53-.18-.47-.4-1.17-.46-2.47-.04-.884-.04-1.258-.04-2.8V8.4c0-1.543 0-1.916.04-2.8.06-1.3.28-2 .46-2.47.24-.62.53-1.07 1-1.53.46-.47.91-.76 1.53-1 .47-.18 1.17-.4 2.47-.46z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-sm hover:text-brand-primary transition-colors">About Us</a></li>
                <li><a href="#communities" className="text-sm hover:text-brand-primary transition-colors">Communities</a></li>
                <li><a href="#stories" className="text-sm hover:text-brand-primary transition-colors">Stories</a></li>
                <li><a href="#blog" className="text-sm hover:text-brand-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#privacy" className="text-sm hover:text-brand-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="text-sm hover:text-brand-primary transition-colors">Terms of Service</a></li>
                <li><a href="#safety" className="text-sm hover:text-brand-primary transition-colors">Safety Center</a></li>
                <li><a href="#contact" className="text-sm hover:text-brand-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Stay Connected</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sign up for our monthly digest of stories, wisdom tips, and dialect translations.
            </p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-stretch space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="px-4 py-3 bg-slate-800 border border-slate-700 focus:border-brand-primary focus:outline-none rounded-xl sm:rounded-full text-sm text-white placeholder-slate-500 w-full transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3 bg-brand-primary hover:bg-brand-hover disabled:bg-slate-700 text-white font-semibold text-sm rounded-xl sm:rounded-full transition-colors flex items-center justify-center shrink-0"
              >
                {status === 'loading' ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : status === 'success' ? (
                  <span>Subscribed!</span>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>
            {status === 'error' && (
              <p className="text-xs text-rose-500 font-medium animate-pulse">{errorMessage}</p>
            )}
            {status === 'success' && (
              <p className="text-xs text-emerald-400 font-medium">Thank you! You have successfully subscribed to our newsletter.</p>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} Setu Platform Inc. All rights reserved.
          </p>
          <p className="text-sm font-semibold tracking-wide text-brand-primary italic">
            "Connecting Hearts, Sharing Wisdom."
          </p>
        </div>
      </div>
    </footer>
  );
}
