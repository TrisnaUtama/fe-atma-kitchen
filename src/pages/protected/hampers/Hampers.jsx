import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import Hampers from "../../../features/hampers/index";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Hampers" }));
  }, []);

  return (
    <>
      <Hampers />
    </>
  );
}

export default InternalPage;
