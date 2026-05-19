import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Checkout() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function getDetails() {
      const { data } = await supabase.from('bookings').select('*, courts(name)').eq('id', bookingId).single();
      setBooking(data);
    }
    getDetails();
  }, [bookingId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih file bukti transfer terlebih dahulu!");
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${bookingId}-${Date.now()}.${fileExt}`;

    // Upload berkas gambar ke bucket 'payment-proofs'
    const { error: uploadError } = await supabase.storage
      .from('payment-proofs')
      .upload(fileName, file);

    if (uploadError) { alert(uploadError.message); setUploading(false); return; }

    const { data: { publicUrl } } = supabase.storage.from('payment-proofs').getPublicUrl(fileName);

    // Hubungkan berkas dengan row transaksi terkait
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ payment_proof_url: publicUrl, status: 'menunggu pembayaran' })
      .eq('id', bookingId);

    if (updateError) alert(updateError.message);
    else { alert("Bukti transfer berhasil dikirim!"); navigate('/history'); }
    setUploading(false);
  };

  if (!booking) return <p className="text-center p-10 text-gray-500 font-medium">Memuat Data Invoice...</p>;

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white border rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Pembayaran Bank Transfer</h2>
      <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm space-y-2 text-gray-600">
        <p><strong>Lapangan:</strong> {booking.courts?.name}</p>
        <p><strong>Tanggal & Jam:</strong> {booking.booking_date} ({booking.start_time.slice(0,5)} WIB)</p>
        <p className="text-base text-red-600"><strong>Total Transfer:</strong> Rp {booking.grand_total.toLocaleString()}</p>
        <div className="border-t pt-2 mt-2 text-xs text-gray-500">
          Transfer Manual ke Rekening Resmi UMKM: <br /><strong className="text-gray-800 text-sm">BCA 1234567890 a/n Padel Hub Indonesia</strong>
        </div>
      </div>
      <form onSubmit={handleUpload} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Unggah Gambar Bukti Transfer (.png, .jpg)</label>
        <input type="file" accept="image/*" required className="w-full text-sm block file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" disabled={uploading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg font-bold transition duration-200">
          {uploading ? "Mengirim Berkas..." : "Kirim Bukti Pembayaran"}
        </button>
      </form>
    </div>
  );
}