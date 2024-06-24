import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAddProduk() {
  const [validation, setValidation] = useState();
  const navigate = useNavigate();
  const handlerAddProduk = useCallback(async (formData) => {
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
    console.log(stok);
    formDataObj.append("nama_produk", nama_produk);
    formDataObj.append("id_penitip", id_penitip || "");
    formDataObj.append("id_resep", id_resep || "");
    formDataObj.append("harga", harga || "");
    formDataObj.append("gambar", gambar);
    formDataObj.append("deskripsi", deskripsi);
    formDataObj.append("kategori", kategori);
    formDataObj.append("tanggal", tanggal || '');
    if (stok !== undefined) {
      formDataObj.append("stok", stok);
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/produk/addProduk`,
        formDataObj
      );
      navigate("/produk");
      console.log(response.data);
    } catch (error) {
      setValidation(error.response.data);
      console.log(error.response.data);
    }
  }, []);
  return { handlerAddProduk, validation };
}
