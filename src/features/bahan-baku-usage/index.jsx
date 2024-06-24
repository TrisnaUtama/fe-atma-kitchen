import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import axios from "axios";

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

function BahanBaku() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [bahanBaku, setBahanBaku] = useState([]);

  useEffect(() => {
    const fetchProduk = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/bahan-baku-usage/"
        );
        const fetchBahanBaku = Object.values(response.data.data);
        console.log("Fetched Data:", fetchBahanBaku);
        setBahanBaku(fetchBahanBaku);
        setTrans(fetchBahanBaku);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProduk();
  }, [token]);

  const applySearch = (value) => {
    const filteredTransactions = bahanBaku.filter((t) =>
      t.name.toLowerCase().includes(value.toLowerCase())
    );
    setTrans(filteredTransactions);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trans.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <TitleCard
        title="Pemakaian Bahan Baku"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center border px-4 py-2">
                  Nama Bahan Baku
                </th>
                <th className="text-center border px-4 py-2">
                  Jumlah Terpakai
                </th>
                <th className="text-center border px-4 py-2">Satuan</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentItems) && currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center border px-4 py-2">
                      {item.bahan_baku.nama_bahan_baku}
                    </td>
                    <td className="text-center border px-4 py-2">
                      {item.jumlah_terpakai}
                    </td>
                    <td className="text-center border px-4 py-2">
                      {item.bahan_baku.satuan}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center border px-4 py-2">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-ghost mr-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
          <span className="btn btn-ghost">
            Page {currentPage} of {Math.ceil(trans.length / itemsPerPage)}
          </span>
          <button
            className="btn btn-ghost ml-2"
            disabled={
              currentPage === Math.ceil(trans.length / itemsPerPage) ||
              Math.ceil(trans.length / itemsPerPage) === 0
            }
            onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default BahanBaku;
