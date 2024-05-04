import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAddLimit() {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerAddLimit = useCallback(
    async (formData) => {
      const { tanggal_limit, limit, id_produk } = formData;
      const formDataObj = new FormData();
      formDataObj.append("tanggal_limit", tanggal_limit);
      formDataObj.append("limit", limit);
      formDataObj.append("id_produk", id_produk);

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/v1/limit/add`,
          formDataObj
        );
        navigate("/produk");
        console.log(response.data);
      } catch (error) {
        setValidation(error.response.data);
        console.log(error.response.data);
      }
    },
    [navigate]
  );
  return { handlerAddLimit, validation };
}
