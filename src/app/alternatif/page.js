"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiOptions } from "@/components/utils/apiConfig";
import PaginateAlternatif from "@/components/alternatif/PaginateAlternatif";

const AlternatifPage = () => {
  const [value, setValue] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [kriteria, setKriteria] = useState([]);
  const [posisi, setPosisi] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/alternatif/alt`, apiOptions)
      .then((response) => response.json())
      .then((data) => setValue(data.data));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/jurusan`, apiOptions)
      .then((response) => response.json())
      .then((data) => setJurusan(data.data));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/kriteria`, apiOptions)
      .then((response) => response.json())
      .then((data) => setKriteria(data.data));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/posisi`, apiOptions)
      .then((response) => response.json())
      .then((data) => setPosisi(data.data));
  }, []);

  return (
    <div className="p-5 min-h-screen">
      {jurusan.length < 1 && (
        <h5 className="font-bold text-xl text-red-500">
          Mohon Tambah Jurusan Terlebih Dahulu
        </h5>
      )}
      {kriteria.length < 1 && (
        <h5 className="font-bold text-xl text-red-500">
          Mohon Tambah Kriteria Terlebih Dahulu
        </h5>
      )}
      {posisi.length < 1 && (
        <h5 className="font-bold text-xl text-red-500">
          Mohon Tambah Posisi Terlebih Dahulu
        </h5>
      )}
      <div className="flex w-full justify-between h-full items-center">
        {jurusan.length > 0 && kriteria.length > 0 && posisi.length > 0 && (
          <>
            <div className="font-bold text-xl">Daftar Kandidat</div>
            <Link href="alternatif/tambah">Tambah Kandidat</Link>
          </>
        )}
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      <div className="w-full">
        <PaginateAlternatif itemsPerPage={50} alternatif={value} />
        {value.length == 0 && (
          <div className="mt-10 text-center font-bold text-xl">
            tidak ada data
          </div>
        )}
      </div>
    </div>
  );
};

export default AlternatifPage;
