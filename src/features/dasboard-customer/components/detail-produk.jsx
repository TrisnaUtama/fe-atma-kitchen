import { useParams } from "react-router-dom";
import { getSpecificProduct } from "../hooks/produk.hooks";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faXTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

export default function DetailProduk() {
  const { id } = useParams();
  const [dataProduk, setdataProduk] = useState({});
  

  useEffect(() => {
    const fetchProduk = async () => {
      const produk = await getSpecificProduct(id);
      setdataProduk(produk.data);
      console.log(produk);
    };
    fetchProduk();
  }, []);

  const formatToIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <button
        className="bg-transparent p-3 rounded text-white font-semibold hover:bg-gray-700"
        onClick={handleGoBack}>
        Back
      </button>
      <h1 className="text-center mt-10 text-5xl font-bold">Detail Produk</h1>

      <div className="h-screen flex items-center justify-center">
        <div className="grid grid-cols-2 mx-10">
          <div className="border border-gray-600 shadow-xl p-12 rounded-l-lg">
            <img
              className="w-full h-96 rounded-lg object-cover mt-3"
              src={`http://localhost:8000/storage/produk/${dataProduk.gambar}`}
              alt=""
            />
          </div>
          <div className="border border-gray-600 p-12 rounded-r-lg shadow-xl">
            <div
              className="max-h-96 mt-3 overflow-y-auto "
              style={{
                scrollbarWidth: "none",
                "-ms-overflow-style": "none",
                "&::-webkit-scrollbar": { width: "0" },
              }}>
              <div className="w-32 h-14 rounded-lg bg-white">
                <p className="text-center text-black text-2xl p-3 font-bold">
                  {dataProduk.kategori}
                </p>
              </div>
              <p className="mt-5 font-bold text-2xl">
                {dataProduk.nama_produk}
              </p>
              <div className="mt-10">
                <p className="font-semibold text-xl">start from </p>
                <p className="font-bold text-2xl">
                  {formatToIDR(dataProduk.harga)}
                </p>
              </div>
              <div className="mt-10">
                <p className="font-semibold">Description : </p>
                <p className="font-bold text-justify">{dataProduk.deskripsi}</p>
              </div>
              <div className="mt-10">
                <p className="font-semibold text-xl">
                  Share This Product To Your Friends!
                </p>
                <div className="mx-4">
                  <a href="#">
                    <FontAwesomeIcon
                      className="text-3xl mt-3 mx-3"
                      icon={faInstagram}
                    />
                  </a>
                  <a href="#">
                    <FontAwesomeIcon
                      className="text-3xl mt-3 mx-3"
                      icon={faWhatsapp}
                    />
                  </a>
                  <a href="#">
                    <FontAwesomeIcon
                      className="text-3xl mt-3 mx-3"
                      icon={faXTwitter}
                    />
                  </a>
                  <a href="#">
                    <FontAwesomeIcon
                      className="text-3xl mt-3 mx-3"
                      icon={faFacebook}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
