import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import BahanBakuUsage from "../../../features/bahan-baku-usage/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Pemakaian Bahan Baku" }));
  }, []);

  return <BahanBakuUsage />;
}

export default InternalPage;
