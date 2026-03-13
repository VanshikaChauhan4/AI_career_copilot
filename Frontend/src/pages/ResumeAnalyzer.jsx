import React, { useState, useEffect } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import * as pdfjsLib from "pdfjs-dist";
import { Upload, Brain, Terminal, History, Sparkles, FileText, AlertCircle, Download, Target, Zap, ChevronRight } from "lucide-react";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ResumeAnalyzer = () => {
  const [dragging, setDragging] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("resumeHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveHistory = (entry) => {
    const updated = [entry, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("resumeHistory", JSON.stringify(updated));
  };

  const analyzeResume = async (text) => {
    if (!text || !text.trim()) {
      alert("Please paste resume text");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/analyze-resume", { resumeText: text });
      const data = response.data;
      const stats = {
        experienceScore: data.score,
        skillMatch: data.score,
        atsScore: data.score,
        maangScore: data.score,
        foundSkills: data.strengths || [],
        missingSkills: data.missingSkills || [],
        // New Mock Data for New Features
        roleMatch: "Full Stack Engineer",
        priority: "High"
      };
      setAnalysis(stats);
      saveHistory({ date: new Date().toLocaleTimeString(), score: data.score });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("AI analysis failed");
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    if (file.type === "application/pdf") { extractPDFText(file); } 
    else {
      const reader = new FileReader();
      reader.onload = () => { analyzeResume(reader.result); };
      reader.readAsText(file);
    }
  };

  const extractPDFText = async (file) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const typedarray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        content.items.forEach(item => { text += item.str + " "; });
      }
      analyzeResume(text);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <section className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-12 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />

      <header className="max-w-7xl mx-auto mb-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-4 uppercase tracking-widest">
            <Zap size={14} /> AI Powered V2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            RESUME<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">LABS.</span>
          </h1>
          <p className="text-slate-400 text-lg mt-4 max-w-xl leading-relaxed">
            Optimize your career trajectory with our neural-engine analysis. Uncover hidden gaps and boost your ATS ranking instantly.
          </p>
        </div>
        
        {/* HISTORY MINI-WIDGET */}
        <div className="flex gap-3">
          {history.map((h, i) => (
            <div key={i} className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl hover:border-indigo-500/50 transition-all">
              <span className="block text-[8px] text-slate-500 font-bold uppercase">{h.date}</span>
              <span className="text-lg font-black text-indigo-400">{h.score}%</span>
            </div>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT: INPUTS (7 COLS) */}
        <div className="lg:col-span-7 space-y-8">
          {/* UPLOAD ZONE */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
            className={`group relative border-2 border-dashed rounded-[2.5rem] p-12 text-center transition-all duration-500 overflow-hidden ${
              dragging ? "border-indigo-500 bg-indigo-500/5 shadow-2xl scale-[0.99]" : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                <Upload size={32} className="text-indigo-400 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Architect Your Future</h3>
              <p className="text-slate-400 mb-8">Drop your PDF or DOCX here to begin neural scan</p>
              <label className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-2xl transition-all cursor-pointer shadow-lg shadow-indigo-900/40 inline-block active:scale-95">
                Select Resume
                <input type="file" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
              </label>
            </div>
          </div>

          {/* TEXT AREA AREA */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg"><Terminal size={20} className="text-indigo-400"/></div>
              <h3 className="text-xl font-bold text-white">Direct Raw Input</h3>
            </div>
            <textarea
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-6 text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none font-mono text-sm"
              rows="8"
              placeholder="// Paste your resume text content here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button
              onClick={() => analyzeResume(textInput)}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 py-5 rounded-2xl font-black text-white uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? <Brain className="animate-spin" /> : <Sparkles size={20} />}
              {loading ? "Decrypting Resume..." : "Initialize Analysis"}
            </button>
          </div>
        </div>

        {/* RIGHT: RESULTS (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {!analysis && !loading && (
            <div className="h-full min-h-[500px] border-2 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-600 p-12 text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 opacity-20">
                <FileText size={40} />
              </div>
              <p className="text-lg font-medium">Waiting for system input... <br/>Upload a file to generate intelligence report.</p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[500px] bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center">
              <div className="relative">
                <Brain size={64} className="text-indigo-500 animate-pulse" />
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-ping" />
              </div>
              <p className="mt-8 text-indigo-400 font-bold tracking-[0.2em] uppercase text-sm">Synchronizing Data...</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              {/* PRIMARY SCORE */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h4 className="text-indigo-100 font-bold uppercase tracking-widest text-xs mb-2">Neural Match Score</h4>
                    <span className="text-7xl font-black text-white leading-none">{analysis.maangScore}%</span>
                  </div>
                  <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <Download size={20} />
                  </button>
                </div>
                <div className="mt-6 flex items-center gap-2 text-indigo-100/80 text-sm font-medium">
                  <Target size={16} /> Best Suited Role: <span className="text-white font-bold">{analysis.roleMatch}</span>
                </div>
                <Brain size={180} className="absolute -right-12 -bottom-12 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              </div>

              {/* RADAR */}
              <div className="bg-slate-900/80 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" /> Statistical Breakdown
                </h3>
                <div className="h-64">
                  <Radar
                    data={{
                      labels: ["Experience", "Skills", "ATS", "MAANG"],
                      datasets: [{
                        label: "Score",
                        data: [analysis.experienceScore, analysis.skillMatch, analysis.atsScore, analysis.maangScore],
                        backgroundColor: "rgba(99,102,241,0.2)",
                        borderColor: "#6366f1",
                        borderWidth: 3,
                        pointBackgroundColor: "#fff",
                      }]
                    }}
                    options={{
                      scales: {
                        r: { 
                          grid: { color: "rgba(255,255,255,0.05)" },
                          angleLines: { color: "rgba(255,255,255,0.05)" },
                          pointLabels: { color: "#64748b", font: { weight: 'bold' } },
                          ticks: { display: false }
                        }
                      },
                      plugins: { legend: { display: false } }
                    }}
                  />
                </div>
              </div>

              {/* NEW FEATURE: AI ROADMAP */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Growth Roadmap</h3>
                 <div className="space-y-4">
                    {analysis.missingSkills.slice(0,3).map((skill, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-2xl group hover:border-indigo-500/50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xs">{idx+1}</div>
                          <span className="text-sm font-semibold text-slate-300">Learn {skill}</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400" />
                      </div>
                    ))}
                 </div>
              </div>

              {/* GAPS */}
              <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-[2.5rem]">
                <div className="flex items-center gap-2 mb-6 text-red-400">
                  <AlertCircle size={18} />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Skill Gaps</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((s, i) => (
                    <span key={i} className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:bg-red-500/20 cursor-default">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-24 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm font-medium">
        <p>© 2026 ResumeLabs AI • Engineered for the elite.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Protocol</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Neural Network Status</a>
        </div>
      </footer>
    </section>
  );
};

export default ResumeAnalyzer;