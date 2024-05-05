import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import AddBahanBaku from "../../../features/bahanBaku/components/addBahanbakuPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Bahan Baku" }));
  }, []);

  return (
    <>
      <AddBahanBaku />
    </>
  );
}

export default InternalPage;
