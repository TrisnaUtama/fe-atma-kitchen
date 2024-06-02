import { useEffect, useState, useCallback } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import axios from "axios";
import PencilSquare from "@heroicons/react/24/outline/PencilSquareIcon";
import Modal from "./components/modal-confirmation";
import { processOrder } from "./hooks/process-orders";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopSideButtons = ({
  applySearch,
  selectedRows,
  handleAction,
  dataLength,
  showModal,
}) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    applySearch(searchText);
  }, [searchText, applySearch]);

  return (
    <div className="inline-block float-right">
      {selectedRows.length > 0 && (
        <button className="btn btn-primary ml-4 mr-4" onClick={showModal}>
          {selectedRows.length === dataLength.length
            ? "Process All Orders"
            : `Process ${selectedRows.length} Orders`}
        </button>
      )}
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
    </div>
  );
};

function PemesananDiterima() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [pemesanan, setPemesanan] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPencilSquareClicked, setIsPencilSquareClicked] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPemesanan = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/pemesanan-to-proses"
        );
        const fetchedPemesanan = response.data.data;
        setPemesanan(fetchedPemesanan);
        setTrans(fetchedPemesanan);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPemesanan();
  }, [token]);

  const applySearch = useCallback(
    (value) => {
      let filteredTransactions = pemesanan.filter((t) => {
        return (
          (t.tanggal_pemesanan?.toLowerCase() ?? "").includes(
            value.toLowerCase()
          ) ||
          (t.tanggal_pembayaran?.toLowerCase() ?? "").includes(
            value.toLowerCase()
          ) ||
          (t.status_pesanan?.toLowerCase() ?? "").includes(
            value.toLowerCase()
          ) ||
          (t.no_nota?.toLowerCase() ?? "").includes(value.toLowerCase()) ||
          (t.tanggal_diambil?.toLowerCase() ?? "").includes(value.toLowerCase())
        );
      });
      setTrans(filteredTransactions);
    },
    [pemesanan]
  );

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === pemesanan.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(trans.map((t) => t.id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAction = async () => {
    if (isPencilSquareClicked) {
      try {
        await processOrder(selectedRows);
        setIsModalOpen(false);
        setIsPencilSquareClicked(false);
        toast.success("Orders processed successfully!");
      } catch (error) {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.insufficient_stock
        ) {
          const insufficientStock = error.response.data.insufficient_stock;
          const messages = insufficientStock.map(
            (stock) =>
              `${stock.ingredient}: Insufficient stock. Required quantity: ${stock.required_quantity}, Available stock: ${stock.available_stock}`
          );
          messages.forEach((message) => toast.error(message));
        } else {
          console.error("Error processing orders:", error);
          toast.error("Failed to process orders!");
          setIsModalOpen(false);
        }
      }
    } else {
      try {
        const selectedData = trans.filter((item) =>
          selectedRows.includes(item.id)
        );
        await processOrder(selectedData.map((data) => data.id));
        setIsModalOpen(false);
        setIsPencilSquareClicked(false);
        toast.success("Orders processed successfully!");
      } catch (error) {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.insufficient_stock
        ) {
          const insufficientStock = error.response.data.insufficient_stock;
          const messages = insufficientStock.map(
            (stock) =>
              `${stock.ingredient}: Insufficient stock. Required quantity: ${stock.required_quantity}, Available stock: ${stock.available_stock}`
          );
          messages.forEach((message) => toast.error(message));
        } else {
          console.error("Error processing orders:", error);
          toast.error("Failed to process orders!");
        }
      }
    }
  };

  const handlePencilSquareClick = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
    setIsModalOpen(true);
    setIsPencilSquareClicked(true);
  };

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleHideModal = () => {
    setIsModalOpen(false);
  };

  const totalPages = Math.ceil(trans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = trans.slice(startIndex, endIndex);

  return (
    <>
      <TitleCard
        title="List Pesanan Diterima"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            selectedRows={selectedRows}
            handleAction={handleAction}
            dataLength={pemesanan}
            showModal={handleShowModal}
          />
        }>
        <div className="overflow-x-auto w-full">
          {trans.length === 0 ? (
            <p className="text-center py-4">No orders to process.</p>
          ) : (
            <>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="text-center">
                      <button
                        className="btn btn-ghost"
                        onClick={handleSelectAll}>
                        {selectedRows.length === pemesanan.length
                          ? "Deselect All"
                          : "Select All"}
                      </button>
                    </th>
                    <th className="text-center">Nomor Nota</th>
                    <th className="text-center">Tanggal Pemesanan</th>
                    <th className="text-center">Tanggal Pembayaran</th>
                    <th className="text-center">Tanggal Diambil</th>
                    <th className="text-center">Status Pemesanan</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((l, k) => (
                    <tr key={k} className="hover:bg-gray-700">
                      <td className="rounded text-center px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(l.id)}
                          onChange={() => handleSelectRow(l.id)}
                        />
                      </td>
                      <td className="text-center px-4 py-2">{l.no_nota}</td>
                      <td className="text-center px-4 py-2">
                        {l.tanggal_pemesanan}
                      </td>
                      <td className="text-center px-4 py-2">
                        {l.tanggal_pembayaran}
                      </td>
                      <td className="text-center px-4 py-2">
                        {l.tanggal_diambil}
                      </td>
                      <td className="text-center px-4 py-2">
                        <div className="p-0.5 bg-purple-800 rounded-lg font-semibold">
                          {l.status_pesanan}
                        </div>
                      </td>
                      <td className="text-end px-4 py-2 rounded">
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => handlePencilSquareClick(l.id)}>
                          <PencilSquare className="w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-4">
                <button
                  className="btn btn-ghost mr-2"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
                <span className="btn btn-ghost">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-ghost ml-2"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </TitleCard>
      {isModalOpen && (
        <Modal
          onClose={handleHideModal}
          onConfirm={handleAction}
          title="Confirm Action">
          <p>Are you sure you want to process the selected orders?</p>
        </Modal>
      )}
    </>
  );
}

export default PemesananDiterima;
