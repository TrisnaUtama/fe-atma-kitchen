import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import Penerimaan from "../../../features/dasboard-customer/components/Penerimaan";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "List Penerimaan" }));
  }, []);

  return (
    <>
      <Penerimaan />
    </>
  );
}

export default InternalPage;
