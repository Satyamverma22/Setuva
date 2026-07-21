import React, { useState } from 'react';

export default function EditProfileModal({ isOpen, onClose, userProfile, onSave }) {
  const [name, setName] = useState(userProfile?.name || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [skills, setSkills] = useState(userProfile?.skills?.join(', ') || '');
  const [location, setLocation] = useState(userProfile?.location || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [avatar, setAvatar] = useState(userProfile?.avatar || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...userProfile,
      name,
      bio,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      location,
      phone,
      avatar
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs text-sans">
      <div className="bg-white w-full max-w-lg rounded-[28px] shadow-2xl border border-slate-100 flex flex-col animate-in fade-in zoom-in duration-200 text-left">
        {/* Modal Header */}
        <div className="border-b border-slate-100 px-6 py-5 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base">Edit Profile Information</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-655 font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Avatar Url field */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Profile Photo URL</label>
            <div className="flex items-center space-x-3">
              <img
                src={avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                alt="Preview"
                className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-3xs"
              />
              <input
                type="url"
                placeholder="https://images.unsplash.com/...jpg"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="flex-grow border-b border-slate-200 focus:border-brand-primary py-2 text-xs focus:outline-none font-semibold text-slate-800 focus:ring-0"
              />
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-slate-200 focus:border-brand-primary py-2 text-xs focus:outline-none font-semibold text-slate-800 focus:ring-0"
            />
          </div>

          {/* Location & Phone grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border-b border-slate-200 focus:border-brand-primary py-2 text-xs focus:outline-none font-semibold text-slate-800 focus:ring-0"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-b border-slate-200 focus:border-brand-primary py-2 text-xs focus:outline-none font-semibold text-slate-800 focus:ring-0"
              />
            </div>
          </div>

          {/* Skills field */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skills (comma-separated)</label>
            <input
              type="text"
              placeholder="E.g., Storytelling, Traditional Recipes, Dialects"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border-b border-slate-200 focus:border-brand-primary py-2 text-xs focus:outline-none font-semibold text-slate-800 focus:ring-0"
            />
          </div>

          {/* Bio field */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bio</label>
            <textarea
              required
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border-b border-slate-200 focus:border-brand-primary py-2 text-xs focus:outline-none font-semibold text-slate-800 focus:ring-0 resize-none"
            />
          </div>

          {/* Buttons controls */}
          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-full shadow-md shadow-brand-primary/10 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
