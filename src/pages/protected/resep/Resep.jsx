import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import Resep from "../../../features/resep/resep";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Resep" }));
  }, []);

  return <Resep />;
}

export default InternalPage;
