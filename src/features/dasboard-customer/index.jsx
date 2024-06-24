import { useState, useEffect } from "react";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import Filter from "@heroicons/react/24/outline/AdjustmentsHorizontalIcon";
import Close from "@heroicons/react/24/outline/XMarkIcon";
import Cart from "@heroicons/react/24/outline/ShoppingCartIcon";
import Minus from "@heroicons/react/24/outline/MinusCircleIcon";
import Plus from "@heroicons/react/24/outline/PlusCircleIcon";
import Detail from "@heroicons/react/24/outline/DocumentMagnifyingGlassIcon";
import Carousel from "./components/Carousel";
import AddToCartModal from "./components/ModalAddToCart";
import ModalCheckout from "./components/ModalChekout";
import { getAllproduct } from "./hooks/produk.hooks";

export default function DashboardCustomer() {
  const [toggleFilter, setToggleFilter] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeAvailability, setActiveAvailability] = useState(null);
  const [activePrice, setActivePrice] = useState(null);
  const [listProduk, setListProduk] = useState([]);
  const [listHampers, setListHampers] = useState([]);
  const [filteredProduk, setFilteredProduk] = useState([]);
  const [filteredHampers, setFilteredHampers] = useState([]);
  const category = ["Titipan", "Cake", "Minuman", "Hampers", "Roti"];
  const [dataCart, setDataCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalHarga, setTotalHarga] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenChekout, setIsModalOpenCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const openAddToCartModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const OpenModalToCheckout = (product) => {
    setSelectedProduct(product);
    setIsModalOpenCheckout(true);
    setShowCart(false);
  };

  const CloseModalToCheckout = () => {
    setIsModalOpenCheckout(false);
    setSelectedProduct(null);
  };

  const closeAddToCartModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  function handleToggleFilter() {
    setToggleFilter(!toggleFilter);
  }

  function handleToggleCart() {
    setShowCart(!showCart);
  }

  function toggleState(currentState, setState, value) {
    setState(currentState === value ? null : value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllproduct();
      setListProduk(data.data.produk);
      setListHampers(data.data.hampers);
    };
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  const filterData = () => {
    const filteredProduk = listProduk.filter((item) => {
      const categoryMatch =
        activeCategory === null || category[activeCategory] === item.kategori;

      let availabilityMatch = true;
      if (activeAvailability === "Ready Stock") {
        availabilityMatch = item.stok > 0;
      } else if (activeAvailability === "Pre-Order") {
        availabilityMatch = item.limit && item.limit.length > 0;
      }

      let priceMatch = true;
      if (activePrice === "Cheapest") priceMatch = item.harga <= 150000;
      if (activePrice === "Standard")
        priceMatch = item.harga > 150000 && item.harga <= 300000;
      if (activePrice === "Luxury") priceMatch = item.harga > 300000;

      return categoryMatch && availabilityMatch && priceMatch;
    });

    const filteredHampers = listHampers.filter((item) => {
      const categoryMatch =
        activeCategory === null || category[activeCategory] === item.kategori;

      let availabilityMatch = true;
      if (activeAvailability === "Ready Stock") {
        availabilityMatch = item.stok > 0;
      } else if (activeAvailability === "Pre-Order") {
        availabilityMatch = item.limit && item.limit.length > 0;
      }

      let priceMatch = true;
      if (activePrice === "Cheapest") priceMatch = item.harga <= 150000;
      if (activePrice === "Standard")
        priceMatch = item.harga > 150000 && item.harga <= 300000;
      if (activePrice === "Luxury") priceMatch = item.harga > 300000;

      return categoryMatch && availabilityMatch && priceMatch;
    });

    setFilteredProduk(filteredProduk);
    console.log(filteredProduk);
    setFilteredHampers(filteredHampers);
  };

  useEffect(() => {
    filterData();
  }, [
    listProduk,
    listHampers,
    activeCategory,
    activeAvailability,
    activePrice,
  ]);

  const formatToIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const addToCart = (item, kategori_pemesanan, tanggalDiambil) => {
    const kategori = item.kategori;
    let status = kategori_pemesanan;
    let nama_produk = "";
    let nama_hampers = "";
    let id_hampers = null;
    let id_produk = null;
    if (kategori === "Hampers") {
      id_hampers = item.id;
      nama_hampers = item.nama_hampers;
    } else {
      nama_produk = item.nama_produk;
      id_produk = item.id;
    }
    const harga = item.harga;
    const gambar = item.gambar;
    const jumlah = 1;
    let tanggal_diambil = tanggalDiambil;
    if (
      (!id_produk && !id_hampers) ||
      typeof harga !== "number" ||
      isNaN(harga) ||
      !gambar
    ) {
      console.error("Invalid product data", {
        id_produk,
        id_hampers,
        nama_hampers,
        nama_produk,
        jumlah,
        harga,
        gambar,
        kategori,
        item,
      });
      return;
    }

    setDataCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) =>
        id_produk
          ? cartItem.id_produk === id_produk &&
            cartItem.status === status &&
            new Date(cartItem.tanggal_diambil).toISOString().split("T")[0] ===
              new Date(tanggal_diambil).toISOString().split("T")[0]
          : cartItem.id_hampers === id_hampers &&
            cartItem.status === status &&
            new Date(cartItem.tanggal_diambil).toISOString().split("T")[0] ===
              new Date(tanggal_diambil).toISOString().split("T")[0]
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return {
              ...cartItem,
              jumlah: cartItem.jumlah + 1,
            };
          }
          return cartItem;
        });
      } else {
        updatedCart = [
          ...prevCart,
          {
            id_produk,
            id_hampers,
            jumlah,
            harga,
            gambar,
            kategori,
            nama_hampers,
            nama_produk,
            status: status,
            tanggal_diambil: tanggal_diambil,
          },
        ];
      }
      const newTotalHarga = updatedCart.reduce(
        (total, cartItem) => total + cartItem.harga * cartItem.jumlah,
        0
      );
      setTotalHarga(newTotalHarga);

      return updatedCart;
    });
  };

  const handleIncrementQuantity = (index) => {
    setDataCart((prevCart) => {
      const updatedCart = prevCart.map((item, idx) => {
        if (idx === index) {
          if (item.limit !== undefined && item.jumlah >= item.limit) {
            return item;
          }

          if (item.stock !== undefined && item.jumlah >= item.stock) {
            return item;
          }

          return { ...item, jumlah: item.jumlah + 1 };
        }
        return item;
      });

      const newTotalHarga = updatedCart.reduce(
        (total, cartItem) => total + cartItem.harga * cartItem.jumlah,
        0
      );
      setTotalHarga(newTotalHarga);
      return updatedCart;
    });
  };

  const handleDecrementQuantity = (index) => {
    setDataCart((prevCart) => {
      const updatedCart = prevCart
        .map((item, idx) => {
          if (idx === index) {
            if (item.jumlah > 1) {
              return { ...item, jumlah: item.jumlah - 1 };
            }
            return null;
          }
          return item;
        })
        .filter((item) => item !== null);

      const newTotalHarga = updatedCart.reduce(
        (total, cartItem) => total + cartItem.harga * cartItem.jumlah,
        0
      );
      setTotalHarga(newTotalHarga);
      return updatedCart;
    });
  };

  const groupedCart = dataCart.reduce((grouped, item) => {
    const tanggalDiambilDateOnly = item.tanggal_diambil.split("T")[0];
    if (!grouped[tanggalDiambilDateOnly]) {
      grouped[tanggalDiambilDateOnly] = [];
    }
    grouped[tanggalDiambilDateOnly].push(item);
    return grouped;
  }, {});

  const handleUpdatedDataCart = (updatedCart) => {
    setDataCart(updatedCart);
  };

  console.log(dataCart);

  return (
    <div className="flex flex-col h-full">
      <Carousel />
      {isModalOpen && (
        <AddToCartModal
          onClose={closeAddToCartModal}
          addToCart={addToCart}
          product={selectedProduct}
        />
      )}
      {isModalOpenChekout && (
        <ModalCheckout
          onClose={CloseModalToCheckout}
          customerId={userLogin.id}
          dataCart={dataCart}
          onUpdatedDataCart={handleUpdatedDataCart}
        />
      )}
      {dataCart.length >= 1 ? (
        <div className="fixed z-30 bottom-5 right-5 h-16 w-16 rounded-lg bg-black p-4 transition-transform duration-500 hover:scale-110">
          <button onClick={handleToggleCart}>
            <Cart className="w-8 transition-transform duration-500 hover:scale-110" />
          </button>
        </div>
      ) : undefined}
      <div className="block">
        <button
          className="btn bg-transparent border-slate-700 rounded-lg mt-4"
          onClick={handleToggleFilter}>
          <Filter className="w-5" />
          Filter
          <ChevronLeft
            className={`w-5 mt-0.5 ${
              toggleFilter
                ? "transition-all duration-1000 rotate-0"
                : "transition-all duration-1000 rotate-180"
            }`}
          />
        </button>
      </div>
      {showCart && (
        <div
          className={`fixed z-40 top-0 right-0 h-full w-2/3 md:w-1/3 bg-gray-800 text-white p-6 rounded-l-3xl transition-all duration-1000${
            showCart ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-5">
              <button
                className="btn bg-transparent text-white rounded-lg"
                onClick={handleToggleCart}>
                <Close className="w-5" />
              </button>
            </div>
            <h2 className="text-2xl text-center font-bold mb-5">
              Shopping Cart
            </h2>
            <hr className="bg-gray-700" />
            <div
              className="flex-1 overflow-y-auto"
              style={{
                scrollbarWidth: "none",
                "-ms-overflow-style": "none",
                "&::-webkit-scrollbar": { width: "0" },
              }}>
              {Object.entries(groupedCart).map(([tanggalDiambil, items]) => (
                <div key={tanggalDiambil}>
                  <hr />
                  <h2 className="inline-block p-2 mt-4 mb-2 bg-gray-700 rounded-lg">
                    {tanggalDiambil}
                  </h2>
                  <ul>
                    {items.map((item, index) => (
                      <li
                        key={index}
                        className="mb-4 mt-5 flex justify-between">
                        <div className="flex items-center">
                          <img
                            className="w-16 h-16 object-cover rounded-lg"
                            src={`http://localhost:8000/storage/${
                              item.kategori === "Hampers" ? "hampers" : "produk"
                            }/${item.gambar}`}
                            alt={item.kategori}
                          />
                          <div className="ml-4 font-semibold">
                            {item.kategori === "Hampers"
                              ? item.nama_hampers
                              : item.nama_produk}
                          </div>
                        </div>
                        <div>
                          <div>{formatToIDR(item.harga * item.jumlah)}</div>
                          <div>{item.kategori_pemesanan}</div>{" "}
                          <div className="flex items-center">
                            <p className="mr-2">Qty :</p>
                            <p className="flex items-center">
                              <button
                                onClick={() => handleDecrementQuantity(index)}
                                className="hover:scale-105">
                                <Minus className="w-6" />
                              </button>
                              <span className="mx-4 text-md">
                                {item.jumlah}
                              </span>
                              <button
                                onClick={() => handleIncrementQuantity(index)}
                                className="hover:scale-105">
                                <Plus className="w-6" />
                              </button>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 mb-2 border-t border-gray-700">
              <p className="text-xl">Total Harga:</p>
              <p className="text-xl">{formatToIDR(totalHarga)}</p>
            </div>
            <div className="block text-center p-5 bg-gray-700 border-gray-700 rounded-lg hover:bg-gray-900">
              <button onClick={() => OpenModalToCheckout(dataCart)}>
                {" "}
                Chekout{" "}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-1 mt-4 mb-10">
        <div
          className={`h-full p-8 bg-transparent border rounded-lg border-slate-700 transition-all duration-1000${
            toggleFilter
              ? "translate-x-0 opacity-100 w-96"
              : "-translate-x-full opacity-0 w-0"
          }`}>
          <h1 className="font-semibold text-xl">Category</h1>
          <div className="grid grid-cols-2 gap-2">
            {category.map((cat, index) => (
              <button
                key={index}
                onClick={() =>
                  toggleState(activeCategory, setActiveCategory, index)
                }>
                <div
                  className={`transition-all text-center font-medium rounded-lg border border-slate-700 p-3 mt-3 hover:bg-white hover:text-black ${
                    activeCategory === index ? "bg-white text-black" : ""
                  }`}>
                  {cat}
                </div>
              </button>
            ))}
          </div>
          <h1 className="font-semibold text-xl mt-8">Availability</h1>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() =>
                toggleState(
                  activeAvailability,
                  setActiveAvailability,
                  "Ready Stock"
                )
              }>
              <div
                className={`transition-all text-center font-medium rounded-lg border border-slate-700 p-3 mt-3 hover:bg-white hover:text-black ${
                  activeAvailability === "Ready Stock"
                    ? "bg-white text-black"
                    : ""
                }`}>
                Ready Stock
              </div>
            </button>
            <button
              onClick={() =>
                toggleState(
                  activeAvailability,
                  setActiveAvailability,
                  "Pre-Order"
                )
              }>
              <div
                className={`transition-all text-center font-medium rounded-lg border border-slate-700 p-3 mt-3 hover:bg-white hover:text-black ${
                  activeAvailability === "Pre-Order"
                    ? "bg-white text-black"
                    : ""
                }`}>
                Pre-Order
              </div>
            </button>
          </div>
          <h1 className="font-semibold text-xl mt-8">Price</h1>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() =>
                toggleState(activePrice, setActivePrice, "Cheapest")
              }>
              <div
                className={`transition-all text-center font-medium rounded-lg border border-slate-700 p-3 mt-3 hover:bg-white hover:text-black ${
                  activePrice === "Cheapest" ? "bg-white text-black" : ""
                }`}>
                Cheapest
              </div>
            </button>
            <button
              onClick={() =>
                toggleState(activePrice, setActivePrice, "Standard")
              }>
              <div
                className={`transition-all text-center font-medium rounded-lg border border-slate-700 p-3 mt-3 hover:bg-white hover:text-black ${
                  activePrice === "Standard" ? "bg-white text-black" : ""
                }`}>
                Standard
              </div>
            </button>
            <button
              onClick={() =>
                toggleState(activePrice, setActivePrice, "Luxury")
              }>
              <div
                className={`transition-all text-center font-medium rounded-lg border border-slate-700 p-3 mt-3 hover:bg-white hover:text-black ${
                  activePrice === "Luxury" ? "bg-white text-black" : ""
                }`}>
                Luxury
              </div>
            </button>
          </div>
        </div>

        <div
          className={`flex-1 p-8 h-full transition-all duration-1000 ${
            toggleFilter ? "w-3/4" : "w-full"
          }`}>
          {toggleFilter &&
            filteredProduk.length === 0 &&
            filteredHampers.length === 0 && (
              <div className="text-center text-white text-5xl mt-4 animate-grow">
                Items Are Unavailable.
              </div>
            )}
          <div className="grid grid-cols-4 gap-1">
            {filteredProduk &&
              filteredProduk.map((data, index) => (
                <div
                  className="p-2 max-w-md shadow-lg transition-all duration-700 hover:scale-105"
                  key={index}>
                  <img
                    className="transition-all duration-700 rounded-lg w-full h-64 object-cover"
                    src={`http://localhost:8000/storage/produk/${data.gambar}`}
                    alt="Product"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-lg mb-2 grid grid-cols-2">
                      <p> {data.kategori} </p>
                      <a
                        href={`/detail-produk/${data.id}`}
                        className="rounded-lg flex justify-end">
                        <Detail className="w-5  transition-transform duration-700 hover:scale-125" />
                      </a>
                    </div>
                    <div className="font-bold text-lg mb-2">
                      {data.nama_produk}
                    </div>
                  </div>
                  <div className="grid grid-rows-3">
                    <div className="row-start-1 row-end-1 mb-2 transition-all duration-500 mx-2 p-1">
                      <span className={`${toggleFilter ? "text-sm" : ""}`}>
                        Pre Order Stock:{" "}
                      </span>
                      <span
                        className={`inline-block ${
                          !data.limit.length
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        } ${
                          toggleFilter ? "text-xs" : ""
                        } rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2`}>
                        {!data.limit.length
                          ? " Sold Out"
                          : ` ${data.limit[0].limit}`}
                      </span>
                    </div>
                    <div className="row-start-2 row-end-2 mb-2 transition-all duration-500 mx-2 p-1">
                      <span className={`${toggleFilter ? "text-sm" : ""}`}>
                        Ready Stock:{" "}
                      </span>
                      <span
                        className={`inline-block ${
                          data.stok === 0 || data.stok === null
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        } ${
                          toggleFilter ? "text-xs" : ""
                        } rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2`}>
                        {data.stok === 0 || data.stok === null
                          ? " Sold Out"
                          : ` ${data.stok}`}
                      </span>
                    </div>
                    <div className="row-start-3 row-end-3 p-1 mx-2 mb-1 flex justify-between items-center">
                      <span className="rounded-lg px-3 py-1 bg-gray-500 font-semibold text-white text-lg">
                        {formatToIDR(data.harga)}
                      </span>
                      <button
                        className="inline-block hover:bg-gray-700 p-2 rounded-lg"
                        onClick={() => openAddToCartModal(data)}>
                        <Cart className="w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            {filteredHampers &&
              filteredHampers.map((data, index) => (
                <div
                  className="p-2 max-w-md shadow-lg transition-all duration-700 hover:scale-105"
                  key={index}>
                  <img
                    className={`transition-all duration-700 rounded-lg  ${
                      toggleFilter ? "w-full h-64" : "w-full h-72"
                    }`}
                    src={`http://localhost:8000/storage/hampers/${data.gambar}`}
                    alt="Hampers"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-lg mb-2 grid grid-cols-2">
                      <p> {data.kategori} </p>
                      <a
                        href={`/detail-hampers/${data.id}`}
                        className="rounded-lg flex justify-end">
                        <Detail className="w-5 transition-transform duration-700 hover:scale-125" />
                      </a>
                    </div>
                    <div className="font-bold text-lg mb-2">
                      {data.nama_hampers}
                    </div>
                  </div>
                  <div className="grid grid-rows-3">
                    <div className="row-start-2 row-end-2 mb-2 transition-all duration-500 mx-2 p-1">
                      <span className={`${toggleFilter ? "text-sm" : ""}`}>
                        Ready Stock :{" "}
                      </span>
                      <span
                        className={`inline-block ${
                          data.stok === 0
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        } ${
                          toggleFilter ? "text-xs" : ""
                        } rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2`}>
                        {data.stok === 0 ? " Sold Out" : ` ${data.stok}`}
                      </span>
                    </div>
                    <div className="row-start-3 row-end-3 p-1 mx-2 mb-1 flex justify-between items-center">
                      <span className="rounded-lg px-3 py-1 bg-gray-500 font-semibold text-white text-lg">
                        {formatToIDR(data.harga)}
                      </span>
                      <button
                        className="inline-block hover:bg-gray-700 p-2 rounded-lg"
                        onClick={() => openAddToCartModal(data)}>
                        <Cart className="w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
