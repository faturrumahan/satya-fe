"use client";
import React, { useState, useEffect } from "react";
import { apiOptions } from "@/components/utils/apiConfig";
import FormUpdate from "@/components/jurusan/FormUpdate";

const UbahJurusanPage = ({ params }) => {
  const [posisi, setPosisi] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/posisi`, apiOptions)
      .then((response) => response.json())
      .then((data) => setPosisi(data.data));
  }, []);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:4000/hasil/jurusan/${params.id_jurusan}`,
      apiOptions
    )
      .then((response) => response.json())
      .then((data) => setValue(data.data));
  }, []);

  return (
    <div className="p-5 min-h-screen w-full">
      <div className="flex w-full justify-center h-full items-center">
        <div className="font-bold text-xl">Ubah Jurusan</div>
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      {posisi.length > 0 && value.length > 0 && (
        <FormUpdate
          posisi={posisi}
          value={value}
          id_jurusan={params.id_jurusan}
        />
      )}
    </div>
  );
};

export default UbahJurusanPage;
