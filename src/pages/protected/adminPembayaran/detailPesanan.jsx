import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import DetailPesanan from "../../../features/adminPembayran/indexPesanan";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Detail Pesanan" }));
  }, []);

  return (
    <>
      <DetailPesanan />
    </>
  );
}

export default InternalPage;
