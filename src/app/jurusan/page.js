"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiOptions } from "@/components/utils/apiConfig";
import JurusanList from "@/components/jurusan/JurusanList";

const JurusanPage = () => {
  const [value, setValue] = useState([]);
  const [posisi, setPosisi] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/jurusan`, apiOptions)
      .then((response) => response.json())
      .then((data) => setValue(data.data));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/posisi`, apiOptions)
      .then((response) => response.json())
      .then((data) => setPosisi(data.data));
  }, []);

  return (
    <div className="p-5 min-h-screen">
      <div className="flex w-full justify-between h-full items-center">
        {posisi.length < 1 ? (
          <h5 className="font-bold text-xl text-red-500">
            Mohon Tambah Posisi Terlebih Dahulu
          </h5>
        ) : (
          <>
            <div className="font-bold text-xl">Daftar Jurusan</div>
            <Link href="jurusan/tambah">Tambah Jurusan</Link>
          </>
        )}
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      <div className="w-full">
        <JurusanList jurusan={value} />
        {value.length == 0 && (
          <div className="mt-10 text-center font-bold text-xl">
            tidak ada data
          </div>
        )}
      </div>
    </div>
  );
};

export default JurusanPage;
