import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import Bahanbaku from "../../../features/bahanBaku/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bahan Baku" }));
  }, []);

  return (
    <>
      <Bahanbaku />
    </>
  );
}

export default InternalPage;
