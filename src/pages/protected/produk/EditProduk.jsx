import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditPage from "../../../features/produk/components/editProductPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Produk" }));
  }, []);

  return (
    <>
      <EditPage />
    </>
  );
}

export default InternalPage;
