import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <header className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full">⚡ Arena Padel Terbesar di Tangsel</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight">
            Main Padel Kapan Saja <br />
            <span className="text-green-600">Tanpa Ribet Antre!</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Rasakan sensasi bermain padel tenis di lapangan berstandar internasional. Sistem reservasi online kami memudahkan kamu mengamankan slot jadwal sewa secara *real-time*.
          </p>
          <div className="pt-2">
            <button onClick={() => navigate('/booking')} className="bg-green-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-700 shadow-lg shadow-green-600/20 transition transform hover:-translate-y-0.5 text-sm">
              Booking Lapangan Sekarang ➡️
            </button>
          </div>
        </div>

        {/* Gambar Dekorasi Keren */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-3xl p-8 text-white min-h-[300px] flex flex-col justify-between shadow-xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-black">MainPadel Arena</h3>
            <p className="text-xs text-green-100/80">Fasilitas Premium, Komunitas Seru.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t border-green-500/30 pt-6 text-center">
            <div><p className="text-xl font-bold">3</p><p className="text-[10px] text-green-100/70">Pilihan Lapangan</p></div>
            <div><p className="text-xl font-bold">100+</p><p className="text-[10px] text-green-100/70">Member Aktif</p></div>
            <div><p className="text-xl font-bold">06-22</p><p className="text-[10px] text-green-100/70">Jam Operasional</p></div>
          </div>
        </div>
      </header>

      {/* SECTION FITUR UTAMA */}
      <section className="bg-white py-16 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-lg mx-auto mb-12">
            <h2 className="text-2xl font-black text-gray-800">Kenapa Harus MainPadel?</h2>
            <p className="text-xs text-gray-400 mt-1">Layanan terbaik untuk kenyamanan berolahraga kamu dan teman-teman.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100"><div className="text-2xl mb-3">🏟️</div><h4 className="font-bold text-gray-800 mb-1">Fasilitas Kelas Dunia</h4><p className="text-xs text-gray-500">Pilihan Lapangan Indoor & Outdoor dengan karpet turf premium standar dunia.</p></div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100"><div className="text-2xl mb-3">⏰</div><h4 className="font-bold text-gray-800 mb-1">Sistem Jadwal Akurat</h4><p className="text-xs text-gray-500">Verifikasi instan via email memastikan jam sewa kamu aman tanpa bentrok.</p></div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100"><div className="text-2xl mb-3">🏆</div><h4 className="font-bold text-gray-800 mb-1">Turnamen & Komunitas</h4><p className="text-xs text-gray-500">Ikuti liga bulanan komunitas untuk mengasah skill bermain padel kamu.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}