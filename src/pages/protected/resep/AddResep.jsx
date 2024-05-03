import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import AddResep from "../../../features/resep/components/tambahResep";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Resep" }));
  }, []);

  return <AddResep />;
}

export default InternalPage;
