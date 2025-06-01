import { useEffect, useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function App() {
  const [datas, setDatas] = useState([]);
  const [dataAkad, setDataAkad] = useState([]);
  const [dataBooking, setDataBooking] = useState([]);
  const [dataTarget, setDataTarget] = useState([]);
  const [dataTargetBooking, setDataTargetBooking] = useState([]);
  const [activeTab, setActiveTab] = useState("booking");

  useEffect(() => {
    async function FetchData() {
      try {
        let res = await axios.get("/api/model/m_dashboard_direksi.php?action=intern_test");
        setDatas(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    FetchData();
  }, []);

  useEffect(() => {
    setDataAkad(datas?.dataAkad || []);
    setDataBooking(datas?.dataBooking || []);
    setDataTarget(datas?.dataTarget || []);
    setDataTargetBooking(datas?.dataTargetBooking || []);
  }, [datas]);

  const formatCurrency = (amount) => {
    if (!amount) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const convertBulan = (angka) => {
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return bulan[angka - 1];
  };
  const chartData = Object.keys(dataTarget)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => ({
      month: convertBulan(Number(key)),
      value: dataTarget[1][key],
    }));
  console.log("dataTarget: ", dataTarget);
  console.log("dataTargetBooking", dataTargetBooking);
  console.log(dataBooking);
  const BookingTable = () => (
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
          {dataBooking.length > 0 ? (
            dataBooking.map((data, index) => (
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

  const AkadTable = () => (
    <div className="overflow-x-auto h-screen overflow-y-scroll">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow">
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
          {dataAkad.length ? (
            dataAkad.map((data, index) => (
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
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Data KadarLand</h1>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("booking")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "booking" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              Data Booking ({dataBooking.length})
            </button>
            <button
              onClick={() => setActiveTab("akad")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "akad" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
            >
              Data Akad ({dataAkad.length})
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow">{activeTab === "booking" ? <BookingTable /> : <AkadTable />}</div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Booking</p>
                <p className="text-lg font-semibold text-gray-900">{dataBooking.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Akad</p>
                <p className="text-lg font-semibold text-gray-900">{dataAkad.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">SPR Aktif</p>
                <p className="text-lg font-semibold text-gray-900">{dataBooking.filter((item) => item.status_aktif_spr === 1).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Transaksi</p>
                <p className="text-lg font-semibold text-gray-900">{dataBooking.length + dataAkad.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t-gray-200 border-t pt-2">
            <h1 className="text-center font-medium text-xl mb-3">Data Target</h1>
          <div className="flex flex-wrap justify-center text-sm">
          {dataTarget.length > 0 ? (
            dataTarget.map((data, index) => (
              <div className="flex flex-col justify-center items-center overflow-x-hidden w-[45%] mb-3 mr-3  bg-white rounded-lg shadow py-1 pr-3  ">
                <h1>Cabang: {data.cabang}</h1>
                <h1>Perumahan: {data.perumahan}</h1>
                <ResponsiveContainer height={150}>
                  <LineChart
                    data={Object.keys(data)
                      .filter((key) => !isNaN(Number(key)))
                      .map((key) => ({
                        month: convertBulan(Number(key)),
                        value: data[key],
                      }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Target" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
                
              </div>
            ))
          ) : (
            <div className="">Tidak ada data</div>
          )}
        </div>
        </div>
        <div className="mt-6 border-t-gray-200 border-t pt-2">
            <h1 className="text-center font-medium text-xl mb-3">Data Target Booking</h1>
          <div className="flex flex-wrap justify-center text-sm">
          {dataTargetBooking.length > 0 ? (
            dataTargetBooking.map((data, index) => (
              <div className="flex flex-col justify-center items-center overflow-x-hidden w-[45%] mb-3 mr-3  bg-white rounded-lg shadow py-1 pr-3  ">
                <h1>Cabang: {data.cabang}</h1>
                <h1>Perumahan: {data.perumahan}</h1>
                <ResponsiveContainer height={150}>
                  <LineChart
                    data={Object.keys(data)
                      .filter((key) => !isNaN(Number(key)))
                      .map((key) => ({
                        month: convertBulan(Number(key)),
                        value: data[key],
                      }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Target" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
                
              </div>
            ))
          ) : (
            <div className="">Tidak ada data</div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
