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
];

export default routes;
