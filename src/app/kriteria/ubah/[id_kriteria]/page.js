"use client";
import React, { useState, useEffect } from "react";
import { apiOptions } from "@/components/utils/apiConfig";
import FormUpdate from "@/components/kriteria/FormUpdate";

const UbahKriteriaPage = ({ params }) => {
  const [kriteria, setKriteria] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:4000/kriteria/${params.id_kriteria}`, apiOptions)
      .then((response) => response.json())
      .then((data) => setKriteria(data.data));
  }, []);
  return (
    <div className="p-5 min-h-screen w-full">
      <div className="flex w-full justify-center h-full items-center">
        <div className="font-bold text-xl">Ubah Kriteria</div>
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      {kriteria.length > 0 && (
        <FormUpdate kriteria={kriteria} id_kriteria={params.id_kriteria} />
      )}
    </div>
  );
};

export default UbahKriteriaPage;
