import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import AddPembelian from "../../../features/pembelian-bahan-baku/components/addPemebelianPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Pembelian" }));
  }, []);

  return (
    <>
      <AddPembelian />
    </>
  );
}

export default InternalPage;
