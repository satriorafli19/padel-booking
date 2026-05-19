import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);
  const [items, setItems] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [selectedItems, setSelectedItems] = useState({});
  const [summary, setSummary] = useState({ courtTotal: 0, addonTotal: 0, grandTotal: 0 });
  const [loading, setLoading] = useState(false);

  // Daftar jam operasional lapangan padel
  const operationalHours = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

  // 1. FUNGSI UTAMA: Ambil katalog lapangan & raket dari Supabase
  useEffect(() => {
    async function initData() {
      const { data: courtData, error: courtErr } = await supabase.from('courts').select('*');
      const { data: itemData, error: itemErr } = await supabase.from('items').select('*');
      
      // Log pembantu untuk ngecek data di tab Console browser (F12)
      console.log("Data Lapangan Terdeteksi:", courtData);
      console.log("Data Raket Terdeteksi:", itemData);
      if (courtErr) console.error("Kendala Lapangan ASLI:", courtErr.message, courtErr.details);
if (itemErr) console.error("Kendala Raket ASLI:", itemErr.message, itemErr.details);

      if (courtData && courtData.length > 0) {
        setCourts(courtData);
        setSelectedCourt(courtData[0]); // Set default ke lapangan pertama
      }
      if (itemData && itemData.length > 0) {
        setItems(itemData);
      }
    }
    initData();
  }, []);

  // 2. REAL-TIME SLOT CHECKER: Ambil jam yang sudah dibooking orang lain
  useEffect(() => {
    if (!selectedCourt || !bookingDate) return;
    async function checkAvailability() {
      const { data, error } = await supabase
        .from('bookings')
        .select('start_time, end_time')
        .eq('court_id', selectedCourt.id)
        .eq('booking_date', bookingDate)
        .not('status', 'eq', 'dibatalkan');
      
      if (error) console.error("Gagal cek slot:", error);
      setBookedSlots(data || []);
    }
    checkAvailability();
  }, [selectedCourt, bookingDate]);

  // 3. KALKULATOR OTOMATIS: Hitung total harga lapangan + sewa raket
  useEffect(() => {
    if (!selectedCourt) return;
    const courtTotal = selectedCourt.price_per_hour * duration;
    let addonTotal = 0;
    
    Object.keys(selectedItems).forEach(itemId => {
      const item = items.find(i => i.id === parseInt(itemId));
      if (item && selectedItems[itemId] > 0) {
        addonTotal += item.price * selectedItems[itemId];
      }
    });
    
    setSummary({ courtTotal, addonTotal, grandTotal: courtTotal + addonTotal });
  }, [selectedCourt, duration, selectedItems, items]);

  // 4. FUNGSI PROSES BOOKING & MASUK KE CHECKOUT
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!startTime) return alert("Pilih jam main terlebih dahulu!");
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { 
      alert("Silakan masuk/login akun terlebih dahulu!"); 
      setLoading(false);
      return navigate('/login'); 
    }

    const [hours, minutes] = startTime.split(':');
    const endTime = `${(parseInt(hours) + parseInt(duration)).toString().padStart(2, '0')}:${minutes}:00`;

    // Masukkan data ke tabel bookings
    const { data: booking, error: bErr } = await supabase
      .from('bookings')
      .insert([{
        user_id: user.id,
        court_id: selectedCourt.id,
        booking_date: bookingDate,
        start_time: startTime + ":00",
        end_time: endTime,
        court_price_total: summary.courtTotal,
        addons_price_total: summary.addonTotal,
        grand_total: summary.grandTotal
      }]).select().single();

    if (bErr) { 
      alert("Gagal booking: " + bErr.message); 
      setLoading(false); 
      return; 
    }

    // Masukkan data sewa raket ke tabel booking_details jika ada yang dicentang
    const details = Object.keys(selectedItems).filter(id => selectedItems[id] > 0).map(id => {
      const item = items.find(i => i.id === parseInt(id));
      return { 
        booking_id: booking.id, 
        item_id: item.id, 
        quantity: selectedItems[id], 
        subtotal: item.price * selectedItems[id] 
      };
    });

    if (details.length > 0) {
      const { error: dErr } = await supabase.from('booking_details').insert(details);
      if (dErr) console.error("Gagal simpan detail raket:", dErr);
    }

    alert("Booking lapangan berhasil dibuat!");
    navigate(`/checkout/${booking.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
      {/* Kolom Kiri: Form Input Data */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Reservasi Lapangan Padel Tangsel</h2>
        <form onSubmit={handleCheckout} className="space-y-6">
          
          {/* Dropdown Lapangan */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Pilih Lapangan Padel</label>
            <select 
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition" 
              onChange={e => setSelectedCourt(courts.find(c => c.id === parseInt(e.target.value)))}
            >
              {courts.map(c => (
                <option key={c.id} value={c.id}>{c.name} (Rp {c.price_per_hour.toLocaleString()}/jam)</option>
              ))}
            </select>
          </div>

          {/* Form Tanggal & Durasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Tanggal Bermain</label>
              <input 
                type="date" 
                required 
                min={new Date().toISOString().split('T')[0]} 
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition" 
                value={bookingDate} 
                onChange={e => setBookingDate(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Durasi Bermain (Jam)</label>
              <input 
                type="number" 
                min="1" 
                max="4" 
                className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none transition" 
                value={duration} 
                onChange={e => setDuration(parseInt(e.target.value))} 
              />
            </div>
          </div>

          {/* Pilihan Jam Interaktif */}
          {bookingDate && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Pilih Jam Mulai Bermain</label>
              <div className="grid grid-cols-4 gap-2">
                {operationalHours.map(time => {
                  const isFull = bookedSlots.some(s => (time + ":00" >= s.start_time && time + ":00" < s.end_time));
                  return (
                    <button 
                      key={time} 
                      type="button" 
                      disabled={isFull} 
                      onClick={() => setStartTime(time)}
                      className={`p-3 text-sm font-semibold rounded-lg border transition duration-150 ${
                        isFull 
                          ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed border-gray-200' 
                          : startTime === time 
                            ? 'bg-green-600 text-white border-green-600 shadow-md scale-95' 
                            : 'bg-white text-gray-700 hover:bg-green-50 border-gray-300'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Opsi Sewa Raket */}
          <div className="border-t pt-5">
            <h3 className="font-bold text-gray-800 text-lg mb-3">Sewa Raket Padel Populer</h3>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                  <label className="flex items-center gap-3 cursor-pointer w-full">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500" 
                      onChange={e => setSelectedItems({...selectedItems, [item.id]: e.target.checked ? 1 : 0})} 
                    />
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </label>
                  <span className="text-sm font-bold text-green-600 whitespace-nowrap">Rp {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Kolom Kanan: Detail Kwitansi / Invoice */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit flex flex-col justify-between shadow-sm">
        <div>
          <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Ringkasan Pembayaran</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Sewa Lapangan:</span>
              <span className="font-semibold text-gray-800">Rp {summary.courtTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span>Total Sewa Alat/Raket:</span>
              <span className="font-semibold text-gray-800">Rp {summary.addonTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-3">
              <span>Total Tagihan Akhir:</span>
              <span className="text-green-600 text-xl font-extrabold">Rp {summary.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={handleCheckout} 
          disabled={loading} 
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white p-3.5 rounded-xl font-bold transition duration-200 shadow-md hover:shadow-lg disabled:bg-gray-400"
        >
          {loading ? "Memproses Pemesanan..." : "Checkout Pemesanan"}
        </button>
      </div>
    </div>
  );
}