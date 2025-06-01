import { Eye } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

const BookingTable = ({ data }) => {
  return (
    <div className="overflow-x-auto h-screen overflow-y-scroll">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">No</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Id SPR</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Code</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Nama SPV</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Nama Pembeli</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Pekerjaan</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">No. Telp</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cabang</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Perumahan</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Kavling</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tanggal Booking</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tanggal UTJ</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tanggal Berkas</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Harga</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">DP</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">UTJ</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Asal Lead</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Proses Berkas</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Status SPR</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Berkas UTJ</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((data, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">{data.idspr || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.code || "-"}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">{data.SPV_Proses_Akad || "-"}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">{data.fullname || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.pekerjaan || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.phone_number || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.cabang || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.perumahan || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.kavling || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatDate(data.tanggal_booking)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatDate(data.tanggal_utj)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatDate(data.tanggal_berkas)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(data.harga_perumahan)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(data.jumlah_dp)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatCurrency(data.utj)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <span className="px-2 py-1 text-xs font-medium  bg-blue-100 text-blue-800 rounded-full">{data.asallead || "-"}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.proses_berkas || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${data.status_aktif_spr === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{data.status_aktif_spr === 1 ? "AKTIF" : "Tidak Aktif"}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <div className="flex space-x-2">
                    {data.berkas_utj ? (
                      <>
                        <button onClick={() => window.open(data.berkas_utj, "_blank")} className="flex items-center px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors" title="Lihat UTJ">
                          <Eye size={12} className="mr-1" />
                          Lihat
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Tidak ada berkas</span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="px-4 py-8 text-center text-gray-500">
                Tidak ada data booking
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
