import React from "react";

const LaporanProduk = React.forwardRef(({ transaction }, ref) => {
  // Check if transaction object exists and has totalPerMonth property
  if (!transaction || !transaction.totalPerMonth) {
    // Handle case where transaction or totalPerMonth is missing
    return null; // or render an error message
  }

  // Convert object keys to an array of months
  const months = Object.keys(transaction.totalPerMonth).map((key) => {
    // Subtract 1 from the key to get the index of the month name in the monthNames array
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Ensure the key is converted to an integer
    const monthIndex = parseInt(key) - 1;
    // Return the corresponding month name
    return monthNames[monthIndex];
  });

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
            <th className="border px-4 py-2">Bulan</th>
            <th className="border px-4 py-2">Jumlah Transaksi</th>
            <th className="border px-4 py-2">Jumlah Uang</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month) => (
            <tr key={month}>
              <td className="border px-4 py-2 text-center font-semibold">
                {month}
              </td>
              {/* Access totalTransactions and totalAmount for the current month */}
              <td className="border px-4 py-2 text-center font-semibold">
                {transaction.totalPerMonth[parseInt(months.indexOf(month)) + 1]
                  ?.totalTransactions || 0}
              </td>
              <td className="border px-4 py-2 text-center font-semibold">
                {transaction.totalPerMonth[parseInt(months.indexOf(month)) + 1]
                  ?.totalAmount || 0}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Total</th>
            <th colSpan={2} className="border px-4 py-2 text-center font-semibold">
              {transaction.totalAmountAllMonths}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

export default LaporanProduk;
