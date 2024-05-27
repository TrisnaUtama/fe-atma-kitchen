import React, { useEffect, useState, useCallback } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import axios from "axios";
import Receipt from "./ModalPembayaran";

const TopSideButtons = ({ applySearch }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    applySearch(searchText);
  }, [searchText, applySearch]);

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
  }, [token, userLogin.id]);

  const applySearch = useCallback(
    (value) => {
      let filteredTransactions = listPemesanan.filter((t) => {
        return (
          ["sudah di bayar", "pembayaran valid", "diterima"].includes(
            t.status_pesanan
          ) && t.status_pesanan.toLowerCase().includes(value.toLowerCase())
        );
      });
      setTrans(filteredTransactions);
    },
    [listPemesanan]
  );

  const handlePrint = (transaction) => {
    const printContents = document.getElementById(
      `receipt-to-print-${transaction.id}`
    ).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <>
      <TitleCard
        title="List Pemesanan"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center border px-4 py-2">Nomer Nota</th>
                <th className="text-center border px-4 py-2">
                  Tanggal Pemesanan
                </th>
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
                    <button
                      className="btn text-md"
                      onClick={() => handlePrint(transaction)}
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
      <div style={{ display: "none" }}>
        {trans.map((transaction) => (
          <div
            key={transaction.id}
            id={`receipt-to-print-${transaction.id}`}
            style={{ display: "none" }}
          >
            <Receipt transaction={transaction} />
          </div>
        ))}
      </div>
    </>
  );
}

export default PemesananList;
