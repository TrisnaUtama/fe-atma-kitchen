import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import useHandlerEditPengeluaran from "../hooks/editPengeluaran";
import { useParams } from "react-router-dom";
import getPengeluaran from "../hooks/pengeluaran";

const INITIAL_LEAD_OBJ = {
  nama_pengeluaran: "",
  total_pengeluaran: "",
  tanggal_pembelian: "",
};

function EditPengeluaranPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const { handlerEditPengeluaran } = useHandlerEditPengeluaran(id);

  const editPengeluaran = async (e) => {
    e.preventDefault();
    if (leadObj.nama_pengeluaran.trim() === "")
      return setErrorMessage("nama pengeluaran tidak boleh kosong!");
    else if (leadObj.total_pengeluaran.trim() === "")
      return setErrorMessage("total tidak boleh kosong!");
    else if (leadObj.tanggal_pembelian.trim() === "")
      return setErrorMessage("tanggal tidak boleh kosong!");

    let newLeadObj = {
      nama_pengeluaran: leadObj.nama_pengeluaran,
      total_pengeluaran: leadObj.total_pengeluaran,
      tanggal_pembelian: leadObj.tanggal_pembelian,
    };
    await handlerEditPengeluaran(newLeadObj);
    dispatch(showNotification({ message: "New Pengeluaran Updated!", status: 1 }));
  };

  useEffect(() => {
    async function fetchDataPengeluaran() {
      try {
        const dataPengeluaran = await getPengeluaran(id);
        setLeadObj(dataPengeluaran.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataPengeluaran();
  }, []);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <form onSubmit={editPengeluaran}>
      <div className="grid grid-cols-2 gap-8">
                <div>
                    <InputText
                        type="text"
                        defaultValue={leadObj.nama_pengeluaran}
                        updateType="nama_pengeluaran"
                        containerStyle="mt-4"
                        labelTitle="Nama Pengeluaran"
                        placeholder={leadObj.nama_pengeluaran}
                        updateFormValue={updateFormValue}
                    />
                </div>
                <div>
                <InputText
                    type="number"
                    defaultValue={leadObj.total_pengeluaran}
                    updateType="total_pengeluaran"
                    containerStyle="mt-4"
                    labelTitle="Total Pengeluaran"
                    placeholder={leadObj.total_pengeluaran}
                    updateFormValue={updateFormValue}
                />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                <InputText
                    type="date"
                    defaultValue={leadObj.tanggal_pembelian}
                    updateType="tanggal_pembelian"
                    containerStyle="mt-4"
                    labelTitle="Tanggal Pembelian"
                    placeholder={leadObj.tanggal_pembelian}
                    updateFormValue={updateFormValue}
                />
            </div>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <a className="btn btn-ghost" href="/pengeluaran">
                    Cancel
                </a>
                <button className="btn btn-primary px-6">Save</button>
            </div>
    </form>
  );
}

export default EditPengeluaranPage;
