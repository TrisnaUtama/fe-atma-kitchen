import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import LaporanProduk from "../../../features/laporan-produk-bulanan/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Report Produk Bulanan" }));
  }, []);

  return <LaporanProduk />;
}

export default InternalPage;
