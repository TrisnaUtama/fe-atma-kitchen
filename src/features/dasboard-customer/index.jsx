import { useState, useEffect } from "react";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import Filter from "@heroicons/react/24/outline/AdjustmentsHorizontalIcon";
import Carousel from "./components/Carousel";
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

  function handleToggleFilter() {
    setToggleFilter(!toggleFilter);
  }

  function toggleState(currentState, setState, value) {
    setState(currentState === value ? null : value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllproduct();
      setListProduk(data.data.produk);
      setListHampers(data.data.hampers);
      console.log(data.data.produk);
      console.log(data.data.hampers);
    };
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  useEffect(() => {
    filterData();
  }, [
    listProduk,
    listHampers,
    activeCategory,
    activeAvailability,
    activePrice,
  ]);

  const filterData = () => {
    const filteredProduk = listProduk.filter((item) => {
      const categoryMatch =
        activeCategory === null || category[activeCategory] === item.kategori;
      let availabilityMatch = true;
      if (activeAvailability === "Ready Stock") {
        availabilityMatch = item.stok > 0;
      } else if (activeAvailability === "Pre-Order") {
        availabilityMatch = item.limit.limit > 0;
      }
      let priceMatch = true;
      if (activePrice === "Cheapest") priceMatch = item.harga <= 150000;
      if (activePrice === "Standard")
        priceMatch = item.harga >= 50 && item.harga <= 300000;
      if (activePrice === "Luxury") priceMatch = item.harga >= 300010;
      return categoryMatch && availabilityMatch && priceMatch;
    });

    const filteredHampers = listHampers.filter((item) => {
      const categoryMatch =
        activeCategory === null || category[activeCategory] === item.kategori;
      let availabilityMatch = true;
      if (activeAvailability === "Ready Stock")
        availabilityMatch = item.stok > 0;
      else if (activeAvailability === "Pre-Order") {
        availabilityMatch = item.limit ? item.limit.limit > 0 : false;
      }
      let priceMatch = true;
      if (activePrice === "Cheapest") priceMatch = item.harga <= 150000;
      if (activePrice === "Standard")
        priceMatch = item.harga >= 50 && item.harga <= 300000;
      if (activePrice === "Luxury") priceMatch = item.harga >= 300010;
      return categoryMatch && availabilityMatch && priceMatch;
    });

    console.log(filteredHampers);
    console.log(filteredProduk);
    setFilteredProduk(filteredProduk);
    setFilteredHampers(filteredHampers);
  };

  const formatToIDR = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="flex flex-col h-full">
      <Carousel />

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

      <div className="flex flex-1 mt-4 mb-10">
        <div
          className={`h-full p-8 bg-transparent border rounded-lg border-slate-700 transition-all duration-700 ${
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
                <a
                  href="detail-produk"
                  className="p-2 max-w-md shadow-lg transition-all duration-700 hover:scale-110"
                  key={index}>
                  <img
                    className="transition-all duration-700 rounded-lg w-full h-64 object-cover"
                    src={`http://localhost:8000/storage/produk/${data.gambar}`}
                    alt="Product"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-lg mb-2">
                      {data.kategori}
                    </div>
                    <div className="font-bold text-lg mb-2">
                      {data.nama_produk}
                    </div>
                  </div>
                  <div className="grid grid-rows-3">
                    <div className="row-start-1 row-end-1 mb-2 transition-all duration-500 mx-2  p-1">
                      <span className={`${toggleFilter ? "text-sm" : ""}`}>
                        Pre Order Stock :{" "}
                      </span>
                      <span
                        className={`inline-block ${
                          data.limit || data.limit.limit === undefined || 0
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        } ${
                          toggleFilter ? "text-xs" : ""
                        } rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2`}>
                        {data.limit || data.limit.limit === undefined || 0
                          ? " Sold Out"
                          : ` ${data.limit.limit}`}
                      </span>
                    </div>
                    <div className="row-start-2 row-end-2 mb-2 transition-all duration-500 mx-2 p-1">
                      <span className={`${toggleFilter ? "text-sm" : ""}`}>
                        Pre Order Stock :{" "}
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
                    <div className="row-start-3 row-end-3 p-1 mx-2 mb-1">
                      <span className="inline-block rounded-full px-3 py-1 bg-gray-500 font-semibold text-white text-xl">
                        {formatToIDR(data.harga)}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            {filteredHampers &&
              filteredHampers.map((data, index) => (
                <a
                  href="#"
                  className="p-2 max-w-md shadow-lg transition-all duration-700 hover:scale-110"
                  key={index}>
                  <img
                    className={`transition-all duration-700 rounded-lg  ${
                      toggleFilter ? "w-full h-64" : "w-full h-72"
                    }`}
                    src={`http://localhost:8000/storage/hampers/${data.gambar}`}
                    alt="Hampers"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-lg mb-2">
                      {data.kategori}
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
                    <div className="row-start-3 row-end-3 p-1 mx-2 mb-1">
                      <span className="inline-block rounded-full px-3 py-1 bg-gray-500 font-semibold text-white text-xl">
                        {formatToIDR(data.harga)}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
