import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import logoMainPadel from '../assets/logo-mainpadel.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    alert("Berhasil keluar akun.");
    navigate('/');
  };

  // Fungsi pembantu untuk menandai tab mana yang sedang aktif/dibuka
  const isActive = (path) => location.pathname === path ? "text-green-600 font-extrabold border-b-2 border-green-600" : "text-gray-600 font-medium hover:text-green-600";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-20">
        
        {/* Sisi Kiri: Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoMainPadel} alt="MainPadel Logo" className="h-14 w-auto object-contain" />
        </Link>

        {/* Sisi Tengah: Tab Navigasi Multi-Page */}
        <div className="hidden md:flex items-center space-x-8 h-full pt-1">
          <Link to="/" className={`pb-1 transition text-sm ${isActive('/')}`}>Beranda</Link>
          <Link to="/booking" className={`pb-1 transition text-sm ${isActive('/booking')}`}>Pesan Lapangan</Link>
          <Link to="/tournament" className={`pb-1 transition text-sm ${isActive('/tournament')}`}>Turnamen</Link>
          <Link to="/about" className={`pb-1 transition text-sm ${isActive('/about')}`}>Tentang Kami</Link>
        </div>

        {/* Sisi Kanan: Status Akun */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <span className="text-xs font-semibold text-green-800 truncate max-w-[120px]">{user.email}</span>
              <button onClick={handleLogout} className="text-[11px] bg-white text-red-600 px-2 py-0.5 rounded-full border border-red-200 font-bold hover:bg-red-50">Keluar</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-700 shadow-sm transition">Masuk</button>
          )}
        </div>

      </div>
    </nav>
  );
}