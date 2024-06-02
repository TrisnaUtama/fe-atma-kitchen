import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import LaporanBahanBaku from "../../../features/laporan-bahan-baku/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Report Bahan Baku" }));
  }, []);

  return <LaporanBahanBaku />;
}

export default InternalPage;
