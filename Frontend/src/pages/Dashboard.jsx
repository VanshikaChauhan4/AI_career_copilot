import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  AreaChart, Area, Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { 
  CheckCircle, AlertCircle, TrendingUp, Award, 
  Target, Lightbulb, Briefcase, Zap, Search, 
  Cpu, Layout, ShieldCheck, Rocket, Share2, Download
} from "lucide-react";

// --- CUSTOM STYLES & ANIMATIONS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const Dashboard = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    let storedResult = localStorage.getItem("careerCopilotResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
      let oldHistory = JSON.parse(localStorage.getItem("careerCopilotHistory")) || [];
      const newEntry = {
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        score: JSON.parse(storedResult).score
      };
      setHistory([newEntry, ...oldHistory].slice(0, 10));
    } else {
      const defaultResult = {
        score: 82,
        skillsFound: ["React.js", "Tailwind CSS", "Data Structures", "Node.js", "GraphQL"],
        missingSkills: ["Docker", "Kubernetes", "System Design", "CI/CD Pipeline"]
      };
      const defaultHistory = [
        { date: "Mar 01", score: 65 }, { date: "Mar 05", score: 72 }, { date: "Mar 10", score: 82 }
      ];
      setResult(defaultResult);
      setHistory(defaultHistory);
      localStorage.setItem("careerCopilotResult", JSON.stringify(defaultResult));
      localStorage.setItem("careerCopilotHistory", JSON.stringify(defaultHistory));
    }
  }, []);

  const radarData = useMemo(() => [
    { subject: "Frontend", A: 90, fullMark: 100 },
    { subject: "Backend", A: 75, fullMark: 100 },
    { subject: "System Design", A: 60, fullMark: 100 },
    { subject: "DSA", A: 85, fullMark: 100 },
    { subject: "DevOps", A: 50, fullMark: 100 }
  ], []);

  if (!result) return (
    <div className="h-screen w-full bg-[#020617] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* --- ADVANCED BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      </div>

      <motion.div 
        variants={containerVariants} initial="hidden" animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-12"
      >
        
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Neural Analysis Engine v4.0
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
              ENGINEERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 italic">LENS.</span>
            </h1>
            <p className="text-slate-500 font-mono text-xs">LOGGED_AS: VANSHIKA_CHAUHAN // STATUS: OPTIMIZED</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
            <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <Share2 size={20} className="group-hover:text-indigo-400" />
            </button>
            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
              <Download size={20} />
              EXPORT REPORT
            </button>
          </motion.div>
        </header>

        {/* --- MAIN DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. THE SCORE ORB */}
          <motion.div variants={itemVariants} className="lg:col-span-4 relative">
            <div className="h-full bg-gradient-to-b from-[#0a0f1e] to-[#020617] p-1 rounded-[2.5rem] border border-white/10 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-[scan_3s_infinite]" />
              
              <div className="p-10 flex flex-col items-center justify-center h-full">
                <Cpu className="text-indigo-400 mb-8 animate-pulse" size={32} />
                <div className="relative">
                  <svg className="w-64 h-64 transform -rotate-90">
                    <circle cx="128" cy="128" r="110" stroke="rgba(255,255,255,0.03)" strokeWidth="16" fill="transparent" />
                    <motion.circle 
                      cx="128" cy="128" r="110" stroke="url(#scoreGradient)" strokeWidth="16" fill="transparent"
                      strokeDasharray={691} initial={{ strokeDashoffset: 691 }}
                      animate={{ strokeDashoffset: 691 - (691 * result.score) / 100 }}
                      transition={{ duration: 2.5, ease: "circOut" }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span 
                      initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="text-8xl font-black text-white italic tracking-tighter"
                    >
                      {result.score}
                    </motion.span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em] mt-[-10px]">ATS_SCORE</span>
                  </div>
                </div>
                
                <div className="mt-10 grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Rank</p>
                    <p className="text-white font-bold tracking-tighter text-lg">TOP 4%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Status</p>
                    <p className="text-emerald-400 font-bold tracking-tighter text-lg">ELITE</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. THE NEURAL RADAR */}
          <motion.div variants={itemVariants} className="lg:col-span-8 bg-[#0a0f1e]/50 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                  <Target className="text-indigo-500" /> Skill Competency
                </h3>
                <Layout size={20} className="text-slate-700" />
             </div>
             
             <div className="h-[380px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart data={radarData}>
                   <PolarGrid stroke="rgba(255,255,255,0.05)" />
                   <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 11, fontWeight: 'bold' }} />
                   <Radar dataKey="A" stroke="#6366f1" strokeWidth={3} fill="#6366f1" fillOpacity={0.2} />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
          </motion.div>

          {/* 3. TREND ANALYSIS (FULL WIDTH) */}
          <motion.div variants={itemVariants} className="lg:col-span-8 bg-[#0a0f1e] p-10 rounded-[2.5rem] border border-white/10 overflow-hidden relative">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                <TrendingUp className="text-emerald-500" /> Growth Trajectory
              </h3>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Live_Sync</span>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12}} dy={10} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* 4. RECOMMENDED ROLES */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
               <Rocket className="absolute top-[-20px] right-[-20px] text-white/10 rotate-12 group-hover:scale-125 transition-transform" size={150} />
               <h3 className="text-lg font-black uppercase tracking-widest mb-6 relative z-10">Best Path</h3>
               <div className="space-y-4 relative z-10">
                  {["System Architect", "Senior Fullstack", "DevOps Engineer"].map((role, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                      <span className="font-bold text-sm">{role}</span>
                      <ShieldCheck size={16} />
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="bg-[#0a0f1e] p-8 rounded-[2.5rem] border border-white/10">
               <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Network_Match</h3>
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0f1e] bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                       U{i}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#0a0f1e] bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                    +12
                  </div>
               </div>
               <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">12 Recruiters from MAANG have profiles matching your skills.</p>
            </div>
          </motion.div>

          {/* 5. DUAL-SKILL REPOSITORY */}
          <motion.div variants={itemVariants} className="lg:col-span-12 grid md:grid-cols-2 gap-8">
             {/* Strengths */}
             <div className="bg-[#0a0f1e] p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <CheckCircle size={120} className="text-emerald-500" />
                </div>
                <h4 className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em] mb-8 italic">Validated_Strengths</h4>
                <div className="flex flex-wrap gap-3">
                  {result.skillsFound.map(skill => (
                    <span key={skill} className="px-5 py-2 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-xl uppercase tracking-widest hover:bg-emerald-500/20 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
             </div>

             {/* Gaps */}
             <div className="bg-[#0a0f1e] p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group hover:border-rose-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <AlertCircle size={120} className="text-rose-500" />
                </div>
                <h4 className="text-rose-400 font-black text-xs uppercase tracking-[0.4em] mb-8 italic">Growth_Opportunities</h4>
                <div className="flex flex-wrap gap-3">
                  {result.missingSkills.map(skill => (
                    <span key={skill} className="px-5 py-2 bg-rose-500/5 border border-rose-500/10 text-rose-400 text-[10px] font-bold rounded-xl uppercase tracking-widest hover:bg-rose-500/20 transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
             </div>
          </motion.div>

        </div>

        {/* --- AI INSIGHT FOOTER BAR --- */}
        <motion.div 
          variants={itemVariants}
          className="p-10 bg-gradient-to-r from-indigo-600/20 via-indigo-600/5 to-transparent border border-indigo-500/30 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 group"
        >
          <div className="h-16 w-16 min-w-[64px] rounded-[22px] bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-600/40 group-hover:rotate-12 transition-transform">
             <Lightbulb className="text-white" size={32} />
          </div>
          <div className="space-y-2">
             <p className="text-white font-black text-lg uppercase tracking-widest">Neural Suggestion Engine</p>
             <p className="text-indigo-200/60 leading-relaxed text-sm">
                Based on current market trends, adding <span className="text-white font-bold italic">"System Design Patterns"</span> to your project descriptions could increase your visibility for Lead roles by <span className="text-emerald-400 font-bold">22%</span>. 
                Focus on quantifying impact using the STAR method.
             </p>
          </div>
          <button className="md:ml-auto whitespace-nowrap px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
             Apply Optimization
          </button>
        </motion.div>

      </motion.div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};

export default Dashboard;