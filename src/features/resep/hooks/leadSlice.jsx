import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAddResep() {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handllerAddResep = useCallback(async (formData) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/resep/add`,
        formData
      );
      if (response.status === 200) {
        navigate("/resep");
      }
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handllerAddResep, validation };
}
