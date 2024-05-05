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
            <a href="/add-pengeluaran" className="btn px-6 btn-sm normal-case btn-primary">
                Add Pengeluaran
            </a>
        </div>
    );
};

function Pengeluaran() {
    const token = localStorage.getItem("token");
    const [trans, setTrans] = useState([]);
    const [pengeluaran, setPengeluaran] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPengeluaran = async () => {
            console.log(token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/v1/pengeluaranLain/getAll"
                );
                const fetchedPengeluaran = response.data.data;
                console.log(fetchedPengeluaran);
                setPengeluaran(fetchedPengeluaran);
                setTrans(fetchedPengeluaran);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPengeluaran();
    }, []);

    const deleteCurentPengeluaran = async (index) => {
        dispatch(
            openModal({
                title: "Confirmation",
                bodyType: MODAL_BODY_TYPES.CONFIRMATION,
                extraObject: {
                    message: `Are you sure you want to delete this pengeluaran?`,
                    type: CONFIRMATION_MODAL_CLOSE_TYPES.PENGELUARAN_DELETE,
                    index,
                },
            })
        );
    };

    const handleDeletePengeluaran = async (e) => {
        const reload = await deleteCurentPengeluaran(e);
        if (reload) window.location.reload();
    };

    const applySearch = (value) => {
        let filteredTransactions = pengeluaran.filter((t) => {
            return (
                t.nama_pengeluaran.toLowerCase().includes(value.toLowerCase()) ||
                t.nama_pengeluaran.toLowerCase().includes(value.toLowerCase())
            );
        });
        setTrans(filteredTransactions);
    };

    return (
        <>
            <TitleCard
                title="List Pengeluaran"
                topMargin="mt-2"
                TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-center">Nama Pengeluaran</th>
                                <th className="text-center">Total Pengeluaran</th>
                                <th className="text-center">Tanggal Pembelian</th>
                                <th colSpan={2} className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trans.map((l, k) => {
                                return (
                                    <tr key={k}>
                                        <td className="text-center">{l.nama_pengeluaran}</td>
                                        <td className="text-center">{l.total_pengeluaran}</td>
                                        <td className="text-center">{l.tanggal_pembelian}</td>
                                        <td style={{ padding: '0' }}>
                                            <button
                                                className="btn btn-square btn-ghost"
                                                onClick={() => handleDeletePengeluaran(l.id)}
                                                style={{ marginLeft: '230px' }}>
                                                <TrashIcon className="w-5" />
                                            </button>
                                            <Link
                                                to={`/edit-pengeluaran/${l.id}`}
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

export default Pengeluaran;
