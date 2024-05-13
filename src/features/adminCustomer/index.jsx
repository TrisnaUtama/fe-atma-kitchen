import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import { openModal } from "../common/modalSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { searchCustomer } from "./data_customer/dataCustomer";
import { getDataCustomer } from "./data_customer/dataCustomer";

import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";

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
    </div>
  );
};


function Customer() {
  const token = localStorage.getItem("token");
  const [trans, setTrans] = useState([]);
  const dispatch = useDispatch();
  const [dataCustomer, setDataCustomer] = useState([]);
  const [historyCustomer, sethistoryCustomer] = useState([]);

  

  useEffect(()=>{
    const fetchData = async () =>{
      const data = await searchCustomer('');
      console.log(data);
      setDataCustomer(data);
    };
    fetchData();
  },[]);
  


  const applySearch = (value) => {
    let filteredTransactions = dataCustomer.filter((searchCustomer) => {
      return (
        searchCustomer.nama.includes(value.toLowerCase()) ||
        searchCustomer.nama.includes(value.toLowerCase())
      );
    });
    setDataCustomer(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title="List Customer"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Nama Customer</th>
                <th className="text-center">email</th>
                <th className="text-center">Nomer Telepon</th>
                <th className="text-center">Tanggal Lahir</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Poin</th>
                <th colSpan={2} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {dataCustomer.map((l, k) => {
                return (
                  <tr key={k}>
                    <td className="text-center">{l.nama}</td>
                    <td className="text-center">{l.email}</td>
                    <td className="text-center">{l.no_telpn}</td>
                    <td className="text-center">{l.tanggal_lahir}</td>
                    <td className="text-center">{l.gender}</td>
                    <td className="text-center">{l.poin}</td>
                    <td className="text-start">
                      <Link
                        to={`/detailPesanan/${l.id}`}
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

export default Customer;
