import { lazy } from "react";
// import axios from "axios";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Karyawan = lazy(() => import("../pages/protected/karyawan/karyawan"));
const AddKaryawanPage = lazy(() =>
  import("../pages/protected/karyawan/addKaryawan")
);
const EditKaryawanPage = lazy(() =>
  import("../pages/protected/karyawan/editKaryawan")
);
const Produk = lazy(() => import("../pages/protected/produk/Produk"));

const UbahPassword = lazy(() => import("../pages/ubahPassword"));

const AddProductPage = lazy(() =>
  import("../pages/protected/produk/AddProduk")
);
const EditProdukPage = lazy(() =>
  import("../pages/protected/produk/EditProduk")
);

const BahanBakuPage = lazy(() =>
  import("../pages/protected/bahanbaku/Bahanbaku")
);
const addBahanbakuPage = lazy(() =>
  import("../pages/protected/bahanbaku/addBahanbaku")
);
const editBahanbakuPage = lazy(() =>
  import("../pages/protected/bahanbaku/editBahanbaku")
);
//penitip
const PenitipPage = lazy(() => import("../pages/protected/penitip/Penitip"));
const addPenitipPage = lazy(() =>
  import("../pages/protected/penitip/addPenitip")
);
const editPenitipPage = lazy(() =>
  import("../pages/protected/penitip/editPenitip")
);

const Hampers = lazy(() => import("../pages/protected/hampers/Hampers"));

const PembelianBahanBaku = lazy(() =>
  import("../pages/protected/pembelian-bahan-baku/PemebelianBahanBaku")
);

const AddPembelianBahanBaku = lazy(() =>
  import("../pages/protected/pembelian-bahan-baku/AddPembelian")
);

const EditPembelian = lazy(() =>
  import("../pages/protected/pembelian-bahan-baku/EditPembelian")
);

//cari&DataCustomer
const DataCustomer = lazy(() =>
  import("../pages/protected/adminCustomer/historyCustomer")
);

const historyPesanan = lazy(() =>
  import("../pages/protected/adminCustomer/detailPesanan")
);

const AddHampers = lazy(() => import("../pages/protected/hampers/AddHampers"));
const EditHampers = lazy(() =>
  import("../pages/protected/hampers/EditHampers")
);
//pengeluaran
const PengeluaranPage = lazy(() =>
  import("../pages/protected/pengeluaranlain/Pengeluaran")
);
const addPengeluaranPage = lazy(() =>
  import("../pages/protected/pengeluaranlain/addPengeluaran")
);
const editPengeluaranPage = lazy(() =>
  import("../pages/protected/pengeluaranlain/editPengeluaran")
);
const Resep = lazy(() => import("../pages/protected/resep/Resep"));
const TambahResep = lazy(() => import("../pages/protected/resep/AddResep"));
const EditResep = lazy(() => import("../pages/protected/resep/EditResep"));
const SettingProfile = lazy(() =>
  import("../pages/protected/profile/profileSetting")
);
const TranscationHistory = lazy(() =>
  import("../pages/protected/profile/transactionHistory")
);

const UpdateProfile = lazy(() =>
  import("../pages/protected/profile/editProfile")
);
const GajiUpdate = lazy(() => import("../pages/protected/owner/editGaji"));
const EditGaji = lazy(() => import("../pages/protected/owner/editGajiOwner"));

//KonfirmasiMO
const KonfirmasiMO = lazy(() =>
  import("../pages/protected/konfirmasiMO/Konfirmasi")
);

const getPengiriman = lazy(() =>
  import("../pages/protected/adminPengiriman/detailPengiriman")
);

//LaporanPenitip
const ListPenitip = lazy(()=>
import("../pages/protected/LaporanPenitip/ListLaporanPenitip")
);
const  DetailLaporan = lazy(()=>
import("../pages/protected/LaporanPenitip/DetailLaporanPenitip")
);

//PemasukanPengeluaran
const LaporanPenitip = lazy(()=>
import("../pages/protected/LaporanPemasukanPengeluaran/listLaporanPemasukanPengeluaran")
);

//LaporanPresensi
const LaporanPresensi = lazy(()=>
import("../pages/protected/LaporanPresensi/listLaporanPresensi")
);



const getPembayaran = lazy(() =>
  import("../pages/protected/adminPembayaran/detailPembayaran")
);

//konfirmasiAdminSaldo
const KonfirmasiAdminSaldo = lazy(() =>
  import("../pages/protected/adminSaldo/listSaldo")
);


// customer
const DashboardCust = lazy(() =>
  import("../pages/protected/customer/Dashboard")
);
const DetailProduk = lazy(() =>
  import("../pages/protected/customer/DetailProduk")
);
const DetailHampers = lazy(() =>
  import("../pages/protected/customer/DetailHampers")
);
const PemesananList = lazy(() =>
  import("../pages/protected/customer/Pemesanan")
);

