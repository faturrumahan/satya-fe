"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiOptions } from "@/components/utils/apiConfig";
import PosisiList from "@/components/posisi/PosisiList";

const PosisiPage = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/posisi`, apiOptions)
      .then((response) => response.json())
      .then((data) => setValue(data.data));
  }, []);
  return (
    <div className="p-5 min-h-screen">
      <div className="flex w-full justify-between h-full items-center">
        <div className="font-bold text-xl">Daftar Posisi</div>
        <Link href="posisi/tambah">Tambah Posisi</Link>
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      <div className="w-full">
        <PosisiList posisi={value} />
        {value.length == 0 && (
          <div className="mt-10 text-center font-bold text-xl">
            tidak ada data
          </div>
        )}
      </div>
    </div>
  );
};

export default PosisiPage;
