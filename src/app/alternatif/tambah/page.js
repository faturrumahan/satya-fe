"use client";
import FormInput from "@/components/alternatif/FormInput";
import React, { useState, useEffect } from "react";
import { apiOptions } from "@/components/utils/apiConfig";

const TambahAlternatif = () => {
  const [kriteria, setKriteria] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [posisi, setPosisi] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/posisi`, apiOptions)
      .then((response) => response.json())
      .then((data) => setPosisi(data.data));
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
  return (
    <div className="p-5 min-h-screen w-full">
      <div className="flex w-full justify-center h-full items-center">
        <div className="font-bold text-xl">Tambah Kandidat</div>
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      <FormInput kriteria={kriteria} jurusan={jurusan} posisi={posisi} />
    </div>
  );
};

export default TambahAlternatif;
