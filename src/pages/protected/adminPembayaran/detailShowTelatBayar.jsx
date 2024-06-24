import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import DetailShowTelatBayar from "../../../features/adminPembayran/indexShowTelatBayar";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Detail Show Telat Bayar" }));
  }, []);

  return (
    <>
      <DetailShowTelatBayar />
    </>
  );
}

export default InternalPage;
