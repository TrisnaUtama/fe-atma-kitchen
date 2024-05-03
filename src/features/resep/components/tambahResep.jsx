import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import DropdownKategori from "../../../components/Input/DropDownKategorResep";
import getBahanBaku from "../hooks/bahanBaku";
import useHandlerAddResep from "../hooks/leadSlice";
import ErrorText from "../../../components/Typography/ErrorText";

function ProfileSettings() {
  const INITIAL_LEAD_OBJ = {
    id_bahan_baku: "",
    nama_resep: "",
    nama_bahan_baku: "",
    jumlah: "",
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [bahanBakuOptions, setBahanBakuOptions] = useState([]);
  const [additionalDropdowns, setAdditionalDropdowns] = useState([]);
  const dispatch = useDispatch();
  const { handllerAddResep } = useHandlerAddResep();

  const updateResep = () => {
    dispatch(showNotification({ message: "Resep Updated", status: 1 }));
  };

  const handleBahanBakuChange = (event) => {
    setLeadObj({ ...leadObj, nama_bahan_baku: event.target.value });
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");

    setLeadObj({ ...leadObj, [updateType]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataBahanBaku = await getBahanBaku();
      setBahanBakuOptions(dataBahanBaku.data);
    };
    fetchData();
  }, []);

  const saveNewResep = async (e) => {
    e.preventDefault();
    console.log(additionalDropdowns);
    console.log(leadObj);

    // your validation logic here

    if (additionalDropdowns.length > 0) {
      await Promise.all(
        additionalDropdowns.map(async (dropdown) => {
          let newLeadObj = {
            nama_resep: dropdown.nama_resep || leadObj.nama_resep,
            nama_bahan_baku: dropdown.value || leadObj.nama_bahan_baku,
            jumlah: dropdown.jumlah || leadObj.jumlah,
          };
          await handllerAddResep(newLeadObj);
        })
      );
    } else {
      let newLeadObj = {
        nama_resep: leadObj.nama_resep,
        nama_bahan_baku: leadObj.nama_bahan_baku,
        jumlah: leadObj.jumlah,
      };
      await handllerAddResep(newLeadObj);
    }

    dispatch(showNotification({ message: "New Resep Added!", status: 1 }));
  };

  const handleTambahDropdown = () => {
    setAdditionalDropdowns([
      ...additionalDropdowns,
      { id: additionalDropdowns.length, value: "" },
    ]);
  };

  const handleAdditionalDropdownChange = (id, event) => {
    const updatedDropdowns = additionalDropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return { ...dropdown, value: event.target.value };
      }
      return dropdown;
    });
    setAdditionalDropdowns(updatedDropdowns);
  };

  return (
    <>
      <form onSubmit={saveNewResep}>
        <TitleCard title="Tambah Resep" topMargin="mt-2">
          <div>
            <InputText
              type="text"
              defaultValue={leadObj.nama_resep}
              updateType="nama_resep"
              containerStyle="mt-4"
              labelTitle="Nama Resep"
              placeholder="Masukan Nama Resep"
              updateFormValue={updateFormValue}
            />
          </div>
          <div>
            {additionalDropdowns.map((dropdown, index) => (
              <div key={index}>
                <DropdownKategori
                  value={dropdown.value}
                  onChange={(event) =>
                    handleAdditionalDropdownChange(dropdown.id, event)
                  }
                  options={bahanBakuOptions}
                  placeholder={`Tambah Bahan Baku`}
                  labelTitle={`Bahan Baku ${index + 1}`}
                />
                <InputText
                  labelTitle="Jumlah"
                  type="number"
                  updateType="jumlah"
                  defaultValue={leadObj.jumlah}
                  updateFormValue={updateFormValue}
                />{" "}
              </div>
            ))}
          </div>
          <div className="divider"></div>
          <div className="mt-16">
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <button
              className="btn btn-success float-right"
              onClick={() => updateResep()}
            >
              Simpan
            </button>
          </div>
        </TitleCard>
      </form>
      <div className="mt-16">
        <button className="btn btn-primary mt-2" onClick={handleTambahDropdown}>
          Tambah Dropdown
        </button>
      </div>
    </>
  );
}

export default ProfileSettings;
