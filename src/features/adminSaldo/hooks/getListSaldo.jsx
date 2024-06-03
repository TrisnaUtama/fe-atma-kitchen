import axios from "axios";

export async function getListSaldo(){
    try{
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/saldoAdmin/listSaldo`,{
            method: "GET",
        });
        const data = await response.data;
    
        console.group(data);
        return data;
    }catch(error){
        return error;
    }
}