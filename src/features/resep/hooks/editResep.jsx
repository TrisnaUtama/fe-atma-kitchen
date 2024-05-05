import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useEditResep(id) {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerEditResep = useCallback(async (formData) => {
    try {
      console.log(id);
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/resep/${id}`,
        formData
      );
      navigate("/resep");

      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handlerEditResep, validation };
}
