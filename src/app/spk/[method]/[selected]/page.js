"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { apiOptions } from "@/components/utils/apiConfig";
import ResultList from "@/components/spk/ResultList";

const SPKPage = ({ params }) => {
  const [value, setValue] = useState([]);
  const [posisi, setPosisi] = useState([]);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/${params.method}/${params.selected}`,
      apiOptions
    )
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
        <div className="font-bold text-xl">Hasil Seleksi</div>
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      <div className="w-full">
        <div className="flex justify-end w-full mb-5">
          <div className="flex w-full space-x-2">
            <Link
              href={`/spk/${params.method}/all`}
              className="btn p-2 bg-blue-500 text-white rounded-md"
            >
              Semua
            </Link>
            {posisi.map((item) => (
              <Link
                href={`/spk/${params.method}/${item.nama}`}
                className="btn p-2 bg-blue-500 text-white rounded-md"
              >
                {item.nama}
              </Link>
            ))}
          </div>
        </div>
        <ResultList result={value} />
      </div>
    </div>
  );
};

export default SPKPage;
