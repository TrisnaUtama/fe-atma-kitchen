import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useEditKaryawan(id) {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerEditKaryawan = useCallback(async (formData) => {
    const {
      nama,
      no_telpn,
      email,
      password,
      gender,
      id_role,
      alamat,
      tanggal_lahir,
      bonus,
      gaji,
    } = formData;
    const formDataObj = new FormData();
    formDataObj.append("nama", nama);
    formDataObj.append("no_telpn", no_telpn);
    formDataObj.append("email", email);
    formDataObj.append("password", password);
    formDataObj.append("gender", gender);
    formDataObj.append("id_role", id_role);
    formDataObj.append("alamat", alamat);
    formDataObj.append("tanggal_lahir", tanggal_lahir);
    formDataObj.append("_method", "patch");
    try {
      console.log(id);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/pegawai/${id}`,
        formDataObj
      );
      navigate("/karyawan");

      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handlerEditKaryawan, validation };
}
