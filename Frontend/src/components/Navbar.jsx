import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to highlight the current page link
  const isActive = (path) => location.pathname === path;

  // Base style for Nav Links
  const linkStyle = (path) => `
    relative text-sm font-semibold transition-all duration-300 hover:text-indigo-400
    ${isActive(path) ? "text-indigo-400" : "text-slate-300"}
  `;

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
        
        {/* --- LOGO SECTION --- */}
        <Link to="/" className="flex items-center space-x-3 group outline-none">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/40 group-hover:rotate-6 transition-all duration-300">
            <span className="text-white font-black text-xl italic">C</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tighter text-white uppercase">Career</span>
            <span className="text-xs font-bold text-indigo-400 tracking-[0.2em] uppercase">Copilot</span>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="/" className={linkStyle("/")}>
            Home
            {isActive("/") && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 rounded-full" />}
          </Link>

          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            Dashboard
            {isActive("/dashboard") && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-500 rounded-full" />}
          </Link>
 {/* MAIN CALL TO ACTION BUTTON */}
          <Link to="/upload">
            <button className="relative group overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-2.5 rounded-xl text-sm font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-95 border border-indigo-400/30">
              <span className="relative z-10">Upload Resume</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </Link>
        </div>
         

        {/* --- MOBILE TOGGLE --- */}
        <button 
          className="md:hidden text-slate-300 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-slate-800 px-6 py-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={linkStyle("/")}>Home</Link>
          <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={linkStyle("/dashboard")}>Dashboard</Link>
          <Link to="/upload" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">Upload Resume</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

/** * ORGANIZED FEATURE CARD COMPONENT
 * You can import this or use it locally for your landing page grid.
 */
export const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="group p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col items-start text-left">
      <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Navbar;