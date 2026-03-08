import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./pages/about";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import AdminServices from "./admin/AdminServices";
import Footer from "./components/Footer";
import ServiceDetail from "./pages/services/ServiceDetail";
import TestimonialSubmission from "./components/Testimonial/TestimonialSubmission";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  return (
    <Router>
      {/* ✅ Navbar & Footer ALWAYS visible - PUBLIC ACCESS */}
      <Navbar />
      
      <main style={{ minHeight: 'calc(100vh - 200px)', position: 'relative' }}>
        <Routes>
          {/* ✅ PUBLIC HOMEPAGE & SERVICES - NO LOGIN REQUIRED */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/services" element={<HeroSection />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          
          {/* ✅ PUBLIC PAGES */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* ✅ PUBLIC AUTH PAGES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* ✅ ADMIN PROTECTED ROUTE */}
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/testimonials" element={<TestimonialSubmission />} />
          {/* ✅ 404 CATCH-ALL - REDIRECT TO HOME */}
          <Route path="*" element={<HeroSection />} />
        </Routes>
      </main>

      {/* ✅ Footer ALWAYS visible */}
      <Footer />
    </Router>
  );
}

export default App;
