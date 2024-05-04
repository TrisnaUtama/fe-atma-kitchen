import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";
import  deleteProduk  from "../../produk/hooks/deleteProduct";
import { showNotification } from "../headerSlice";
import deletePengeluaran from "../../pengeluaranLain/hooks/deletePengeluaran";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, _id, index } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.PRODUK_DELETE) {
      dispatch(showNotification({ message: "Produk Deleted!", status: 1 }));
      deleteProduk(index);
    }else if(type === CONFIRMATION_MODAL_CLOSE_TYPES.PENGELUARAN_DELETE){
      dispatch(showNotification({ message: "Pengeluaran Deleted!", status: 1 }));
      deletePengeluaran(index);
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}>
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
