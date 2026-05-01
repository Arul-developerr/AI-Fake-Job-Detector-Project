import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import ScanResults from "./pages/ScanResults/ScanResults";
import JobDetail from "./pages/JobDetail/JobDetail";
import About from "./pages/About/About";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scan-results" element={<ScanResults />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
