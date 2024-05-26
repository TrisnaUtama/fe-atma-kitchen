import React, { useState, useEffect } from "react";
import {
  getAlamatById,
  addNewAlamat,
  addPemesanan,
  getUser,
} from "../hooks/produk.hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalCheckout({
  onClose,
  customerId,
  dataCart,
  onUpdatedDataCart,
}) {
  const [alamat, setAlamat] = useState([]);
  const [selectedAlamat, setSelectedAlamat] = useState("");
  const [togglerAlamat, setTogglerAlamat] = useState(0);
  const [newAlamat, setNewAlamat] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userLogin, setUserLogin] = useState({});
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);

  useEffect(() => {
    async function fetchAlamat() {
      try {
        const alamatData = await getAlamatById(customerId);
        if (Array.isArray(alamatData)) {
          setAlamat(alamatData);
        } else {
          console.error("Unexpected data format:", alamatData);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    }
    fetchAlamat();
  }, [customerId]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUser();
        setUserLogin(response);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUser();
  }, []);

  const handlePickupSelect = () => {
    setDeliveryType("pickup");
    setError("");
  };

  const handleDeliverySelect = () => {
    setDeliveryType("delivery");
    setError("");
  };

  const handleTambahAlamat = () => {
    setTogglerAlamat(1);
    setError("");
  };

  const handlePilihAlamat = () => {
    setTogglerAlamat(2);
    setError("");
  };

  const handleAlamatChange = (event) => {
    setNewAlamat(event.target.value);
    setError("");
  };

  const handleSelectedAlamatChange = (event) => {
    setSelectedAlamat(event.target.value);
    setError("");
  };

  const handlePointsToUseChange = (event) => {
    const points = parseInt(event.target.value, 10);
    if (points >= 0 && points <= userLogin.poin) {
      setPointsToUse(points);
    } else if (points > userLogin.poin) {
      setPointsToUse(userLogin.poin);
    } else {
      setPointsToUse(0);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    if (!deliveryType) {
      setError("Please select delivery type (pickup/delivery).");
      setLoading(false);
      return;
    }

    if (deliveryType === "delivery" && togglerAlamat === 0) {
      setError("Please select or add an address.");
      setLoading(false);
      return;
    }

    let id_alamat = parseInt(selectedAlamat, 10);

    if (deliveryType === "delivery") {
      // Your existing code for handling delivery addresses...

      if (togglerAlamat === 2 && !selectedAlamat) {
        setError("Please select an address.");
        setLoading(false);
        return;
      }
    }

    const itemsArray = Object.values(dataCart).flat();
    const itemsToUpdate = itemsArray.map((item) => ({
      ...item,
      id_alamat: id_alamat || null,
      potongan_poin: usePoints ? pointsToUse : 0,
      deliveryType: deliveryType, 
    }));

    console.log(itemsToUpdate);

    try {
      await addPemesanan({ items: itemsToUpdate });
      onUpdatedDataCart([]);
      setMessage("Checkout successful.");
      toast.success("Checkout successful!");
      onClose();
    } catch (error) {
      console.error("Error during checkout:", error);
      setError("Failed to complete the checkout process.");
    } finally {
      setLoading(false);
    }
  };

  const totalPayment = Object.values(dataCart)
    .flat()
    .reduce((total, item) => total + item.harga * item.jumlah, 0);

  const discountedPayment = usePoints
    ? totalPayment - pointsToUse * 100
    : totalPayment;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 mx-10">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-800 p-5 rounded-lg z-10 w-full max-w-2xl max-h-full overflow-y-auto my-10 md:my-24">
        <h2 className="text-lg font-bold mb-4">Checkout Pesanan</h2>
        <div className="mb-4">
          <label className="block mb-2">Delivery Type</label>
          <div className="block">
            <button
              className={`btn mr-5 ${
                deliveryType === "pickup" ? "bg-gray-50 text-black" : ""
              }`}
              onClick={handlePickupSelect}
            >
              Pickup
            </button>
            <button
              className={`btn ${
                deliveryType === "delivery" ? "bg-gray-50 text-black" : ""
              }`}
              onClick={handleDeliverySelect}
            >
              Delivery
            </button>
          </div>
        </div>

        {deliveryType === "delivery" && (
          <div className="mb-4">
            <label className="block mb-2">Choose or Add Address</label>
            <div className="block">
              <button className="btn mr-5" onClick={handleTambahAlamat}>
                Add New Address
              </button>
              <button className="btn" onClick={handlePilihAlamat}>
                Choose Address
              </button>
            </div>
            {togglerAlamat === 1 && (
              <div>
                <input
                  type="text"
                  className="border-none mt-3 p-2 rounded-lg bg-gray-700 text-white w-full"
                  placeholder="Enter New Address"
                  value={newAlamat}
                  onChange={handleAlamatChange}
                />
              </div>
            )}
            {togglerAlamat === 2 && (
              <div>
                <select
                  className="border-none mt-3 p-2 rounded-lg bg-gray-700 text-white w-full"
                  value={selectedAlamat}
                  onChange={handleSelectedAlamatChange}
                >
                  <option value="">Select Address</option>
                  {alamat.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.nama_alamat}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Products</h3>
          <ul>
            {Object.values(dataCart)
              .flat()
              .map((item, index) => (
                <li key={index} className="mb-2">
                  {item.kategori !== "Hampers" ? (
                    <p className="text-lg font-semibold">
                      {item.nama_produk} - {item.jumlah} x ${item.harga} = $
                      {item.jumlah * item.harga}
                    </p>
                  ) : (
                    <p className="text-lg font-semibold">
                      {item.nama_hampers} - {item.jumlah} x ${item.harga} = $
                      {item.jumlah * item.harga}
                    </p>
                  )}
                </li>
              ))}
          </ul>
          <h4 className="text-lg font-bold mt-4">
            Total Payment: ${totalPayment}
          </h4>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={usePoints}
                onChange={() => setUsePoints(!usePoints)}
              />
              Use Points (1 point = 100)
            </label>
            {usePoints && (
              <div className="mt-2">
                <label className="block mb-2">
                  Points Available: {userLogin.poin}
                </label>
                <input
                  type="number"
                  className="border-none p-2 rounded-lg bg-gray-700 text-white w-full"
                  placeholder="Enter Points to Use"
                  value={pointsToUse}
                  onChange={handlePointsToUseChange}
                  max={userLogin.poin}
                  min={0}
                />
              </div>
            )}
          </div>
          <h4 className="text-lg font-bold mt-4">
            Discounted Payment: ${discountedPayment}
          </h4>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Loading..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
