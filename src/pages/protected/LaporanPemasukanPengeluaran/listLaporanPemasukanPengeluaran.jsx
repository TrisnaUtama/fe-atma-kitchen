import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import DetailLaporanPemasukanPengeluaran from "../../../features/LaporanPemasukanPengeluaran/component/PemasukanPengeluaran";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Data Pemasukan Pengeluaran" }));
  }, []);

  return (
    <>
      <DetailLaporanPemasukanPengeluaran />
    </>
  );
}

export default InternalPage;
