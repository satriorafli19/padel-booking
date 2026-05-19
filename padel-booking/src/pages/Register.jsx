import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // Otomatis balik ke halaman login setelah user klik link di email
        emailRedirectTo: `${window.location.origin}/login`, 
      }
    });

    if (error) {
      alert("Gagal Mendaftar: " + error.message);
      setLoading(false);
    } else {
      alert("Pendaftaran berhasil dicatat!");
      // Lempar user ke halaman instruksi cek email
      navigate('/check-email', { state: { email } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800">Daftar Akun Baru</h2>
          <p className="text-sm text-gray-500 mt-1">Sistem Reservasi MainPadel Tangsel</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-gray-600">Alamat Email</label>
            <input type="email" required placeholder="nama@email.com" className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition text-sm" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-gray-600">Kata Sandi (Password)</label>
            <input type="password" required minLength="6" placeholder="Minimal 6 karakter" className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition text-sm" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition duration-200 shadow-md disabled:bg-gray-400">
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