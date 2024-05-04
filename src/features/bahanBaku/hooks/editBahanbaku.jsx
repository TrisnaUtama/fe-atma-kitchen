import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useHandlerEdit(id) {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerEditBahanBaku = useCallback(async (formData) => {
    const {
      nama_bahan_baku,
      stok,
      satuan,
    } = formData;
    const formDataObj = new FormData();
    formDataObj.append("nama_bahan_baku", nama_bahan_baku);
    formDataObj.append("stok", stok);
    formDataObj.append("satuan", satuan);
    formDataObj.append('_method', 'patch');

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/bahanbaku/${id}`,
        formDataObj
      );
      navigate("/bahanbaku");
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, [id]);
  return { handlerEditBahanBaku, validation };
}
