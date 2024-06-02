import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import PemesananDiterima from "../../../features/pemesanan-status(MO)/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Pemesanan Diterima Hari Ini" }));
  }, []);

  return <PemesananDiterima />;
}

export default InternalPage;
