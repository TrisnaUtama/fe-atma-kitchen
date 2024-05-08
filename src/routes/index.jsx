import { lazy } from "react";
import axios from "axios";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Karyawan = lazy(() => import("../pages/protected/karyawan/karyawan"));
const AddKaryawanPage = lazy(() =>
  import("../pages/protected/karyawan/addKaryawan")
);
const EditKaryawanPage = lazy(() =>
  import("../pages/protected/karyawan/editKaryawan")
);
const Produk = lazy(() => import("../pages/protected/produk/Produk"));
const UbahPassword = lazy(() => import('../pages/ubahPassword'))
const DasboardCustomer = lazy(() =>
  import("../pages/protected/DashboardCustomer")
);
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
const DataCustomer = lazy(()=>
  import("../pages/protected/adminCustomer/historyCustomer")
);

const historyPesanan = lazy(()=>
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
const UpdateProfile = lazy(() =>
  import("../pages/protected/profile/editProfile")
);
const GajiUpdate = lazy(() => import("../pages/protected/owner/editGaji"));
const EditGaji = lazy(() => import("../pages/protected/owner/editGajiOwner"));

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
        component: Resep, // view rendered
      },
      {
        path: "/tambahResep", // the url
        component: TambahResep, // view rendered
      },
      {
        path: "/editResep/:id", // the url
        component: EditResep, // view rendered
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
        component: SettingProfile, // view rendered
      },
      {
        path: "/updateProfile", // the url
        component: UpdateProfile, // view renderedss
      },
       {
        path: "/customer",
        component: DataCustomer,
      },
      {
        path: "/detailPesanan/:id",
        component: historyPesanan,
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
        path: "/settingProfile", // the url
        component: SettingProfile, // view rendered
      },
      {
        path: "/updateProfile", // the url
        component: UpdateProfile, // view renderedss
      },

     
    ];
    return routes;
  } else if (userType === "owner") {
    routes = [
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/settingProfile", // the url
        component: SettingProfile, // view rendered
      },
      {
        path: "/updateProfile", // the url
        component: UpdateProfile, // view renderedss
      },
      {
        path: "/Gaji", // the url
        component: GajiUpdate, // view renderedss
      },
      {
        path: "/editGaji/:id", // the url
        component: EditGaji, // view renderedss
      },
    ];
    return routes;
  } else {
    routes = [
      {
        path: "/dashboardCustomer", // the url
        component: DasboardCustomer, // view rendered
      },
      {
        path: "/settingProfile", // the url
        component: SettingProfile, // view rendered
      },
      {
        path: "/updateProfile", // the url
        component: UpdateProfile, // view renderedss
      },
    ];
    return routes;
  }
};

export default getRoutes;
