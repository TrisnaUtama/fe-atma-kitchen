import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useHandlerEdit(id) {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerEditProduk = useCallback(async (formData) => {
    const {
      nama_produk,
      id_penitip,
      id_resep,
      harga,
      gambar,
      deskripsi,
      kategori,
      stok,
      tanggal,
    } = formData;
    const formDataObj = new FormData();
    formDataObj.append("nama_produk", nama_produk);
    formDataObj.append("id_penitip", id_penitip);
    formDataObj.append("id_resep", id_resep);
    formDataObj.append("harga", harga);
    formDataObj.append("gambar", gambar);
    formDataObj.append("deskripsi", deskripsi);
    formDataObj.append("kategori", kategori);
    formDataObj.append("tanggal", tanggal);
    formDataObj.append("stok", stok);
    formDataObj.append('_method', 'patch')

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/produk/${id}`,
        formDataObj
      );
      navigate("/produk");
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, [id]);
  return { handlerEditProduk, validation };
}
