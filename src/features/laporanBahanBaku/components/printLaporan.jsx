import React from "react";

const Receipt = React.forwardRef(({ transaction }, ref) => {
  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.toLocaleString("id-ID", { month: "long" });
    const day = date.getDate();
    return `${day} ${month} ${year}`;
  }

  const currentDate = new Date(Date.now());
  const formattedDate = formatDate(currentDate);
  return (
    <div ref={ref} className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Atma Kitchen</h2>
      <p className="text-gray-700 mb-2">Jl. Centralpark No. 10 Yogyakarta</p>
      <h3 className="text-xl font-bold mb-4 text-gray-800 underline">
        LAPORAN Stok Bahan Baku
      </h3>

      <p className="text-gray-700 font-semibold">
        <span className="font-semibold">Tanggal Cetak:</span> {formattedDate}
      </p>
      <table className="w-full table-auto mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Nama Bahan</th>
            <th className="border px-4 py-2">Satuan</th>
            <th className="border px-4 py-2">Total Digunakan</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((product, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center font-semibold">
                {product.nama_bahan_baku}
              </td>
              <td className="border px-4 py-2 text-center font-semibold">
                {product.satuan}
              </td>
              <td className="border px-4 py-2 text-center font-semibold">
                {product.total_usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Receipt;
