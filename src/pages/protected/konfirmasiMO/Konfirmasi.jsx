import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import KonfirmasiPesanan from "../../../features/konfirmasiMO/component/listKonfirmasiPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Konfirmasi Pesanan" }));
  }, []);

  return (
    <>
      <KonfirmasiPesanan />
    </>
  );
}

export default InternalPage;
