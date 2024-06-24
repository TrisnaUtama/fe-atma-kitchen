import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import DetailPembayaran from "../../../features/adminPembayran/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Detail Pembayaran" }));
  }, []);

  return (
    <>
      <DetailPembayaran />
    </>
  );
}

export default InternalPage;
