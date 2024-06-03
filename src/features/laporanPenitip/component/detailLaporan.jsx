import { useParams, useNavigate } from "react-router-dom";
import { getListPenitip } from "../hooks/getListPenitip";
import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DetailLaporan() {
    const [detailLaporan, setDetailLaporan] = useState([]);
    const [total, setTotal] = useState(0);
    const [penitip, setPenitip] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getListPenitip(id);
                console.log("Data received:", response); // Log data untuk memeriksa strukturnya
                setDetailLaporan(response.data);
                setTotal(response.total_uang);
                setPenitip(response.penitip);
            } catch (error) {
                console.error("Error fetching data:", error);
                setDetailLaporan([]);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <ToastContainer />
            <TitleCard title="Laporan Penitip" topMargin="mt-2"  >
                <table>
                    <tr>
                        <td colSpan={"4"}></td>
                        <td className="text-center">Nama Penitip :</td>
                        <td>{penitip.nama}</td>
                    </tr>
                </table>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full mt-6">
                        <thead>
                            <tr>
                                <th className="text-center">Nama Produk</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Harga Jual</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">20% Komisi</th>
                                <th className="text-center">Yang Diterima</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailLaporan.map((historyItem, historyIndex) => (
                                <tr >
                                    <td className="text-center">
                                        {historyItem.nama_produk}
                                    </td>
                                    <td className="text-center">
                                        {historyItem.banyaknya_terjual}
                                    </td>
                                    <td className="text-center">
                                        {historyItem.harga}
                                    </td>
                                    <td className="text-center">
                                        {historyItem.total}
                                    </td>
                                    <td className="text-center">
                                        {historyItem.komisi}
                                    </td>
                                    <td className="text-center">
                                        {historyItem.total_diterima}
                                    </td>

                                </tr>

                            ))}
                            <tr>
                                <td colSpan={"4"}></td>
                                <td className="text-center">Total</td>
                                <td className="text-center">{total}</td>
                            </tr>
                                <button
                                    className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={(window.print)}>
                                    Print
                                </button>
                        </tbody>
                    </table>
                </div>
            </TitleCard>
            <button
                className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate('/listPenitip')}>
                Kembali
            </button>
        </>
    );

}

export default DetailLaporan;