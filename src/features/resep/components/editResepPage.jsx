import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";
import DropdownKategori from "../../../components/Input/DropDownKategorResep";
import getBahanBaku from "../hooks/bahanBaku";
import useHandlerEditResep from "../hooks/editResep";
import ErrorText from "../../../components/Typography/ErrorText";
import getSpecificResep from "../hooks/getSpecificResep";

function ProfileSettings() {
  const { id } = useParams();
  const INITIAL_LEAD_OBJ = {
    nama_resep: "",
    id_bahan_baku: "",
    jumlah: "",
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [bahanBakuOptions, setBahanBakuOptions] = useState([]);
  const [additionalDropdowns, setAdditionalDropdowns] = useState([]);
  const [dataResep, setdataResep] = useState({});
  const dispatch = useDispatch();
  const { handlerEditResep } = useHandlerEditResep(id);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");

    setLeadObj({ ...leadObj, [updateType]: value });
  };

  useEffect(() => {
    fetchSpecificProduk();
  }, []);
  const fetchSpecificProduk = async () => {
    try {
      const specificData = await getSpecificResep(id);
      setdataResep(specificData.data);

      // Perbarui nilai nama_resep di leadObj setelah mendapatkan data resep
      setLeadObj({ ...leadObj, nama_resep: specificData.data.nama_resep });

      // Perbarui nilai additionalDropdowns dengan data komposisi
      const komposisi = specificData.komposisi.map((item, index) => ({
        id: index,
        value: item.id_bahan_baku,
        jumlah: item.jumlah,
      }));
      setAdditionalDropdowns(komposisi);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataBahanBaku = await getBahanBaku();
      setBahanBakuOptions(dataBahanBaku.data);
    };
    fetchData();
  }, []);

  // Save new resep function
  const saveNewResep = async (e) => {
    e.preventDefault();
    if (!leadObj.nama_resep || leadObj.nama_resep.trim() === "")
      return setErrorMessage("Nama tidak boleh kosong!");

    let isEmpty = false;

    additionalDropdowns.forEach((item) => {
      if (
        !item.value ||
        typeof item.value !== "string" ||
        item.value.trim() === ""
      ) {
        isEmpty = true;
        setErrorMessage("Bahan baku tidak boleh kosong!");
      } else if (
        !item.jumlah ||
        item.jumlah.trim() === "" ||
        isNaN(item.jumlah)
      ) {
        isEmpty = true;
        setErrorMessage("Jumlah harus diisi !");
      }
    });

    console.log("additionalDropdowns:", additionalDropdowns);

    if (isEmpty) return;

    try {
      const formDataObj = {
        nama_resep: leadObj.nama_resep,
        komposisi: additionalDropdowns.map((item) => ({
          id_bahan_baku: item.value,
          jumlah: item.jumlah,
        })),
      };

      const response = await handlerEditResep(formDataObj);
      if (response) {
        if (response.status === true) {
          dispatch(
            showNotification({
              message: "Resep berhasil diperbarui!",
              status: 1,
            })
          );
        } else {
          setErrorMessage(
            response.message || "Terjadi kesalahan saat menyimpan resep."
          ); // Handle error message from backend or set default message
        }
      } else {
        setErrorMessage("Respon dari server tidak valid."); // Set default error message if response is undefined
      }
    } catch (error) {
      console.error("Error saving new resep:", error);
      setErrorMessage("Terjadi kesalahan saat menyimpan resep.");
    }
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

  // console.log(leadObj.nama_resep);
  // console.log(additionalDropdowns);
  return (
    <>
      <form onSubmit={saveNewResep}>
        <TitleCard title="Tambah Resep" topMargin="mt-2">
          <div>
            <InputText
              type="text"
              defaultValue={leadObj.nama_resep}
              placeholder={dataResep.nama_resep}
              updateType="nama_resep"
              containerStyle="mt-4"
              labelTitle="Nama Resep"
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
                    placeholder={
                      dropdown.jumlah ? dropdown.jumlah : `Tambah Jumlah`
                    }
                  />
                </div>{" "}
              </div>
            ))}
          </div>
          <div className="divider"></div>
          <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
          <div className="mt-16">
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
          </div>
        </TitleCard>
      </form>
    </>
  );
}

export default ProfileSettings;
