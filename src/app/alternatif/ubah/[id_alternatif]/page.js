"use client";
import React, { useState, useEffect } from "react";
import { apiOptions } from "@/components/utils/apiConfig";
import FormUpdate from "@/components/alternatif/FormUpdate";

const UpdateAlternatif = ({ params }) => {
  const [alternatif, setAlternatif] = useState([]);
  const [kriteria, setKriteria] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [posisi, setPosisi] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:4000/alternatif/${params.id_alternatif}`,
      apiOptions
    )
      .then((response) => response.json())
      .then((data) => setAlternatif(data.data));
  }, []);

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
  useEffect(() => {
    fetch(
      `http://127.0.0.1:4000/hasil/alternatif/${params.id_alternatif}`,
      apiOptions
    )
      .then((response) => response.json())
      .then((data) => setValue(data.data));
  }, []);

  return (
    <div className="p-5 min-h-screen w-full">
      <div className="flex w-full justify-center h-full items-center">
        <div className="font-bold text-xl">Ubah Kandidat</div>
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      {alternatif.length > 0 &&
        kriteria.length > 0 &&
        jurusan.length > 0 &&
        posisi.length > 0 &&
        value.length > 0 && (
          <FormUpdate
            kriteria={kriteria}
            jurusan={jurusan}
            posisi={posisi}
            alternatif={alternatif}
            value={value}
            id_alternatif={params.id_alternatif}
          />
        )}
    </div>
  );
};

export default UpdateAlternatif;
