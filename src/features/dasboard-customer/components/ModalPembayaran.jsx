import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const BuktiPembayaran = React.forwardRef(({ data, onClose }, ref) => {
  const componentRef = useRef();

  const handlePrint = ReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Bukti Pembayaran",
    onAfterPrint: () => {
      alert("Print successful!");
      onClose();
    },
  });

  const {
    no_nota,
    tanggal_pemesanan,
    tanggal_pembayaran,
    tanggal_diambil,
    jarak_delivery,
    poin_pesanan,
    potongan_poin,
    status_pesanan,
    detail_pemesanan,
    total_amount,
  } = data;

  return (
    <div ref={ref} className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bukti Pembayaran</h1>
      <div className="border p-4 mb-4">
        <p>Nomer Nota: {no_nota}</p>
        <p>Tanggal Pemesanan: {tanggal_pemesanan}</p>
        <p>Tanggal Pembayaran: {tanggal_pembayaran}</p>
        <p>Tanggal Diambil: {tanggal_diambil}</p>
        <p>Jarak Delivery: {jarak_delivery || 0}</p>
        <p>Poin Pesanan: {poin_pesanan}</p>
        <p>Potongan Poin: {potongan_poin || 0}</p>
        <p>Status Pesanan: {status_pesanan}</p>
        <p>Total Amount: {total_amount}</p>
      </div>
      <h2 className="text-xl font-bold mb-2">Detail Pemesanan</h2>
      <div className="border p-4">
        {detail_pemesanan.map((detail, index) => (
          <div key={index} className="mb-2">
            <p>ID Produk: {detail.id_produk}</p>
            <p>Subtotal: {detail.subtotal}</p>
            <p>Jumlah: {detail.jumlah}</p>
            <p>Status: {detail.status}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
});

export default BuktiPembayaran;
