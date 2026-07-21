import React, { useState, useEffect, useRef } from 'react';

export default function AuthModal({ isOpen, onClose, activeTab = 'login', setActiveTab, onLoginSuccess }) {
  // Signup role selector: 'User' or 'Expert'
  const [signupRole, setSignupRole] = useState('User');

  // Input fields for Sign Up
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupLocation, setSignupLocation] = useState('');
  const [signupAvatar, setSignupAvatar] = useState(null);

  // Expert specific fields
  const [signupExpertise, setSignupExpertise] = useState('');
  const [signupExperience, setSignupExperience] = useState('');
  const [signupBio, setSignupBio] = useState('');
  const [signupIdFileName, setSignupIdFileName] = useState('');

  // Log In fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // States for visual feedback & workflow screens
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showExpertSuccessScreen, setShowExpertSuccessScreen] = useState(false);
  const [blockedPendingExpert, setBlockedPendingExpert] = useState(null);

  // Camera streaming states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const certInputRef = useRef(null);

  // Clear states when opening/closing or switching tabs
  useEffect(() => {
    setErrorMsg('');
    setSuccessMsg('');
    setShowExpertSuccessScreen(false);
    setBlockedPendingExpert(null);
    stopCamera();
  }, [isOpen, activeTab]);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  if (!isOpen) return null;

  // Webcam Handlers
  async function startCamera() {
    setErrorMsg('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 50);
    } catch (err) {
      console.error('Camera access error:', err);
      setErrorMsg('Could not access camera. Please make sure camera permission is granted or upload a file.');
    }
  }

  function stopCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  }

  function capturePhoto() {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setSignupAvatar(dataUrl);
      stopCamera();
    }
  }

  // Device file upload handler
  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignupAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleCertUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setSignupIdFileName(file.name);
    }
  }

  function handleClose() {
    stopCamera();
    onClose();
  }

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Common validations
    if (!signupName.trim() || !signupEmail.trim() || !signupPhone.trim() || !signupPassword.trim() || !signupLocation.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    // Email pattern check
    if (!/\S+@\S+\.\S+/.test(signupEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Password strength check (min 6 characters, must contain letter and number)
    const hasLetter = /[a-zA-Z]/.test(signupPassword);
    const hasNumber = /[0-9]/.test(signupPassword);
    if (signupPassword.length < 6 || !hasLetter || !hasNumber) {
      setErrorMsg('Password must be at least 6 characters and contain both letters and numbers.');
      return;
    }

    // Avatar validation
    if (!signupAvatar) {
      setErrorMsg('Please select or capture a profile photo.');
      return;
    }

    // Expert validations
    if (signupRole === 'Expert') {
      if (!signupExpertise.trim() || !signupExperience.trim() || !signupBio.trim() || !signupIdFileName) {
        setErrorMsg('Please complete all expert information fields and upload a certificate/ID.');
        return;
      }
    }

    const savedUsers = localStorage.getItem('setu_registered_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const existingUser = users.find(u => u.email.toLowerCase() === signupEmail.toLowerCase());
    if (existingUser) {
      setErrorMsg('An account with this email already exists.');
      return;
    }

    const newUser = {
      name: signupName,
      email: signupEmail.toLowerCase(),
      phone: signupPhone,
      password: signupPassword,
      role: signupRole,
      location: signupLocation,
      avatar: signupAvatar,
      status: signupRole === 'User' ? 'Approved' : 'Pending',
      // Expert details
      expertise: signupRole === 'Expert' ? signupExpertise : 'General Member',
      experience: signupRole === 'Expert' ? signupExperience : '',
      bio: signupRole === 'Expert' ? signupBio : 'Setu community member.',
      certificateFile: signupRole === 'Expert' ? signupIdFileName : ''
    };

    users.push(newUser);
    localStorage.setItem('setu_registered_users', JSON.stringify(users));

    if (signupRole === 'User') {
      // Auto login user directly
      setSuccessMsg('Account created successfully! Logging you in...');
      setTimeout(() => {
        onLoginSuccess(newUser);
        handleClose();
        resetFields();
      }, 1200);
    } else {
      // Show Expert pending status confirmation view
      setShowExpertSuccessScreen(true);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const savedUsers = localStorage.getItem('setu_registered_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    const user = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword);
    if (!user) {
      setErrorMsg('Invalid email or password.');
      return;
    }

    // Check expert status approval
    if (user.role === 'Expert' && user.status === 'Pending') {
      setBlockedPendingExpert(user);
      return;
    }

    setSuccessMsg('Login successful! Welcome back.');
    setTimeout(() => {
      onLoginSuccess(user);
      handleClose();
      setLoginEmail('');
      setLoginPassword('');
    }, 1000);
  };

  const resetFields = () => {
    setSignupName('');
    setSignupEmail('');
    setSignupPhone('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setSignupLocation('');
    setSignupAvatar(null);
    setSignupExpertise('');
    setSignupExperience('');
    setSignupBio('');
    setSignupIdFileName('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-100 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 text-left">

        {/* Modal Header Tab Bar */}
        <div className="border-b border-slate-100 bg-slate-50/50 flex items-center justify-between px-6 pt-4">
          <div className="flex space-x-6">
            <button
              onClick={() => { setActiveTab('login'); setBlockedPendingExpert(null); }}
              className={`pb-3.5 text-sm font-bold tracking-wide transition-all relative ${activeTab === 'login' && !blockedPendingExpert ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Log In
              {activeTab === 'login' && !blockedPendingExpert && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setBlockedPendingExpert(null); }}
              className={`pb-3.5 text-sm font-bold tracking-wide transition-all relative ${activeTab === 'signup' ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Sign Up
              {activeTab === 'signup' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full animate-fade-in" />
              )}
            </button>
          </div>
          <button
            onClick={handleClose}
            className="pb-3.5 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[85vh]">

          {/* Pending Verification Blocker Screen */}
          {blockedPendingExpert ? (
            <div className="space-y-6 py-4 text-center">
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner border border-amber-100 animate-pulse">
                ⏳
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900">Application Pending Approval</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Hi <strong className="text-slate-800">{blockedPendingExpert.name}</strong>, your expert application is currently under review by our administrative team.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl max-w-sm mx-auto text-left space-y-2 text-xs">
                <p className="text-slate-555"><strong className="text-slate-700">Category:</strong> {blockedPendingExpert.expertise}</p>
                <p className="text-slate-555"><strong className="text-slate-700">Phone:</strong> {blockedPendingExpert.phone}</p>
                <p className="text-slate-555"><strong className="text-slate-700">Status:</strong> <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold uppercase text-[9px]">Under Review</span></p>
              </div>
              <p className="text-[11px] text-brand-primary font-semibold max-w-xs mx-auto">
                Your application has been submitted and is under review. You'll be notified once approved.
              </p>
              <button
                onClick={() => setBlockedPendingExpert(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          ) : showExpertSuccessScreen ? (
            /* Expert Signup Confirmation Screen */
            <div className="space-y-6 py-4 text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner border border-emerald-100">
                📝
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your details have been successfully uploaded to the Setu registration registry.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200/50 p-5 rounded-2xl max-w-sm mx-auto text-center">
                <p className="text-xs font-bold text-amber-800 leading-relaxed">
                  Your application has been submitted and is under review. You'll be notified once approved.
                </p>
              </div>
              <button
                onClick={() => { setShowExpertSuccessScreen(false); setActiveTab('login'); resetFields(); }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
              >
                Go to Log In
              </button>
            </div>
          ) : (
            /* Standard Auth form */
            <>
              {errorMsg && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold px-4 py-3 rounded-xl mb-4 text-left">
                  ⚠️ {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold px-4 py-3 rounded-xl mb-4 text-left">
                  ✨ {successMsg}
                </div>
              )}

              {activeTab === 'login' ? (
                /* Login Block */
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-light rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-light rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-brand-primary/10"
                  >
                    Log In
                  </button>
                </form>
              ) : (
                /* Signup Block */
                <form onSubmit={handleSignUpSubmit} className="space-y-4">

                  {/* Role Selector Toggles */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Select Your Account Type</label>
                    <div className="flex border border-slate-200 p-1 rounded-2xl bg-slate-50/50">
                      <button
                        type="button"
                        onClick={() => setSignupRole('User')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${signupRole === 'User'
                            ? 'bg-white text-brand-primary shadow-xs'
                            : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                        👤 User / Mentee
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignupRole('Expert')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${signupRole === 'Expert'
                            ? 'bg-white text-brand-primary shadow-xs'
                            : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                        🎓 Expert / Storyteller
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="E.g., Anand Patel"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="w-full border border-slate-200 focus:border-brand-primary rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="anand@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full border border-slate-200 focus:border-brand-primary rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="E.g., +91 9876543210"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        className="w-full border border-slate-200 focus:border-brand-primary rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Location</label>
                      <input
                        type="text"
                        required
                        placeholder="E.g., Gujarat, India"
                        value={signupLocation}
                        onChange={(e) => setSignupLocation(e.target.value)}
                        className="w-full border border-slate-200 focus:border-brand-primary rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Letter & digit, min 6 char"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full border border-slate-200 focus:border-brand-primary rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Confirm Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Re-enter password"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        className="w-full border border-slate-200 focus:border-brand-primary rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* CONDITIONAL EXPERT FIELD SECTIONS */}
                  {signupRole === 'Expert' && (
                    <div className="border-t border-slate-100 pt-4 space-y-4 animate-fade-in text-left">
                      <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Expert Qualifications</h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Area of Expertise</label>
                          <input
                            type="text"
                            required
                            placeholder="E.g. Herbal Remedies, Folk Dance"
                            value={signupExpertise}
                            onChange={(e) => setSignupExpertise(e.target.value)}
                            className="w-full border border-slate-200 focus:border-brand-primary rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Years of Experience</label>
                          <input
                            type="number"
                            required
                            placeholder="E.g. 15"
                            value={signupExperience}
                            onChange={(e) => setSignupExperience(e.target.value)}
                            className="w-full border border-slate-200 focus:border-brand-primary rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Short Biography</label>
                        <textarea
                          required
                          rows="2"
                          placeholder="Tell us about your background, stories, or teachings..."
                          value={signupBio}
                          onChange={(e) => setSignupBio(e.target.value)}
                          className="w-full border border-slate-200 focus:border-brand-primary rounded-xl px-4 py-2.5 text-xs focus:outline-none font-medium resize-none"
                        />
                      </div>

                      {/* ID / Certificate file upload */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Upload ID or Expert Certificate</label>
                        <div className="flex items-center space-x-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl relative">
                          <input
                            type="file"
                            ref={certInputRef}
                            onChange={handleCertUpload}
                            accept=".pdf,.png,.jpg,.jpeg"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => certInputRef.current?.click()}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-350 text-slate-700 text-[10px] font-extrabold uppercase rounded-lg transition-colors cursor-pointer"
                          >
                            Select File
                          </button>
                          <span className="text-[10px] text-slate-500 font-semibold truncate max-w-[200px]">
                            {signupIdFileName || 'No certificate selected (PDF, PNG, JPG)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Profile Photo */}
                  <div className="space-y-2 border-t border-slate-100 pt-4 text-left">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Profile Photo (Preview Required)</label>

                    {isCameraActive ? (
                      <div className="space-y-3">
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-200 shadow-inner">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover scale-x-[-1]"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={capturePhoto}
                            className="flex-grow py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                          >
                            Capture Photo
                          </button>
                          <button
                            type="button"
                            onClick={stopCamera}
                            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : signupAvatar ? (
                      <div className="flex items-center space-x-4 p-4 border border-slate-100 bg-slate-50/50 rounded-2xl">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-primary bg-white">
                          <img src={signupAvatar} alt="Profile preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-xs font-bold text-slate-700">Photo selected successfully</p>
                          <div className="flex space-x-3">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                            >
                              Change Photo
                            </button>
                            <button
                              type="button"
                              onClick={() => setSignupAvatar(null)}
                              className="text-[10px] font-bold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleAvatarUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-350 text-slate-700 text-[10px] font-extrabold uppercase rounded-lg transition-colors cursor-pointer"
                        >
                          📁 Upload Image
                        </button>
                        <button
                          type="button"
                          onClick={startCamera}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-350 text-slate-700 text-[10px] font-extrabold uppercase rounded-lg transition-colors cursor-pointer"
                        >
                          📷 Take Photo
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    {signupRole === 'User' ? 'Create Account' : 'Submit Application'}
                  </button>
                </form>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
