import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { Button, Modal } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { closeModal } from "../common/modalSlice";
import { toast } from "react-toastify";
import axios from "axios";

function Transaksi() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();

  const fetchTransaksi = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/detailPemesanan/getTelatBayar"
      );
      const fetchedTransaksi = response.data.data;
      console.log(fetchedTransaksi);

      if (Array.isArray(fetchedTransaksi)) {
        setTrans(fetchedTransaksi);
      } else if (typeof fetchedTransaksi === "object") {
        const dataArray = Object.values(fetchedTransaksi);
        if (Array.isArray(dataArray)) {
          setTrans(dataArray);
        } else {
          throw new Error("Array not found in fetched data object");
        }
      } else {
        throw new Error("Data is not in the expected format");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch or parse data");
    }
  };

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

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const getStatusBadgeClass = (status_pesanan) => {
    return status_pesanan === "pembayaran valid" ? "badge badge-accent " : "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Telat Di Bayar";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleBatal = async (id, dispatch) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/detailPemesanan/cancelLatePaymentOrder/${id}`,
        { status_pesanan: "dibatalkan" }, // Change status to "dibatalkan"
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setTrans((prevTrans) =>
          prevTrans.map((item) =>
            item.id === id
              ? { ...item, status_pesanan: "dibatalkan" } // Update status to "dibatalkan"
              : item
          )
        );

        toast.success("Order has been cancelled successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        dispatch(closeModal());
        setOpenModal(false);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <>
      <TitleCard title="Detail Show Telat Bayar " topMargin="mt-2">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center">Nama</th>
                  <th className="text-center">Tanggal Pemesanan</th>
                  <th className="text-center">Tanggal Diambil</th>
                  <th className="text-center">Tanggal Pembayaran</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {trans.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.nama.nama}</td>
                    <td className="text-center">{item.tanggal_pemesanan}</td>
                    <td className="text-center">{item.tanggal_diambil}</td>
                    <td className="text-center">
                      {item.tanggal_pembayaran
                        ? formatDate(item.tanggal_pembayaran < Date.now())
                        : "Belum Di Bayar"}
                    </td>
                    <td className={"text-center"}>
                      <div className={getStatusBadgeClass(item.status_pesanan)}>
                        {item.status_pesanan}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center">
                        <button
                          className="btn btn-xs btn-secondary"
                          onClick={() => {
                            setSelectedOrderId(item.id);
                            setOpenModal(true);
                          }}
                        >
                          Batalkan Pesaanan
                        </button>
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
              Are you sure you want to cancel this order?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                style={{ backgroundColor: "green", color: "white" }}
                onClick={() => {
                  handleBatal(selectedOrderId, dispatch);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="failure" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Transaksi;
