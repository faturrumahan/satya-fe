"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { apiOptions } from "@/components/utils/apiConfig";

const Navbar = () => {
  const [alt, setAlt] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/alternatif`, apiOptions)
      .then((response) => response.json())
      .then((data) => setAlt(data.data));
  }, []);

  return (
    <div className="h-16 bg-green-500 w-full text-white">
      <div className="container mx-auto flex h-full items-center justify-between">
        <div className="font-extrabold text-2xl">SPK</div>
        <div className="flex w-1/3 justify-between">
          <Link href="/">home</Link>
          <Link href="/alternatif">alternatif</Link>
          <Link href="/jurusan">jurusan</Link>
          <Link href="/posisi">posisi</Link>
          <Link href="/kriteria">kriteria</Link>
          <Link
            href="/spk/mod/all"
            className={alt.length == 0 ? "pointer-events-none" : ""}
          >
            MOD-SAW
          </Link>
          <Link
            href="/spk/saw/all"
            className={alt.length == 0 ? "pointer-events-none" : ""}
          >
            SAW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
