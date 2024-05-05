import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import { useParams } from "react-router-dom";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard";
import useHandlerAddKaryawan from "../hooks/editSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import getPegawai from "../hooks/getSpecificPegawai";

const INITIAL_LEAD_OBJ = {
  gaji: 0,
  bonus: 0,
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

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLead({ ...lead, [updateType]: value });
  };

  const saveNewKaryawan = async (e) => {
    e.preventDefault();
    console.log(lead);
    if (lead.gaji === 0) return setErrorMessage("Gaji cannot be empty!");
    else if (lead.bonus === 0)
      return setErrorMessage("Bonus cannot be empty!");

    let newLeadObj = {
      gaji: lead.gaji,
      bonus: lead.bonus,
    };

    await handlerEditKaryawan(newLeadObj);
    dispatch(showNotification({ message: "New Employee Added!", status: 1 }));
  };

  return (
    <form onSubmit={saveNewKaryawan}>
      <TitleCard title="Add Employee" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            type={"number"}
            labelTitle="Gaji"
            placeholder={dataKaryawan.gaji}
            updateType="gaji"
            value={lead.gaji}
            updateFormValue={updateFormValue}
          />
          <InputText
            type={"number"}
            labelTitle="Bonus"
            placeholder={dataKaryawan.bonus}
            updateType="bonus"
            value={lead.bonus}
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
