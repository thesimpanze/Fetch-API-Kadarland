import { useState } from "react";
import { FileText } from "lucide-react";
import useDashboardData from "./hooks/useDashboardData";
import BookingTable from "./components/BookingTable";
import AkadTable from "./components/AkadTable";
import TargetChart from "./components/TargetChart";

function App() {
  const { dataAkad, dataBooking, dataTarget, dataTargetBooking } = useDashboardData();
  const [activeTab, setActiveTab] = useState("booking");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard Data KadarLand</h1>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {["booking", "akad"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab === "booking" ? `Data Booking (${dataBooking.length})` : `Data Akad (${dataAkad.length})`}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow">
          {activeTab === "booking" ? <BookingTable data={dataBooking} /> : <AkadTable data={dataAkad} />}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[["Total Booking", dataBooking.length, "blue"], ["Total Akad", dataAkad.length, "green"], ["SPR Aktif", dataBooking.filter((b) => b.status_aktif_spr === 1).length, "yellow"], ["Total Transaksi", dataBooking.length + dataAkad.length, "purple"]].map(([label, count, color], idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow flex items-center">
              <FileText className={`h-8 w-8 text-${color}-600`} />
              <div className="ml-3">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-lg font-semibold">{count}</p>
              </div>
            </div>
          ))}
        </div>

        <TargetChart title="Data Target" data={dataTarget} />
        <TargetChart title="Data Target Booking" data={dataTargetBooking} />
      </div>
    </div>
  );
}

export default App;
