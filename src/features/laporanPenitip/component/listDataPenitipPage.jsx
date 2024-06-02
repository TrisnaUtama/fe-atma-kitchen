import { useParams, useNavigate } from "react-router-dom";
import { getListPenitip } from "../hooks/getListPenitip";
import { useEffect, useState } from "react";
import { dataPenitip } from "../hooks/penitipData";
import TitleCard from "../../../components/Cards/TitleCard";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ListPenitip() {
    const [listPenitip, setListPenitip] = useState([]);
    const [totalDiterima, setTotalDiterima] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dataPenitip();
                console.log("Data received:", response); // Log data untuk memeriksa strukturnya
                setListPenitip(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setListPenitip([]);
            }
        };

        fetchData();
    }, []);



    return (
        <>
            <ToastContainer />
            <TitleCard title="Laporan Penitip" topMargin="mt-2">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-center">Id Penitip</th>
                                <th className="text-center">Nama Penitip</th>
                                <th className="text-center"> Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listPenitip.map((historyItem, historyIndex) => (

                                <tr >
                                    <td className="text-center">
                                        {historyItem.id}
                                    </td>
                                    <td className="text-center">
                                        {historyItem.nama}
                                    </td>
                                    <a
                                        className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href={`/detailLaporan/${historyItem.id}`}>
                                        Detail
                                    </a>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                    {/* <div className="total-diterima-summary">
                        <strong>Total Diterima Keseluruhan: </strong>
                        {totalDiterima}
                    </div> */}
                </div>
            </TitleCard>

            <button
                className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate('/dashboard')}>
                Kembali
            </button>
        </>
    );




}
export default ListPenitip;