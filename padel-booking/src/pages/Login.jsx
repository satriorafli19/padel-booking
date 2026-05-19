import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // State Data Input Email & Password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fungsi Login Utama menggunakan Supabase Auth
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ 
      email: email, 
      password: password 
    });
    
    if (error) {
      alert("Gagal Masuk: " + error.message);
    } else {
      alert("Login Sukses! Selamat datang di MainPadel.");
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        {/* Header Form */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800">Masuk Akun</h2>
          <p className="text-sm text-gray-500 mt-1">Sistem Reservasi Lapangan Padel Tangsel</p>
        </div>

        {/* Form Login Email */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-gray-600">
              Alamat Email
            </label>
            <input 
              type="email" 
              required 
              placeholder="nama@email.com" 
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition text-sm text-gray-800" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-gray-600">
              Kata Sandi (Password)
            </label>
            <input 
              type="password" 
              required 
              placeholder="••••••••" 
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition text-sm text-gray-800" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          {/* Tombol Submit */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition duration-200 shadow-md disabled:bg-gray-400 mt-2"
          >
            {loading ? "Memproses Masuk..." : "Masuk Sekarang"}
          </button>
        </form>

        {/* Tautan ke Halaman Register */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Belum punya akun? <Link to="/register" className="text-green-600 font-bold hover:underline">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}