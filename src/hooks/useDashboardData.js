import { useEffect, useState } from "react";
import axios from "axios";

const useDashboardData = () => {
  const [dataAkad, setDataAkad] = useState([]);
  const [dataBooking, setDataBooking] = useState([]);
  const [dataTarget, setDataTarget] = useState([]);
  const [dataTargetBooking, setDataTargetBooking] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/model/m_dashboard_direksi.php?action=intern_test");
        const datas = res.data;
        setDataAkad(datas?.dataAkad || []);
        setDataBooking(datas?.dataBooking || []);
        setDataTarget(datas?.dataTarget || []);
        setDataTargetBooking(datas?.dataTargetBooking || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return { dataAkad, dataBooking, dataTarget, dataTargetBooking };
};

export default useDashboardData;
