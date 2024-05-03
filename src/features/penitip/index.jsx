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
            <a href="/add-penitip" className="btn px-6 btn-sm normal-case btn-primary">
                Add Penitip
            </a>
        </div>
    );
};

function Penitip() {
    const token = localStorage.getItem("token");
    const [trans, setTrans] = useState([]);
    const [penitip, setPenitip] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPenitip = async () => {
            console.log(token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/v1/penitip/getAllPenitip"
                );
                const fetchedPenitip = response.data.data;
                console.log(fetchedPenitip);
                setPenitip(fetchedPenitip);
                setTrans(fetchedPenitip);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPenitip();
    }, []);

    const deleteCurentPenitip = async (index) => {
        dispatch(
            openModal({
                title: "Confirmation",
                bodyType: MODAL_BODY_TYPES.CONFIRMATION,
                extraObject: {
                    message: `Are you sure you want to delete this Penitip?`,
                    type: CONFIRMATION_MODAL_CLOSE_TYPES.PENITIP_DELETE,
                    index,
                },
            })
        );
    };

    const handleDeletePenitip= async (e) => {
        const reload = await deleteCurentPenitip(e);
        if (reload) window.location.reload();
    };

    const applySearch = (value) => {
        let filteredTransactions = penitip.filter((t) => {
            return (
                t.nama.toLowerCase().includes(value.toLowerCase()) ||
                t.nama.toLowerCase().includes(value.toLowerCase())
            );
        });
        setTrans(filteredTransactions);
    };

    return (
        <>
            <TitleCard
                title="List Data Penitip"
                topMargin="mt-2"
                TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="text-center">Nama Penitip</th>
                                <th className="text-center">No Telepon</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Profit</th>
                                <th colSpan={2} className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trans.map((l, k) => {
                                return (
                                    <tr key={k}>
                                        <td className="text-center">{l.nama}</td>
                                        <td className="text-center">{l.no_telpn}</td>
                                        <td className="text-center">{l.email}</td>
                                        <td className="text-center">{l.profit}</td>
                                        <td style={{ padding: '0' }}>
                                            <button
                                                className="btn btn-square btn-ghost"
                                                onClick={() => handleDeletePenitip(l.id)}
                                                style={{ marginLeft: '100px' }}>
                                                <TrashIcon className="w-5" />
                                            </button>
                                            <Link
                                                to={`/edit-penitip/${l.id}`}
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

export default Penitip;
