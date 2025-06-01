import { formatDate } from "../utils/formatDate";

const AkadTable = ({ data }) => (
  <div className="overflow-x-auto h-screen overflow-y-scroll ">
      <table className="w-full bg-white border border-gray-200 rounded-xl shadow">
        <thead className="bg-gray-50 ">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">No</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Id SPR</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Spv Akad</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cabang</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Perumahan</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Kavling</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tanggal Akad</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {data.length ? (
            data.map((data, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">{data.id_spr}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">{data.spv_akad || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.cabang || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.perumahan || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{data.kavling || data.code || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b">{formatDate(data.tanggal_akad)}</td>

                <td className="px-4 py-3 text-sm text-gray-900 border-b">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Akad</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                Tidak ada data akad
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
);

export default AkadTable;
