import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import axios from "axios";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

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

    {
      path: "customer",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Data Customer",
    },
    {
      path: "",
      icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
      name: "Pembayaran",
      submenu: [
        {
          path: "Pengiriman",
          icon: <Squares2X2Icon className={iconClasses} />,
          name: "Input Pengiriman",
        },
        {
          path: "getPembayaran",
          icon: <Squares2X2Icon className={submenuIconClasses} />,
          name: "Input Pembayaran",
        },
        {
          path: "updateStatusPesanan",
          icon: <Squares2X2Icon className={submenuIconClasses} />,
          name: "Update Status Pembayaran",
        },
        {
          path: "showTelatBayar",
          icon: <Squares2X2Icon className={submenuIconClasses} />,
          name: "Show Telat Bayar",
        },
      ],
    },
    {
      path: "konfirmasiSaldo",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Konfirmasi Saldo",
    },
    ,
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
    {
      path: "listPenitip",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Penitip",
    },
    {
      path: "pemasukanPengeluaran",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Pemasukan Pengeluaran",
    },
    {
      path: "laporanPresensi",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Presensi",
    },
    {
      path: "konfrimasiPesanan",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Konfirmasi Pesanan",
    },
    {
      path: "pemrosesan-pesanan",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Pemrosesan Pesanan",
    },
    {
      path: "pemakaian-bahan-baku",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Pemakaian Bahan Baku",
    },
    {
      path: "laporan-produk-bulanan",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Produk Bulanan",
    },
    {
      path: "laporan-bahan-baku",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Bahan Baku",
    },
    {
      path: "laporanBahanBaku",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Bahan Baku Periode",
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
    {
      path: "listPenitip",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Penitip",
    },
    {
      path: "pemasukanPengeluaran",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Pemasukan Pengeluaran",
    },
    {
      path: "laporanPresensi",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Presensi",
    },
    {
      path: "laporanBahanBaku",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Bahan Baku Periode",
    },
    {
      path: "laporan-produk-bulanan",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Produk Bulanan",
    },
    {
      path: "laporan-bahan-baku",
      icon: <Squares2X2Icon className={iconClasses} />,
      name: "Laporan Bahan Baku",
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
