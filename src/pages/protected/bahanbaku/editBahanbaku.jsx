import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditBahanBakuPage from "../../../features/bahanBaku/components/editBahanbakuPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Edit Bahan Baku" }));
  }, []);

  return (
    <>
      <EditBahanBakuPage />
    </>
  );
}

export default InternalPage;