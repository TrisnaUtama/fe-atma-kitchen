import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../common/modalSlice";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { toast } from "react-toastify";

const JarakModal = ({ isOpen, onClose, onSave, initialData, paymentError }) => {
  const [jarak, setJarak] = useState(initialData?.uang_customer || "");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    if (updateType === "uang_customer") {
      setJarak(value);
    }
  };

  useEffect(() => {
    setJarak(initialData?.uang_customer || "");
  }, [initialData]);

  const handleSave = async () => {
    if (!jarak || jarak <= 0) {
      setErrorMessage(
        "Pembayaran delivery harus sesuai dengan bukti pembayaran customer."
      );
      return;
    }

    const subtotal = initialData.detail_pemesanan.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

    if (jarak < subtotal) {
      setErrorMessage(
        "Pembayaran harus setidaknya sama dengan subtotal pesanan."
      );
      return;
    }

    try {
      await onSave(jarak);

      toast.success("Pembayaran added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      dispatch(closeModal());
    } catch (error) {
      setErrorMessage(`Failed to save: ${error.message}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div>
        <InputText
          type="number"
          value={jarak}
          updateType="uang_customer"
          containerStyle="mt-4"
          labelTitle="Masukan Uang Customer"
          placeholder="Masukan Uang Customer"
          updateFormValue={updateFormValue}
          onChange={(e) => setJarak(e.target.value)}
        />

        <button className="btn btn-success mt-2" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-error mt-2 ms-2" onClick={onClose}>
          Cancel
        </button>
        <ErrorText styleClass="mt-16">{errorMessage || paymentError}</ErrorText>
      </div>
    </div>
  );
};

export default JarakModal;
