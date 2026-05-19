import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function CheckEmail() {
  const location = useLocation();
  const email = location.state?.email || "email kamu";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-100">
        {/* Ikon Surat Keren */}
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Verifikasi Email Dikirim!</h2>
        <p className="text-sm text-gray-600 mb-6">
          Kami telah mengirimkan link konfirmasi akun ke <br />
          <span className="font-bold text-gray-800">{email}</span>.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 text-left mb-6 space-y-1">
          <p className="font-bold">Langkah berikutnya:</p>
          <p>1. Buka kotak masuk (inbox) atau folder SPAM email kamu.</p>
          <p>2. Klik tombol/link konfirmasi di dalam pesan dari Supabase.</p>
          <p>3. Kamu akan diarahkan kembali ke halaman login untuk masuk.</p>
        </div>

        <Link to="/login" className="block w-full bg-gray-800 text-white p-3 rounded-lg font-bold hover:bg-gray-900 transition duration-200 text-sm">
          Kembali ke Login
        </Link>
      </div>
    </div>
  );
}