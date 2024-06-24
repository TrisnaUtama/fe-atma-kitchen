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
    nama_resep: "",
    id_bahan_baku: "",
    jumlah: "",
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [bahanBakuOptions, setBahanBakuOptions] = useState([]);
  const [additionalDropdowns, setAdditionalDropdowns] = useState([]);
  const dispatch = useDispatch();
  const { handllerAddResep } = useHandlerAddResep();

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
    if (!leadObj.nama_resep || leadObj.nama_resep.trim() === "")
      return setErrorMessage("nama tidak boleh kosong!");

    let isEmpty = false;
    additionalDropdowns.map((item) => {
      if (!item.value || item.value.trim() === "") {
        isEmpty = true;
        setErrorMessage("bahan baku tidak boleh kosong!");
      } else if (!item.jumlah || item.jumlah.trim() === "") {
        isEmpty = true;
        setErrorMessage("jumlah tidak boleh kosong!");
      }
    });

    if (isEmpty) return;

    // your validation logic here

    if (additionalDropdowns.length > 0) {
      const formDataObj = new FormData();
      formDataObj.append("nama_resep", leadObj.nama_resep);

      additionalDropdowns.map((item, index) => {
        for (let key in item) {
          if (key === "value")
            formDataObj.append(`komposisi[${index}][id_bahan_baku]`, item[key]);
          else formDataObj.append(`komposisi[${index}][${key}]`, item[key]);
        }
      });
      const temp = await handllerAddResep(formDataObj);

      console.log(temp);
    } else {
      console.log("2");

      let newLeadObj = {
        nama_resep: leadObj.nama_resep,
        id_bahan_baku: leadObj.id_bahan_baku,
        jumlah: leadObj.jumlah,
      };
      await handllerAddResep(newLeadObj);
    }

    dispatch(showNotification({ message: "New Resep Added!", status: 1 }));
  };

  const handleTambahDropdown = (event) => {
    event.preventDefault();
    setAdditionalDropdowns([
      ...additionalDropdowns,
      { id: additionalDropdowns.length, value: "" },
    ]);
  };

  const handleUpdateJumlah = (id, event) => {
    event.preventDefault();
    console.log(id, event.target.value);
    const { name, value } = event.target;
    const temp = [...additionalDropdowns];
    temp[id][name] = value;
    setAdditionalDropdowns(temp);
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

  const handleAditionalDropdownDelete = (index) => {
    index.preventDefault();
    const updateDropdown = [...additionalDropdowns];
    updateDropdown.splice(index, 1);
    setAdditionalDropdowns(updateDropdown);

    setLeadObj({ ...leadObj, id_bahan_baku: updateDropdown });
  }

  console.log(leadObj.nama_resep);
  console.log(additionalDropdowns);
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
                <div className="form-control w-full">
                  <label className="label">
                    <span className={"label-text text-base-content text-lg"}>
                      Jumlah
                    </span>
                  </label>
                  <input
                    type="number"
                    name="jumlah"
                    className="input input-bordered w-full border bg-transparent px-4 py-3.5 pr-8 rounded-lg "
                    onChange={(event) => handleUpdateJumlah(dropdown.id, event)}
                  />
                </div>{" "}
              </div>
            ))}
          </div>
          <div className="divider"></div>
          <div className="mt-16">
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <button
              className="btn btn-success float-right"
              // onClick={() => updateResep()}
            >
              Simpan
            </button>
          </div>
          <div className="mt-16">
            <button
              className="btn btn-primary mt-2"
              onClick={handleTambahDropdown}
            >
              Tambah Dropdown
            </button>
            <button className="btn btn-error mt-2 ms-2" onClick={handleAditionalDropdownDelete}> delete dropdown</button>
          </div>
        </TitleCard>
      </form>
    </>
  );
}

export default ProfileSettings;