const listPembayaran = lazy(() =>
  import("../pages/protected/customer/ListPesanan")
);

const bayarPesanan = lazy(() =>
  import("../pages/protected/customer/bayarPesanan")
);

const userType = localStorage.getItem("userType");

const getRoutes = () => {
  let routes = [];
  if (userType === "admin") {
    routes = [
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/hampers",
        component: Hampers,
      },
      {
        path: "/add-hampers",
        component: AddHampers,
      },
      {
        path: "/edit-hampers/:id",
        component: EditHampers,
      },
      {
        path: "/produk",
        component: Produk,
      },
      {
        path: "/add-produk",
        component: AddProductPage,
      },
      {
        path: "/edit-produk/:id",
        component: EditProdukPage,
      },
      {
        path: "/bahanbaku",
        component: BahanBakuPage,
      },
      {
        path: "/add-bahanbaku",
        component: addBahanbakuPage,
      },
      {
        path: "/edit-bahanbaku/:id",
        component: editBahanbakuPage,
      },
      {
        path: "/resep", // the url
        component: Resep,
      },
      {
        path: "/tambahResep", // the url
        component: TambahResep,
      },
      {
        path: "/editResep/:id", // the url
        component: EditResep,
      },
      {
        path: "/produk",
        component: Produk,
      },
      {
        path: "/add-produk",
        component: AddProductPage,
      },
      {
        path: "/edit-produk/:id",
        component: EditProdukPage,
      },
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/settingProfile", // the url
        component: SettingProfile,
      },
      {
        path: "/updateProfile", // the url
        component: UpdateProfile,
      },
      {
        path: "/customer",
        component: DataCustomer,
      },
      {
        path: "/detailPesanan/:id",
        component: historyPesanan,
      },
      {
        path: "/pengiriman",
        component: getPengiriman,
      },
      {
        path: "/getPembayaran",
        component: getPembayaran,
      },

      {
        path: "/konfirmasiSaldo",
        component: KonfirmasiAdminSaldo,
      }
    ];
    return routes;
  } else if (userType === "mo") {
    routes = [
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/penitip",
        component: PenitipPage,
      },
      {
        path: "/add-penitip",
        component: addPenitipPage,
      },
      {
        path: "/edit-penitip/:id",
        component: editPenitipPage,
      },
      {
        path: "/pembelianBahanBaku",
        component: PembelianBahanBaku,
      },
      {
        path: "/add-pembelian",
        component: AddPembelianBahanBaku,
      },
      {
        path: "/edit-pembelian/:id",
        component: EditPembelian,
      },

      //pengeluaranLain
      {
        path: "/pengeluaran",
        component: PengeluaranPage,
      },
      {
        path: "/add-pengeluaran",
        component: addPengeluaranPage,
      },
      {
        path: "/edit-pengeluaran/:id",
        component: editPengeluaranPage,
      },
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/karyawan",
        component: Karyawan,
      },
      {
        path: "/addKaryawan",
        component: AddKaryawanPage,
      },
      {
        path: "/editKaryawan/:id",
        component: EditKaryawanPage,
      },
      {
        path: "/settingProfile",
        component: SettingProfile,
      },
      {
        path: "/updateProfile",
        component: UpdateProfile,
      },

      {
        path: "/konfrimasiPesanan",
        component: KonfirmasiMO,
      },

      {
        path:"/listPenitip",
        component: ListPenitip,
      },
      {
        path:"/detailLaporan/:id",
        component: DetailLaporan,
      },
      {
        path:"/pemasukanPengeluaran",
        component: LaporanPenitip,
      },
      {
        path: "/laporanPresensi",
        component: LaporanPresensi,
      }

    ];
    return routes;
  } else if (userType === "owner") {
    routes = [
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/settingProfile",
        component: SettingProfile,
      },
      {
        path: "/updateProfile",
        component: UpdateProfile,
      },
      {
        path: "/Gaji",
        component: GajiUpdate,
      },
      {
        path: "/editGaji/:id",
        component: EditGaji,
      },
    ];
    return routes;
  } else {
    routes = [
      {
        path: "/dashboardCustomer",
        component: DashboardCust,
      },
      {
        path: "/detail-produk/:id",
        component: DetailProduk,
      },
      {
        path: "/detail-hampers/:id",
        component: DetailHampers,
      },
      {
        path: "/settingProfile",
        component: SettingProfile,
      },
      {
        path: "/updateProfile",
        component: UpdateProfile,
      },
      {
        path: "/transcationHistory",
        component: TranscationHistory,
      },
      {
        path: "/listPembayaran",
        component: listPembayaran,
      },
      {
        path: "/bayarPesanan",
        component: bayarPesanan,
      },
      {
        path: "/pemesananList",
        component: PemesananList,
      },
    ];
    return routes;
  }
};

export default getRoutes;
