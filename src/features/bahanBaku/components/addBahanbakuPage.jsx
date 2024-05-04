import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import DropdownKategori from "../../../components/Input/DropDownKategori";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import useHandlerAddBahanBaku from "../hooks/bahanBakuSlice";


const INITIAL_LEAD_OBJ = {
    nama_bahan_baku: "",
    stok: "",
    satuan: "",
};

function AddBahanbakuPage() {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
    const { handlerAddBahanBaku } = useHandlerAddBahanBaku();
    const satuan = ["pcs", "gram", "ml"];

    const saveNewBahanBaku = async (e) => {
        e.preventDefault();
        if (leadObj.nama_bahan_baku.trim() === "")
            return setErrorMessage("nama bahan baku tidak boleh kosong!");
        else if (leadObj.stok.trim() === "")
            return setErrorMessage("stok tidak boleh kosong!");
        else if (leadObj.satuan.trim() === "")
            return setErrorMessage("satuan tidak boleh kosong!");

        let newLeadObj = {
            nama_bahan_baku: leadObj.nama_bahan_baku,
            stok: leadObj.stok,
            satuan: leadObj.satuan,
        };
        await handlerAddBahanBaku(newLeadObj);
        dispatch(showNotification({ message: "New Bahan Baku Added!", status: 1 }));
    };

    const handleSatuanChange = (event) => {
        setLeadObj({ ...leadObj, satuan: event.target.value });
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
       
          setLeadObj({ ...leadObj, [updateType]: value });
        
      };


    return (
        <form onSubmit={saveNewBahanBaku}>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <InputText
                        type="text"
                        defaultValue={leadObj.nama_bahan_baku}
                        updateType="nama_bahan_baku"
                        containerStyle="mt-4"
                        labelTitle="Nama Bahan Baku"
                        placeholder="masukkan nama bahan baku"
                        updateFormValue={updateFormValue}
                    />
                </div>
                <div>
                    <DropdownKategori
                        value={leadObj.satuan}
                        onChange={handleSatuanChange}
                        options={satuan}
                        placeholder="Pilih Satuan"
                        labelTitle="Satuan"
                    />
                </div>
            </div>



            <div className="grid grid-cols-3 gap-8">
                <InputText
                    type="number"
                    defaultValue={leadObj.stok}
                    updateType="stok"
                    containerStyle="mt-4"
                    labelTitle="Stok Bahan Baku"
                    placeholder="masukkan stok bahan baku"
                    updateFormValue={updateFormValue}
                />
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

export default AddBahanbakuPage;
