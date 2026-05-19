import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import semua halaman yang kita butuhkan
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import CheckEmail from './pages/CheckEmail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          {/* Halaman Utama: Reservasi Lapangan Tangsel */}
          <Route path="/" element={<Booking />} />
          
          {/* Halaman Autentikasi Sistem */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-email" element={<CheckEmail />} />
        </Routes>
      </div>
    </Router>
  );
}