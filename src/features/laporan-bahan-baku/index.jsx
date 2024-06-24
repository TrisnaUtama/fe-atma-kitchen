import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import Receipt from "./components/laporan";

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

function ReportProduk() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [ReportBahanBaku, setReportBahanBaku] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchBahanBaku = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/reportBahanBaku/getAllBahanBaku`
        );
        const fetchBahanBaku = Object.values(response.data.data);
        setReportBahanBaku(fetchBahanBaku);
        setTrans(fetchBahanBaku);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBahanBaku();
  }, [token, selectedDate]);

  const applySearch = (value) => {
    const filteredTransactions = ReportBahanBaku.filter((t) =>
      t.nama_bahan_baku.toLowerCase().includes(value.toLowerCase())
    );
    setTrans(filteredTransactions);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = trans.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrint = () => {
    const printContents = document.getElementById("receipt-to-print").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  console.log(trans);
  return (
    <>
      <TitleCard
        title="Pemakaian Bahan Baku"
        topMargin="mt-2"
        TopSideButtons={
          <>
            <TopSideButtons
              applySearch={applySearch}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </>
        }>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center border px-4 py-2">
                  Nama Bahan Baku
                </th>
                <th className="text-center border px-4 py-2">Jumlah</th>
                <th className="text-center border px-4 py-2">Stok</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentItems) && currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center border px-4 py-2">
                      {item.nama_bahan_baku}
                    </td>
                    <td className="text-center border px-4 py-2">
                      {item.stok}
                    </td>
                    <td className="text-center border px-4 py-2">
                      {item.satuan}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center border px-4 py-2">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
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
        <div className="flex justify-end">
          <button
            className="btn btn-primary justify-start"
            onClick={handlePrint}>
            Print Report
          </button>
        </div>
      </TitleCard>
      <div style={{ display: "none" }}>
        <div id={`receipt-to-print`} style={{ display: "none" }}>
          <Receipt transaction={trans} />
        </div>
      </div>
    </>
  );
}

export default ReportProduk;
