import axios from "axios";


export async function getListPesanan(id) {
    try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/bayar/daftarPesanan/${id}`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}


export async function payPesanan(id, files, closeModal) {
    const formData = new FormData();
    console.log(formData);
    Array.from(files).forEach(file => {
        formData.append('bukti_pembayaran', file);
    });

    try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.post(`http://127.0.0.1:8000/api/v1/bayar/buktiBayar/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        

        if (response.data.status) {
            alert("File uploaded successfully!");
            closeModal();
        } else {
            alert("Gagal upload failed!");
        }
    } catch (error) {
        console.error("There was an error uploading the file!", error);
        alert("File upload failed!");
    }
}
