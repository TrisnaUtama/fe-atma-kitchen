import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAddPenitip() {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerAddPenitip = useCallback(async (formData) => {
    const {
      nama,
      no_telpn,
      email,
      profit,
    } = formData;
    const formDataObj = new FormData();
    formDataObj.append("nama", nama);
    formDataObj.append("no_telpn", no_telpn);
    formDataObj.append("email", email);
    formDataObj.append("profit", profit);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/penitip/addPenitip`,
        formDataObj
      );
      navigate('/penitip')
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handlerAddPenitip, validation };
}
