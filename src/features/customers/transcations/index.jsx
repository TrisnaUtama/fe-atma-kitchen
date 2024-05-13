import React, { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import { useDispatch } from "react-redux";
import axios from "axios";

const TopSideButtons = ({ applySearch }) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

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

function Transaksi() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();

  const fetchTransaksi = async () => {
    console.log(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/detailPemesanan/getHistory"
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
    fetchTransaksi();
  }, []);

  const applySearch = (value) => {
    if (value === "") {
      fetchTransaksi();
    } else {
      const filteredTransactions = trans.filter((transaction) =>
        transaction.detail_pemesanan.some((detail) =>
          detail.produk.nama_produk.toLowerCase().includes(value.toLowerCase())
        )
      );
      setTrans(filteredTransactions);
    }
  };

  return (
    <>
      <TitleCard
        title="List Transaksi"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}
      >
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center">Nama Produk</th>
                  <th className="text-center">Harga</th>
                  <th className="text-center">kategori</th>
                  <th className="text-center">status_pesanan</th>
                  <th className="text-center">tanggal_pemesanan</th>
                  <th className="text-center">tanggal_pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {trans.map((transaction, index) => {
                  return transaction.detail_pemesanan.map((detail, idx) => {
                    return (
                      <tr key={`${index}-${idx}`}>
                        <td className="text-center">
                          {detail.produk.nama_produk}
                        </td>
                        <td className="text-center">{detail.produk.harga}</td>
                        <td className="text-center">
                          {detail.produk.kategori}
                        </td>
                        <td className="text-center">
                          {transaction.status_pesanan}
                        </td>
                        <td className="text-center">
                          {transaction.tanggal_pemesanan}
                        </td>
                        <td className="text-center">
                          {transaction.tanggal_pembayaran}
                        </td>
                        <td></td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        )}
      </TitleCard>
    </>
  );
}

export default Transaksi;
