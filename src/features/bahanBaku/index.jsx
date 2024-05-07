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
        href="/add-bahanbaku"
        className="btn px-6 btn-sm normal-case btn-primary">
        Add Bahan Baku
      </a>
    </div>
  );
};

function BahanBaku() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const [bahanBaku, setBahanBaku] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBahanBaku = async () => {
      console.log(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/bahanbaku/getAllBahanBaku"
        );
        const fetchedBahanBaku = response.data.data;
        console.log(fetchedBahanBaku);
        setBahanBaku(fetchedBahanBaku);
        setTrans(fetchedBahanBaku);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBahanBaku();
  }, []);

  const deleteCurentBahanBaku = async (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this bahan baku?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.BAHAN_BAKU_DELETE,
          index,
        },
      })
    );
  };

  const handleDeleteBahanBaku = async (e) => {
    const reload = await deleteCurentBahanBaku(e);
    if (reload) window.location.reload();
  };

  const applySearch = (value) => {
    let filteredTransactions = bahanBaku.filter((t) => {
      return (
        t.nama_bahan_baku.toLowerCase().includes(value.toLowerCase()) ||
        t.nama_bahan_baku.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title="List Bahan Baku"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Nama Bahan Baku</th>
                <th className="text-center">Stok</th>
                <th className="text-center">Satuan</th>
                <th colSpan={2} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((l, k) => {
                return (
                  <tr key={k}>
                    <td className="text-center">{l.nama_bahan_baku}</td>
                    <td className="text-center">{l.stok}</td>
                    <td className="text-center">{l.satuan}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handleDeleteBahanBaku(l.id)}>
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                    <td className="text-start">
                      <Link
                        to={`/edit-bahanbaku/${l.id}`}
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

export default BahanBaku;
