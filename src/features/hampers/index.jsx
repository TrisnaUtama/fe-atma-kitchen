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
      <a href="add-hampers" className="btn px-6 btn-sm normal-case btn-primary">
        Add Hampers
      </a>
    </div>
  );
};

function Produk() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [hampers, setHampers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduk = async () => {
      console.log(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/hampers/getAll"
        );
        const fetchedHampers = response.data.data;
        console.log(fetchedHampers);
        setHampers(fetchedHampers);
        setTrans(fetchedHampers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduk();
  }, []);

  const deleteHampers = async (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this hampers?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.HAMPERS_DELETE,
          index,
        },
      })
    );
  };

  const handlerDeleteHampers = async (e) => {
    const reload = await deleteHampers(e);
    if (reload) window.location.reload();
  };

  const applySearch = (value) => {
    let filteredTransactions = hampers.filter((t) => {
      return t.nama_hampers.toLowerCase().includes(value.toLowerCase());
    });
    setTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title="List Hampers"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Gambar</th>
                <th className="text-center">Nama Hampers</th>
                <th className="text-center">Deskripsi</th>
                <th className="text-center">Harga</th>
                <th colSpan={2} className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {trans.map((l, k) => {
                return (
                  <tr key={k}>
                    <td className="text-center border px-4 py-2">
                      <div className="   space-x-3">
                        <div className="avatar">
                          <div className="w-28 h-28 rounded-lg">
                            <img
                              src={
                                "http://localhost:8000/storage/hampers/" +
                                l.gambar
                              }
                              alt="Avatar"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center border px-4 py-2">{l.nama_hampers}</td>
                    <td className="text-center border px-4 py-2">{l.deskripsi}</td>
                    <td className="text-center border px-4 py-2">${l.harga}</td>
                    <td className="text-end  border px-4 py-2">
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handlerDeleteHampers(l.id)}>
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                    <td className="text-start border px-4 py-2">
                      <Link
                        to={`/edit-hampers/${l.id}`}
                        className="btn btn-square btn-ghost">
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
