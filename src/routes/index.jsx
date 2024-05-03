// All components mapping with path for internal routes
import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
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
const BahanBakuPage = lazy(() =>
  import("../pages/protected/bahanbaku/Bahanbaku")
);
const addBahanbakuPage = lazy(() =>
  import("../pages/protected/bahanbaku/addBahanbaku")
);
const editBahanbakuPage = lazy(() =>
  import("../pages/protected/bahanbaku/editBahanbaku")
);

const routes = [
  {
    path: "/dashboardCustomer", // the url
    component: DasboardCustomer, // view rendered
  },
  {
    path: "/dashboard",
    component: Dashboard,
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


];

export default routes;
