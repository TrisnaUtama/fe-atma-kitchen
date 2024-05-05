import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import FileInput from "../../../components/Input/FileInput";
import TextArea from "../../../components/Input/TextAreaInput";
import DropdownInput from "../../../components/Input/DropDownInput";
import DropdownKategori from "../../../components/Input/DropDownKategori";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import getbahanBaku from "../hooks/getAllBahanBaku";
import getProduk from "../hooks/getAllProduk";
import { useParams } from "react-router-dom";
import useHandlerEditHampers from "../hooks/edithampers";

const INITIAL_LEAD_OBJ = {
  id_bahan_baku: [],
  id_produk: [],
  deskripsi: "",
  harga: "",
  gambar: "",
  nama_hampers: "",
  kategori: "",
};

function AddHampersPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [namaBahanBakuList, setNamaBahanBaku] = useState([]);
  const [namaProdukList, setNamaProduk] = useState([]);
  const [dropdown, setDropdowwn] = useState([]);
  const kategori = ["Produk", "Bahan Baku"];
  const { handlerEditHampers } = useHandlerEditHampers(id);

  useEffect(() => {
    const fetchBahanBaku = async () => {
      try {
        const bahanBaku = await getbahanBaku();
        const bahanBakuList = bahanBaku.data.map((bahan_baku) => ({
          value: bahan_baku.id,
          label: bahan_baku.nama_bahan_baku,
        }));
        setNamaBahanBaku(bahanBakuList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBahanBaku();
  }, []);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const produk = await getProduk();
        const produkList = produk.data.map((produk) => ({
          value: produk.id,
          label: produk.nama_produk,
        }));
        setNamaProduk(produkList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProduk();
  }, []);

  const saveNewHampers = async (e) => {
    e.preventDefault();
    // if (leadObj.harga.trim() === "")
    //   return setErrorMessage("harga tidak boleh kosong!");
    // else if (leadObj.id_bahan_baku.trim() === "")
    //   return setErrorMessage("bahan_baku tidak boleh kosong!");
    // else if (leadObj.jumlah.trim() === "")
    //   return setErrorMessage("jumlah tidak boleh kosong!");

    let newLeadObj = {
      ...leadObj,
      id_bahan_baku: leadObj.id_bahan_baku.filter((value) => value !== ""),
      id_produk: leadObj.id_produk.filter((value) => value !== ""),
    };
    console.log(newLeadObj);
    handlerEditHampers(newLeadObj);
    dispatch(showNotification({ message: "New Product Added!", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  const handleBahanBakuChange = (onChangeValue, index) => {
    const updatedBahanBaku = [...leadObj.id_bahan_baku];
    updatedBahanBaku[index] = onChangeValue.target.value;
    setLeadObj({ ...leadObj, id_bahan_baku: updatedBahanBaku });
  };

  const handleProdukChange = (onChangeValue, index) => {
    const updatedProduk = [...leadObj.id_produk];
    updatedProduk[index] = onChangeValue.target.value;
    setLeadObj({ ...leadObj, id_produk: updatedProduk });
  };

  const handleCategoryChange = (onChangeValue, i) => {
    const kategoriData = [...dropdown];
    kategoriData[i] = onChangeValue.target.value;
    setDropdowwn(kategoriData);
  };

  const handleAddDropdown = () => {
    const dropdownData = [...dropdown, []];
    setDropdowwn(dropdownData);
  };

  const handleDeleteDropdown = (index) => {
    const updatedDropdown = [...dropdown];
    updatedDropdown.splice(index, 1);
    setDropdowwn(updatedDropdown);

    const updatedProduk = [leadObj.id_produk];
    updatedProduk.splice(index, 1);

    const updatedBahanBaku = [leadObj.id_bahan_baku];
    updatedBahanBaku.splice(index, 1);

    setLeadObj({
      ...leadObj,
      id_produk: updatedProduk,
      id_bahan_baku: updatedBahanBaku,
    });
    console.log("bahan baku " + leadObj.id_bahan_baku);
    console.log("produk" + leadObj.id_produk);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <InputText
          type="text"
          defaultValue={leadObj.nama_hampers}
          updateType="nama_hampers"
          containerStyle="mt-4"
          labelTitle="Nama Hampers"
          placeholder="masukkan nama hampers"
          updateFormValue={updateFormValue}
        />
        <InputText
          type="number"
          defaultValue={leadObj.harga}
          updateType="harga"
          containerStyle="mt-4"
          labelTitle="Harga Hampers"
          placeholder="masukkan harga hampers"
          updateFormValue={updateFormValue}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="mb-4 flex  justify-center items-center">
          <FileInput
            labelTitle="Gambar"
            containerStyle="mt-4"
            defaultValue={leadObj.gambar}
            updateType="gambar"
            placeholder="Pilih gambar"
            updateFormValue={updateFormValue}
          />
        </div>
        <div>
          <TextArea
            defaultValue={leadObj.deskripsi}
            updateType="deskripsi"
            containerStyle="mt-4"
            labelTitle="Deskripsi"
            placeholder="Masukkan deskripsi"
            updateFormValue={updateFormValue}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="border h-60 border-gray-700 rounded-lg p-2 flex justify-center items-center">
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

      <h1 className="text-2xl mb-1 mt-8">Detail Hampers</h1>
      <hr className="border border-gray-700 mb-4" />
      <button onClick={() => handleAddDropdown()} className="btn btn-success">
        Add
      </button>
      {dropdown.map((selectedCategory, i) => {
        return (
          <div key={i} className="grid grid-cols-3 gap-4">
            <div>
              <DropdownKategori
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e, i)}
                options={kategori}
                placeholder="Pilih Kategori"
                labelTitle="Kategori"
              />
            </div>
            {selectedCategory === "Produk" ? (
              <div>
                <DropdownInput
                  value={leadObj.id_produk[i]}
                  onChange={(e) => handleProdukChange(e, i)}
                  options={namaProdukList}
                  placeholder="Pilih produk"
                  labelTitle="Produk"
                />
              </div>
            ) : (
              <div>
                <DropdownInput
                  value={leadObj.id_bahan_baku[i]}
                  onChange={(e) => handleBahanBakuChange(e, i)}
                  options={namaBahanBakuList}
                  placeholder="Pilih Bahan Baku"
                  labelTitle="Bahan Baku"
                />
              </div>
            )}
            <div className="flex items-end mb-3">
              <button
                className=" btn btn-sm normal-case btn-error "
                onClick={() => handleDeleteDropdown(i)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <a className="btn btn-ghost" href="/produk">
          Cancel
        </a>
        <button className="btn btn-primary px-6" onClick={saveNewHampers}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddHampersPage;
