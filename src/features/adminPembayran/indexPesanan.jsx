import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();

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
        "http://127.0.0.1:8000/api/v1/detailPemesanan/getStatusDiproses"
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
        "http://127.0.0.1:8000/api/v1/detailPemesanan/getStatusDiproses"
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

  const getStatusBadgeClass = (status_pesanan) => {
    return status_pesanan === "pembayaran valid" ? "badge badge-accent " : "";
  };

  const handlePickup = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/detailPemesanan/updateStatus/${id}`,
        { status_pesanan: "siap di-pickup" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        // Update the status locally
        setTrans((prevTrans) =>
          prevTrans.map((item) =>
            item.id === id
              ? { ...item, status_pesanan: "siap di-pickup" }
              : item
          )
        );
        console.log(response.data.message);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleKirim = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/detailPemesanan/updateStatus/${id}`,
        { status_pesanan: "sedang dikirim" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        // Update the status locally
        setTrans((prevTrans) =>
          prevTrans.map((item) =>
            item.id === id
              ? { ...item, status_pesanan: "sedang dikirim" }
              : item
          )
        );
        console.log(response.data.message);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <>
      <TitleCard
        title="Detail Pesanan"
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
                  <th className="text-center">Alamat</th>
                  <th className="text-center">Bukti Pembayaran</th>
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
                    <td className="text-center">
                      {item.id_alamat == null
                        ? "dipickup"
                        : item.alamat[0].nama_alamat}
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
                    {filterParam !== "pembayaran valid" && (
                      <td className="text-center">
                        <div className="flex justify-center">
                          {item.jarak_delivery === null ? (
                            <button
                              className="btn btn-xs btn-secondary"
                              onClick={() => handlePickup(item.id)}
                            >
                              Siap Di-Pickup
                            </button>
                          ) : (
                            <button
                              className="btn btn-xs btn-primary"
                              onClick={() => handleKirim(item.id)}
                            >
                              Sedang Dikirim
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TitleCard>
    </>
  );
}

export default Transaksi;
