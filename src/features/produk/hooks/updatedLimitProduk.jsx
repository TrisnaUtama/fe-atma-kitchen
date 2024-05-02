import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useHandlerEditLimit(id) {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerEditLimit = useCallback(
    async (formData) => {
      const { limit, tanggal_limit } = formData;
      const formDataObj = new FormData();
      formDataObj.append("limit", limit);
      formDataObj.append("tanggal_limit", tanggal_limit);
      formDataObj.append("_method", "patch");

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/v1/limit/${id}`,
          formDataObj
        );
        navigate("/produk");
        console.log(response.data);
      } catch (error) {
        setValidation(error.response.data);
        console.log(error.response.data);
      }
    },
    [id]
  );
  return { handlerEditLimit, validation };
}
