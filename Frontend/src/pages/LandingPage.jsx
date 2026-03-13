import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Download, Target, BarChart, Clock, BookOpen, Layers, Terminal, Zap, ChevronRight, Cpu } from "lucide-react";

const LandingPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const cardsRef = useRef([]); 
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const scrollPercentage = Math.min(Math.max(rect.top / window.innerHeight, 0), 1);
          const scale = 1 - (scrollPercentage * 0.05);
          const opacity = 1 - (scrollPercentage * 0.3);
          card.style.transform = `scale(${scale})`;
          card.style.opacity = opacity;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const layerStyle = (depth) => ({
    transform: `translate3d(${mousePos.x * depth}px, ${mousePos.y * depth}px, 0)`,
    transition: 'transform 0.2s ease-out'
  });

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden bg-[#020617] text-slate-200 selection:bg-indigo-500/30 font-sans leading-relaxed">
      {/* 🌌 THE SYSTEM DEBUG ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617] perspective-[1500px]">
        
        {/* 1. THE ARCHITECTURE MESH */}
        <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out"
             style={{ transform: `rotateX(${70 + mousePos.y * 3}deg) rotateZ(${mousePos.x * 1}deg) translateZ(-50px)` }}>
          <div className="absolute inset-[-100%] opacity-[0.1]"
               style={{
                 backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
                 backgroundSize: '40px 40px',
               }} />
        </div>

        {/* 2. DATA PACKETS */}
        <div className="absolute inset-0">
          {[
            { val: "0xAF42", label: "PTR_NULL", x: 10, y: 15, z: 120, color: "blue" },
            { val: "::1/128", label: "LOCAL_HOST", x: 85, y: 25, z: 40, color: "indigo" },
            { val: "f32", label: "VEC_FLOAT", x: 20, y: 80, z: 90, color: "sky" },
            { val: "push", label: "STACK_OPS", x: 75, y: 75, z: 150, color: "emerald" },
            { val: "HEAD", label: "GIT_MAIN", x: 50, y: 45, z: -20, scale: 0.7, color: "rose" },
            { val: "8080", label: "PORT_LIST", x: 40, y: 10, z: 180, color: "amber" },
          ].map((packet, i) => (
            <div
              key={i}
              className="absolute flex items-start space-x-2 transition-all duration-1000"
              style={{
                left: `${packet.x}%`,
                top: `${packet.y}%`,
                transform: `translate3d(${mousePos.x * packet.z}px, ${mousePos.y * packet.z}px, 0) scale(${packet.scale || 1})`,
                opacity: 0.4,
              }}
            >
              <div className={`px-2 py-1 font-mono text-[9px] border-l-2 border-${packet.color}-500 bg-${packet.color}-500/5 text-white/40`}>
                <span className="block font-black tracking-tighter text-white/80">{packet.val}</span>
                <span className="text-[7px] opacity-40">{packet.label}</span>
              </div>
              <div className={`w-[1px] h-12 bg-gradient-to-b from-${packet.color}-500/40 to-transparent`} />
            </div>
          ))}
        </div>

        {/* 3. THE "LASER" CROSSHAIR */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute h-px w-full bg-indigo-500/10" style={{ top: `${(mousePos.y + 1) * 50}%` }} />
          <div className="absolute w-px h-full bg-indigo-500/10" style={{ left: `${(mousePos.x + 1) * 50}%` }} />
        </div>

        {/* 4. DEPTH BLOOM & NOISE */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-60" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-screen" />
      </div>  

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 
          className="text-[12vw] md:text-[9vw] font-black leading-[0.8] tracking-tighter mb-8 transition-transform duration-300 ease-out"
          style={{ 
            transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`,
          }}
        >
          <span className="block bg-gradient-to-r from-indigo-500 via-blue-400 to-emerald-400 bg-clip-text text-transparent italic">AI CAREER COPILOT</span>
        </h1>

        <p className="max-w-xl text-slate-400 text-base md:text-lg font-light mb-12 leading-relaxed">
          Bridging the gap to <span className="text-white font-medium">MAANG</span> through high-fidelity ATS parsing, neural DSA tracking, and decentralized validation.
        </p>

        <div className="flex flex-col md:flex-row gap-5">
          <button 
            onClick={() => navigate('/roadmap')}
            className="group relative px-10 py-4 bg-white text-[#020617] rounded-sm font-black text-xs uppercase tracking-widest transition-all hover:bg-indigo-50 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10">Launch Analyzer</span>
            <div className="absolute inset-0 border border-white group-hover:scale-110 opacity-0 group-hover:opacity-20 transition-all duration-500" />
          </button>

          <button 
            onClick={() => setShowInfo(true)}
            className="px-10 py-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-sm font-bold text-xs text-white uppercase tracking-widest transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            Know More
          </button>
        </div>

        <div className="absolute bottom-10 left-10 opacity-20 hidden md:block">
          <div className="flex flex-col items-center gap-4">
            <span className="[writing-mode:vertical-lr] text-[8px] uppercase tracking-[0.6em] text-white font-bold">Scroll_to_Explore</span>
            <div className="w-px h-20 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </section>

      {/* --- INFORMATION TERMINAL OVERLAY --- */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-xl transition-all duration-500">
          <div className="relative w-full max-w-2xl bg-[#0a0f1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.03] border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              </div>
              <button 
                onClick={() => setShowInfo(false)}
                className="text-slate-500 hover:text-white transition-colors font-mono text-[10px] tracking-widest"
              >
                [ ESC_TO_EXIT ]
              </button>
            </div>
            <div className="p-8 md:p-12 space-y-10">
              <div className="space-y-4">
                <h3 className="text-indigo-400 font-mono text-[10px] tracking-[0.3em] uppercase">/ / SYSTEM_OBJECTIVE</h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light italic">
                  "To engineer a seamless transition from academic theory to industry-level mastery using autonomous career-pathing algorithms."
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-5 border border-white/5 bg-white/[0.01] rounded-lg group hover:border-indigo-500/20 transition-colors">
                  <h4 className="text-white text-[11px] font-bold mb-3 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-indigo-500"></span> 01. ATS OPTIMIZER
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Synthesizing resume architecture based on high-frequency semantic keywords used by top-tier tech recruiters.
                  </p>
                </div>
                <div className="p-5 border border-white/5 bg-white/[0.01] rounded-lg group hover:border-emerald-500/20 transition-colors">
                  <h4 className="text-white text-[11px] font-bold mb-3 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-500"></span> 02. NEURAL DSA TRACK
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Adaptive learning engine that monitors algorithmic solving patterns to identify and bridge logic gaps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- THE "WHY" SECTION: NEURAL ARCHITECT --- */}
      <section className="relative z-10 py-40 bg-[#020617] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.15) 1px, transparent 0)` , backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="relative">
            <div className="absolute -left-12 top-0 w-1 h-32 bg-gradient-to-b from-indigo-500 to-transparent hidden lg:block" />
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.8] mb-10">
              BEAT THE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 italic">ALGORITHM.</span>
            </h2>
            <p className="text-xl text-slate-400 font-light mb-12 max-w-lg leading-relaxed">
              Companies don't read resumes anymore—<span className="text-white font-mono">Heuristic Parsers</span> do. We reverse-engineered the logic to make you undeniable.
            </p>
            <div className="relative space-y-6">
              {[
                { step: "01", title: "Semantic Analysis", color: "from-blue-500", desc: "Targeting hidden MAANG keywords." },
                { step: "02", title: "Impact Quantifier", color: "from-indigo-500", desc: "Turning tasks into verified growth metrics." },
                { step: "03", title: "Logic Mapping", color: "from-emerald-500", desc: "Matching your tech stack to job DNA." }
              ].map((item, i) => (
                <div key={i} className="group relative flex items-center gap-6 p-4 rounded-xl transition-all hover:bg-white/[0.03]">
                  <span className={`text-4xl font-black opacity-10 group-hover:opacity-100 transition-opacity bg-gradient-to-b ${item.color} bg-clip-text text-transparent`}>
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-white font-bold tracking-widest text-xs uppercase">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                  </div>
                  <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} to-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)]`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-indigo-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            <div className="relative bg-[#050a18]/80 backdrop-blur-2xl border border-white/10 p-1 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-gpu transition-transform duration-700 group-hover:rotate-1 group-hover:scale-[1.02]">
              <div className="bg-[#0a0f1e] rounded-[2.8rem] p-10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[scanMove_4s_ease-in-out_infinite] opacity-50" />
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[length:100%_4px]" />
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-end border-b border-white/5 pb-8">
                    <div className="space-y-3">
                      <div className="h-2 w-40 bg-indigo-500/40 rounded-full" />
                      <div className="h-2 w-24 bg-white/10 rounded-full" />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 font-mono mb-1">SCORE_ANALYSIS</div>
                      <div className="text-4xl font-black text-white">88<span className="text-indigo-500 text-sm">/100</span></div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 group/note hover:border-emerald-500/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Pattern_Matched</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-1.5 w-full bg-white/20 rounded-full" />
                        <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
                      </div>
                      <div className="absolute -right-4 -top-4 bg-emerald-600 text-white text-[9px] px-3 py-1 rounded-md font-bold opacity-0 group-hover/note:opacity-100 transition-all translate-y-2 group-hover/note:translate-y-0">
                        +15% MATCH
                      </div>
                    </div>
                    <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 group/note hover:border-indigo-500/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">Contextual_Injection</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-1.5 w-5/6 bg-white/20 rounded-full" />
                        <div className="h-1.5 w-1/2 bg-white/10 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex gap-2">
                      {['React', 'System Design', 'Algorithms'].map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-bold uppercase tracking-tighter">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 lg:right-[-10%] bg-white text-black p-6 rounded-2xl shadow-2xl max-w-[200px] animate-bounce-slow">
               <div className="flex items-center gap-2 mb-2">
                 <span className="text-lg">🤖</span>
                 <span className="text-[10px] font-black uppercase tracking-tighter">AI_ADVISOR</span>
               </div>
               <p className="text-[11px] leading-snug font-medium">
                 "Your experience with <b>Node.js</b> matches <b>94%</b> of Amazon's SDE requirements."
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PATHFINDER CTA SECTION --- */}
      <section className="relative py-32 overflow-hidden bg-[#0a0f1a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                <Zap size={14} /> New Feature
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
                Neural <span className="text-indigo-500">Pathfinder_</span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed max-w-lg">
                Stop guessing. Let our AI analyze your current skill gap and architect a personalized 12-week execution roadmap.
              </p>
              <button 
                onClick={() => navigate('/roadmap')}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-indigo-500 hover:text-white transition-all duration-300"
              >
                INITIALIZE GENERATOR
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div onClick={() => navigate('/roadmap')} className="relative cursor-pointer group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-[2rem] p-8 overflow-hidden">
                <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  <span className="ml-4 font-mono text-xs text-slate-500">roadmap_engine.sh</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <p className="text-emerald-400 flex gap-2">
                    <span className="text-slate-600 font-bold tracking-tighter"> {">"} </span> Analyzing resume.json...
                  </p>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[65%] animate-[pulse_2s_infinite]" />
                  </div>
                  <p className="text-indigo-300 flex gap-2">
                    <span className="text-slate-600 font-bold tracking-tighter"> {">"} </span> Gap identified: System Design Lvl 2
                  </p>
                  <div className="p-4 border border-indigo-500/30 bg-indigo-500/5 rounded-xl border-dashed">
                    <p className="text-xs text-slate-400 uppercase mb-2 tracking-widest">Project Suggested:</p>
                    <p className="text-white font-bold">Distributed Rate Limiter in Go</p>
                  </div>
                </div>
                <Cpu className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12 group-hover:text-indigo-500/10 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- AI RESUME ANALYZER PREVIEW --- */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5 blur-[150px]" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] font-black tracking-[0.4em] text-indigo-500 mb-6">
              AI CAREER INTELLIGENCE
            </p>
            <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter mb-8">
              Analyze Your <br/>
              <span className="text-indigo-500">Resume Instantly</span>
            </h2>
            <p className="text-slate-400 max-w-lg mb-10">
              Upload your resume and our AI engine scans skills, ATS compatibility,
              and missing technologies required for top tech companies.
            </p>
            <button
              onClick={() => navigate("/ResumeAnalyzer")}
              className="group relative z-30 px-10 py-5 bg-indigo-600 rounded-full text-lg font-black text-white
              hover:bg-indigo-500 transition-all active:scale-95 shadow-[0_20px_60px_rgba(79,70,229,0.4)] cursor-pointer"
            >
              Try Resume Analyzer →
            </button>
          </div>
        </div>
      </section>
      {/* --- FOOTER --- */}
      <footer className="relative z-10 bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-20">
          <div className="col-span-2">
            <div className="text-2xl font-black tracking-tighter mb-6 underline decoration-indigo-500">CAREER_COPILOT</div>
            <p className="text-slate-500 max-w-sm">
              Empowering the next generation of Indian engineers through AI-driven career intelligence and blockchain-verified proof of skill.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] font-black text-white tracking-[0.4em] uppercase">Navigation</div>
            <div className="flex flex-col space-y-2 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Analyzer</a>
              <a href="#" className="hover:text-white transition-colors">Roadmaps</a>
              <a href="#" className="hover:text-white transition-colors">Community</a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] font-black text-white tracking-[0.4em] uppercase">Connect</div>
            <div className="flex flex-col space-y-2 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-white/5 text-center text-[10px] font-mono text-slate-700 tracking-[0.5em] uppercase">
          Build for the 2026-2028 Tech Cycle // v4.0.1 Stable
        </div>
      </footer>

      <style>{`
        @keyframes scanMove {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;