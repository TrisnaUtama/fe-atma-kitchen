import React, { useEffect, useState, useCallback } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";
import PencilSquare from "@heroicons/react/24/outline/PencilSquareIcon";
import JarakModal from "./JarakModal";

function Transaksi() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrans, setCurrentTrans] = useState(null);

  const openAddNewLeadModal = (transItem) => {
    setCurrentTrans(transItem);
    setIsModalOpen(true);
    console.log(transItem);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTrans(null);
  };

  const handleSave = async (jarak) => {
    if (!currentTrans) return;

    const { id } = currentTrans; // Assuming the transaction has an ID field

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/detailPemesanan/addJarakDelivery/${id}`,
        { jarak_delivery: jarak },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrans((prevTrans) =>
        prevTrans.map((item) =>
          item.id === id ? { ...item, jarak_delivery: jarak } : item
        )
      );

      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to update jarak:", error);
    }

    closeModal();
  };

  const fetchTransaksi = useCallback(async () => {
    console.log(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/detailPemesanan/getJarak"
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
  }, [token]);

  useEffect(() => {
    fetchTransaksi();
  }, [fetchTransaksi]);

  return (
    <>
      <TitleCard title="List Pengiriman" topMargin="mt-2">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center">Nama</th>
                  <th className="text-center">Status Pemesanan</th>
                  <th className="text-center">Nomer Telepon</th>
                  <th className="text-center">Alamat</th>
                  <th className="text-center">Jarak</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {trans.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.nama.nama}</td>
                    <td className="text-center">{item.status_pesanan}</td>
                    <td className="text-center">{item.nama.no_telpn}</td>
                    <td className="text-center">
                      {item.id_alamat == null
                        ? "di-pickup"
                        : item.alamat[0].nama_alamat}
                    </td>
                    <td className="text-center">{item.jarak_delivery}</td>
                    <td
                      className="text-center flex justify-center"
                      onClick={() => openAddNewLeadModal(item)}
                    >
                      <PencilSquare className="w-5" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TitleCard>
      {isModalOpen && (
        <JarakModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          initialData={currentTrans}
        />
      )}
    </>
  );
}

export default Transaksi;
