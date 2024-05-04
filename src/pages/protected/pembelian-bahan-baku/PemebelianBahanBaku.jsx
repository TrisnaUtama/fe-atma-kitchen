import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import PembelianBahanBaku from "../../../features/pembelian-bahan-baku/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Hampers" }));
  }, []);

  return (
    <>
      <PembelianBahanBaku />
    </>
  );
}

export default InternalPage;
