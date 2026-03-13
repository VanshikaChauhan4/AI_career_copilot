import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UploadResume from "./pages/UploadResume";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Roadmaptracker from "./pages/Roadmaptracker";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen bg-[#0f172a] text-white pt-20">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmaptracker />} />
          <Route path="/resumeanalyzer" element={<ResumeAnalyzer />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;