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
        href="/add-pembelian"
        className="btn px-6 btn-sm normal-case btn-primary"
      >
        Add Pembelian
      </a>
    </div>
  );
};

function PemebelianBahanBaku() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [pemebelianBahanBaku, setPemeblianBahanBaku] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBahanBaku = async () => {
      console.log(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/pembelianBahanBaku/getAll"
        );
        const fetchedPembelian = response.data.data;
        setPemeblianBahanBaku(fetchedPembelian);
        setTrans(fetchedPembelian);
        console.log(fetchedPembelian);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBahanBaku();
  }, []);

  const deleteCurrentPembelian = async (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this pembelian?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.PEMBELIAN_DELETE,
          index,
        },
      })
    );
  };

  const handleDeletePembelian = async (e) => {
    const reload = await deleteCurrentPembelian(e);
    if (reload) window.location.reload();
  };

  const applySearch = (value) => {
    let filteredTransactions = pemebelianBahanBaku.filter((t) => {
      return t.nama.toLowerCase().includes(value.toLowerCase());
    });
    setTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title="List Pembelian Bahan Baku"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Nama Bahan</th>
                <th className="text-center">Jumlah</th>
                <th className="text-center">Harga</th>
                <th className="text-center" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(trans) &&
                trans.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.nama}</td>
                    <td className="text-center">{item.jumlah}</td>
                    <td className="text-center">{item.harga}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handleDeletePembelian(item.id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                    <td className="text-start">
                      <Link
                        to={`/edit-pembelian/${item.id}`}
                        className="btn btn-square btn-ghost"
                      >
                        <PencilSquare className="w-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default PemebelianBahanBaku;
