import { useParams, useNavigate } from "react-router-dom";
import { getListPesanan } from "../hooks/listPembayaran";
import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function ListPesanan() {
    const [bayarPesanan, setBayarPesanan] = useState([]);
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [idPemesanan, setIdPemesanan] = useState(null);
    const [isDataEmpty, setIsDataEmpty] = useState(true);
    const navigate = useNavigate();

    const openModal = (idPemesanan) => {
        setIdPemesanan(idPemesanan);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getListPesanan(id);
                setBayarPesanan(data);
                setIsDataEmpty(!data || data.length === 0);

                if (!data || data.length === 0) {
                    toast.warning('Data tidak ada');
                }
            } catch (error) {
                console.error(error);
                toast.error('Data Pesanan Tidak Ada');
            }
        };
        fetchData();
    }, [id]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUploading(true);

        if (!selectedFiles || selectedFiles.length === 0) {
            toast.error('Anda harus memilih setidaknya satu file.');
            setUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('id', idPemesanan);
        formData.append('bukti_pembayaran', selectedFiles[0]);

        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            const response = await axios.post(`http://127.0.0.1:8000/api/v1/bayar/buktiBayar/${idPemesanan}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success("File uploaded successfully!");
                setBayarPesanan(prevState =>
                    prevState.filter(historyItem =>
                        !historyItem.detail_pemesanan.some(detailItem => detailItem.id_pemesanan === idPemesanan)
                    )
                );
                closeModal();
            } else {
                toast.error("File upload failed!");
            }
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            toast.error("File upload failed!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <TitleCard title="List Pay Pesanan" topMargin="mt-2">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-center">Nama Produk</th>
                                <th className="text-center">Nama Hampers</th>
                                <th className="text-center">Harga Produk</th>
                                <th className="text-center">Harga Hampers</th>
                                <th className="text-center">Subtotal</th>
                                <th className="text-center">Jumlah</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bayarPesanan.map((historyItem, historyIndex) => (
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
                                        <td className="text-center">{detailItem.subtotal}</td>
                                        <td className="text-center">{detailItem.jumlah}</td>
                                        <td>
                                            <div className="mt-3 mb-3 text-center">
                                                <button
                                                    className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => openModal(historyItem.id)}
                                                >
                                                    Bayar
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
                onClick={() => navigate('/dashboardCustomer')}>
                Kembali
            </button>

            {isModalOpen && (
                <dialog id="my_modal_1" className="modal" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-white mb-3">Kirim Bukti Pembayaran</h3>
                        <hr />
                        <h3 className="font-bold text-xl text-white mb-3 mt-2">Transfer Bank Only</h3>
                        <h1 className="text-lg text-white">Atas Nama: Atma Kitchen</h1>
                        <h1 className="text-lg text-white">Bank: BCA</h1>
                        <h1 className="text-lg text-white">No. Rekening: 02339412</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-4"
                                id="multiple_files"
                                name="gambar"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                disabled={uploading}
                            />
                            <div className="modal-action">
                                <button className="btn" onClick={closeModal} disabled={uploading}>Close</button>
                                <button className="btn" type="submit" disabled={uploading}>Submit</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </>
    );
}

export default ListPesanan;
