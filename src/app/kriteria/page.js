"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiOptions } from "@/components/utils/apiConfig";
import KriteriaList from "@/components/kriteria/KriteriaList";

const KriteriaPage = () => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/kriteria`, apiOptions)
      .then((response) => response.json())
      .then((data) => setValue(data.data));
  }, []);
  return (
    <div className="p-5 min-h-screen">
      <div className="flex w-full justify-between h-full items-center">
        <div className="font-bold text-xl">Daftar Kriteria</div>
        <Link href="kriteria/tambah">Tambah Kriteria</Link>
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      <div className="w-full">
        <KriteriaList kriteria={value} />
        {value.length == 0 && (
          <div className="mt-10 text-center font-bold text-xl">
            tidak ada data
          </div>
        )}
      </div>
    </div>
  );
};

export default KriteriaPage;
