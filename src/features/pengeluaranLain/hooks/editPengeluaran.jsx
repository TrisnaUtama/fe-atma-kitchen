import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useHandlerEdit(id) {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerEditPengeluaran = useCallback(async (formData) => {
    const {
        nama_pengeluaran,
        total_pengeluaran,
        tanggal_pembelian,
    } = formData;
    const formDataObj = new FormData();
    formDataObj.append("nama_pengeluaran", nama_pengeluaran);
    formDataObj.append("total_pengeluaran", total_pengeluaran);
    formDataObj.append("tanggal_pembelian", tanggal_pembelian);
    formDataObj.append('_method', 'patch');

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/pengeluaranLain/${id}`,
        formDataObj
      );
      navigate("/pengeluaran");
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, [id]);
  return { handlerEditPengeluaran, validation };
}
