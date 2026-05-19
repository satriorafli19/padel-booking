import React from 'react';
import Navbar from '../components/Navbar';
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-black text-gray-800">📍 Tentang MainPadel Arena</h1>
        <p className="text-xs text-gray-400 mt-2">Berlokasi di pusat kota Tangerang Selatan. Menyediakan 3 lapangan premium berstandar internasional.</p>
      </div>
    </div>
  );
}