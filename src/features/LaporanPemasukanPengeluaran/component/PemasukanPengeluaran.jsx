import { getListPemasukanPengeluaran } from "../hooks/getLaporanPemasukanPengeluaran";
import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function DetailLaporanPemasukanPengeluaran() {
  const [detailPemasukanPengeluaran, setDetailPemasukanPengeluaran] =
    useState(null);
  const [total, setTotal] = useState(0);
  const [jumlah, setJumlah] = useState(0);
  const [penitip, setPenitip] = useState({});
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async (bulan) => {
    try {
      const response = await getListPemasukanPengeluaran(bulan);
      setDetailPemasukanPengeluaran(response);
      setTotal(response.total);
      setJumlah(response.jumlah_pengeluaran);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDetailPemasukanPengeluaran(null);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get("date");
    setDate(date);
    if (date) {
      fetchData(date);
    }
  }, [date]);

  const handleMonthChange = (event) => {
    window.location.href = "/pemasukanPengeluaran?date=" + event.target.value;
  };
  

  return (
    <>
      <TitleCard title="Laporan Pemasukan Pengeluaran" topMargin="mt-2">
  <div className="flex justify-between mb-4">
    <input
      type="month"
      value={date}
      onChange={handleMonthChange}
      className="px-3 py-2 border rounded-lg"
    />
  </div>
  {date && detailPemasukanPengeluaran ? (
    <div className="overflow-x-auto w-full">
      <table className="table w-full mt-6 border border-gray-300">
        <thead>
          <tr>
            <th className="text-center border border-gray-300">Penjualan</th>
            <th className="text-center border border-gray-300">Tip</th>
            <th className="text-center border border-gray-300">Nama Pengeluaran</th>
            <th className="text-center border border-gray-300">Jumlah Pengeluaran</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center border border-gray-300">
              {detailPemasukanPengeluaran.penjualan}
            </td>
            <td className="text-center border border-gray-300">
              {detailPemasukanPengeluaran.tip}
            </td>
            <td className="text-center border border-gray-300">
              {detailPemasukanPengeluaran.pengeluaran.map((item, i) => (
                <div key={i} className="mb-4">
                  <div>{item.nama_pengeluaran}</div>
                </div>
              ))}
            </td>
            <td className="text-center border border-gray-300">
              {detailPemasukanPengeluaran.pengeluaran.map((item, i) => (
                <div key={i} className="mb-4">
                  <div>{item.total_pengeluaran}</div>
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td className="text-center border border-gray-300" colSpan={2}>
              Total Pemasukan:
            </td>
            <td className="text-center border border-gray-300" colSpan={2}>
              {total}
            </td>
          </tr>
          <tr>
            <td className="text-center border border-gray-300" colSpan={2}>
              Total Pengeluaran:
            </td>
            <td className="text-center border border-gray-300" colSpan={2}>
              {jumlah}
            </td>
          </tr>
          <tr>
            <td className="text-center border border-gray-300" colSpan={4}>
              <button
                className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={window.print}
              >
                Print
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-center">
      Silakan pilih bulan untuk melihat data.
    </div>
  )}
</TitleCard>

      <button
        className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => navigate("/dashboard")}
      >
        Kembali
      </button>
    </>
  );
}

export default DetailLaporanPemasukanPengeluaran;
