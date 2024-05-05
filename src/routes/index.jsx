// All components mapping with path for internal routes
import { lazy } from "react";
import axios from "axios";

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


const AddHampers = lazy(() => import("../pages/protected/hampers/AddHampers"));
const EditHampers = lazy(() =>
  import("../pages/protected/hampers/EditHampers")
                         
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

let routes = [];
const token = localStorage.getItem("token");

const fetchData = async () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${ token }`;
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/user");
    const userLogin = response.data;
    if (userLogin.id_saldo != null) {
      userLogin.id_role = false;
    } else {
      userLogin.id_saldo = false;
    }

    if (userLogin.id_role !== false) {
      if (userLogin.id_role === 2) {
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
        ];
      } else if (userLogin.id_role === 3) {
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
          ];
      }

    } else {
      routes = [
        {
          path: "/dashboardCustomer",

          component: DasboardCustomer,

        },
      ];
    }
    return routes;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};




export default fetchData;

