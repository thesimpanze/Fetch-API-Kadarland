import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { convertBulan } from "../utils/convertBulan";

const TargetChart = ({ title, data }) => (
  <div className="mt-6 border-t pt-2">
    <h1 className="text-center font-medium text-xl mb-3">{title}</h1>
    <div className="flex flex-wrap justify-center text-sm gap-4">
      {data.length > 0 ? data.map((item, index) => (
        <div key={index} className="w-[45%] bg-white rounded-lg shadow pr-5 py-3 text-center ">
          <h1>Cabang: {item.cabang}</h1>
          <h1>Perumahan: {item.perumahan}</h1>
          <ResponsiveContainer height={150}>
            <LineChart data={Object.keys(item).filter(k => !isNaN(k)).map(k => ({
              month: convertBulan(Number(k)),
              value: item[k],
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )) : <div>Tidak ada data</div>}
    </div>
  </div>
);

export default TargetChart;
