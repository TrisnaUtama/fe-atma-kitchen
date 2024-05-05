import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import DropdownInputGender from "../../../components/Input/DropDownInputGender";
import DropdownInputRole from "../../../components/Input/DropDownInputRole";
import { showNotification } from "../../common/headerSlice";
import getJabatan from "../hooks/roleSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import useHandlerAddKaryawan from "../hooks/addSlice";
import ErrorText from "../../../components/Typography/ErrorText";

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

function AddKaryawanPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const [lead, setLead] = useState(INITIAL_LEAD_OBJ);
  const [error, setError] = useState({});
  const [jabatanOptions, setJabatanOptions] = useState([]);
  const kategori = ["Male", "Female"];
  const { handlerAddPegawai } = useHandlerAddKaryawan();

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
    else if (lead.id_role.trim() === "")
      return setErrorMessage("Position cannot be empty!");
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

    await handlerAddPegawai(newLeadObj);
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
              placeholder="Enter name"
              value={lead.nama}
              onChange={(e) => setLead({ ...lead, nama: e.target.value })}
              updateFormValue={updateFormValue}
            />
          </div>
          <InputText
            labelTitle="Email Id"
            updateType={"email"}
            placeholder="Enter email"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            updateFormValue={updateFormValue}
          />
          <InputText
            type="password"
            updateType={"password"}
            labelTitle="Password"
            placeholder="Enter password"
            value={lead.password}
            onChange={(e) => setLead({ ...lead, password: e.target.value })}
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Phone Number"
            updateType={"no_telpn"}
            placeholder="Enter phone number"
            value={lead.no_telpn}
            onChange={(e) => setLead({ ...lead, no_telpn: e.target.value })}
            updateFormValue={updateFormValue}
          />
          <DropdownInputGender
            labelTitle="Gender"
            placeholder={"Select Gender"}
            options={kategori}
            value={lead.gender}
            onChange={HandleGenderChange}
          />
          <DropdownInputRole
            placeholder={"Select Position"}
            labelTitle="Position"
            options={jabatanOptions}
            value={lead.id_role}
            onChange={HandleRoleChange}
          />

          <InputText
            type="date"
            updateType={"tanggal_lahir"}
            labelTitle="Date of Birth"
            value={lead.tanggal_lahir}
            onChange={(e) =>
              setLead({ ...lead, tanggal_lahir: e.target.value })
            }
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Address"
            updateType={"alamat"}
            placeholder="Enter address"
            value={lead.alamat}
            onChange={(e) => setLead({ ...lead, alamat: e.target.value })}
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

export default AddKaryawanPage;
