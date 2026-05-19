import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Seluruh Halaman Aplikasi MainPadel
import Home from './pages/Home';
import Booking from './pages/Booking';
import Tournament from './pages/Tournament';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import CheckEmail from './pages/CheckEmail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          {/* Halaman Utama (Landing Page) */}
          <Route path="/" element={<Home />} />
          
          {/* Menu Tab Navigasi Multi-Page */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/about" element={<About />} />
          
          {/* Sistem Autentikasi Supabase */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-email" element={<CheckEmail />} />
        </Routes>
      </div>
    </Router>
  );
}