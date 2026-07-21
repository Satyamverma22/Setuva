import React, { useState, useEffect } from 'react';
import organicFarmingImg from '../assets/organic_farming.png';
import potteryImg from '../assets/pottery.png';
import ayurvedicRemediesImg from '../assets/ayurvedic_remedies.png';
import milletRecipesImg from '../assets/millet_recipes.jpg';
import rainwaterHarvestingImg from '../assets/rainwater_harvesting.jpg';
import { CATEGORIES as BACKEND_CATEGORIES } from '../api/knowledge';
import * as mentorsApi from '../api/mentors';

// Initial verified stories
const initialStories = [
  {
    id: 1,
    userName: "Ramesh Kumar",
    role: "Elder",
    contributorTitle: "Farmer",
    location: "Bihar",
    category: "Agriculture",
    title: "🌱 Organic Farming Techniques",
    description: "Transitioning to organic farming methods using intercropping and natural bio-inputs has restored our soil biology. By planting legume crops alongside wheat, we naturally fix nitrogen. We completely avoid chemical urea. The soil texture is now dark, rich, and spongy, returning to its natural fertile state.",
    coverImage: organicFarmingImg,
    postedDate: "July 12, 2026",
    likes: 38,
    comments: [
      { id: 1, author: "Amit Singh", text: "Truly inspiring Ramesh ji. We are trying to implement this in our village in UP too." }
    ],
    traditionalMethod: "Intercropping beans and maize in a 1:2 row ratio, applying composted organic manure twice per cycle.",
    scientificExplanation: "Legume root nodules house Rhizobium bacteria which convert atmospheric nitrogen into bioavailable ammonium, enhancing crop nutrient absorption naturally.",
    benefits: "Restores soil microbial flora, increases earthworm density, lowers cultivation costs, and produces chemical-free crops.",
    precautions: "Ensure crop spacing is sufficient to prevent leaf shade competition for sunlight.",
    isLiked: false,
    isBookmarked: false,
    connectionStatus: "none" // Relationship with viewer: 'none', 'pending', 'incoming', 'connected'
  },
  {
    id: 2,
    userName: "Sita Devi",
    role: "Expert",
    contributorTitle: "Artisan",
    location: "Rajasthan",
    category: "Traditional Skills",
    title: "🏺 Traditional Pottery Making",
    description: "Shaping river clay on a hand-spun stone potter's wheel is a meditation passed down through generations. Once centered, the hands pull and hollow the clay to shape porous water pots (matkas). These are then fired in straw-insulated kilns using dry leaves and wood. This traditional firing technique is vital for natural water cooling.",
    coverImage: potteryImg,
    postedDate: "July 14, 2026",
    likes: 47,
    comments: [
      { id: 1, author: "Neha Patel", text: "The water stored in these clay pots tastes sweet and is incredibly cooling!" }
    ],
    traditionalMethod: "Wedging alluvial silt clay to remove air bubbles, centering on a heavy wheel, and wood pit kiln baking at 800°C.",
    scientificExplanation: "Wood firing creates micro-porosity in the clay walls, which facilitates slow evaporative cooling of stored drinking water.",
    benefits: "Biodegradable storage wares, keeps drinking water naturally cold without electricity, and preserves cultural art.",
    precautions: "Clay must dry slowly in shade; drying too fast in direct hot sun causes cracking.",
    isLiked: false,
    isBookmarked: false,
    connectionStatus: "incoming" // Has sent a request to viewer
  },
  {
    id: 3,
    userName: "Dr. Sharma",
    role: "Expert",
    contributorTitle: "Ayurvedic Expert",
    location: "Kerala",
    category: "Health",
    title: "🌿 Ayurvedic Home Remedy for Cold",
    description: "An age-old herbal tea (Kashayam) recipe to relieve cold, dry cough, and seasonal congestion. By boiling fresh ginger root, holy basil (Tulsi) leaves, black pepper, and licorice bark, we create a soothing brew that clears blockages and boosts respiratory health naturally.",
    coverImage: ayurvedicRemediesImg,
    postedDate: "July 15, 2026",
    likes: 54,
    comments: [],
    traditionalMethod: "Boiling 5-6 crushed Tulsi leaves, a slice of ginger, and 3 black peppercorns in 1 cup water until halved, sweetening with raw honey when warm.",
    scientificExplanation: "Ginger contains active gingerols with anti-inflammatory properties, Tulsi has immunomodulatory terpenes, and licorice acts as a demulcent to soothe throat irritation.",
    benefits: "Clears respiratory phlegm, reduces throat soreness, and strengthens immunity without synthetic pills.",
    precautions: "Never boil honey, as high heat denatures its beneficial organic enzymes. Add honey only after the tea has cooled to lukewarm.",
    isLiked: false,
    isBookmarked: false,
    connectionStatus: "none"
  },
  {
    id: 4,
    userName: "Savitri Devi",
    role: "Elder",
    contributorTitle: "Homemaker",
    location: "Tamil Nadu",
    category: "Recipes",
    title: "🍲 Traditional Millet Recipe",
    description: "Sharing our family recipe for Sprouted Finger Millet (Ragi) porridge. Sprouting the Ragi seeds overnight increases their nutritional content. We then sun-dry, roast, and grind them into flour. Boiled with water and diluted with buttermilk and green chilies, it makes a nutrient-rich breakfast.",
    coverImage: milletRecipesImg,
    postedDate: "July 16, 2026",
    likes: 29,
    comments: [
      { id: 1, author: "Rahul Dev", text: "Perfect breakfast drink for hot summers! Easy to digest too." }
    ],
    traditionalMethod: "Soaking millet for 12 hours, sprouting in a damp cotton cloth, drying, roasting, grinding to powder, and cooking on a low fire stove.",
    scientificExplanation: "Germination activates amylase enzymes that pre-digest starches, making calcium, iron, and amino acids highly bioavailable.",
    benefits: "High calcium density, extremely low glycemic index, gluten-free, and gives hours of sustained physical energy.",
    precautions: "Cook on low flame and stir continuously to avoid lump formation.",
    isLiked: false,
    isBookmarked: false,
    connectionStatus: "connected" // Already connected
  },
  {
    id: 5,
    userName: "Village Community",
    role: "Student",
    contributorTitle: "Community",
    location: "Gujarat",
    category: "Technology",
    title: "💧 Rainwater Harvesting in Villages",
    description: "Our village restored two ancient rainwater check dams (boris) to capture monsoon runoff. This gravity-fed design redirects surface water into dry brick-lined wells, replenishing our shallow water table. We have managed to raise the groundwater level by 4 meters, securing our village well water for the dry seasons.",
    coverImage: rainwaterHarvestingImg,
    postedDate: "July 10, 2026",
    likes: 62,
    comments: [
      { id: 1, author: "Siddharth Rajan", text: "This is a great example of combining community effort with ecological engineering." }
    ],
    traditionalMethod: "Building low-cost dry-stone check dams across monsoon pathways and channeling runoff into sandy recharge pits.",
    scientificExplanation: "Recharge pits act as physical sand-filters, removing silt and debris while allowing gravity percolation to feed aquifers.",
    benefits: "Replenishes groundwater tables, resolves village summer drinking water crises, and controls soil erosion.",
    precautions: "Desilt recharge basins before the onset of monsoon rains to prevent clay scaling blockages.",
    isLiked: false,
    isBookmarked: false,
    connectionStatus: "none"
  }
];

