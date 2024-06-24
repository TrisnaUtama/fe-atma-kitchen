import React, { useEffect, useState } from "react";
import { PrinterIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import LaporanProduk from "./LaporanProduk";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const token = localStorage.getItem("token");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Amount",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  });
  const [dataChart, setDataChart] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/detailPemesanan/getLaporanProdukBulanan"
        );
        const data = response.data;

        const labels = Object.keys(data.totalPerMonth).map((month) => {
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
          const monthIndex = parseInt(month) - 1;
          return monthNames[monthIndex];
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Amount",
              data: Object.values(data.totalPerMonth).map(
                (monthData) => monthData.totalAmount
              ),
              backgroundColor: "rgba(255, 99, 132, 1)",
            },
          ],
        });
        setDataChart(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const handlePrint = () => {
    const printContents = document.getElementById("chart-to-print").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };
  console.log(dataChart);

  return (
    <>
      <TitleCard title={"Laporan penjualan bulanan keseluruhan"}>
        <Bar options={options} data={chartData} />
        <button onClick={handlePrint}>
          <PrinterIcon /> Print
        </button>{" "}
      </TitleCard>
      <div style={{ display: "none" }}>
        <div id="chart-to-print">
          <LaporanProduk transaction={dataChart} />
        </div>
      </div>
    </>
  );
}

export default BarChart;
