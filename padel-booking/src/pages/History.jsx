import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function History() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchUserHistory() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase
        .from('bookings')
        .select('*, courts(name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setBookings(data || []);
    }
    fetchUserHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Riwayat Reservasi Anda</h2>
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-sm font-semibold text-gray-600">
              <th className="p-4">Lapangan</th>
              <th className="p-4">Tanggal & Waktu</th>
              <th className="p-4">Total Biaya</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm text-gray-700">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-8 text-gray-400 italic">Belum ada riwayat pemesanan.</td>
              </tr>
            ) : (
              bookings.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{b.courts?.name}</td>
                  <td className="p-4">{b.booking_date} ({b.start_time.slice(0,5)})</td>
                  <td className="p-4 font-semibold text-gray-900">Rp {b.grand_total.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${b.status === 'dikonfirmasi' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}