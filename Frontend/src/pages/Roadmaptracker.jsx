import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Sparkles, Download, Target, BarChart, Clock, BookOpen, Layers, Terminal, Cpu, Zap, Box } from "lucide-react";

function RoadmapGenerator() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [hours, setHours] = useState("");
  const [resume, setResume] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // LOAD SAVED ROADMAP FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("careerRoadmap");
    if (saved) {
      const data = JSON.parse(saved);
      setGoal(data.goal || "");
      setLevel(data.level || "");
      setHours(data.hours || "");
      setResume(data.resume || "");
      setRoadmap(data.roadmap || "");
      setTasks(data.tasks || []);
      setProjects(data.projects || []);
      setQuestions(data.questions || []);
    }
  }, []);

  // GENERATE ROADMAP WITHOUT BACKEND
  const generateRoadmap = () => {
    if (!goal) {
      alert("Please select a target role");
      return;
    }
    setLoading(true);

    const roadmapDatabase = {
      "Frontend Engineer": {
        phase1: ["Learn HTML, CSS fundamentals", "Understand Flexbox and Grid", "Master JavaScript basics", "Practice DOM manipulation"],
        phase2: ["Learn React fundamentals", "Build reusable UI components", "State management basics", "Responsive design principles"],
        phase3: ["Build full portfolio website", "Create 3 production-level projects", "Learn performance optimization", "Prepare frontend interview questions"],
        projects: ["Personal Portfolio Website", "E-commerce UI using React", "Weather App with API", "Dashboard UI project"]
      },
      "Backend Engineer": {
        phase1: ["Learn programming fundamentals", "Understand HTTP and APIs", "Learn Node.js basics", "Database fundamentals (SQL)"],
        phase2: ["Build REST APIs", "Authentication systems", "Work with MongoDB", "Learn API security"],
        phase3: ["Build scalable backend system", "Deploy backend apps", "Learn Docker basics", "System design basics"],
        projects: ["Authentication API", "Blog Backend", "REST API with MongoDB", "Microservice architecture demo"]
      },
      "AI Engineer": {
        phase1: ["Learn Python basics", "Mathematics for ML", "NumPy and Pandas", "Data visualization"],
        phase2: ["Machine learning algorithms", "Model training", "Scikit-learn", "Data preprocessing"],
        phase3: ["Deep learning basics", "Neural networks", "Deploy ML models", "Build AI applications"],
        projects: ["Spam Detection Model", "Movie Recommendation System", "Chatbot Project", "AI Resume Analyzer"]
      }
    };

    const selected = roadmapDatabase[goal];
    const roadmapText = `Phase 1\n${selected.phase1.join("\n")}\n\nPhase 2\n${selected.phase2.join("\n")}\n\nPhase 3\n${selected.phase3.join("\n")}`;
    const combinedTasks = [...selected.phase1, ...selected.phase2, ...selected.phase3];
    const interviewQuestions = ["Explain the fundamentals of this role.", "Describe a project you built.", "What challenges did you face while learning?", "How would you scale your solution?"];

    setRoadmap(roadmapText);
    setTasks(combinedTasks);
    setProjects(selected.projects);
    setQuestions(interviewQuestions);

    const dataToSave = { goal, level, hours, resume, roadmap: roadmapText, tasks: combinedTasks, projects: selected.projects, questions: interviewQuestions };
    localStorage.setItem("careerRoadmap", JSON.stringify(dataToSave));
    setLoading(false);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("roadmap-section");
    const canvas = await html2canvas(element, { backgroundColor: "#0f172a", scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("AI-Roadmap-Nexus.pdf");
  };

  return (
    <section className="min-h-screen py-20 bg-[#020617] text-slate-200 selection:bg-indigo-500/30 font-sans relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md">
            <Cpu size={14} className="animate-spin-slow" /> Neural Path Engine v2.0
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
            NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-400 to-indigo-500">.GEN</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Input your professional DNA and let our AI architect a precision-guided career roadmap specifically for you.
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Context Input */}
          <div className="lg:col-span-7 space-y-8">
            <div className="group relative p-8 rounded-[2rem] border border-white/5 bg-white/5 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
              <div className="relative space-y-4">
                <label className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-[0.2em]">
                  <Layers size={16} /> Professional Data Context
                </label>
                <textarea
                  placeholder="// Paste your resume, skills, or career objective here..."
                  className="w-full h-64 p-6 bg-slate-950/50 border border-slate-800 rounded-2xl text-slate-300 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                  onChange={(e) => setResume(e.target.value)}
                  value={resume}
                />
              </div>
            </div>
          </div>

          {/* Right Side: Options */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Target Role Selector */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-md">
              <label className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">
                <Target size={14} /> Intelligence Objective
              </label>
              <div className="space-y-2">
                {["Frontend Engineer", "Backend Engineer", "AI Engineer"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group ${
                      goal === g
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                        : "bg-slate-900/50 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300"
                    }`}
                  >
                    <span className="font-bold text-sm">{g}</span>
                    <Zap size={14} className={`${goal === g ? "text-indigo-400" : "opacity-0 group-hover:opacity-100"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Proficiency & Time Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-md">
                <label className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] block mb-3">Proficiency</label>
                <select 
                  className="w-full bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="" disabled className="bg-slate-900">Select</option>
                  {["Beginner", "Intermediate", "Advanced"].map(l => (
                    <option key={l} value={l} className="bg-slate-900">{l}</option>
                  ))}
                </select>
              </div>

              <div className="p-5 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-md">
                <label className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] block mb-3">Daily Meta</label>
                <select 
                  className="w-full bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                >
                  <option value="" disabled className="bg-slate-900">Time</option>
                  {["1 hour", "2 hours", "4 hours"].map(h => (
                    <option key={h} value={h} className="bg-slate-900">{h}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateRoadmap}
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-50 rounded-[1.5rem] font-black text-white text-sm tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-indigo-900/20 active:scale-95 transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  PROCESSING DNA...
                </div>
              ) : (
                <>
                  <Sparkles size={18} />
                  GENERATE ARCHITECTURE
                </>
              )}
            </button>
          </div>
        </div>

        {/* Roadmap Display Section */}
        {roadmap && (
          <div className="mt-24 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Box className="text-emerald-400" />
                GENERATED_SYSTEM_PATH
              </h3>
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-xs font-bold tracking-widest"
              >
                <Download size={16} /> EXPORT_DATA.PDF
              </button>
            </div>

            <div 
              id="roadmap-section" 
              className="relative p-12 rounded-[3rem] border border-white/10 bg-gradient-to-b from-slate-900 to-[#020617] shadow-inner overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Cpu size={200} />
              </div>
              <div className="relative z-10 font-mono leading-relaxed space-y-12">
                {roadmap.split('\n\n').map((phase, idx) => (
                  <div key={idx} className="space-y-6">
                    <div className="inline-block px-4 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold rounded-lg">
                      MODULE_0{idx + 1}
                    </div>
                    <div className="text-slate-300 whitespace-pre-line text-lg bg-white/5 p-8 rounded-2xl border border-white/5">
                      {phase}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="max-w-6xl mx-auto mt-24 py-12 border-t border-white/5 flex justify-between items-center text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase">
        <span>© 2026 Nexus Labs Architecture</span>
        <div className="flex gap-6">
          <span className="hover:text-indigo-400 cursor-pointer">Security</span>
          <span className="hover:text-indigo-400 cursor-pointer">Neural Link</span>
        </div>
      </footer>
    </section>
  );
}

export default RoadmapGenerator;