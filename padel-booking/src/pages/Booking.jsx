import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

// Import Logo Baru MainPadel dari folder assets
import logoMainPadel from '../assets/logo-mainpadel.png';

export default function Booking() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // State Pilihan Booking
  const [tanggal, setTanggal] = useState('');
  const [lapangan, setLapangan] = useState('Lapangan A (Indoor)');
  const [durasi, setDurasi] = useState('1 Jam');

  // Cek Status Login Pengguna saat halaman dimuat
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  // Fungsi Log Out Akun
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    alert("Berhasil keluar akun.");
  };

  // Fungsi Proses Reservasi / Checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Proteksi: Jika user belum verifikasi/login, tendang ke halaman login
    if (!user) {
      alert("Kamu harus masuk akun terlebih dahulu untuk memesan lapangan!");
      navigate('/login');
      return;
    }

    setLoading(true);
    // Simulasi proses booking masuk database
    setTimeout(() => {
      alert(`Reservasi Sukses!\n${lapangan}\nTanggal: ${tanggal}\nDurasi: ${durasi}\n\nKonfirmasi pesanan telah dikirim ke email: ${user.email}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      
      {/* NAVBAR / HEADER UTAMA */}
      <nav className="bg-white shadow-sm border-b border-gray-100 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Sisi Kiri: Logo Baru Official */}
          <div className="flex items-center gap-3">
            <img 
              src={logoMainPadel} 
              alt="MainPadel Logo" 
              className="h-14 w-auto object-contain" 
            />
            <div className="hidden md:block border-l border-gray-200 pl-3">
              <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Slogan</p>
              <p className="text-xs text-gray-500 italic">"Temukan Lapangan, Teman, dan Turnamen Padel Terbaikmu"</p>
            </div>
          </div>

          {/* Sisi Kanan: Status Autentikasi User */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-green-800 truncate max-w-[150px]">
                  {user.email}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="text-xs bg-white text-red-600 px-2.5 py-1 rounded-full border border-red-200 font-bold hover:bg-red-50 transition"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-green-700 shadow-sm transition"
              >
                Masuk Akun
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* KONTEN UTAMA RESERVASI */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-5">
          
          {/* Sisi Kiri: Banner Info Lapangan Tangsel */}
          <div className="md:col-span-2 bg-gradient-to-br from-green-600 to-emerald-800 p-8 text-white flex flex-col justify-between">
            <div>
              <span className="bg-green-500/30 text-green-100 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                Lokasi: Tangsel
              </span>
              <h1 className="text-3xl font-extrabold mt-4 leading-tight">Main Padel Arena</h1>
              <p className="text-sm text-green-100/80 mt-2">
                Nikmati fasilitas lapangan padel terbaik dengan standar internasional, pencahayaan modern, dan area bersantai yang nyaman.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-green-500/40 text-xs space-y-2 text-green-100/90">
              <p className="flex items-center gap-2">⏱️ Buka: 06.00 - 22.00 WIB</p>
              <p className="flex items-center gap-2">📍 Jl. Padel Raya No. 12, Tangsel</p>
            </div>
          </div>

          {/* Sisi Kanan: Form Pilihan Jadwal */}
          <form onSubmit={handleCheckout} className="md:col-span-3 p-8 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Pilih Jadwal Bermain</h2>
              <p className="text-xs text-gray-400 mt-0.5">Silakan isi detail reservasi lapangan kamu.</p>
            </div>

            {/* Pilihan Lapangan */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Pilih Lapangan</label>
              <select 
                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium text-gray-700 transition"
                value={lapangan}
                onChange={(e) => setLapangan(e.target.value)}
              >
                <option>Lapangan A (Indoor)</option>
                <option>Lapangan B (Outdoor)</option>
                <option>Lapangan C (VIP Lounge)</option>
              </select>
            </div>

            {/* Pilihan Tanggal */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Tanggal Main</label>
              <input 
                type="date" 
                required
                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium text-gray-700 transition"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>

            {/* Pilihan Durasi */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Durasi Sewa</label>
              <select 
                className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm font-medium text-gray-700 transition"
                value={durasi}
                onChange={(e) => setDurasi(e.target.value)}
              >
                <option>1 Jam</option>
                <option>2 Jam</option>
                <option>3 Jam</option>
              </select>
            </div>

            {/* Tombol Aksi / Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white p-3.5 rounded-xl font-extrabold text-sm hover:bg-green-700 transition shadow-md disabled:bg-gray-300 mt-4"
            >
              {loading ? "Memproses Pemesanan..." : "Checkout Pemesanan Lapangan"}
            </button>
          </form>

        </div>
      </main>
    </div>
  );
}