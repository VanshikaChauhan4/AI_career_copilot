import React, { useState, useEffect } from "react";
import { analyzeResume } from "../utils/ResumeAnalyzer";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText, Sparkles, Loader, ShieldCheck, Zap } from "lucide-react";

const UploadResume = () => {
  const [resumeText, setResumeText] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("resumeDraft");
    if (saved) setResumeText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeDraft", resumeText);
  }, [resumeText]);

  const handleAnalyze = () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume first.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = analyzeResume(resumeText);
      localStorage.setItem("careerCopilotResult", JSON.stringify(result));
      navigate("/dashboard");
    }, 2000); // 2 seconds for a more 'premium' feel
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => setResumeText(reader.result);
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#020617] py-20 px-6 text-white relative overflow-hidden font-sans">
      
      {/* 3D Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* HEADER SECTION WITH REVEAL EFFECT */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2 animate-bounce">
            <Zap size={14} /> AI-Powered Analysis v3.0
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            UPLOAD <span className="text-indigo-500">RESUME.</span>
          </h2>
          <p className="text-slate-400 text-lg font-light max-w-xl mx-auto">
            Our neural network scans your credentials to decode your market value.
          </p>
        </div>

        {/* MAIN 3D CONTAINER */}
        <div className="grid gap-8 group perspective-1000">
          
          {/* DRAG DROP AREA - 3D Card Style */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFileUpload(e.dataTransfer.files[0]);
            }}
            className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all duration-500 transform-gpu hover:rotate-x-2 hover:rotate-y-2 ${
              dragging
                ? "border-indigo-500 bg-indigo-500/10 scale-95 shadow-[0_0_50px_rgba(79,70,229,0.3)]"
                : "border-slate-800 bg-slate-900/40 backdrop-blur-xl hover:border-slate-600 shadow-2xl"
            }`}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-[2rem]" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-700 group-hover:scale-110 transition-transform duration-500">
                <UploadCloud size={40} className="text-indigo-400 animate-pulse" />
              </div>
              <p className="text-2xl font-bold mb-2">Drop your blueprint here</p>
              <p className="text-sm text-slate-500 mb-8 font-mono">PDF • DOCX • TXT</p>
              
              <label className="cursor-pointer bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all shadow-lg active:scale-90 inline-block">
                Browse Files
                <input
                  type="file"
                  accept=".txt,.pdf,.docx"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* TEXTAREA AREA - Terminal Style */}
          <div className="relative group transition-all duration-500 transform-gpu hover:rotate-x-[-2deg]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0f1e] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800 bg-slate-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 ml-2 uppercase tracking-widest">Neural_Data_Input</span>
              </div>

              <textarea
                className="w-full h-80 p-8 bg-transparent text-slate-300 font-mono text-sm focus:outline-none placeholder:text-slate-700 resize-none leading-relaxed"
                placeholder="// Paste raw resume text content here for deep analysis..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />

              <div className="absolute bottom-4 left-6 flex items-center gap-2 text-[10px] text-slate-600 font-mono">
                <ShieldCheck size={12} className="text-indigo-500" /> Secure Encryption Active
              </div>

              <div className="absolute bottom-4 right-6 text-[10px] font-mono text-indigo-500/70 bg-indigo-500/5 px-2 py-1 rounded">
                LEN: {resumeText.length} CHR
              </div>
            </div>
          </div>

          {/* ANALYZE BUTTON - Mega Glow */}
          <div className="relative pt-4">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={`relative w-full py-6 rounded-2xl font-black text-lg tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden group ${
                loading ? "cursor-not-allowed" : "active:scale-95 shadow-[0_20px_50px_rgba(79,70,229,0.3)]"
              }`}
            >
              {/* Button Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] group-hover:bg-right transition-all duration-1000" />
              
              <div className="relative z-10 flex items-center gap-3">
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={24} />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                    Initialize Analysis
                  </>
                )}
              </div>
              
              {/* Shine effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
            </button>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase">
          <span className="flex items-center gap-2 hover:text-slate-400 transition-colors cursor-default">
            <div className="w-1 h-1 rounded-full bg-indigo-500" /> Privacy Protocol V.2
          </span>
          <span className="flex items-center gap-2 hover:text-slate-400 transition-colors cursor-default">
            <div className="w-1 h-1 rounded-full bg-indigo-500" /> Neural Match OCR
          </span>
        </div>
      </div>

      {/* Tailwind Custom Class Suggestions (Add to your global CSS) */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-x-2 { transform: rotateX(2deg); }
        .rotate-y-2 { transform: rotateY(2deg); }
        .animate-shine { animation: shine 1.5s infinite; }
        @keyframes shine {
          100% { left: 125%; }
        }
        .animate-spin-slow { animation: spin 3s linear infinite; }
      `}</style>
    </div>
  );
};

export default UploadResume;