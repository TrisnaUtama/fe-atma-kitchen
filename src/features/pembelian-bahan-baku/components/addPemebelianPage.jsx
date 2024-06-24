import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import DropdownInput from "../../../components/Input/DropDownInput";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import useHandlerAddPemebelian from "../hooks/addPemebelian";
import getbahanBaku from "../hooks/getAllBahanBaku";

const INITIAL_LEAD_OBJ = {
  id_bahan_baku: "",
  jumlah: "",
  harga: "",
};

function AddProductPage() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [namaBahanBakuList, setNamaBahanBaku] = useState([]);
  const { handlerPemebelian } = useHandlerAddPemebelian();

  useEffect(() => {
    const fetchBahanBaku = async () => {
      try {
        const bahanBaku = await getbahanBaku();
        const bahanBakuList = bahanBaku.data.map((bahan_baku) => ({
          value: bahan_baku.id,
          label: bahan_baku.nama_bahan_baku,
        }));
        console.log(bahanBakuList);
        setNamaBahanBaku(bahanBakuList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBahanBaku();
  }, []);

  const saveNewProduk = async (e) => {
    e.preventDefault();
    if (leadObj.harga.trim() === "")
      return setErrorMessage("harga tidak boleh kosong!");
    else if (leadObj.id_bahan_baku.trim() === "")
      return setErrorMessage("bahan_baku tidak boleh kosong!");
    else if (leadObj.jumlah.trim() === "")
      return setErrorMessage("jumlah tidak boleh kosong!");

    let newLeadObj = {
      id_bahan_baku: leadObj.id_bahan_baku,
      harga: leadObj.harga,
      jumlah: leadObj.jumlah,
    };
    await handlerPemebelian(newLeadObj);
    dispatch(showNotification({ message: "New Product Added!", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  const handleBahanBakuChange = (event) => {
    setLeadObj({ ...leadObj, id_bahan_baku: event.target.value });
  };

  return (
    <form onSubmit={saveNewProduk}>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <DropdownInput
            value={leadObj.id_bahan_baku}
            onChange={handleBahanBakuChange}
            options={namaBahanBakuList}
            placeholder="Pilih Bahan Baku"
            labelTitle="Bahan Baku"
          />
        </div>
        <div>
          <InputText
            type="number"
            defaultValue={leadObj.jumlah}
            updateType="jumlah"
            containerStyle="mt-4"
            labelTitle="Jumlah Bahan Baku"
            placeholder="masukkan jumlah bahan Baku"
            updateFormValue={updateFormValue}
          />
        </div>
        <div>
          <InputText
            type="number"
            defaultValue={leadObj.harga}
            updateType="harga"
            containerStyle="mt-4"
            labelTitle="Harga Bahan Baku"
            placeholder="masukkan nama produk"
            updateFormValue={updateFormValue}
          />
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
