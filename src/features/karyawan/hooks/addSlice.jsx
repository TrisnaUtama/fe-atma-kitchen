import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAddPegawai() {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerAddPegawai = useCallback(async (formData) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/pegawai/add`,
        formData
      );
      if (response.status === 200) {
        navigate("/karyawan");
      }
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handlerAddPegawai, validation };
}