const categories = [
  'Agriculture',
  'Health',
  'Traditional Skills',
  'Education',
  'Technology',
  'Culture',
  'Finance',
  'Recipes'
];

export default function Community({ userProfile }) {
  // Stories Feed & Actions
  const [stories, setStories] = useState(initialStories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleComments, setVisibleComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  // Modals for summaries and full details
  const [summaryPost, setSummaryPost] = useState(null);
  const [readMorePost, setReadMorePost] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestLocation, setGuestLocation] = useState('');

  // Form states for sharing knowledge
  const [titleInput, setTitleInput] = useState('');
  const [catInput, setCatInput] = useState('Agriculture');
  const [descInput, setDescInput] = useState('');
  const [sourceInput, setSourceInput] = useState('Personal Experience');
  const [postImageFile, setPostImageFile] = useState(null);
  const [postImageUrl, setPostImageUrl] = useState('');

  // Messaging & Chat State
  const [activeChatUser, setActiveChatUser] = useState(null); // User object currently chatting with
  const [chatInputs, setChatInputs] = useState({});
  const [chatMessages, setChatMessages] = useState({
    "Savitri Devi": [
      { id: 1, sender: "them", text: "Hello! I hope you like my traditional Ragi porridge recipe. Let me know if you have any questions about millet recipes!" }
    ],
    "Sita Devi": [
      { id: 1, sender: "them", text: "Thank you for accepting my connection request! Traditional clay work requires lots of practice. I would love to guide you." }
    ]
  });
  const [isTyping, setIsTyping] = useState(false); // Typing animation state

  // --- Real backend-wired mentor discovery (everything above this line in
  // component state remains the original demo "Community Stories" feed,
  // which is NOT backed by a real posts/comments API — the backend built
  // through Phase 4.5 has no messaging or social-feed endpoints. That feed
  // is kept for visual continuity but is local-only mock data. ---
  const [mentors, setMentors] = useState([]);
  const [mentorsLoading, setMentorsLoading] = useState(true);
  const [mentorsError, setMentorsError] = useState('');
  const [mentorCategoryFilter, setMentorCategoryFilter] = useState('All');
  const [requestingMentorId, setRequestingMentorId] = useState(null);
  const [mentorActionMsg, setMentorActionMsg] = useState('');

  useEffect(() => {
    let cancelled = false;
    setMentorsLoading(true);
    setMentorsError('');
    mentorsApi
      .listMentors({ category: mentorCategoryFilter })
      .then((data) => {
        if (!cancelled) setMentors(Array.isArray(data) ? data : data?.items || []);
      })
      .catch((err) => {
        if (!cancelled) setMentorsError(err.message || 'Could not load mentors. Is the backend running?');
      })
      .finally(() => {
        if (!cancelled) setMentorsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [mentorCategoryFilter]);

  const handleRequestMentor = async (mentorUserId) => {
    setRequestingMentorId(mentorUserId);
    setMentorActionMsg('');
    try {
      await mentorsApi.requestMentor(mentorUserId, "Hi! I'd love to learn from your experience on Setu.");
      setMentorActionMsg('Mentorship request sent!');
    } catch (err) {
      setMentorActionMsg(err.message || 'Could not send request. Please sign in first.');
    } finally {
      setRequestingMentorId(null);
      setTimeout(() => setMentorActionMsg(''), 4000);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Action handlers
  const handleLike = (id) => {
    setStories(stories.map(story => {
      if (story.id === id) {
        return {
          ...story,
          likes: story.isLiked ? story.likes - 1 : story.likes + 1,
          isLiked: !story.isLiked
        };
      }
      return story;
    }));
  };

  const handleBookmark = (id) => {
    setStories(stories.map(story => {
      if (story.id === id) {
        return {
          ...story,
          isBookmarked: !story.isBookmarked
        };
      }
      return story;
    }));
    const story = stories.find(s => s.id === id);
    if (story) {
      showToast(story.isBookmarked ? "Removed from bookmarks" : "Bookmarked successfully!");
    }
  };

  const handleShare = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/community#story-${id}`);
    showToast("Post link copied to clipboard!");
  };

  const handleCommentToggle = (id) => {
    setVisibleComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddComment = (e, storyId) => {
    e.preventDefault();
    const commentText = commentInputs[storyId] || '';
    if (!commentText.trim()) return;

    setStories(stories.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          comments: [
            ...story.comments,
            {
              id: Date.now(),
              author: userProfile ? userProfile.name : "Guest Contributor",
              text: commentText
            }
          ]
        };
      }
      return story;
    }));

    setCommentInputs(prev => ({
      ...prev,
      [storyId]: ''
    }));
  };

  // Connection management
  const handleConnectRequest = (userName) => {
    setStories(stories.map(story => {
      if (story.userName === userName) {
        return { ...story, connectionStatus: "pending" };
      }
      return story;
    }));
    showToast(`Connection request sent to ${userName}`);
  };

  const handleAcceptRequest = (userName) => {
    setStories(stories.map(story => {
      if (story.userName === userName) {
        return { ...story, connectionStatus: "connected" };
      }
      return story;
    }));
    // Add initial message if not already present
    if (!chatMessages[userName]) {
      setChatMessages(prev => ({
        ...prev,
        [userName]: [
          { id: 1, sender: "them", text: `Hi! Thank you for connecting. I am looking forward to exchanging knowledge with you.` }
        ]
      }));
    }
    showToast(`You are now connected with ${userName}!`);
  };

  // Image Upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImageFile(file);
      setPostImageUrl(URL.createObjectURL(file));
    }
  };

  // Share Knowledge submission - Instant publishing
  const handleShareSubmit = (e) => {
    e.preventDefault();
    if (!titleInput.trim() || !descInput.trim() || !guestName.trim() || !guestLocation.trim()) {
      showToast("Please fill in all fields.");
      return;
    }

    const defaultImages = {
      'Agriculture': 'https://images.unsplash.com/photo-1593113598332-cd59c5bc3f90?auto=format&fit=crop&w=800&q=80',
      'Health': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
      'Traditional Skills': 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
      'Recipes': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
      'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    };

    const newStory = {
      id: Date.now(),
      userName: guestName,
      role: 'Contributor',
      contributorTitle: 'Heritage Contributor',
      location: guestLocation,
      category: catInput,
      title: titleInput,
      description: descInput,
      coverImage: postImageUrl || defaultImages[catInput] || defaultImages['Agriculture'],
      postedDate: "Today",
      likes: 0,
      comments: [],
      traditionalMethod: `Knowledge shared based on: ${sourceInput}.`,
      scientificExplanation: "Verification analysis will be compiled by community experts.",
      benefits: "Supports traditional learning.",
      precautions: "Refer to elder coordinates.",
      isLiked: false,
      isBookmarked: false,
      connectionStatus: "none"
    };

    setStories([newStory, ...stories]);
    setTitleInput('');
    setDescInput('');
    setPostImageFile(null);
    setPostImageUrl('');
    setGuestName('');
    setGuestLocation('');
    setShowShareModal(false);
    showToast("Knowledge shared successfully! Posted to feed.");
  };

  // Private chat send message & automated reply simulation
  const handleSendMessage = (e, userName) => {
    e.preventDefault();
    const input = chatInputs[userName] || '';
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: input
    };

    setChatMessages(prev => ({
      ...prev,
      [userName]: [...(prev[userName] || []), newMsg]
    }));

    setChatInputs(prev => ({
      ...prev,
      [userName]: ''
    }));

    // Trigger typing simulation and auto reply after 1.5 seconds
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Hello! That sounds very interesting. Let me know if you would like to discuss more details or collaborate.";

      if (userName === "Savitri Devi") {
        replyText = "Thank you for the message! I'm happy to help you learn traditional cooking. Ragi is highly beneficial for calcium, especially in the mornings.";
      } else if (userName === "Sita Devi") {
        replyText = "Greetings! Traditional pottery teaches patience. I would be glad to guide you in wedging and centering the river clay.";
      }

      const autoReply = {
        id: Date.now() + 1,
        sender: "them",
        text: replyText
      };

      setChatMessages(prev => ({
        ...prev,
        [userName]: [...(prev[userName] || []), autoReply]
      }));
    }, 1500);
  };

  const filteredStories = stories.filter(story => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = story.title.toLowerCase().includes(query) ||
      story.category.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Collect connected users for the sidebar
  const connectedUsers = stories
    .filter(story => story.connectionStatus === "connected")
    .map(story => ({
      name: story.userName,
      avatar: story.profilePic || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
      role: story.role,
      location: story.location
    }))
    // Deduplicate
    .filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

  // Collect incoming requests for the sidebar
  const incomingRequests = stories
    .filter(story => story.connectionStatus === "incoming")
    .map(story => ({
      name: story.userName,
      avatar: story.profilePic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      role: story.role,
      location: story.location
    }))
    .filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl z-50 text-xs font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* AI Summary Modal Overlay */}
      {summaryPost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col animate-in fade-in zoom-in duration-200 text-left">
            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🤖</span>
                <h3 className="font-bold text-md">Setu AI Verified Summary</h3>
              </div>
              <button
                onClick={() => setSummaryPost(null)}
                className="text-white hover:text-orange-100 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
              <div>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold uppercase">
                  {summaryPost.category}
                </span>
                <h4 className="text-md font-bold text-slate-800 mt-2">{summaryPost.title}</h4>
              </div>
              <div className="h-px bg-slate-100"></div>

              <div className="space-y-3.5">
                <div>
                  <h5 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">🌿 Core Practice</h5>
                  <p className="text-xs text-slate-650 leading-relaxed font-normal">{summaryPost.traditionalMethod}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">🔬 Scientific Explanation</h5>
                  <p className="text-xs text-slate-650 leading-relaxed font-normal">{summaryPost.scientificExplanation}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">✓ Benefits</h5>
                  <p className="text-xs text-slate-655 leading-relaxed font-normal">{summaryPost.benefits}</p>
                </div>
                {summaryPost.precautions && (
                  <div>
                    <h5 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">⚠️ Precaution</h5>
                    <p className="text-xs text-slate-650 leading-relaxed font-normal">{summaryPost.precautions}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSummaryPost(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Read More Detail Modal */}
      {readMorePost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col animate-in fade-in zoom-in duration-200 text-left">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-bold uppercase">
                  {readMorePost.category}
                </span>
                <span className="text-xs text-slate-405">Published {readMorePost.postedDate}</span>
              </div>
              <button
                onClick={() => setReadMorePost(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                <img
                  src={readMorePost.coverImage}
                  alt={readMorePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-2">
                  {readMorePost.profilePic && (
                    <img
                      src={readMorePost.profilePic}
                      alt={readMorePost.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {readMorePost.userName} <span className="text-[10px] text-slate-400 font-medium">({readMorePost.contributorTitle}, {readMorePost.location})</span>
                    </p>
                    <p className="text-[9px] font-bold text-blue-600 uppercase tracking-wide">{readMorePost.role}</p>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">{readMorePost.title}</h3>
              </div>

              <div className="h-px bg-slate-100"></div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">Description</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{readMorePost.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-orange-50/30 border border-orange-100/50 rounded-2xl p-4">
                    <h5 className="text-[10px] font-bold text-orange-700 uppercase tracking-wider mb-1">Traditional Practice</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{readMorePost.traditionalMethod}</p>
                  </div>
                  <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-4">
                    <h5 className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">Scientific Verification</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{readMorePost.scientificExplanation}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setReadMorePost(null);
                  setSummaryPost(readMorePost);
                }}
                className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                🤖 AI Summary
              </button>
              <button
                onClick={() => setReadMorePost(null)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Knowledge Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 text-left">
            <div className="border-b border-slate-100 p-5 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-md">Share Heritage Knowledge</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-600 text-md font-bold cursor-pointer font-sans"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleShareSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Anand Patel"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full border border-slate-200/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Your Location</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Gujarat, India"
                    value={guestLocation}
                    onChange={(e) => setGuestLocation(e.target.value)}
                    className="w-full border border-slate-200/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Knowledge Title</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Rainwater Harvesting in Villages..."
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full border border-slate-200/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Category</label>
                  <select
                    value={catInput}
                    onChange={(e) => setCatInput(e.target.value)}
                    className="w-full border border-slate-200/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium bg-white"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Source</label>
                  <select
                    value={sourceInput}
                    onChange={(e) => setSourceInput(e.target.value)}
                    className="w-full border border-slate-200/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium bg-white"
                  >
                    <option value="Personal Experience">Personal Experience</option>
                    <option value="Family Tradition">Family Tradition</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain the practice details, traditional methods, and your direct observations..."
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  className="w-full border border-slate-200/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm focus:outline-none font-medium resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase block tracking-wide">Upload Image or Video</label>
                <div className="flex items-center justify-between border border-dashed border-slate-200 hover:border-blue-300 rounded-xl p-4 transition-colors cursor-pointer bg-slate-50 relative">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center space-x-3 pointer-events-none">
                    <span className="text-2xl">📸</span>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-slate-700">
                        {postImageFile ? postImageFile.name : "Select photo/video asset"}
                      </p>
                      <p className="text-[10px] text-slate-400">JPG, PNG, MP4 up to 10MB</p>
                    </div>
                  </div>
                </div>
                {postImageUrl && (
                  <img
                    src={postImageUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-xl mt-2 border border-slate-100"
                  />
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm shadow-blue-500/10"
                >
                  Post to Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Messaging Box */}
      {activeChatUser && (
        <div className="fixed bottom-0 right-4 w-80 bg-white border border-slate-200/80 shadow-2xl rounded-t-3xl z-40 overflow-hidden flex flex-col h-96 animate-in slide-in-from-bottom-6 duration-300">
          <div className="bg-blue-600 px-4 py-3 flex items-center justify-between text-white shadow-sm">
            <div className="flex items-center space-x-2">
              <img
                src={activeChatUser.avatar}
                alt={activeChatUser.name}
                className="w-8 h-8 rounded-full object-cover border border-white/20"
              />
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">{activeChatUser.name}</p>
                <p className="text-[9px] text-blue-100 leading-none">{activeChatUser.role} • {activeChatUser.location}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveChatUser(null)}
              className="text-white hover:text-blue-100 text-xs font-bold font-sans cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50 flex flex-col text-left">
            {(chatMessages[activeChatUser.name] || []).map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${msg.sender === "me"
                    ? "bg-blue-600 text-white self-end rounded-tr-none"
                    : "bg-white text-slate-700 self-start border border-slate-100 rounded-tl-none shadow-3xs"
                  }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bg-white text-slate-400 px-3.5 py-2.5 rounded-2xl rounded-tl-none border border-slate-100 self-start text-[10px] italic flex items-center space-x-1.5 animate-pulse shadow-3xs">
                <span>💬</span>
                <span>{activeChatUser.name} is writing...</span>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => handleSendMessage(e, activeChatUser.name)}
            className="p-3 border-t border-slate-100 bg-white flex space-x-2"
          >
            <input
              type="text"
              placeholder="Send message..."
              value={chatInputs[activeChatUser.name] || ''}
              onChange={(e) => setChatInputs({ ...chatInputs, [activeChatUser.name]: e.target.value })}
              className="flex-grow border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded-xl px-3 py-2 text-xs focus:outline-none font-medium"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-3xs"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* ============================================================
          REAL, BACKEND-WIRED SECTION — Mentor Discovery
          Everything below this block (the story feed, chat, share modal)
          is the original demo/mock UI, kept for visual continuity but not
          connected to a real posts/messaging API (the backend has none).
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                🤝 Find a Mentor
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                Real mentors from the Setu community, connected directly to your backend.
              </p>
            </div>
            <select
              value={mentorCategoryFilter}
              onChange={(e) => setMentorCategoryFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none focus:border-brand-primary bg-white"
            >
              <option value="All">All Categories</option>
              {BACKEND_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {mentorActionMsg && (
            <div className="mb-4 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-4 py-2.5 rounded-2xl">
              {mentorActionMsg}
            </div>
          )}

          {mentorsLoading ? (
            <div className="py-10 text-center">
              <div className="w-8 h-8 mx-auto border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : mentorsError ? (
            <div className="py-8 text-center text-xs font-semibold text-rose-500">{mentorsError}</div>
          ) : mentors.length === 0 ? (
            <div className="py-8 text-center text-xs font-semibold text-slate-400">
              No mentors found yet for this category. Create a mentor profile from your Profile page to be the first!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mentors.map((mentor) => (
                <div key={mentor.user_id} className="border border-slate-100 rounded-2xl p-4 space-y-2.5 hover:border-blue-200 transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800">{mentor.name || 'Setu Mentor'}</h4>
                    {mentor.rating_count > 0 && (
                      <span className="text-[10px] font-bold text-amber-500">★ {mentor.rating_avg?.toFixed(1)} ({mentor.rating_count})</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(mentor.expertise_categories || []).map((cat) => (
                      <span key={cat} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{cat}</span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold">{mentor.years_of_experience} yrs experience · {mentor.availability}</p>
                  <button
                    onClick={() => handleRequestMentor(mentor.user_id)}
                    disabled={requestingMentorId === mentor.user_id}
                    className="w-full mt-1 py-2 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer disabled:opacity-60"
                  >
                    {requestingMentorId === mentor.user_id ? 'Sending…' : 'Request Mentorship'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Feed and Sidebar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Feed Column (8 grid width) */}
          <div className="lg:col-span-8 space-y-6">

            {/* User Registration card (if not authenticated) */}
            {/* Share Knowledge Trigger Card */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 text-left shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3 flex-grow">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100">
                  ✍️
                </div>
                <div className="flex-grow">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-full text-left bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-400 hover:text-slate-500 text-xs px-4 py-3 rounded-2xl focus:outline-none transition-all cursor-pointer font-medium"
                  >
                    Share knowledge, recipes, or traditional crafts...
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowShareModal(true)}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm shadow-blue-500/10"
              >
                <span>Post</span>
              </button>
            </div>

            {/* Category Filter and Search widgets */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 text-left shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow flex items-center bg-slate-50 border border-slate-200/50 rounded-2xl p-1.5 focus-within:bg-white focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100/50 transition-all duration-300">
                  <span className="pl-3 text-slate-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search knowledge by title or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs focus:outline-none px-3 py-2 text-slate-800 placeholder-slate-400 font-medium"
                  />
                </div>
                <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/40 text-[10px] font-bold text-slate-450 uppercase whitespace-nowrap">
                  📄 {filteredStories.length} Verified Stories
                </div>
              </div>

              <div className="h-px bg-slate-100"></div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${selectedCategory === 'All'
                      ? 'bg-blue-600 text-white shadow-3xs'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                >
                  All Categories
                </button>
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(selectedCategory === c ? 'All' : c)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer ${selectedCategory === c
                        ? 'bg-blue-600 text-white shadow-3xs'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Stories List */}
            <div className="space-y-8">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden flex flex-col text-left transition-all duration-300 hover:shadow-sm"
                >
                  {/* Header: User, Location, Connections Button */}
                  <div className="p-5 flex items-center justify-between border-b border-slate-50">
                    <div className="flex items-center space-x-3">
                      {story.profilePic ? (
                        <img
                          src={story.profilePic}
                          alt={story.userName}
                          className="w-10 h-10 rounded-full object-cover border border-slate-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-sm">
                          {story.userName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-sm font-bold text-slate-900">{story.userName}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-semibold">{story.role}</span>
                        </div>
                        <p className="text-[10px] font-semibold text-slate-400">
                          {story.contributorTitle} • {story.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Connection state controls */}
                      {userProfile && userProfile.name !== story.userName && (
                        <>
                          {story.connectionStatus === 'none' && (
                            <button
                              onClick={() => handleConnectRequest(story.userName)}
                              className="px-3.5 py-1.5 border border-blue-200 text-blue-600 hover:bg-blue-50 text-[10px] font-bold rounded-xl transition-all cursor-pointer"
                            >
                              Connect
                            </button>
                          )}
                          {story.connectionStatus === 'pending' && (
                            <span className="px-3.5 py-1.5 border border-slate-200 text-slate-400 text-[10px] font-bold rounded-xl bg-slate-50 select-none">
                              Requested
                            </span>
                          )}
                          {story.connectionStatus === 'incoming' && (
                            <button
                              onClick={() => handleAcceptRequest(story.userName)}
                              className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-650 text-white text-[10px] font-bold rounded-xl transition-all cursor-pointer shadow-3xs"
                            >
                              Accept Request
                            </button>
                          )}
                          {story.connectionStatus === 'connected' && (
                            <button
                              onClick={() => setActiveChatUser({
                                name: story.userName,
                                avatar: story.profilePic || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
                                role: story.role,
                                location: story.location
                              })}
                              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-xl transition-all cursor-pointer shadow-3xs flex items-center space-x-1"
                            >
                              <span>💬</span>
                              <span>Message</span>
                            </button>
                          )}
                        </>
                      )}

                      <div className="text-right">
                        <span className="px-2 py-0.5 bg-slate-50 border border-slate-200/50 rounded-md text-[8px] font-bold text-slate-400 uppercase tracking-wide">
                          {story.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cover photo */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-50 border-b border-slate-50">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text contents */}
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] text-slate-400 font-semibold">{story.postedDate}</span>
                    <h3 className="text-md font-bold text-slate-900 leading-snug">{story.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed font-normal">{story.description}</p>
                  </div>

                  {/* Action controls row */}
                  <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleLike(story.id)}
                        className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${story.isLiked ? 'bg-red-50 text-red-650' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                          }`}
                      >
                        <span>❤️</span>
                        <span>{story.likes}</span>
                      </button>
                      <button
                        onClick={() => handleCommentToggle(story.id)}
                        className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${visibleComments[story.id] ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-100'
                          }`}
                      >
                        <span>💬</span>
                        <span>{story.comments.length}</span>
                      </button>
                      <button
                        onClick={() => handleBookmark(story.id)}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${story.isBookmarked ? 'bg-amber-50 text-amber-600' : 'text-slate-400 hover:bg-slate-100'
                          }`}
                        title="Bookmark"
                      >
                        <span>🔖</span>
                      </button>
                      <button
                        onClick={() => handleShare(story.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-all cursor-pointer"
                        title="Share"
                      >
                        <span>📤</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSummaryPost(story)}
                        className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-650 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-1"
                      >
                        <span>🤖</span>
                        <span>AI Summary</span>
                      </button>
                      <button
                        onClick={() => setReadMorePost(story)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-650 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                      >
                        Read More
                      </button>
                    </div>
                  </div>

                  {/* Comment box */}
                  {visibleComments[story.id] && (
                    <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Comments ({story.comments.length})</h4>

                      {story.comments.length > 0 ? (
                        <div className="space-y-2.5 max-h-40 overflow-y-auto">
                          {story.comments.map((c) => (
                            <div key={c.id} className="bg-white p-3 rounded-xl border border-slate-200/50 text-[11px]">
                              <p className="font-bold text-slate-800 mb-0.5">{c.author}</p>
                              <p className="text-slate-650 leading-relaxed font-normal">{c.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">No comments yet. Join the discussion!</p>
                      )}

                      <form onSubmit={(e) => handleAddComment(e, story.id)} className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Type your comment..."
                          value={commentInputs[story.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [story.id]: e.target.value })}
                          className="flex-grow bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none font-medium"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>

          {/* Sidebar Column (4 grid width) */}
          <div className="lg:col-span-4 space-y-6 text-left">

            {/* Community Guidelines card */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Community Space</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Welcome to Setu's open community feed! Here, you can explore, read, and share recipes, agricultural tips, traditional crafts, and life stories directly.
              </p>
              <div className="h-px bg-slate-100 my-2"></div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guidelines:</h4>
              <ul className="space-y-2.5 text-xs text-slate-600 font-semibold list-disc list-inside">
                <li>Respect ancestral traditions and stories.</li>
                <li>Share recipes, crafts, and farming tips.</li>
                <li>No registration or login needed.</li>
                <li>Posts are published instantly to the community.</li>
              </ul>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
