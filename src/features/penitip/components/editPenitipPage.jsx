import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import useHandlerEditPenitip from "../hooks/editPenitip";
import { useParams } from "react-router-dom";
import getPenitip from "../hooks/Penitip";


const INITIAL_LEAD_OBJ = {
    nama: "",
    no_telpn: "",
    email: "",
    profit: "",
};

function EditPenitipPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
    const { handlerEditPenitip } = useHandlerEditPenitip(id);



    const editPenitip = async (e) => {
        e.preventDefault();
        if (leadObj.nama.trim() === "")
            return setErrorMessage("nama penitip tidak boleh kosong!");
        else if (leadObj.no_telpn.trim() === "")
            return setErrorMessage("no telepon tidak boleh kosong!");
        else if (leadObj.email.trim() === "")
            return setErrorMessage("email tidak boleh kosong!");
        else if (leadObj.profit === "")
            return setErrorMessage("profit tidak boleh kosong!");

        let newLeadObj = {
            nama: leadObj.nama,
            no_telpn: leadObj.no_telpn,
            email: leadObj.email,
            profit: leadObj.profit,
        };
        await handlerEditPenitip(newLeadObj);
        dispatch(showNotification({ message: "New Penitip Updated!", status: 1 }));
    };

    useEffect(() => {
        async function fetchDataPenitip() {
            try {
                const dataPenitip = await getPenitip(id);
                setLeadObj(dataPenitip.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataPenitip();
    }, []);



    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLeadObj({ ...leadObj, [updateType]: value });

    };


    return (
        <form onSubmit={editPenitip}>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <InputText
                        type="text"
                        defaultValue={leadObj.nama}
                        updateType="nama"
                        containerStyle="mt-4"
                        labelTitle="Nama Penitip"
                        placeholder={leadObj.nama}
                        updateFormValue={updateFormValue}
                    />
                </div>
                <div>
                    <InputText
                        type="number"
                        defaultValue={leadObj.no_telpn}
                        updateType="no_telpn"
                        containerStyle="mt-4"
                        labelTitle="No Telepon"
                        placeholder={leadObj.no_telpn}
                        updateFormValue={updateFormValue}
                    />
                </div>

            </div>



            <div className="grid grid-cols-3 gap-8">
                <InputText
                    type="text"
                    defaultValue={leadObj.email}
                    updateType="email"
                    containerStyle="mt-4"
                    labelTitle="Email"
                    placeholder={leadObj.email}
                    updateFormValue={updateFormValue}
                />

                <InputText
                    type="number"
                    defaultValue={leadObj.profit}
                    updateType="profit"
                    containerStyle="mt-4"
                    labelTitle="Profit"
                    placeholder={leadObj.profit}
                    updateFormValue={updateFormValue}
                />
            </div>
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <a className="btn btn-ghost" href="/penitip">
                    Cancel
                </a>
                <button className="btn btn-primary px-6">Save</button>
            </div>

        </form>
    );
}

export default EditPenitipPage;
