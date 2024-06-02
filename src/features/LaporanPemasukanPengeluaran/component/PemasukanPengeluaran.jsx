import { getListPemasukanPengeluaran } from "../hooks/getLaporanPemasukanPengeluaran";
import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function DetailLaporanPemasukanPengeluaran() {
    const [detailPemasukanPengeluaran, setDetailPemasukanPengeluaran] = useState(null);
    const [total, setTotal] = useState(0);
    const [jumlah, setJumlah] = useState(0);
    const [penitip, setPenitip] = useState({});
    const [date, setDate] = useState('');
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
        const date = queryParams.get('date');
        setDate(date);
        if (date) {
            fetchData(date);
        }
    }, [date]);

    const handleMonthChange = (event) => {
        window.location.href = '/pemasukanPengeluaran?date=' + event.target.value;
    };


    return (
        <>
            <ToastContainer />
            <TitleCard title="Laporan Pemasukan Pengeluaran" topMargin="mt-2"  >
                <div className="flex justify-between mb-4">
                    <select value={date} onChange={handleMonthChange} className="px-3 py-2 border rounded-lg">
                        <option value="">Pilih Bulan</option>
                        <option value="2024-05">2024-05</option>
                        <option value="2024-06">2024-06</option>
                    </select>
                </div>
                {date && detailPemasukanPengeluaran ? (
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full mt-6">
                            <thead>
                                <tr>
                                    <th className="text-center">Penjualan</th>
                                    <th className="text-center">Tip</th>
                                    <th className="text-center">Nama Pengeluaran</th>
                                    <th className="text-center">Jumlah Pengeluaran</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr>
                                    <td className="text-center ">{detailPemasukanPengeluaran.penjualan}</td>
                                    <td className="text-center">{detailPemasukanPengeluaran.tip}</td>
                                    <td className="text-center">
                                        {detailPemasukanPengeluaran.pengeluaran.map((item, i) => (
                                            <div key={i} className="mb-4">
                                                <div>{item.nama_pengeluaran}</div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="text-center">
                                        {detailPemasukanPengeluaran.pengeluaran.map((item, i) => (
                                            <div key={i} className="mb-4">
                                                <div>{item.total_pengeluaran}</div>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                
                                <div className="grid grid-rows-3 grid-flow-col gap-4 mt-4">
                                <tr > 
                                    <td className="text-center row-start-2 row-span-2">Total Pemasukan :</td>
                                    <td className="text-center">{total}</td>
                                </tr>
                                <tr>
                                    <td className="text-center">Total Pengeluaran :</td>
                                    <td className="text-center">{jumlah}</td>
                                </tr>
                                </div>
                                <button
                                    className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={(window.print)}>
                                    Print
                                </button>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center">Silakan pilih bulan untuk melihat data.</div>
                )}
            </TitleCard>
            <button
                className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate('/dashboard')}>
                Kembali
            </button>
        </>
    );
}

export default DetailLaporanPemasukanPengeluaran;
