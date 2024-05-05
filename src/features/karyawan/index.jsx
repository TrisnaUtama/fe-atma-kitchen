import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import { openModal } from "../common/modalSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
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
        href="/addKaryawan"
        className="btn px-6 btn-sm normal-case btn-primary"
      >
        Add Karyawan
      </a>
    </div>
  );
};

function Karyawan() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [karyawan, setKaryawan] = useState([]); // Changed variable name here
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchKaryawan = async () => {
      console.log(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/pegawai/getAll"
        );
        const fetchedKaryawan = response.data.data;
        console.log(fetchedKaryawan);
        setKaryawan(fetchedKaryawan);
        setTrans(fetchedKaryawan);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKaryawan();
  }, []);

  useEffect(() => {
    const fetchKaryawan = async () => {
      console.log(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/pegawai/getAll"
        );
        const fetchedKaryawan = response.data.data;
        console.log(fetchedKaryawan);
        setKaryawan(fetchedKaryawan);
        setTrans(fetchedKaryawan);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKaryawan();
  }, []);

  const deleteCurentProduct = async (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this product?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PRODUK_DELETE,
          index,
        },
      })
    );
  };
  const handleDeleteProduct = async (id) => {
    const reload = await deleteCurentPegawai(id);
    if (reload) window.location.reload();
  };

  const deleteCurentPegawai = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/pegawai/${id}`
      );
      if (response.status === 200) {
        return true; // Jika berhasil dihapus, kembalikan true
      }
    } catch (error) {
      console.error(error);
    }
    return false; // Jika gagal, kembalikan false
  };

  const applySearch = (value) => {
    let filteredTransactions = karyawan.filter((t) => {
      return (
        t.nama.toLowerCase().includes(value.toLowerCase()) ||
        t.nama.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return "Owner";
      case 2:
        return "Admin";
      case 3:
        return "Manager Operasional";
      case 4:
        return "Pattisier";
      default:
        return "Unknown Role";
    }
  };

  return (
    <>
      <TitleCard
        title="List Karyawan"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Jabatan</th>
                <th className="text-center">Nama</th>
                <th className="text-center">Email</th>
                <th className="text-center">Alamat</th>
                <th className="text-center">No Telepon</th>
                <th className="text-center">Gender</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="text-center">
                        {getRoleName(l.id_role)}
                      </div>
                    </td>
                    <td className="text-center">{l.nama}</td>
                    <td className="text-center">{l.email}</td>
                    <td className="text-center">{l.alamat}</td>
                    <td className="text-center">{l.no_telpn}</td>
                    <td className="text-center">{l.gender}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handleDeleteProduct(l.id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/editKaryawan/${l.id}`}
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

export default Karyawan;
