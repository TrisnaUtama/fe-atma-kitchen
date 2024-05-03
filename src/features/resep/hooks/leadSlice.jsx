import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAddResep() {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handllerAddResep = useCallback(async (formData) => {
    const { id_bahan_baku, nama_resep, jumlah } = formData;
    const formDataObj = new FormData();
    formDataObj.append("id_bahan_baku", id_bahan_baku);
    formDataObj.append("nama_resep", nama_resep);
    formDataObj.append("jumlah", jumlah);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/resep/add`,
        formDataObj
      );
      navigate("/resep");
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handllerAddResep, validation };
}
