import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../features/common/headerSlice";
import EditHampers from "../../../features/hampers/components/editHampersPage";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Hampers" }));
  }, []);

  return (
    <>
      <EditHampers />
    </>
  );
}

export default InternalPage;
