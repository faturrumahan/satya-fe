"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FormInput = () => {
  const [newPosisi, setNewPosisi] = useState({});
  const { push } = useRouter();

  const posisiSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    for (const [key, value] of Object.entries(newPosisi)) {
      formData.append(key, value);
    }

    try {
      const res = await fetch("http://127.0.0.1:4000/posisi", {
        method: "POST",
        body: formData,
      });
      const resJson = await res.json();
      if (res.status === 200) {
        alert("Your Input Already Saved");
        push("/posisi");
      } else {
        alert("Some error");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <form className="w-2/3" onSubmit={posisiSubmitHandler}>
        <div className="mb-5 w-full">
          <label for="nama" className="block mb-2 text-sm font-medium">
            Nama Posisi
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={newPosisi.nama}
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="staff"
            onChange={(e) =>
              setNewPosisi({ ...newPosisi, nama: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 w-full py-3 text-white font-semibold text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormInput;
