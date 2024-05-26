import React, { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import axios from "axios";
import PencilSquare from "@heroicons/react/24/outline/PencilSquareIcon";
import BuktiPembayaran from "./ModalPembayaran";

const TopSideButtons = ({ applySearch }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    applySearch(searchText);
  }, [searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
    </div>
  );
};

function PemesananList() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [listPemesanan, setListPemesanan] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  useEffect(() => {
    const fetchPemesanan = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/pemesanan/${userLogin.id}`
        );
        const fetchPemesanan = response.data.data;
        setListPemesanan(fetchPemesanan);
        setTrans(fetchPemesanan);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPemesanan();
  }, []);

  const applySearch = (value) => {
    let filteredTransactions = listPemesanan.filter((t) => {
      return t.status_pesanan.toLowerCase().includes(value.toLowerCase());
    });
    setTrans(filteredTransactions);
  };

  const handlePencilSquareClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <>
      <TitleCard
        title="List Pemesanan"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center border px-4 py-2">Nomer Nota</th>
                <th className="text-center border px-4 py-2">
                  Tanggal Pemesanan
                </th>
                <th className="text-center border px-4 py-2">
                  Tanggal Dibayar
                </th>
                <th className="text-center border px-4 py-2">
                  Tanggal Diambil
                </th>
                <th className="text-center border px-4 py-2">Jarak Delivery</th>
                <th className="text-center border px-4 py-2">Poin Pesanan</th>
                <th className="text-center border px-4 py-2">Potongan Poin</th>
                <th className="text-center border px-4 py-2">Status Pesanan</th>
                <th className="text-center border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((transaction, index) => (
                <tr key={index}>
                  <td className="text-center border px-4 py-2">
                    {transaction.no_nota}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {transaction.tanggal_pemesanan}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {transaction.tanggal_pembayaran}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {transaction.tanggal_diambil}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {transaction.jarak_delivery == null
                      ? 0
                      : transaction.jarak_delivery}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {transaction.poin_pesanan}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {transaction.potongan_poin == null
                      ? 0
                      : transaction.potongan_poin}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {transaction.status_pesanan === "dikonfirmasi admin" ? (
                      <div className="bg-yellow-500 p-1 text-md rounded-lg text-black">
                        {transaction.status_pesanan}
                      </div>
                    ) : transaction.status_pesanan === "menunggu pembayaran" ? (
                      <div className="bg-purple-500 rounded-lg p-1 text-md text-black">
                        {transaction.status_pesanan}
                      </div>
                    ) : transaction.status_pesanan === "sudah dibayar" ? (
                      <div className="bg-blue-500 rounded-lg p-1 text-md text-black">
                        {transaction.status_pesanan}
                      </div>
                    ) : (
                      <div className="bg-green-500 rounded-lg p-1 text-md text-black">
                        {transaction.status_pesanan}
                      </div>
                    )}
                  </td>
                  <td className="text-center border px-4 py-2">
                    {transaction.status_pesanan === "menunggu pembayaran" ? (
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handlePencilSquareClick(transaction)}>
                        <PencilSquare className="w-5" />
                      </button>
                    ) : transaction.status_pesanan === "sudah dibayar" ||
                      transaction.status_pesanan === "pembayaran valid" ? (
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handlePencilSquareClick(transaction)}>
                        <PencilSquare className="w-5" />
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
      {selectedTransaction && (
        <BuktiPembayaran
          data={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </>
  );
}

export default PemesananList;
