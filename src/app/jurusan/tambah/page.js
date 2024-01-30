"use client";
import FormInput from "@/components/jurusan/FormInput";
import React, { useState, useEffect } from "react";
import { apiOptions } from "@/components/utils/apiConfig";

const TambahJurusanPage = () => {
  const [posisi, setPosisi] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/posisi`, apiOptions)
      .then((response) => response.json())
      .then((data) => setPosisi(data.data));
  }, []);

  return (
    <div className="p-5 min-h-screen w-full">
      <div className="flex w-full justify-center h-full items-center">
        <div className="font-bold text-xl">Tambah Jurusan</div>
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      <FormInput posisi={posisi} />
    </div>
  );
};

export default TambahJurusanPage;
