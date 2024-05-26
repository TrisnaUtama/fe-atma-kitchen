import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import Pemesanan from "../../../features/dasboard-customer/components/Pemesanan";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "List Pemesanan" }));
  }, []);

  return (
    <>
      <Pemesanan />
    </>
  );
}

export default InternalPage;
