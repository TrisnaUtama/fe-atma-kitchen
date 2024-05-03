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
//bahanbaku
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
const PenitipPage = lazy(() =>
  import("../pages/protected/penitip/Penitip")
);
const addPenitipPage = lazy(() =>
  import("../pages/protected/penitip/addPenitip")
);
const editPenitipPage = lazy(() =>
  import("../pages/protected/penitip/editPenitip")
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

  //bahanbaku
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

  //penitip
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

];

export default routes;
