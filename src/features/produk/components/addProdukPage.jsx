import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import FileInput from "../../../components/Input/FileInput";
import TextArea from "../../../components/Input/TextAreaInput";
import DropdownInput from "../../../components/Input/DropDownInput";
import DropdownKategori from "../../../components/Input/DropDownKategori";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import useHandlerAddProduk from "../hooks/produkSlice";
import getResep from "../hooks/resep";
import getPenitip from "../hooks/penitip";

const INITIAL_LEAD_OBJ = {
  nama_produk: "",
  id_resep: 0,
  id_penitip: 0,
  gambar: "",
  deskripsi: "",
  kategori: "",
  harga: "",
  stok: "",
  tanggal: "",
};

function AddProductPage() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [namaResepList, setNamaResepList] = useState([]);
  const [namaPenitipList, setNamaPenitipList] = useState([]);
  const kategori = ["Cake", "Minuman", "Titipan", "Roti"];
  const { handlerAddProduk } = useHandlerAddProduk();

  useEffect(() => {
    const fetchDataResep = async () => {
      try {
        const dataResep = await getResep();
        const namaResepList = dataResep.data.map((resep) => ({
          value: resep.id,
          label: resep.nama_resep,
        }));
        setNamaResepList(namaResepList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataResep();
  }, []);

  useEffect(() => {
    const fetchDataPenitip = async () => {
      try {
        const dataPenitip = await getPenitip();
        const namaPenitipList = dataPenitip.data.map((penitip) => ({
          value: penitip.id,
          label: penitip.nama,
        }));
        setNamaPenitipList(namaPenitipList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataPenitip();
  }, []);

  const saveNewProduk = async (e) => {
    e.preventDefault();

    if (!leadObj.nama_produk.trim())
      return setErrorMessage("Nama produk tidak boleh kosong!");
    if (!leadObj.deskripsi.trim())
      return setErrorMessage("Deskripsi tidak boleh kosong!");
    if (!leadObj.gambar) return setErrorMessage("Gambar tidak boleh kosong!");
    if (!leadObj.harga) return setErrorMessage("Harga tidak boleh kosong!");
    if (!leadObj.kategori.trim())
      return setErrorMessage("Kategori tidak boleh kosong!");

    if (leadObj.kategori.trim() === "Titipan") {
      if (!leadObj.id_penitip)
        return setErrorMessage("Penitip tidak boleh kosong!");
      if (!leadObj.tanggal.trim())
        return setErrorMessage("Tanggal tidak boleh kosong!");
    }

    const newLeadObj = {
      nama_produk: leadObj.nama_produk,
      id_resep: leadObj.id_resep ? parseInt(leadObj.id_resep) : null,
      gambar: leadObj.gambar,
      id_penitip: leadObj.id_penitip ? parseInt(leadObj.id_penitip) : null,
      deskripsi: leadObj.deskripsi,
      kategori: leadObj.kategori,
      harga: parseInt(leadObj.harga) || 0,
      stok: parseInt(leadObj.stok) || 0,
      tanggal: leadObj.tanggal ? leadObj.tanggal : null,
    };

    console.log(newLeadObj);
    try {
      await handlerAddProduk(newLeadObj);
      dispatch(showNotification({ message: "New Product Added!", status: 1 }));
    } catch (error) {
      setErrorMessage("Failed to add product: " + error.message);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    if (updateType === "tanggal") {
      const dateObject = new Date(value);
      const formattedDate = dateObject.toISOString().split("T")[0];
      setLeadObj((prevState) => ({
        ...prevState,
        [updateType]: formattedDate,
      }));
    } else {
      setLeadObj((prevState) => ({ ...prevState, [updateType]: value }));
    }
  };

  const handleResepChange = (event) => {
    setLeadObj((prevState) => ({ ...prevState, id_resep: event.target.value }));
  };

  const handlePenitipChange = (event) => {
    setLeadObj((prevState) => ({
      ...prevState,
      id_penitip: event.target.value,
    }));
  };

  const handleCategoryChange = (event) => {
    setLeadObj((prevState) => ({ ...prevState, kategori: event.target.value }));
  };

  return (
    <form onSubmit={saveNewProduk}>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <InputText
            type="text"
            defaultValue={leadObj.nama_produk}
            updateType="nama_produk"
            containerStyle="mt-4"
            labelTitle="Nama Produk"
            placeholder="Masukkan nama produk"
            updateFormValue={updateFormValue}
          />
        </div>
        <div>
          <DropdownKategori
            value={leadObj.kategori}
            onChange={handleCategoryChange}
            options={kategori}
            placeholder="Pilih Kategori"
            labelTitle="Kategori"
          />
        </div>
      </div>

      {leadObj.kategori === "Titipan" && (
        <div className="grid grid-cols-2 gap-8">
          <DropdownInput
            value={leadObj.id_penitip}
            onChange={handlePenitipChange}
            options={namaPenitipList}
            placeholder="Pilih Penitip"
            labelTitle="Pilih Penitip"
          />
          <InputText
            type="date"
            defaultValue={leadObj.tanggal}
            updateType="tanggal"
            containerStyle="mt-4"
            labelTitle="Tanggal Penitipan"
            updateFormValue={updateFormValue}
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        <DropdownInput
          value={leadObj.id_resep}
          onChange={handleResepChange}
          options={namaResepList}
          placeholder="Pilih Resep"
          labelTitle="Resep"
        />
        <InputText
          type="number"
          defaultValue={leadObj.stok}
          updateType="stok"
          containerStyle="mt-4"
          labelTitle="Stok Produk"
          placeholder="Masukkan stok produk"
          updateFormValue={updateFormValue}
        />
        <InputText
          type="number"
          defaultValue={leadObj.harga}
          updateType="harga"
          containerStyle="mt-4"
          labelTitle="Harga Produk"
          placeholder="Masukkan harga produk"
          updateFormValue={updateFormValue}
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <FileInput
          labelTitle="Gambar"
          containerStyle="mt-4"
          defaultValue={leadObj.gambar}
          updateType="gambar"
          placeholder="Pilih gambar"
          updateFormValue={updateFormValue}
        />
        <TextArea
          defaultValue={leadObj.deskripsi}
          updateType="deskripsi"
          containerStyle="mt-4"
          labelTitle="Deskripsi"
          placeholder="Masukkan deskripsi"
          updateFormValue={updateFormValue}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2 h-40">
        <div className="border border-gray-700 rounded-lg p-2 flex justify-center items-center">
          {leadObj.gambar ? (
            <img
              src={URL.createObjectURL(leadObj.gambar)}
              alt="Preview"
              className="h-40 w-50 mt-2 rounded"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <h1>Image Preview</h1>
          )}
        </div>
      </div>

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>

      <div className="modal-action">
        <a className="btn btn-ghost" href="/produk">
          Cancel
        </a>
        <button className="btn btn-primary px-6">Save</button>
      </div>
    </form>
  );
}

export default AddProductPage;
