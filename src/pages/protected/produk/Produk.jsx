import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import Produk from "../../../features/produk/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Produk" }));
  }, []);

  return (
    <>
      <Produk />
    </>
  );
}

export default InternalPage;
