import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Library from './components/Library';
import Community from './components/Community';
import AboutUs from './components/AboutUs';
import Legacy from './components/Legacy';
import GovernmentSchemes from './components/GovernmentSchemes';
import Contribute from './components/Contribute';
import Footer from './components/Footer';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import { useAuth } from './context/AuthContext';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const { currentUser, isLoading, logout } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleLogout = () => {
    logout();
    setCurrentView('home');
  };

  // Views that require a signed-in user redirect to Sign In instead of
  // rendering, since the backend rejects unauthenticated requests anyway.
  const protectedViews = ['profile', 'contribute'];
  useEffect(() => {
    if (!isLoading && !currentUser && protectedViews.includes(currentView)) {
      setCurrentView('signin');
    }
  }, [currentView, currentUser, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Setu…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            {/* Hero Section */}
            <Hero onGetStarted={() => setCurrentView(currentUser ? 'contribute' : 'signup')} />

            {/* Features Grid Section */}
            <Features />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Statistics Banner */}
            <Stats />

            {/* Testimonials Section */}
            <Testimonials />
          </>
        ) : currentView === 'community' ? (
          <Community userProfile={currentUser} />
        ) : currentView === 'legacy' ? (
          <Legacy />
        ) : currentView === 'govt schemes' ? (
          <GovernmentSchemes />
        ) : currentView === 'about us' ? (
          <AboutUs onSignUpClick={() => setCurrentView('signup')} />
        ) : currentView === 'signin' ? (
          <SignIn onViewChange={setCurrentView} />
        ) : currentView === 'signup' ? (
          <SignUp onViewChange={setCurrentView} />
        ) : currentView === 'profile' ? (
          <Profile userProfile={currentUser} onLogout={handleLogout} />
        ) : currentView === 'contribute' ? (
          <Contribute onViewChange={setCurrentView} />
        ) : (
          <Library onContribute={() => setCurrentView(currentUser ? 'contribute' : 'signup')} />
        )}
      </main>

      {/* Footer Section */}
      {currentView === 'home' && <Footer />}
    </div>
  );
}

export default App;
