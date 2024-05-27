import React from "react";

const Receipt = React.forwardRef(({ transaction }, ref) => {
  return (
    <div ref={ref} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Receipt</h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-gray-700">
          <span className="font-semibold">Nomer Nota:</span>{" "}
          {transaction.no_nota}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Tanggal Pemesanan:</span>{" "}
          {transaction.tanggal_pemesanan}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Tanggal Dibayar:</span>{" "}
          {transaction.tanggal_pembayaran}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Tanggal Diambil:</span>{" "}
          {transaction.tanggal_diambil}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Jarak Delivery:</span>{" "}
          {transaction.jarak_delivery || 0}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Poin Pesanan:</span>{" "}
          {transaction.poin_pesanan}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Potongan Poin:</span>{" "}
          {transaction.potongan_poin || 0}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Status Pesanan:</span>{" "}
          {transaction.status_pesanan}
        </p>
      </div>
    </div>
  );
});

export default Receipt;