import FormInput from "@/components/posisi/FormInput";
import React from "react";

const TambahPosisiPage = () => {
  return (
    <div className="p-5 min-h-screen w-full">
      <div className="flex w-full justify-center h-full items-center">
        <div className="font-bold text-xl">Tambah Posisi</div>
      </div>
      <hr className="w-full h-px bg-green-600 my-5 border-0"></hr>
      <FormInput />
    </div>
  );
};

export default TambahPosisiPage;
