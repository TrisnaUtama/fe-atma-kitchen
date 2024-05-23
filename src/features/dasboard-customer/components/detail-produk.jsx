import Image from "../../../assets/images/avatar.png";

export default function DetailProduk() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="w-full h-full">
        <img src={Image} alt="" />
      </div>
      <div className=""></div>
    </div>
  );
}
