import React, { useState } from "react";

const Receipt = React.forwardRef(({ transaction }, ref) => {
  const total = transaction.reduce((sum, product) => sum + product.subtotal, 0);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.toLocaleString("id-ID", { month: "long" });
    const day = date.getDate();
    return `${day} ${month} ${year}`;
  }

  function formatMonth(date) {
    const month = date.toLocaleString("id-ID", { month: "long" });
    return `${month}`;
  }

  function formatYear(date) {
    const year = date.getFullYear();
    return `${year}`;
  }

  function formatToIDR(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }

  const currentDate = new Date(Date.now());
  const formattedDate = formatDate(currentDate);
  const formattedMonth = formatMonth(currentDate);
  const formattedYear = formatYear(currentDate);
  return (
    <div ref={ref} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Atma Kitchen</h2>
      <p className="text-gray-700 mb-2">Jl. Centralpark No. 10 Yogyakarta</p>
      <h3 className="text-xl font-bold mb-4 text-gray-800 underline">
        LAPORAN PENJUALAN BULANAN
      </h3>
      <p className="text-gray-700 font-semibold">
        <span className="font-semibold">Bulan:</span> {formattedMonth}
      </p>
      <p className="text-gray-700 font-semibold">
        <span className="font-semibold">Tahun:</span> {formattedYear}
      </p>
      <p className="text-gray-700 font-semibold">
        <span className="font-semibold">Tanggal Cetak:</span> {formattedDate}
      </p>
      <table className="w-full table-auto mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Produk</th>
            <th className="border px-4 py-2">Kategori</th>
            <th className="border px-4 py-2">Kuantitas</th>
            <th className="border px-4 py-2">Harga</th>
            <th className="border px-4 py-2">Jumlah Uang</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((product, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center font-semibold">
                {product.name}
              </td>
              <td className="border px-4 py-2 text-center font-semibold">
                {product.type}
              </td>
              <td className="border px-4 py-2 text-center font-semibold">
                {product.quantity}
              </td>
              <td className="border px-4 py-2 text-center font-semibold">
                {formatToIDR(product.price)}
              </td>
              <td className="border px-4 py-2 text-center font-semibold">
                {formatToIDR(product.subtotal)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200">
            <td colSpan="4" className="border px-4 py-2 text-center font-bold">
              Total
            </td>
            <td className="border px-4 py-2 text-center font-semibold">
              {formatToIDR(total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

export default Receipt;
