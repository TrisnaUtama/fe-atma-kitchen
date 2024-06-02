import { useParams, useNavigate } from "react-router-dom";
import { getListKonfrimasi } from "../hooks/listKonfirmasi";
import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function KonfirmasiPesanan() {
    const [konfirmasiPesanan, setKonfirmasiPesanan] = useState([]);
    const { id } = useParams();
    const [uploading, setUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getListKonfrimasi();
                setKonfirmasiPesanan(data || []);
            } catch (error) {
                console.error(error);
                setKonfirmasiPesanan([]);
            }
        };
        fetchData();
    }, [id]);

    const openModal = (action, id) => {
        setModalAction(action);
        setSelectedId(id);
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

            const response = await axios.post(`http://127.0.0.1:8000/api/v1/konfirmasi/confirmPesanan/${selectedId}`,
                { reject: modalAction === 'tolak' },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                toast.success(`${modalAction === 'Confirmation'} successful!`);
                setKonfirmasiPesanan(prevState =>
                    prevState.filter(historyItem =>
                        !historyItem.detail_pemesanan.some(detailItem => detailItem.id_pemesanan === selectedId)
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
            <TitleCard title="Konfirmasi Pesanan" topMargin="mt-2">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-center">Nama Produk</th>
                                <th className="text-center">Nama Hampers</th>
                                <th className="text-center">Harga Produk</th>
                                <th className="text-center">Harga Hampers</th>
                                <th className="text-center">Jumlah</th>
                                <th className="text-center">Subtotal</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {konfirmasiPesanan.map((historyItem, historyIndex) => (
                                historyItem.detail_pemesanan.map((detailItem, detailIndex) => (
                                    <tr key={`${historyIndex}-${detailIndex}`}>
                                        <td className="text-center">
                                            {detailItem.produk ? detailItem.produk.nama_produk : '-'}
                                        </td>
                                        <td className="text-center">
                                            {detailItem.hampers ? detailItem.hampers.nama_hampers : '-'}
                                        </td>
                                        <td className="text-center">
                                            {detailItem.produk ? detailItem.produk.harga : '-'}
                                        </td>
                                        <td className="text-center">
                                            {detailItem.hampers ? detailItem.hampers.harga : '-'}
                                        </td>
                                        <td className="text-center">{detailItem.jumlah}</td>
                                        <td className="text-center">{detailItem.subtotal}</td>
                                        <td>
                                            <div className="mt-3 mb-3 text-center">
                                                <button
                                                    className="px-3 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => openModal('terima', detailItem.id_pemesanan)}
                                                >
                                                    Terima
                                                </button>
                                                <button
                                                    className="px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                    onClick={() => openModal('tolak', detailItem.id_pemesanan)}
                                                >
                                                    Tolak
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>

            <button
                className="px-3 py-2 mt-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate('/dashboard')}>
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

export default KonfirmasiPesanan;
