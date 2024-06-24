import React, { useEffect, useState, useCallback } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";
import PrintLaporan from "./components/printLaporan";
function Transaksi() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTransaksi = useCallback(async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/detailPemesanan/getLaporanBahanBakuPeriode?startDate=${startDate}&endDate=${endDate}`
      );
      setTrans(response.data.totalUsage);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch data");
    }
  }, [token, startDate, endDate]);

  useEffect(() => {
    fetchTransaksi();
  }, [fetchTransaksi]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = () => {
    const printContents = document.getElementById("chart-to-print").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <>
      <TitleCard title="List Bahan Baku" topMargin="mt-2">
        <div className="flex justify-between">
          <div>
            <label htmlFor="startDate" className="mr-2">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="mr-2">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Print
          </button>
        </div>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center">Nama Bahan</th>
                  <th className="text-center">Satuan</th>
                  <th className="text-center">Digunakan</th>
                </tr>
              </thead>
              <tbody>
                {trans.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.nama_bahan_baku}</td>
                    <td className="text-center">{item.satuan}</td>
                    <td className="text-center">{item.total_usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TitleCard>
      <div style={{ display: "none" }}>
        <div id="chart-to-print">
          <PrintLaporan transaction={trans} />
        </div>
      </div>
    </>
  );
}

export default Transaksi;
