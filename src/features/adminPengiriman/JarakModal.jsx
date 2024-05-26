import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../common/modalSlice";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { toast } from "react-toastify";

const JarakModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [jarak, setJarak] = useState(initialData?.jarak_delivery || "");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    if (updateType === "jarak_delivery") {
      setJarak(value);
    }
  };

  useEffect(() => {
    setJarak(initialData?.jarak_delivery || "");
  }, [initialData]);

  const handleSave = async () => {
    if (!jarak || parseFloat(jarak) <= 0) {
      setErrorMessage("jarak delivery harus lebih dari 0.");
      return;
    }

    try {
      await onSave(jarak);

      toast.success("Jarak delivery added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
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
          updateType="jarak_delivery"
          containerStyle="mt-4"
          labelTitle="Input Jarak Delivery"
          placeholder="Masukan Jarak Delivery"
          updateFormValue={updateFormValue}
          onChange={(e) => setJarak(e.target.value)}
        />

        <button className="btn btn-success mt-2" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-error mt-2 ms-2" onClick={onClose}>
          Cancel
        </button>
        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      </div>
    </div>
  );
};

export default JarakModal;
