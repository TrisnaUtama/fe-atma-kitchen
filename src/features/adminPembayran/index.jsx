import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import PencilSquare from "@heroicons/react/24/outline/PencilSquareIcon";
import { useDispatch } from "react-redux";
import AddPembayaran from "./AddPembayran";
import axios from "axios";

const TopSideButtons = ({
  removeFilter,
  applyFilter,
  applySearch,
  filterParam,
  setFilterParam,
  searchText,
  setSearchText,
}) => {
  const locationFilters = ["pembayaran valid"];

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {filterParam !== "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {locationFilters.map((l, k) => (
            <li key={k}>
              <a onClick={() => showFiltersAndApply(l)}>{l}</a>
            </li>
          ))}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <button onClick={() => removeAppliedFilter()}>Remove Filter</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

function Transaksi() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [error, setError] = useState(null);
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentTrans, setCurrentTrans] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentError, setPaymentError] = useState(null); // For handling payment errors
  const dispatch = useDispatch();

  const openAddNewLeadModal = (transItem) => {
    setCurrentTrans(transItem);
    setIsModalOpen(true);
    console.log(transItem);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTrans(null);
    setPaymentError(null); // Clear the payment error when closing the modal
  };

  const removeFilter = async () => {
    await fetchTransaksi(); // Re-fetch the original data
  };

  const applyFilter = async (params) => {
    if (params === "pembayaran valid") {
      await prosesPesanan();
    } else {
      let filteredTransactions = trans.filter((t) => {
        return t.location === params;
      });
      setTrans(filteredTransactions);
    }
  };

  // Search according to nama
  const applySearch = (value) => {
    let filteredTransactions = trans.filter((t) => {
      return (
        t.nama &&
        t.nama.nama &&
        t.nama.nama.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  const prosesPesanan = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/detailPemesanan/getStatusPesanan"
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

  const fetchTransaksi = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/detailPemesanan/getStatus"
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

  const handleSave = async (bayar) => {
    if (!currentTrans) return;

    const { id } = currentTrans; // Assuming the transaction has an ID field

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/detailPemesanan/addPembayaran/${id}`,
        { uang_customer: bayar },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setTrans((prevTrans) =>
          prevTrans.map((item) =>
            item.id === id ? { ...item, uang_customer: bayar } : item
          )
        );
        console.log(response.data.message);
        closeModal();
      } else {
        // Handle insufficient payment
        setPaymentError(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update pembayaran:", error);
    }
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const getStatusBadgeClass = (status_pesanan) => {
    return status_pesanan === "pembayaran valid" ? "badge badge-accent " : "";
  };

  return (
    <>
      <TitleCard
        title="List Pembayaran"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
            filterParam={filterParam}
            setFilterParam={setFilterParam}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        }
      >
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
                  <th className="text-center">Uang Customer</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Tip</th>
                  <th className="text-center">Jarak</th>
                  <th className="text-center">Bukti Pembayaran</th>
                  <th className="text-center">Ongkir</th>
                  {filterParam !== "pembayaran valid" && (
                    <th className="text-center">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {trans.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.nama.nama}</td>
                    <td className={"text-center"}>
                      <div className={getStatusBadgeClass(item.status_pesanan)}>
                        {item.status_pesanan}
                      </div>
                    </td>

                    <td className="text-center">{item.nama.no_telpn}</td>
                    <td className="text-center">
                      {item.id_alamat == null
                        ? "dipickup"
                        : item.alamat[0].nama_alamat}
                    </td>
                    <td className="text-center">
                      {item.uang_customer ? item.uang_customer : "0"}
                    </td>
                    <td className="text-center">
                      {item.detail_pemesanan.length > 0
                        ? item.detail_pemesanan[0].subtotal
                        : "0"}
                    </td>
                    <td className="text-center">
                      {item.tip == null ? "0" : item.tip}
                    </td>
                    <td className="text-center">
                      {item.jarak_delivery ? item.jarak_delivery : "dipickup"}
                    </td>
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
                      {item.ongkir ? item.ongkir : "dipickup"}
                    </td>
                    {filterParam !== "pembayaran valid" && (
                      <td
                        className="text-center flex justify-center"
                        onClick={() => openAddNewLeadModal(item)}
                      >
                        <PencilSquare className="w-5" />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TitleCard>
      {isModalOpen && (
        <AddPembayaran
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          initialData={currentTrans}
          paymentError={paymentError} // Pass the payment error to the modal
        />
      )}
    </>
  );
}

export default Transaksi;
