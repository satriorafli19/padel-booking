import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data secara Real-Time dari Supabase Lu
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Ambil 10 Lapangan
        const { data: courtsData, error: courtsError } = await supabase
          .from('courts')
          .select('*')
          .limit(10);
        
        // Ambil 10 Raket/Add-ons
        const { data: itemsData, error: itemsError } = await supabase
          .from('items')
          .select('*')
          .limit(10);

        if (courtsError) throw courtsError;
        if (itemsError) throw itemsError;

        setCourts(courtsData || []);
        setItems(itemsData || []);
      } catch (error) {
        console.error("Gagal memuat data Supabase:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <header className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
            ⚡ Arena Padel Terbesar di Tangsel
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight tracking-tight">
            Main Padel Kapan Saja <br />
            <span className="text-green-600">Tanpa Ribet Antre!</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Rasakan sensasi bermain padel tenis di lapangan berstandar internasional. Sistem reservasi online kami memudahkan kamu mengamankan slot jadwal sewa secara real-time.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => navigate('/booking')} 
              className="bg-green-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-700 shadow-xl shadow-green-600/20 transition-all transform hover:-translate-y-1 cursor-pointer text-sm"
            >
              Booking Lapangan Sekarang ➡️
            </button>
          </div>
        </div>

        {/* Banner Dekorasi Premium */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-3xl p-8 text-white min-h-[320px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-wide">MainPadel Arena</h3>
            <p className="text-xs text-green-100/80">Fasilitas Premium, Komunitas Seru di Tangerang Selatan.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t border-green-500/30 pt-6 text-center">
            <div><p className="text-2xl font-extrabold text-orange-400">10</p><p className="text-[10px] text-green-100/70 uppercase tracking-wider font-semibold">Pilihan Lapangan</p></div>
            <div><p className="text-2xl font-extrabold text-orange-400">10+</p><p className="text-[10px] text-green-100/70 uppercase tracking-wider font-semibold">Sewa Raket</p></div>
            <div><p className="text-2xl font-extrabold text-orange-400">06-22</p><p className="text-[10px] text-green-100/70 uppercase tracking-wider font-semibold">Jam Operasional</p></div>
          </div>
        </div>
      </header>

      {/* SECTION 1: DAFTAR 10 LAPANGAN DARI SUPABASE */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-800">🏟️ Jelajahi Lapangan Padel</h2>
          <p className="text-sm text-gray-500">Pilih arena terbaik di sekitar Tangsel sesuai dengan preferensi main lu.</p>
        </div>

        {loading ? (
          <div className="text-center py-12 font-medium text-gray-400">Sedang memuat arena keren untukmu...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courts.map((court) => (
              <div key={court.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <img src={court.image_url || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=500'} alt={court.name} className="w-full h-48 object-cover" />
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-gray-800 text-base line-clamp-1">{court.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{court.description || 'Fasilitas premium berstandar internasional.'}</p>
                  </div>
                </div>
                <div className="p-5 pt-0 border-t border-gray-50 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Harga Sewa</span>
                    <span className="text-sm font-extrabold text-green-600">Rp {court.price_per_hour.toLocaleString('id-ID')}<span className="text-[11px] text-gray-400 font-normal">/jam</span></span>
                  </div>
                  <button onClick={() => navigate('/booking')} className="bg-gray-900 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer">
                    Pesan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: DAFTAR 10 RAKET PADEL DARI SUPABASE */}
      <section className="bg-white border-t border-gray-100 py-16 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-800">🎾 Sewa Raket & Perlengkapan</h2>
            <p className="text-sm text-gray-500">Gak punya raket? Tenang, kami sediakan pilihan raket kelas dunia terpopuler.</p>
          </div>

          {loading ? (
            <div className="text-center py-12 font-medium text-gray-400">Memuat perlengkapan...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between hover:border-green-300 transition-all">
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-2 flex justify-center">
                      <img src={item.image_url || 'https://images.unsplash.com/photo-1617083934555-ac7d4fee8909?q=80&w=500'} alt={item.name} className="h-28 object-contain" />
                    </div>
                    <h4 className="font-bold text-xs text-gray-800 line-clamp-2 min-h-[32px]">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 line-clamp-2 leading-tight">{item.description}</p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-gray-200/60 flex items-center justify-between">
                    <span className="text-xs font-black text-gray-700">Rp {item.price.toLocaleString('id-ID')}</span>
                    <span className="text-[9px] bg-green-100 text-green-800 font-bold px-1.5 py-0.5 rounded-md">Ready</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}