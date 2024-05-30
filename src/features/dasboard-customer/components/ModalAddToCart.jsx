import React, { useState, useEffect } from "react";

const AddToCartModal = ({ onClose, addToCart, product }) => {
  const kategori = ["Pre-Order", "Ready Stok"];
  const [selectedKategori, setSelectedKategori] = useState("");
  const [orderDateTime, setOrderDateTime] = useState("");
  const [minDateTime, setMinDateTime] = useState("");
  const [dateTimeError, setDateTimeError] = useState(false);

  const limit =
    product.limit && product.limit.length > 0 ? product.limit[0] : null;

  useEffect(() => {
    const today = new Date();

    let newSelectedKategori;
    if (product.stok <= 0 && (!limit || limit.limit > 0)) {
      newSelectedKategori = "Pre-Order";
    } else if (limit && limit.limit <= 0 && product.stok > 0) {
      newSelectedKategori = "Ready Stok";
    } else {
      setSelectedKategori(selectedKategori);
    }

    if (newSelectedKategori === "Pre-Order" && limit) {
      const twoDaysAfter = new Date(today);
      twoDaysAfter.setDate(today.getDate() + 2);
      setMinDateTime(twoDaysAfter.toISOString().slice(0, 16));
    } else {
      setMinDateTime(today.toISOString().slice(0, 16));
    }
  }, [limit, product.stok, kategori, setMinDateTime, setSelectedKategori]);

  const handleAddToCart = () => {
    if (!orderDateTime) {
      setDateTimeError(true);
      return;
    }

    addToCart(
      {
        ...product,
        selectedKategori,
        orderDateTime,
      },
      selectedKategori,
      orderDateTime
    );
    onClose();
  };

  console.log(selectedKategori);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 mx-10">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-800 p-5 rounded-lg z-10 w-full max-w-2xl max-h-full overflow-y-auto my-10 md:my-24">
        <h2 className="text-lg font-bold mb-4">Add to Cart</h2>
        <div className="flex justify-center mb-4">
          <img
            className="w-full h-56 object-cover rounded-lg"
            src={`http://localhost:8000/storage/${
              product.kategori === "Hampers" ? "hampers" : "produk"
            }/${product.gambar}`}
            alt={product.kategori}
          />
        </div>
        <div className="my-10">
          {limit ? (
            <p className="text-xl font-semibold">
              Product Limit: {limit.limit}
            </p>
          ) : (
            <p className="text-xl font-semibold ">
              Product Limit: <span className="text-red-500">Sold</span>{" "}
            </p>
          )}
          {product.stok > 0 ? (
            <p className="text-xl font-semibold"> Stock: {product.stok}</p>
          ) : (
            <p className="text-xl font-semibold ">
              Stock: <span className="text-red-500">Sold</span>{" "}
            </p>
          )}
        </div>
        <p className="mb-4">{product.deskripsi}</p>

        <div className="mb-4">
          <label className="block mb-2">Kategori Order</label>
          <select
            value={selectedKategori}
            onChange={(e) => setSelectedKategori(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full"
            disabled={
              !limit ||
              (limit.limit !== null && limit.limit < 0 && product.stok < 0)
            }>
            {kategori.map((kat, index) => (
              <option
                key={index}
                value={kat}
                disabled={kat === "Pre-Order" && (!limit || !limit.limit)}
              >
                {kat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Tanggal dan Waktu Order</label>
          <input
            type="datetime-local"
            value={orderDateTime}
            min={minDateTime}
            onChange={(e) => {
              setOrderDateTime(e.target.value);
              setDateTimeError(false);
            }}
            className={`p-2 rounded-lg bg-gray-700 text-white w-full ${
              dateTimeError ? "border-red-500" : ""
            }`}
          />
          {dateTimeError && (
            <p className="text-red-500 mt-1">Tanggal dan waktu harus diisi</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleAddToCart}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
