import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

// Import Logo Baru MainPadel dari folder assets
import logoMainPadel from '../assets/logo-mainpadel.png';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`, 
      }
    });

    if (error) {
      alert("Gagal Mendaftar: " + error.message);
      setLoading(false);
    } else {
      alert("Pendaftaran berhasil dicatat!");
      navigate('/check-email', { state: { email } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* HEADER DENGAN LOGO RESMI */}
        <div className="flex flex-col items-center text-center mb-6">
          <img 
            src={logoMainPadel} 
            alt="MainPadel Logo" 
            className="h-20 w-auto object-contain mb-2" 
          />
          <p className="text-xs text-gray-450 italic max-w-[280px]">
            "Temukan Lapangan, Teman, dan Turnamen Padel Terbaikmu"
          </p>
          <div className="w-full border-t border-gray-100 my-4"></div>
          <h2 className="text-xl font-extrabold text-gray-800">Daftar Akun Baru</h2>
          <p className="text-xs text-gray-450 mt-0.5">Sistem Reservasi MainPadel Tangsel</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-gray-600">Alamat Email</label>
            <input type="email" required placeholder="nama@email.com" className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition text-sm text-gray-800" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-gray-600">Kata Sandi (Password)</label>
            <input type="password" required minLength="6" placeholder="Minimal 6 karakter" className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition text-sm text-gray-800" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition duration-200 shadow-md disabled:bg-gray-400 mt-2">
            {loading ? "Mengirim Email Verifikasi..." : "Daftar & Kirim Verifikasi"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Sudah punya akun? <Link to="/login" className="text-green-600 font-bold hover:underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}