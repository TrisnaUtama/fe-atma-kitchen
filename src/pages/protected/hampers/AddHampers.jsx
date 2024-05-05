import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import AddHampers from "../../../features/hampers/components/addHampersPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Hampers" }));
  }, []);

  return (
    <>
      <AddHampers />
    </>
  );
}

export default InternalPage;
