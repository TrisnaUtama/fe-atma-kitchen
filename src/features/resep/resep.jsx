import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import { openModal } from "../common/modalSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquare from "@heroicons/react/24/outline/PencilSquareIcon";

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
      <a
        href="/tambahResep"
        className="btn px-6 btn-sm normal-case btn-primary"
      >
        Tambah Resep
      </a>
    </div>
  );
};

function Resep() {
  const [showModal, setShowModal] = useState(false); // State untuk mengontrol visibilitas modal
  const [modalType, setModalType] = useState("");
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [resep, setResep] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduk = async () => {
      console.log(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/resep/getAll"
        );
        const fetchedResep = response.data.data;
        console.log(fetchedResep);
        setResep(fetchedResep);
        setTrans(fetchedResep);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduk();
  }, []);

  useEffect(() => {
    const fetchProduk = async () => {
      console.log(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/resep/getAll"
        );
        const fetchedProduk = response.data.data;
        console.log(fetchedProduk);
        setResep(fetchedProduk);
        setTrans(fetchedProduk);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduk();
  }, []);
  const deleteCurentResep = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/resep/${id}`
      );
      if (response.status === 200) {
        return true; // Jika berhasil dihapus, kembalikan true
      }
    } catch (error) {
      console.error(error);
    }
    return false; // Jika gagal, kembalikan false
  };

  const handleDeleteResep = async (id) => {
    const reload = await deleteCurentResep(id);
    if (reload) window.location.reload();
  };

  const applySearch = (value) => {
    let filteredTransactions = resep.filter((t) => {
      return (
        t.nama_resep.toLowerCase().includes(value.toLowerCase()) ||
        t.nama_resep.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title="List Resep"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Nama Resep</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((l, k) => {
                return (
                  <tr key={k}>
                    <td className="text-center">{l.nama_resep}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handleDeleteResep(l.id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: `/editResep/${l.id}`,
                          state: { nama_resep: l.nama_resep },
                        }}
                        className="btn btn-square btn-ghost"
                      >
                        <PencilSquare className="w-5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Resep;
