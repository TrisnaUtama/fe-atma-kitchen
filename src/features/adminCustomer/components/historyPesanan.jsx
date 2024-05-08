import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import { useDispatch } from "react-redux";
import { getDataCustomer } from "../data_customer/dataCustomer";
import { useParams } from "react-router-dom";

function HistoryPesanan() {

  const [historyCustomer, setHistoryCustomer] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataCustomer(id);
        console.log(data);
        setHistoryCustomer(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <TitleCard title="List History Pesanan" topMargin="mt-2">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Nama Produk</th>
                <th className="text-center">Harga</th>
                <th className="text-center">Jumlah</th>
                <th className="text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {historyCustomer.map((historyItem, historyIndex) => (
                historyItem.detail_pemesanan.map((detailItem, detailIndex) => (
                  <tr key={`${historyIndex}-${detailIndex}`}>
                    <td className="text-center">{detailItem.produk.nama_produk}</td>
                    <td className="text-center">{detailItem.produk.harga}</td>
                    <td className="text-center">{detailItem.jumlah}</td>
                    <td className="text-center">{detailItem.subtotal}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
          <div className="modal-action">
            <a className="btn btn-primary px-6" href="/customer" >Kembali</a>
          </div>
        </div>
      </TitleCard>

    </>
  );
}

export default HistoryPesanan;
