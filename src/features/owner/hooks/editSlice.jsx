import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useEditKaryawan(id) {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerEditKaryawan = useCallback(async (formData) => {
    const { bonus, gaji } = formData;
    const formDataObj = new FormData();
    formDataObj.append("gaji", gaji);
    formDataObj.append("bonus", bonus);

    formDataObj.append("_method", "patch");
    try {
      console.log(id);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/pegawaiOwner/${id}`,
        formDataObj
      );
      navigate("/Gaji");

      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handlerEditKaryawan, validation };
}
