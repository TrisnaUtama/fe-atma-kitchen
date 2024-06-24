import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAddPembelian() {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerPemebelian = useCallback(async (formData) => {
    const { id_bahan_baku, harga, jumlah } = formData;
    const formDataObj = new FormData();
    formDataObj.append("id_bahan_baku", id_bahan_baku);
    formDataObj.append("harga", harga);
    formDataObj.append("jumlah", jumlah);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/pembelianBahanBaku/add`,
        formDataObj
      );
      navigate("/pembelianBahanBaku");
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handlerPemebelian, validation };
}
