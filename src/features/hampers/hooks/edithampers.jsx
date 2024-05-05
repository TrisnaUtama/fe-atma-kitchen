import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useEditHampers(id) {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerEditHampers = useCallback(async (formData) => {
    const { nama_hampers, id_bahan_baku, id_produk, harga, gambar, deskripsi } =
      formData;
    const filteredBahanBaku = id_bahan_baku.filter((id) => id !== undefined);
    const filteredProduk = id_produk.filter((id) => id !== undefined);
    const formDataObj = new FormData();
    formDataObj.append("nama_hampers", nama_hampers);
    filteredBahanBaku.forEach((id) =>
      formDataObj.append("id_bahan_baku[]", id)
    );
    filteredProduk.forEach((id) => formDataObj.append("id_produk[]", id));
    formDataObj.append("harga", harga);
    formDataObj.append("gambar", gambar);
    formDataObj.append("deskripsi", deskripsi);
    formDataObj.append("_method", "patch");

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/hampers/${id}`,
        formDataObj
      );
      navigate("/hampers");
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handlerEditHampers, validation };
}
