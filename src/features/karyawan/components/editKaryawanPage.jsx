import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { useParams } from "react-router-dom";

import DropdownInputGender from "../../../components/Input/DropDownInputGender";
import DropdownInputRole from "../../../components/Input/DropDownInputRole";
import { showNotification } from "../../common/headerSlice";
import getJabatan from "../hooks/roleSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import useHandlerAddKaryawan from "../hooks/editSice";
import ErrorText from "../../../components/Typography/ErrorText";
import getPegawai from "../hooks/getSpecificPegawai";

const INITIAL_LEAD_OBJ = {
  nama: "",
  no_telpn: "",
  email: "",
  password: "",
  gender: "",
  id_role: "",
  alamat: "",
  tanggal_lahir: "",
  bonus: "",
  gaji: "",
};

function EditKaryawanPage() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [lead, setLead] = useState(INITIAL_LEAD_OBJ);
  const [error, setError] = useState({});
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const [dataKaryawan, setdataKaryawan] = useState({});
  const kategori = ["Male", "Female"];
  const { handlerEditKaryawan } = useHandlerAddKaryawan(id);

  // const fetchSpecificKaryawan = async () => {
  //   try {
  //     const specificData = await getPegawai(id);
  //     setLead({
  //       ...lead,
  //       nama: specificData.data.nama,
  //       no_telpn: specificData.data.no_telpn,
  //       email: specificData.data.email,
  //       password: specificData.data.password,
  //       gender: specificData.data.gender,
  //       id_role: specificData.data.id_role,
  //       alamat: specificData.data.alamat,
  //       tanggal_lahir: specificData.data.tanggal_lahir,
  //     });
  //     setdataKaryawan(specificData.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // fetchSpecificKaryawan();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const specificData = await getPegawai(id);
        setLead(specificData.data);
        setdataKaryawan(specificData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchDataJabatan = async () => {
      try {
        const dataPenitip = await getJabatan();
        const namaPenitipList = dataPenitip.data.map((jabatan) => ({
          id: jabatan.id,
          nama: jabatan.jabatan,
        }));
        setJabatanOptions(namaPenitipList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataJabatan();
  }, []);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLead({ ...lead, [updateType]: value });
  };

  const HandleGenderChange = (event) => {
    setLead({ ...lead, gender: event.target.value });
  };
  const HandleRoleChange = (event) => {
    setLead({ ...lead, id_role: event.target.value });
  };
  const saveNewKaryawan = async (e) => {
    e.preventDefault();
    console.log(lead);
    if (lead.nama.trim() === "")
      return setErrorMessage("Name cannot be empty!");
    else if (lead.email.trim() === "")
      return setErrorMessage("Email cannot be empty!");
    else if (lead.password.trim() === "")
      return setErrorMessage("Password cannot be empty!");
    else if (lead.no_telpn.trim() === "")
      return setErrorMessage("Phone number cannot be empty!");
    else if (lead.gender.trim() === "")
      return setErrorMessage("Gender cannot be empty!");
    else if (!lead.id_role) return setErrorMessage("Position cannot be empty!");
    else if (lead.tanggal_lahir.trim() === "")
      return setErrorMessage("Date of Birth cannot be empty!");
    else if (lead.alamat.trim() === "")
      return setErrorMessage("Address cannot be empty!");

    let newLeadObj = {
      nama: lead.nama,
      email: lead.email,
      password: lead.password,
      no_telpn: lead.no_telpn,
      gender: lead.gender,
      id_role: lead.id_role,
      alamat: lead.alamat,
      tanggal_lahir: lead.tanggal_lahir,
      bonus: lead.bonus,
      gaji: lead.gaji,
    };

    await handlerEditKaryawan(newLeadObj);
    dispatch(showNotification({ message: "New Employee Added!", status: 1 }));
  };

  return (
    <form onSubmit={saveNewKaryawan}>
      <TitleCard title="Add Employee" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputText
              type="text"
              labelTitle="Name"
              updateType="nama"
              placeholder={dataKaryawan.nama}
              value={lead.nama}
              updateFormValue={updateFormValue}
            />
          </div>
          <InputText
            type="text"
            labelTitle="Email"
            updateType="email"
            value={lead.email} // tambahkan properti value di sini
            placeholder={dataKaryawan.email}
          />

          <InputText
            type="password"
            updateType={"password"}
            labelTitle="Password"
            placeholder={dataKaryawan.password}
            value={lead.password}
          />
          <InputText
            labelTitle="Phone Number"
            updateType="no_telpn"
            placeholder={dataKaryawan.no_telpn}
            value={lead.no_telpn}
          />
          <DropdownInputGender
            labelTitle="Gender"
            placeholder={dataKaryawan.gender}
            options={kategori}
            value={lead.gender}
            onChange={HandleGenderChange}
          />
          <DropdownInputRole
            placeholder={dataKaryawan.id_role}
            labelTitle="Position"
            options={jabatanOptions}
            value={lead.id_role}
            onChange={HandleRoleChange}
          />

          <InputText
            type="date"
            placeholder={dataKaryawan.tanggal_lahir}
            updateType="tanggal_lahir"
            labelTitle="Date of Birth"
            value={lead.tanggal_lahir}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Address"
            placeholder={dataKaryawan.alamat}
            updateType="alamat"
            value={lead.alamat}
            updateFormValue={updateFormValue}
          />
        </div>
        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="divider"></div>
        <div className="mt-16">
          <button type="submit" className="btn btn-primary float-right">
            Add Employee
          </button>
        </div>
      </TitleCard>
    </form>
  );
}

export default EditKaryawanPage;
