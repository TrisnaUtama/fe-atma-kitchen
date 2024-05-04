import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import FileInput from "../../../components/Input/FileInput";
import TextArea from "../../../components/Input/TextAreaInput";
import DropdownInput from "../../../components/Input/DropDownInput";
import DropdownKategori from "../../../components/Input/DropDownKategori";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import useHandlerEditProduk from "../hooks/editProduk";
import useHandlerEditLimit from "../hooks/updatedLimitProduk";
import getResep from "../hooks/resep";
import getPenitip from "../hooks/penitip";
import { useParams } from "react-router-dom";
import getSpecificProduct from "../hooks/getSpecificProduct";

const INITIAL_LEAD_OBJ = {
  nama_produk: "",
  id_penitip: "",
  id_resep: "",
  gambar: "",
  deskripsi: "",
  kategori: "",
  harga: "",
  kategori: "",
  stok: "",
  tanggal: "",
  limit: "",
  tanggal_limit: "",
};

function EditProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [namaResepList, setNamaResepList] = useState([]);
  const [namaPenitipList, setNamaPenitipList] = useState([]);
  const [dataProduk, setdataProduk] = useState({});
  const kategori = ["Cake", "Minuman", "Hampers", "Titipan", "Roti"];
  const { handlerEditProduk } = useHandlerEditProduk(id);
  const { handlerEditLimit } = useHandlerEditLimit(dataProduk.id);

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

  useEffect(() => {
    const fetchSpecificProduk = async () => {
      try {
        const specificData = await getSpecificProduct(id);
        setdataProduk(specificData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpecificProduk();
  }, [id]);

  const saveNewProduk = async (e) => {
    e.preventDefault();
    if (leadObj.nama_produk.trim() === "")
      return setErrorMessage("nama produk tidak boleh kosong!");
    else if (leadObj.id_resep.trim() === "")
      return setErrorMessage("resep tidak boleh kosong!");
    else if (leadObj.deskripsi.trim() === "")
      return setErrorMessage("deskripsi tidak boleh kosong!");
    else if (!leadObj.gambar)
      return setErrorMessage("gambar tidak boleh kosong!");
    else if (leadObj.harga.trim() === "")
      return setErrorMessage("harga tidak boleh kosong!");
    else if (leadObj.kategori.trim() === "")
      return setErrorMessage("kategori tidak boleh kosong!");
    else if (leadObj.kategori.trim() === "Titipan")
      if (leadObj.stok=== 0) {
        return setErrorMessage("stok tidak boleh kosong!");
      } else if (leadObj.id_penitip.trim() === "") {
        return setErrorMessage("penitip tidak boleh kosong!");
      } else if (!leadObj.tanggal.trim()) {
        return setErrorMessage("tanggal tidak boleh kosong!");
      }

    let newLeadObj = {
      nama_produk: leadObj.nama_produk,
      id_resep: leadObj.id_resep,
      gambar: leadObj.gambar,
      id_penitip: leadObj.id_penitip,
      deskripsi: leadObj.deskripsi,
      kategori: leadObj.kategori,
      harga: leadObj.harga,
      stok: leadObj.stok,
      tanggal: leadObj.tanggal,
    };

    let LimitObj = {
      limit: leadObj.limit,
      tanggal_limit: leadObj.tanggal_limit,
    };

    await handlerEditProduk(newLeadObj);
    if (LimitObj.tanggal_limit !== "" && LimitObj.limit !== "") {
      await handlerEditLimit(LimitObj);
    }
    dispatch(showNotification({ message: "Updated Product !", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    if (updateType === "tanggal" || updateType === "tanggal_limit") {
      const dateObject = new Date(value);
      const formattedDate = dateObject.toISOString().split("T")[0];
      setLeadObj({ ...leadObj, [updateType]: formattedDate });
    } else {
      setLeadObj({ ...leadObj, [updateType]: value });
    }
  };

  const handleResepChange = (event) => {
    setLeadObj({ ...leadObj, id_resep: event.target.value });
  };

  const HandlePenitipChange = (event) => {
    setLeadObj({ ...leadObj, id_penitip: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setLeadObj({ ...leadObj, kategori: event.target.value });
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
            placeholder={dataProduk.nama_produk}
            updateFormValue={updateFormValue}
          />
        </div>
        <div>
          <DropdownKategori
            value={leadObj.kategori}
            onChange={handleCategoryChange}
            options={kategori}
            placeholder={dataProduk.kategori}
            labelTitle="Kategori"
          />
        </div>
      </div>

      {leadObj.kategori === "Titipan" && (
        <div className="grid grid-cols-2 gap-8">
          <DropdownInput
            value={leadObj.id_penitip}
            onChange={HandlePenitipChange}
            options={namaPenitipList}
            placeholder="Pilih Penitip"
            labelTitle="Pilih Penitp"
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
          placeholder="masukkan stok produk"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="number"
          defaultValue={leadObj.harga}
          updateType="harga"
          containerStyle="mt-4"
          labelTitle="Harga Produk"
          placeholder={dataProduk.harga}
          updateFormValue={updateFormValue}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputText
          type="number"
          defaultValue={leadObj.limit}
          updateType="limit"
          containerStyle="mt-4"
          labelTitle="Limit Produk"
          placeholder="masukkan limit produk"
          updateFormValue={updateFormValue}
        />

        <InputText
          type="date"
          defaultValue={leadObj.tanggal_limit}
          updateType="tanggal_limit"
          containerStyle="mt-4"
          labelTitle="Tanggal Limit"
          placeholder=""
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
          placeholder={dataProduk.deskripsi}
          updateFormValue={updateFormValue}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 h-40">
        <div className="border border-gray-700 rounded-lg p-2 flex justify-center items-center">
          {leadObj.gambar ? (
            <img
              src={URL.createObjectURL(leadObj.gambar)}
              alt="Preview"
              className="h-40 w-50 mt-2 rounded"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <h1> Image Preview</h1>
          )}
        </div>
      </div>
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="flex justify-end items-end">
        <button className="btn btn-primary px-6 mr-2">Save</button>
        <a className="btn btn-ghost" href="/produk">
          Cancel
        </a>
      </div>
    </form>
  );
}

export default EditProductPage;
