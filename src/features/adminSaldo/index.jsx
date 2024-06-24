import { useParams, useNavigate } from "react-router-dom";
import { getListSaldo } from "./hooks/getListSaldo";
import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListSaldo() {
    const [konfirmasiSaldo, setKonfirmasiSaldo] = useState([]);
    const { id } = useParams();
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getListSaldo();
                console.log('Fetched data:', response);
                const pendingData = response.data.filter(item => item.status === "pending");
                setKonfirmasiSaldo(pendingData);
            } catch (error) {
                console.error(error);
                setKonfirmasiSaldo([]);
            }
        };
        fetchData();
    }, [id]);

    const openModal = (action, idSaldo) => {
        setSelectedId(idSaldo);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalAction(null);
        setSelectedId(null);
    };

    const handleConfirm = async () => {
        setUploading(true);

        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const response = await axios.post(`http://127.0.0.1:8000/api/v1/saldoAdmin/confirmSaldo/${selectedId}`,
                { reject: modalAction === 'tolak' },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                toast.success(`${modalAction === 'terima' ? 'Confirmation' : 'Rejection'} successful!`);
                setKonfirmasiSaldo(prevState =>
                    prevState.filter(historyItem =>
                         historyItem.id !== selectedId
                    )
                );
            } else {
                toast.warning(`Failed to ${modalAction === 'tolak' ? 'reject' : 'confirm'}!`);
            }
        } catch (error) {
            console.error(`There was an error ${modalAction === 'tolak' ? 'rejecting' : 'confirming'} the order!`, error);
            toast.error(`${modalAction === 'tolak' ? 'Rejection' : 'Confirmation'} failed!`);
        } finally {
            setUploading(false);
            closeModal();
        }
    };

    return (
        <>
            <ToastContainer />
            <TitleCard title="Konfirmasi Saldo" topMargin="mt-2">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-center">Nama Pengguna</th>
                                <th className="text-center">Pengajuan Saldo</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Tanggal Penarikan</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {konfirmasiSaldo.length > 0 ? konfirmasiSaldo.map((historyItem, historyIndex) => (
                                <tr key={`${historyItem.idSaldo}-${historyIndex}`}>
                                    <td className="text-center">
                                        {historyItem.customer ? historyItem.customer.nama : '-'}
                                    </td>
                                    <td className="text-center">
                                        {historyItem.jumlah_saldo}
                                    </td>
                                    <td className="text-center">
                                        {historyItem.status}
                                    </td>
                                    <td className="text-center">{historyItem.tanggal_penarikan}</td>
                                    <td>
                                        <div className="mt-3 mb-3 text-center">
                                            <button
                                                className="px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={() => openModal('terima', historyItem.id)}
                                            >
                                                Terima
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        {konfirmasiSaldo.length === 0 ? "No data available" : "Error in data structure"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </TitleCard>

            <button
                className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate('/dashboard')}
            >
                Kembali
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-700 bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            {modalAction === 'tolak' ? 'Tolak' : 'Terima'} Pesanan
                        </h2>
                        <p>Apakah Anda yakin ingin {modalAction === 'tolak' ? 'menolak' : 'menerima'} pesanan ini?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 mr-2 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
                                onClick={closeModal}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                onClick={handleConfirm}
                                disabled={uploading}
                            >
                                {modalAction === 'tolak' ? 'Tolak' : 'Terima'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ListSaldo;
