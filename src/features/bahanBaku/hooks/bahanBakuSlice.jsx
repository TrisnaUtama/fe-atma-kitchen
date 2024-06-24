import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAddBahanBaku() {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerAddBahanBaku = useCallback(async (formData) => {
    const { nama_bahan_baku, satuan, stok } = formData;
    const formDataObj = new FormData();
    formDataObj.append("nama_bahan_baku", nama_bahan_baku);
    formDataObj.append("stok", stok);
    formDataObj.append("satuan", satuan);

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/bahanbaku/add`,
        formDataObj
      );
      navigate("/bahanbaku");
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handlerAddBahanBaku, validation };
}
