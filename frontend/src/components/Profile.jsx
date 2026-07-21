import React, { useState, useEffect } from 'react';
import EditProfileModal from './EditProfileModal';
import { useAuth } from '../context/AuthContext';
import * as mentorsApi from '../api/mentors';
import { CATEGORIES } from '../api/knowledge';

export default function Profile({ userProfile, onLogout }) {
  const { patchLocalProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'settings', 'security', 'notifications'
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Mentor Profile State
  const [mentorProfile, setMentorProfile] = useState(null);
  const [mentorBio, setMentorBio] = useState('');
  const [mentorExpCats, setMentorExpCats] = useState([]);
  const [mentorExpYears, setMentorExpYears] = useState(0);
  const [mentorAvailability, setMentorAvailability] = useState('');
  const [mentorContactPref, setMentorContactPref] = useState('platform_message');
  const [mentorLoading, setMentorLoading] = useState(false);
  const [mentorSaving, setMentorSaving] = useState(false);

  // Mentorship Requests State
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);

  const loadMentorData = async () => {
    if (!userProfile?.id) return;
    setMentorLoading(true);
    try {
      const profile = await mentorsApi.getMentor(userProfile.id);
      setMentorProfile(profile);
      setMentorBio(profile.bio || '');
      setMentorExpCats(profile.expertise_categories || []);
      setMentorExpYears(profile.years_of_experience || 0);
      setMentorAvailability(profile.availability || '');
      setMentorContactPref(profile.contact_preference || 'platform_message');
    } catch (err) {
      setMentorProfile(null);
    } finally {
      setMentorLoading(false);
    }
  };

  const loadRequests = async () => {
    setRequestsLoading(true);
    try {
      const [incoming, outgoing] = await Promise.all([
        mentorsApi.getIncomingRequests(),
        mentorsApi.getOutgoingRequests()
      ]);
      setIncomingRequests(incoming);
      setOutgoingRequests(outgoing);
    } catch (err) {
      console.error("Failed to load requests:", err);
    } finally {
      setRequestsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'mentor') {
      loadMentorData();
      loadRequests();
    }
  }, [activeTab, userProfile]);

  const handleSaveMentorProfile = async (e) => {
    e.preventDefault();
    if (!mentorBio.trim() || mentorBio.trim().length < 20) {
      showToast("Bio must be at least 20 characters.");
      return;
    }
    if (mentorExpCats.length === 0) {
      showToast("Please select at least one expertise category.");
      return;
    }
    setMentorSaving(true);
    try {
      const updated = await mentorsApi.createOrUpdateMentorProfile({
        bio: mentorBio,
        expertiseCategories: mentorExpCats,
        yearsOfExperience: parseInt(mentorExpYears, 10) || 0,
        availability: mentorAvailability,
        contactPreference: mentorContactPref
      });
      setMentorProfile(updated);
      showToast("Mentor profile saved successfully!");
      loadRequests();
    } catch (err) {
      showToast(err.message || "Failed to save mentor profile.");
    } finally {
      setMentorSaving(false);
    }
  };

  const handleResolveRequest = async (requestId, decision) => {
    try {
      await mentorsApi.respondToRequest(requestId, decision);
      showToast(`Request ${decision} successfully.`);
      loadRequests();
    } catch (err) {
      showToast(err.message || "Failed to respond to request.");
    }
  };

  // NOTE: the backend (Phases 1-4.5) only persists `preferred_language` on
  // the user record. Fields like bio/location/phone/skills/avatar aren't
  // backend columns yet, so edits here are applied to local app state only
  // and will reset on next login. Add a PUT /users/me endpoint accepting
  // these fields to make this fully durable.
  const handleSave = (updatedProfile) => {
    patchLocalProfile(updatedProfile);
    setToastMsg('Profile updated (saved for this session — see note in code re: backend persistence).');
    setTimeout(() => setToastMsg(''), 4000);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Mock data for activities
  const recentActivities = [
    { id: 1, type: 'post', desc: 'Shared knowledge: "Immunity Boosting Ragi Porridge"', date: 'Today' },
    { id: 2, type: 'comment', desc: 'Commented on Sita Devi\'s Clay Pottery post', date: 'Yesterday' },
    { id: 3, type: 'bookmark', desc: 'Bookmarked "Drip Irrigation Systems" in Library', date: '3 days ago' },
    { id: 4, type: 'connect', desc: 'Connected with Ramachandran (Expert Scholar)', date: '1 week ago' }
  ];

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-slate-50 min-h-screen">
      {/* Background Decorative blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-100/30 to-orange-100/20 rounded-full blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl z-50 text-xs font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>✨</span>
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Sidebar Column (4 grid width) */}
          <div className="lg:col-span-4 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col items-center p-6 text-center space-y-6">
            
            {/* Avatar block with hover zoom */}
            <div className="relative group w-32 h-32 rounded-full overflow-hidden border border-slate-200 shadow-3xs cursor-pointer">
              <img
                src={userProfile?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                alt={userProfile?.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-bold" onClick={() => setIsEditOpen(true)}>
                Change Photo
              </div>
            </div>

            {/* Profile Meta Header */}
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">{userProfile?.name || 'Jane Doe'}</h2>
              <p className="text-xs text-slate-400 font-semibold">{userProfile?.email || 'jane@example.com'}</p>
              <div className="pt-2 flex justify-center items-center space-x-2">
                <span className="bg-brand-light text-brand-hover border border-brand-primary/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {userProfile?.role || 'User'}
                </span>
                <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {userProfile?.role === 'Expert' ? 'Pending Review' : 'Verified'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic leading-relaxed max-w-xs px-2 font-medium">
              "{userProfile?.bio || 'Passionate about sharing stories and building intergenerational mentorships.'}"
            </p>

            {/* Location & Quick Meta */}
            <div className="w-full bg-slate-50/50 border border-slate-100 p-4 rounded-2xl text-left text-xs text-slate-600 space-y-2.5 font-semibold">
              <div className="flex items-center space-x-2.5">
                <span>📍</span>
                <span>{userProfile?.location || 'San Francisco, CA'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span>📞</span>
                <span>{userProfile?.phone || '+1 (555) 019-2834'}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span>📅</span>
                <span>Member since {userProfile?.joinedDate || 'July 2026'}</span>
              </div>
            </div>

            {/* Quick Navigation Panel */}
            <div className="w-full space-y-1 text-left pt-2 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Workspace Navigation</p>
              {[
                { id: 'overview', label: '📊 Overview' },
                ...(userProfile?.role === 'Expert' || userProfile?.rawRole === 'contributor' || userProfile?.rawRole === 'both' ? [{ id: 'mentor', label: '🤝 Mentor Profile' }] : []),
                { id: 'settings', label: '⚙️ Settings' },
                { id: 'security', label: '🔒 Security' },
                { id: 'notifications', label: '🔔 Notifications' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-brand-light text-brand-hover'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Edit / Settings / Logout Actions */}
            <div className="w-full pt-4 border-t border-slate-100 flex flex-col space-y-2.5">
              <button
                onClick={() => setIsEditOpen(true)}
                className="w-full py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-3xs"
              >
                Edit Profile
              </button>
              <button
                onClick={onLogout}
                className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* 2. Main Dashboard Area (8 grid width) */}
          <div className="lg:col-span-8 space-y-6 text-left">
            
            {/* Dynamic content rendering based on selected Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                {/* A. Statistics Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { title: 'Courses Enrolled', count: '4', emoji: '🎓' },
                    { title: 'Knowledge Shared', count: '12', emoji: '✍️' },
                    { title: 'Discussions', count: '29', emoji: '💬' },
                    { title: 'Bookmarks', count: '8', emoji: '🔖' }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-tight">{stat.title}</p>
                        <p className="text-xl font-black text-slate-900">{stat.count}</p>
                      </div>
                      <span className="text-2xl">{stat.emoji}</span>
                    </div>
                  ))}
                </div>

                {/* B. Details: Personal Info & Account Type Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">Personal Information</h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-slate-400 font-semibold mb-0.5">Name</p>
                        <p className="font-extrabold text-slate-800">{userProfile?.name || 'Jane Doe'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-semibold mb-0.5">Email Address</p>
                        <p className="font-extrabold text-slate-800">{userProfile?.email || 'jane@example.com'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-semibold mb-0.5">Contact Phone</p>
                        <p className="font-extrabold text-slate-800">{userProfile?.phone || '+1 (555) 019-2834'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-semibold mb-0.5">Location</p>
                        <p className="font-extrabold text-slate-800">{userProfile?.location || 'San Francisco, CA'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">Account Information</h3>
                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="text-slate-400 font-semibold mb-0.5">Account Type</p>
                        <p className="font-extrabold text-slate-800">{userProfile?.role || 'User'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-semibold mb-0.5">Verification Status</p>
                        <p className="font-extrabold text-emerald-600">
                          {userProfile?.role === 'Expert' ? 'Pending verification' : 'Approved member'}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-semibold mb-0.5">Joined Date</p>
                        <p className="font-extrabold text-slate-800">{userProfile?.joinedDate || 'July 2026'}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-semibold mb-0.5">Activity Status</p>
                        <span className="inline-block bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold uppercase text-[9px]">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* C. Skills & Interests */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">Skills &amp; Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile?.skills && userProfile.skills.length > 0 ? (
                      userProfile.skills.map((skill, index) => (
                        <span key={index} className="bg-slate-100 text-slate-700 text-xs font-bold px-3.5 py-1.5 rounded-full border border-slate-200">
                          ✨ {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">No skills listed yet. Click edit profile to add yours.</p>
                    )}
                  </div>
                </div>

                {/* D. Recent Activity Section */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">Recent Activity Logs</h3>
                  <div className="space-y-3.5">
                    {recentActivities.map((act) => (
                      <div key={act.id} className="flex justify-between items-center border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-3 text-xs font-semibold text-slate-700">
                          <span>{act.type === 'post' ? '✍️' : act.type === 'comment' ? '💬' : act.type === 'bookmark' ? '🔖' : '🤝'}</span>
                          <span>{act.desc}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">{act.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'mentor' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Mentor Profile Details Form */}
                <div className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-xs space-y-6">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-black text-slate-900">🤝 Mentor Profile Settings</h3>
                    <p className="text-xs text-slate-400 font-semibold">Share your expertise and guide the next generation.</p>
                  </div>

                  {mentorLoading ? (
                    <div className="py-8 text-center text-xs font-bold text-slate-400">Loading Mentor Profile...</div>
                  ) : (
                    <form onSubmit={handleSaveMentorProfile} className="space-y-5 text-xs font-semibold text-slate-700 font-sans">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bio (min 20 characters)</label>
                        <textarea
                          value={mentorBio}
                          onChange={(e) => setMentorBio(e.target.value)}
                          placeholder="Tell us about your background, experience, and what you would like to pass on to learners..."
                          className="w-full border border-slate-200 rounded-2xl px-4 py-3 min-h-[100px] focus:outline-none focus:border-brand-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Years of Experience</label>
                          <input
                            type="number"
                            min="0"
                            max="80"
                            value={mentorExpYears}
                            onChange={(e) => setMentorExpYears(e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-brand-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Contact Preference</label>
                          <select
                            value={mentorContactPref}
                            onChange={(e) => setMentorContactPref(e.target.value)}
                            className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 bg-white focus:outline-none focus:border-brand-primary"
                          >
                            <option value="platform_message">Platform Message</option>
                            <option value="email">Email</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability (e.g. Weekends, 2 hrs/week)</label>
                        <input
                          type="text"
                          value={mentorAvailability}
                          onChange={(e) => setMentorAvailability(e.target.value)}
                          placeholder="e.g. 2-4 hours per week, mostly weekends"
                          className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-brand-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Expertise Categories</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                          {CATEGORIES.map((cat) => {
                            const checked = mentorExpCats.includes(cat);
                            return (
                              <label key={cat} className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer select-none transition-all ${checked ? 'bg-brand-light border-brand-primary/30 text-brand-hover' : 'border-slate-100 hover:bg-slate-50'}`}>
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setMentorExpCats([...mentorExpCats, cat]);
                                    } else {
                                      setMentorExpCats(mentorExpCats.filter(c => c !== cat));
                                    }
                                  }}
                                  className="hidden"
                                />
                                <span className="text-[11px] font-bold">{cat}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={mentorSaving}
                          className="px-6 py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl shadow-3xs cursor-pointer disabled:opacity-50 transition-opacity"
                        >
                          {mentorSaving ? 'Saving...' : 'Save Profile'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Incoming Requests Panel */}
                <div className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-xs space-y-6">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-black text-slate-900">📥 Incoming Mentorship Requests</h3>
                    <p className="text-xs text-slate-400 font-semibold">Review requests from learners wishing to connect.</p>
                  </div>

                  {requestsLoading ? (
                    <div className="py-4 text-center text-xs font-semibold text-slate-400">Loading requests...</div>
                  ) : incomingRequests.length === 0 ? (
                    <div className="py-4 text-center text-xs font-semibold text-slate-400">No incoming mentorship requests yet.</div>
                  ) : (
                    <div className="space-y-4">
                      {incomingRequests.map((req) => (
                        <div key={req.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-800">Learner: {req.learner_name}</p>
                            <p className="text-slate-500 italic">"{req.message}"</p>
                            <p className="text-[10px] text-slate-400 font-bold">Sent on: {new Date(req.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center space-x-2 shrink-0">
                            {req.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => handleResolveRequest(req.id, 'accepted')}
                                  className="px-3.5 py-1.5 bg-brand-primary hover:bg-brand-hover text-white text-[10px] font-bold rounded-lg cursor-pointer"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleResolveRequest(req.id, 'declined')}
                                  className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg cursor-pointer"
                                >
                                  Decline
                                </button>
                              </>
                            ) : (
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                {req.status}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Outgoing Requests Panel */}
                <div className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-xs space-y-6">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-black text-slate-900">📤 Outgoing Mentorship Requests</h3>
                    <p className="text-xs text-slate-400 font-semibold">Track requests you have sent to other experts.</p>
                  </div>

                  {requestsLoading ? (
                    <div className="py-4 text-center text-xs font-semibold text-slate-400">Loading requests...</div>
                  ) : outgoingRequests.length === 0 ? (
                    <div className="py-4 text-center text-xs font-semibold text-slate-400">No sent mentorship requests yet.</div>
                  ) : (
                    <div className="space-y-4">
                      {outgoingRequests.map((req) => (
                        <div key={req.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                          <div className="space-y-1">
                            <p className="font-extrabold text-slate-800">Mentor: {req.mentor_name}</p>
                            <p className="text-slate-500 italic">"{req.message}"</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : req.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                            {req.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tabs details settings */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-slate-900">Profile Settings</h3>
                  <p className="text-xs text-slate-400 font-semibold">Update language preferences and interface controls.</p>
                </div>
                <div className="space-y-4 text-xs font-semibold">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Language</label>
                    <select className="border border-slate-200 rounded-xl px-4 py-2.5 w-full bg-white max-w-sm focus:outline-none">
                      <option>English</option>
                      <option>Hindi (हिन्दी)</option>
                      <option>Gujarati (ગુજરાતી)</option>
                      <option>Tamil (தமிழ்)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between max-w-sm pt-2">
                    <span>Receive news updates & sitemaps</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary" />
                  </div>
                  <button onClick={() => showToast('Settings saved successfully!')} className="px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl shadow-3xs cursor-pointer">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-slate-900">Change Password</h3>
                  <p className="text-xs text-slate-400 font-semibold">Ensure a strong security configuration by updating passwords.</p>
                </div>
                <div className="space-y-4 text-xs max-w-sm">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-brand-primary font-mono" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-brand-primary font-mono" />
                  </div>
                  <button onClick={() => showToast('Password updated successfully!')} className="px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl shadow-3xs cursor-pointer">
                    Change Password
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-[32px] border border-slate-100 p-6 md:p-8 shadow-xs space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-slate-900">Notifications</h3>
                  <p className="text-xs text-slate-400 font-semibold">Choose when and how you want to be notified.</p>
                </div>
                <div className="space-y-4 text-xs font-semibold">
                  {[
                    { label: 'Receive email alerts for new connection requests', checked: true },
                    { label: 'Receive updates when matching stories are posted', checked: true },
                    { label: 'Daily summary digests', checked: false }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between max-w-md">
                      <span>{item.label}</span>
                      <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 text-brand-primary focus:ring-brand-primary rounded" />
                    </div>
                  ))}
                  <button onClick={() => showToast('Notification settings saved!')} className="px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl shadow-3xs cursor-pointer">
                    Save Notification Rules
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        userProfile={userProfile}
        onSave={handleSave}
      />
    </section>
  );
}
