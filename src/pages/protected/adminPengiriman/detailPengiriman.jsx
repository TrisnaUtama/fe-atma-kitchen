import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import DetailPengiriman from "../../../features/adminPengiriman/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Detail Pengiriman" }));
  }, []);

  return (
    <>
      <DetailPengiriman />
    </>
  );
}

export default InternalPage;
