import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingCart, Calendar, FileText, Sparkles, Send, Plus, Trash2, Video, Wand2, Play, Pause, Volume2, RefreshCw, Film } from 'lucide-react';

export default function ProductDemos({ activeDemo, onClose }) {
  if (!activeDemo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 transition-colors bg-white border-slate-200 text-slate-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full transition-all bg-slate-100 hover:bg-slate-200 text-slate-600"
        >
          <X className="w-6 h-6" />
        </button>

        {activeDemo === 'ai-video' && <AiVideoDemo />}
        {activeDemo === 'billing' && <BillingDemo />}
        {activeDemo === 'invitation' && <InvitationDemo />}
        {activeDemo === 'ats' && <AtsCvDemo />}

      </div>
    </div>
  );
}

// 1. Billing POS Interactive Demo Component
function BillingDemo() {
  const [items, setItems] = useState([
    { id: 1, name: 'Web Development Package', price: 15000, qty: 1 },
    { id: 2, name: 'Logo & Flex Banner Design', price: 3500, qty: 1 },
  ]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [customerName, setCustomerName] = useState('Rahul Sharma');

  const addItem = () => {
    if (!itemName || !itemPrice) return;
    setItems([
      ...items,
      { id: Date.now(), name: itemName, price: parseFloat(itemPrice), qty: 1 }
    ]);
    setItemName('');
    setItemPrice('');
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="p-3 rounded-2xl bg-blue-50 text-[#0077B6] border border-blue-200">
          <ShoppingCart className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase text-[#0077B6]">Interactive POS Simulation</span>
          <h3 className="text-2xl font-bold text-[#0A192F]">Custom POS Billing & Inventory Software</h3>
        </div>
      </div>

      <p className="text-sm mb-6 text-slate-600">
        Test our lightning-fast billing interface below. Add custom line items, auto-calculate GST/taxes, and generate instant printable digital invoices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: POS Item Entry */}
        <div className="md:col-span-7 p-5 rounded-2xl border space-y-4 bg-slate-50 border-slate-200">
          <h4 className="text-sm font-bold mb-2 text-[#0A192F]">Invoice Details & Line Items</h4>
          
          <div>
            <label className="text-xs text-slate-600 font-semibold">Client / Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full mt-1 px-3.5 py-2 rounded-xl border text-sm focus:outline-none bg-white border-slate-300 text-slate-900 focus:border-[#0077B6]"
            />
          </div>

          <div className="grid grid-cols-7 gap-2">
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="col-span-4 px-3.5 py-2 rounded-xl border text-xs focus:outline-none bg-white border-slate-300 text-slate-900 focus:border-[#0077B6]"
            />
            <input
              type="number"
              placeholder="Price ₹"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              className="col-span-2 px-3.5 py-2 rounded-xl border text-xs focus:outline-none bg-white border-slate-300 text-slate-900 focus:border-[#0077B6]"
            />
            <button
              onClick={addItem}
              className="col-span-1 p-2 rounded-xl bg-[#0077B6] text-white font-bold flex items-center justify-center hover:bg-[#00B4D8] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border text-xs bg-white border-slate-200">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-slate-500">₹{item.price.toLocaleString()} x {item.qty}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#0077B6]">₹{(item.price * item.qty).toLocaleString()}</span>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Receipt Preview */}
        <div className="md:col-span-5 bg-white text-slate-900 p-5 rounded-2xl font-mono text-xs shadow-xl flex flex-col justify-between border border-slate-300">
          <div>
            <div className="text-center pb-3 mb-3 border-b border-dashed border-slate-300">
              <h5 className="font-bold text-sm tracking-wider uppercase">FourDouble Solutions POS</h5>
              <p className="text-[10px] text-slate-500">Retail & Service Billing System</p>
              <p className="text-[10px] text-slate-500">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <p className="mb-2 font-bold">Client: <span className="font-normal">{customerName}</span></p>

            <div className="space-y-1 mb-4 border-b border-dashed border-slate-300 pb-3">
              {items.map(i => (
                <div key={i.id} className="flex justify-between">
                  <span className="truncate max-w-[140px]">{i.name}</span>
                  <span>₹{i.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-right">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST (18%):</span>
                <span>₹{gst.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-900">
                <span>TOTAL PAID:</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 text-center border-t border-dashed border-slate-300 text-[10px] text-slate-500">
            *** Thank You For Your Business ***
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-semibold">PAID ONLINE</span>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-6 flex justify-end">
        <a
          href="https://wa.me/919562896069?text=Hi%20FourDouble%20Solutions%2C%20I%20want%20a%20demo%20and%20quote%20for%20your%20Custom%20Billing%20POS%20Software."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0077B6] font-bold text-white text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:scale-105 transition-transform"
        >
          <Send className="w-4 h-4" />
          <span>Get Custom POS Billing Software</span>
        </a>
      </div>
    </div>
  );
}

// 2. Digital Invitation Card Interactive Demo Component
function InvitationDemo() {
  const [eventName, setEventName] = useState('Grand Product Launch');
  const [hostName, setHostName] = useState('FourDouble Solutions');
  const [eventDate, setEventDate] = useState('2026-09-25');
  const [venue, setVenue] = useState('Cyber Park Convention Hall');
  const [rsvpd, setRsvpd] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase text-purple-600">Interactive Digital Card</span>
          <h3 className="text-2xl font-bold text-[#0A192F]">Smart Digital Invitation Cards</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="md:col-span-5 p-5 rounded-2xl border space-y-3 bg-slate-50 border-slate-200">
          <h4 className="text-sm font-bold mb-2 text-[#0A192F]">Card Customizer</h4>
          
          <div>
            <label className="text-xs text-slate-600 font-semibold">Event Title</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full mt-1 px-3.5 py-2 rounded-xl border text-xs focus:outline-none bg-white border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-semibold">Host / Organizer</label>
            <input
              type="text"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full mt-1 px-3.5 py-2 rounded-xl border text-xs focus:outline-none bg-white border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-semibold">Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full mt-1 px-3.5 py-2 rounded-xl border text-xs focus:outline-none bg-white border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-semibold">Venue</label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full mt-1 px-3.5 py-2 rounded-xl border text-xs focus:outline-none bg-white border-slate-300 text-slate-900"
            />
          </div>
        </div>

        {/* Right Digital Card Live Preview */}
        <div className="md:col-span-7 bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 p-8 rounded-3xl border border-purple-500/30 text-center relative overflow-hidden flex flex-col items-center justify-between min-h-[320px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold tracking-widest uppercase">
              You're Cordially Invited
            </span>

            <h4 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-400 font-serif">
              {eventName}
            </h4>

            <p className="text-xs text-purple-200">Hosted by <span className="font-bold text-white">{hostName}</span></p>
          </div>

          <div className="my-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-purple-500/30 w-full max-w-xs space-y-1 text-xs">
            <p className="text-slate-300">📅 Date: <span className="font-semibold text-white">{eventDate}</span></p>
            <p className="text-slate-300">📍 Venue: <span className="font-semibold text-white">{venue}</span></p>
          </div>

          <button
            onClick={() => setRsvpd(!rsvpd)}
            className={`w-full max-w-xs py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              rsvpd
                ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:scale-105'
            }`}
          >
            {rsvpd ? <Check className="w-5 h-5" /> : <Sparkles className="w-4 h-4" />}
            <span>{rsvpd ? 'RSVP Confirmed!' : 'Tap to RSVP Now'}</span>
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <a
          href="https://wa.me/919562896069?text=Hi%20FourDouble%20Solutions%2C%20I%20want%20to%20order%20Custom%20Digital%20Invitation%20Cards."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-white text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:scale-105 transition-transform"
        >
          <Send className="w-4 h-4" />
          <span>Order Custom Digital Invitations</span>
        </a>
      </div>
    </div>
  );
}

// 3. ATS CV Demo Component
function AtsCvDemo() {
  const [role, setRole] = useState('Full Stack Developer');
  const [score, setScore] = useState(96);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase text-emerald-600">Interactive Resume Optimizer</span>
          <h3 className="text-2xl font-bold text-[#0A192F]">ATS-Friendly CV Generation</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 p-5 rounded-2xl border space-y-4 bg-slate-50 border-slate-200">
          <h4 className="text-sm font-bold mb-2 text-[#0A192F]">Resume Optimization Controls</h4>
          
          <div>
            <label className="text-xs text-slate-600 font-semibold">Target Role / Industry</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setScore(e.target.value === 'Full Stack Developer' ? 96 : 94);
              }}
              className="w-full mt-1 px-3.5 py-2 rounded-xl border text-xs focus:outline-none bg-white border-slate-300 text-slate-900"
            >
              <option>Full Stack Developer</option>
              <option>Cloud & Systems Architect</option>
              <option>UI/UX Designer & Product Lead</option>
              <option>Business Analyst & Operations</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-xs font-semibold text-emerald-700">Simulated ATS Compatibility Score</span>
            <div className="text-4xl font-extrabold text-emerald-600 my-1">{score}%</div>
            <p className="text-[11px] text-slate-600 font-medium">Passes Taleo, Workday, Greenhouse & Lever HR Scanners</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Check className="w-4 h-4 text-emerald-500" /> Standard Parsing Font & Clean Headings
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Check className="w-4 h-4 text-emerald-500" /> Action-Verb Bullet Point Optimization
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Check className="w-4 h-4 text-emerald-500" /> Keyword Density & Metric Alignment
            </div>
          </div>
        </div>

        {/* Right CV Output */}
        <div className="md:col-span-7 bg-white text-slate-900 p-6 rounded-2xl text-xs space-y-3 shadow-xl border border-slate-300">
          <div className="border-b border-slate-300 pb-3">
            <h4 className="text-lg font-bold text-slate-900">ALEX MORGAN</h4>
            <p className="text-slate-600 font-semibold">{role}</p>
            <p className="text-[10px] text-slate-500">alex.morgan@email.com | +91 9876543210 | linkedin.com/in/alexmorgan</p>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1 mb-1">
              Professional Experience
            </h5>
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between font-bold">
                  <span>Senior Engineer - Tech Corp</span>
                  <span>2024 - Present</span>
                </div>
                <ul className="list-disc list-inside text-slate-600 space-y-0.5 pl-1 text-[10px]">
                  <li>Architected scalable microservices, improving application speed by 42%.</li>
                  <li>Led cross-functional team of 6 engineers using Agile methodologies.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1 mb-1">
              Core Competencies & Keywords
            </h5>
            <p className="text-slate-700 text-[10px]">
              React, Next.js, Node.js, REST APIs, SQL, Agile Project Management, AWS Deployment, UI Design.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <a
          href="https://wa.me/919562896069?text=Hi%20FourDouble%20Solutions%2C%20I%20want%20to%20build%20an%20ATS-Friendly%20CV."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-white text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform"
        >
          <Send className="w-4 h-4" />
          <span>Build My ATS Resume Now</span>
        </a>
      </div>
    </div>
  );
}

// 4. AI Video Generation & Studio Interactive Demo Component
function AiVideoDemo() {
  const [promptText, setPromptText] = useState('Create a futuristic 4K commercial promo video featuring a sleek tech product, dynamic particle lighting, and an energetic AI presenter avatar voiceover.');
  const [selectedStyle, setSelectedStyle] = useState('Product Commercial');
  const [aspectRatio, setAspectRatio] = useState('9:16 (Reels & Shorts)');
  const [voiceType, setVoiceType] = useState('Cinematic English (Male)');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [genStepText, setGenStepText] = useState('');
  const [generatedSuccess, setGeneratedSuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const presets = [
    { title: 'Product Commercial', prompt: 'Cinematic 4K promo video showcasing a luxury tech product with dynamic 3D camera sweeps and studio lighting.' },
    { title: 'AI Avatar Spokesperson', prompt: 'Photorealistic AI presenter delivering an engaging brand introduction in 4K resolution with natural lip-syncing.' },
    { title: 'Viral Instagram Reel', prompt: 'Fast-paced, energetic short-form reel with bold animated text captions, sound effects, and high-retention hooks.' },
  ];

  const handlePresetSelect = (preset) => {
    setSelectedStyle(preset.title);
    setPromptText(preset.prompt);
    setGeneratedSuccess(false);
    setIsPlaying(false);
  };

  const handleGenerate = () => {
    if (!promptText) return;
    setIsGenerating(true);
    setProgress(5);
    setGenStepText('Parsing AI script prompt...');
    setGeneratedSuccess(false);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGeneratedSuccess(true);
          setIsPlaying(true);
          return 100;
        }
        const next = prev + 15;
        if (next < 30) setGenStepText('Analyzing text prompt & scene structure...');
        else if (next < 60) setGenStepText('Generating photorealistic 4K AI video frames...');
        else if (next < 85) setGenStepText('Synthesizing studio-quality AI voiceover...');
        else setGenStepText('Finalizing MP4 video render & color grade...');
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isGenerating]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
          <Video className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase text-purple-600">Client Video Production Workflow</span>
          <h3 className="text-2xl font-bold text-[#0A192F]">Custom AI Video Generation for Clients</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Control Panel */}
        <div className="md:col-span-5 p-5 rounded-2xl border space-y-4 bg-slate-50 border-slate-200">
          <h4 className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-600" />
            <span>Client Script & Brand Requirements</span>
          </h4>

          {/* Presets */}
          <div>
            <label className="text-xs text-slate-600 font-semibold mb-1 block">Client Requirement Use Cases</label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => handlePresetSelect(p)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                    selectedStyle === p.title
                      ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-purple-300'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-600 font-semibold mb-1 block">Client Script / Custom Video Prompt</label>
            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none bg-white border-slate-300 text-slate-900 focus:border-purple-600 resize-none font-medium"
              placeholder="Enter client script or video guidelines..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-600 font-semibold mb-1 block">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-xs bg-white border-slate-300 text-slate-900"
              >
                <option>9:16 (Reels & Shorts)</option>
                <option>16:9 (Landscape HD)</option>
                <option>1:1 (Square Feed)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600 font-semibold mb-1 block">AI Voice Presenter</label>
              <select
                value={voiceType}
                onChange={(e) => setVoiceType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-xs bg-white border-slate-300 text-slate-900"
              >
                <option>Cinematic English (Male)</option>
                <option>Professional Tech (Female)</option>
                <option>Hype Indian English</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              isGenerating
                ? 'bg-purple-400 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:scale-[1.02] text-white shadow-purple-500/25'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Processing Client Specs ({progress}%)</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-purple-200" />
                <span>{generatedSuccess ? 'Re-Simulate Client Render' : 'Simulate Video Generation'}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Live Video Preview Player */}
        <div className="md:col-span-7 bg-slate-950 text-white p-6 rounded-3xl border border-purple-500/30 flex flex-col justify-between relative overflow-hidden min-h-[340px]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="flex items-center justify-between z-10 border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">AI Video Generator Studio</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
              4K HDR 60FPS
            </span>
          </div>

          {/* Simulated Video Canvas */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-900 border border-slate-800 text-center min-h-[200px]">
            {isGenerating ? (
              <div className="space-y-4 w-full max-w-xs">
                <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 animate-bounce">
                  <Wand2 className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-purple-200">{genStepText}</p>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-purple-500/30">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : generatedSuccess ? (
              <div className="space-y-4 w-full">
                {/* AI Avatar / Presenter Visual Canvas */}
                <div className="relative mx-auto w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="AI Presenter Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                  {isPlaying && (
                    <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white border border-slate-900">
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Spoken Caption Overlay */}
                <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-purple-500/30 max-w-sm mx-auto text-xs text-purple-100 font-mono shadow-lg">
                  <span className="text-pink-400 font-bold">"</span>
                  {selectedStyle === 'Product Commercial'
                    ? 'Introducing the next frontier in innovation. Designed for performance, crafted for perfection.'
                    : selectedStyle === 'AI Avatar Spokesperson'
                    ? 'Welcome to FourDouble Solutions. We transform concepts into high-converting 4K digital video experiences.'
                    : 'Stop scrolling! Here is how generative AI is transforming modern digital video production in 2026.'}
                  <span className="text-pink-400 font-bold">"</span>
                </div>

                {/* Subtitle / Voice Equalizer */}
                {isPlaying && (
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-1 h-4 bg-purple-400 rounded animate-pulse" />
                    <span className="w-1 h-6 bg-pink-400 rounded animate-pulse delay-75" />
                    <span className="w-1 h-3 bg-cyan-400 rounded animate-pulse delay-150" />
                    <span className="w-1 h-7 bg-purple-400 rounded animate-pulse delay-100" />
                    <span className="w-1 h-4 bg-pink-400 rounded animate-pulse" />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                  <Film className="w-7 h-7" />
                </div>
                <h5 className="text-sm font-bold text-slate-200">Ready to Render AI Video</h5>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click 'Generate AI Video Now' to launch the generative rendering pipeline simulation.
                </p>
              </div>
            )}
          </div>

          {/* Interactive Player Controls */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between z-10 text-xs">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={!generatedSuccess}
              className={`p-2 rounded-xl border flex items-center gap-2 font-bold transition-all ${
                generatedSuccess
                  ? 'bg-purple-600/30 border-purple-500/50 text-purple-200 hover:bg-purple-600/50'
                  : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-pink-400" /> : <Play className="w-4 h-4 text-purple-400" />}
              <span>{isPlaying ? 'Pause Video' : 'Play Preview'}</span>
            </button>

            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span>{isPlaying ? '00:06 / 00:15' : '00:00 / 00:15'}</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300">{aspectRatio}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <a
          href="https://wa.me/919562896069?text=Hi%20FourDouble%20Solutions%2C%20I%20want%20to%20order%20Custom%20AI%20Video%20Generation%20based%20on%20my%20client%20requirements."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 font-bold text-white text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:scale-105 transition-transform"
        >
          <Send className="w-4 h-4" />
          <span>Order Custom AI Video to Client Requirements</span>
        </a>
      </div>
    </div>
  );
}
