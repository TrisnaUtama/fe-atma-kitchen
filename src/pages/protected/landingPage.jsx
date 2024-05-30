import React from "react";


import { Link } from "react-router-dom";
import logo from "../../assets/images/logoAtma.jpg"
import toko from "../../assets/images/gambar toko.jpeg"
import lokasi from "../../assets/images/maps.png"
import Carousel from "../../features/dasboard-customer/components/Carousel"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';




const Navbar = () => {
    return (
        <nav className="bg-gray-800 py-4 fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <ul className="flex">
                    <li className="mx-4">
                        <Link to="/" className="text-white text-lg font-bold flex items-center">
                            <img src={logo} alt="Logo" className="h-8 w-8 rounded-full mr-2" />
                            Atma Kitchen
                        </Link>
                    </li>
                </ul>
                <ul className="flex">
                    <li className="mx-4">
                        <Link to="/register" className="text-blue-500 hover:text-white hover:bg-indigo-500 transition duration-300 px-4 py-2 rounded border border-gray-400 ">
                            Register
                        </Link>
                    </li>
                    <li className="mx-4">
                        <Link to="/login" className="text-white hover:text-black hover:bg-indigo-500 transition duration-300 px-4 py-2 rounded border border-indigo-700 bg-indigo-600">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

const MainContent = () => {


    const [produk, setProduk] = useState([]);
    const [hampers, setHampers] = useState([]);
    const [trans, setTrans] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduk = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/v1/getAllProduk");
                const fetchedProduk = response.data.data;
                console.log(fetchedProduk);
                setProduk(fetchedProduk);
                setTrans(fetchedProduk);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduk();
    }, []);
    useEffect(() => {
        const fetchHampers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/v1/getAllHampers");
                const fetchedHampers = response.data.data;
                console.log(fetchedHampers);
                setHampers(fetchedHampers);
                setTrans(fetchedHampers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHampers();
    }, []);
    return (
        <div className="pt-16 px-4 mt-6" style={{ paddingTop: '64px' }}>
            <Carousel />
            <div className="container mx-auto px-4 py-4 border border-gray-300 rounded-lg mt-4">
            <h2 className="text-xl mt-0 mb-3 px-2 py-2 text-bold text-white bg-gray-900 sticky ">Product</h2>
                <div className=" overflow-x-auto whitespace-nowrap">
                    <div className="flex">
                        {produk.map((item, index) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4 inline-block">
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: '250px', height: '350px' }}>
                                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}> {/* Ganti nilai maxHeight sesuai kebutuhan */}
                                        <img
                                        src={`http://localhost:8000/storage/produk/${item.gambar}`}
                                        alt={item.nama_produk}
                                        className="w-full h-36 object-cover"
                                    />
                                        <p className="p-4 mt-4">
                                            <h3 className="text-lg font-bold mt-2">{item.nama_produk}</h3>
                                            <p className="text-primary font-bold mt-2">{formatToIDR(item.harga)}</p>
                                            <p className="text-gray-500 mt-2">Kategori: {item.kategori}</p>
                                            <p className="text-gray-500 mt-2">Stok: {item.stok}</p>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-4 border border-gray-300 rounded-lg mt-4">
                <h2 className="text-xl mt-0 mb-3 px-2 py-2 text-bold text-white bg-gray-900 sticky ">Hampers</h2>
                <div className=" overflow-x-auto whitespace-nowrap">
                    <div className="flex">
                        {hampers.map((item, index) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4 inline-block">
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: '250px', height: '350px' }}>
                                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}> {/* Ganti nilai maxHeight sesuai kebutuhan */}
                                        <img
                                        src={`http://localhost:8000/storage/hampers/${item.gambar}`}
                                        alt={item.nama_produk}
                                        className="w-full h-36 object-cover"
                                    />
                                        <p className="p-4 mt-4">
                                            <h3 className="text-lg font-bold mt-2">{item.nama_hampers}</h3>
                                            <p className="text-primary font-bold mt-2">{formatToIDR(item.harga)}</p>
                                            <p className="text-gray-500 mt-2">Kategori: {item.kategori}</p>
                                            <p className="text-gray-500 mt-2">Stok: {item.stok}</p>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>




            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={toko} alt="Toko" className="w-full h-auto" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/3 px-4 mb-4">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-black font-bold mb-4 text-xl">Atma Kitchen</h2>
                            <p className="text-gray-700 text-lg">
                                Atma Kitchen adalah toko yang menjual aneka kue premium dimana kualitas dari produk sangat terjamin.
                                Kita adalah toko yang hadir untuk para pecinta kue, selain itu kita juga menjual minuman yang beraneka ragam.
                                Selain itu kami juga ada produk titipan dari luar dimana yang mau menitip produk di toko kami dapat menitipkan produknya
                                dan menjualnya di toko kami.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 lg:w-2/3 px-4 mb-4">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-black font-bold mb-4 text-xl">Lokasi</h2>
                            <p className="text-gray-700 text-lg">
                                Jl. Babarsari No.43, Janti, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={lokasi} alt="Lokasi" className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
const formatToIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(amount);
};

const App = () => {
    return (
        <div>
            <Navbar />
            <MainContent />
        </div>
    );
};

export default App;