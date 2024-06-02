import React, { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { closeModal } from "../../common/modalSlice";
import { Button, Modal } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { toast } from "react-toastify";
function PemesananList() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [listPemesanan, setListPemesanan] = useState([]);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchPemesanan = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/detailPemesanan/getShippedOrPickedUpOrdersByCustomer`
        );
        const fetchPemesanan = response.data.data;
        setListPemesanan(fetchPemesanan);
        setTrans(fetchPemesanan);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch orders");
      }
    };

    fetchPemesanan();
  }, [token, userLogin.id]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && openModal) {
        setOpenModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  const handleSelesai = async (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v1/detailPemesanan/updateStatusToSelesai/${id}`
      );
      setTrans(
        trans.map((item) =>
          item.id === id ? { ...item, status_pesanan: "selesai" } : item
        )
      );
      toast.success("order has been received successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });

      dispatch(closeModal());
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to update order status", error);
      setError("Failed to update order status");
    }
  };

  return (
    <>
      <TitleCard title="Detail Pesanan" topMargin="mt-2">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center">No Nota</th>
                  <th className="text-center">Status Pemesanan</th>
                  <th className="text-center">Alamat</th>
                  <th className="text-center">Bukti Pembayaran</th>
                  <th className="text-center">Tanggal Pemesanan</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {trans.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.no_nota}</td>
                    <td className="text-center">{item.status_pesanan}</td>
                    <td className="text-center">
                      {item.id_alamat == null
                        ? "dipickup"
                        : item.alamat[0].nama_alamat}
                    </td>
                    <td className="text-center">{item.tanggal_pemesanan}</td>
                    <td className="text-center">
                      {item.bukti_pembayaran && (
                        <a
                          href={`http://127.0.0.1:8000/storage/buktiBayar/${item.bukti_pembayaran}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="flex justify-center items-center">
                            <img
                              src={`http://127.0.0.1:8000/storage/buktiBayar/${item.bukti_pembayaran}`}
                              alt="Bukti Pembayaran"
                              className="w-20 h-20 cursor-pointer"
                            />
                          </div>
                        </a>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center">
                        {item.status_pesanan === "sedang dikirim" && (
                          <button
                            className="btn btn-xs btn-primary"
                            onClick={() => {
                              setSelectedOrderId(item.id);
                              setOpenModal(true);
                            }}
                          >
                            Diterima
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TitleCard>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiCheck className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to receive this product?{" "}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => handleSelesai(selectedOrderId)}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PemesananList;
