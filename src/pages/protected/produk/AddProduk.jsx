import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import AddProduk from "../../../features/produk/components/addProdukPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Produk" }));
  }, []);

  return (
    <>
      <AddProduk />
    </>
  );
}

export default InternalPage;
