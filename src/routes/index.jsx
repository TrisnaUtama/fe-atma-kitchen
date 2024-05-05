import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Karyawan = lazy(() => import("../pages/protected/karyawan/karyawan"));
const AddKaryawanPage = lazy(() =>
  import("../pages/protected/karyawan/addKaryawan")
);
const EditKaryawanPage = lazy(() =>
  import("../pages/protected/karyawan/editKaryawan")
);
const Produk = lazy(() => import("../pages/protected/produk/Produk"));
const DasboardCustomer = lazy(() =>
  import("../pages/protected/DashboardCustomer")
);
const AddProductPage = lazy(() =>
  import("../pages/protected/produk/AddProduk")
);
const EditProdukPage = lazy(() =>
  import("../pages/protected/produk/EditProduk")
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
    ];
    return routes;
  } else if (userType === "mo") {
    routes = [
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
