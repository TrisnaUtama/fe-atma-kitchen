import React from "react";
import { Link } from "react-router-dom";

const TopSideButtons = () => {
    return (
        <div className="inline-block float-right">
            {/* Menggunakan Link dari React Router untuk navigasi */}
            <a href="/tambahResep" className="btn px-6 btn-sm normal-case btn-primary">Tambah Resep</a>
        </div>
    );
}

export default TopSideButtons;
