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
        href="/tambahResep"
        className="btn px-6 btn-sm normal-case btn-primary"
      >
        Tambah Resep
      </a>
    </div>
  );
};

function Produk() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [produk, setProduk] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduk = async () => {
      console.log(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/produk/getAll"
        );
        const fetchedProduk = response.data.data;
        console.log(fetchedProduk);
        setProduk(fetchedProduk);
        setTrans(fetchedProduk);
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
        setProduk(fetchedProduk);
        setTrans(fetchedProduk);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduk();
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

  const handleDeleteProduct = async (e) => {
    const reload = await deleteCurentProduct(e);
    if (reload) window.location.reload();
  };

  const applySearch = (value) => {
    let filteredTransactions = produk.filter((t) => {
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
        title="List Produk"
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
                        onClick={() => handleDeleteProduct(l.id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`/edit-produk/${l.id}`}
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

export default Produk;
