import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import axios from "axios";

const iconClasses = `h-6 w-6`;
const userType = localStorage.getItem("userType");
let routes = [];

if (userType === "admin") {
  routes = [
    {
      path: "dashboard",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Dashboard Admin",
    },
    {
      path: "produk",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Produk",
    },
    {
      path: "resep",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Resep",
    },
    {
      path: "hampers",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Hampers",
    },
    {
      path: "bahanbaku",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Bahan Baku",
    },
  ];
} else if (userType === "mo") {
  routes = [
    {
      path: "dashboard",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Dashboard Mo",
    },
    {
      path: "pembelianBahanBaku",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Pembelian Bahan Baku",
    },
    {
      path: "penitip",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Penitip",
    },
    {
      path: "pengeluaran",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Pengeluaran",
    },
    {
      path: "karyawan",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Karyawan",
    },
  ];
} else if (userType === "owner") {
  routes = [
    {
      path: "dashboard",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Dashboard Owner",
    },
    {
      path: "Gaji",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Gaji & Bonus",
    },
  ];
} else {
  routes = [
    {
      path: "dashboard",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Dashboard User",
    },
  ];
}

export default routes;
