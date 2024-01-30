"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormUpdate = ({ posisi, id_posisi }) => {
  const [editPosisi, setEditPosisi] = useState(posisi[0]);
  const { push } = useRouter();

  const posisiSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("id", id_posisi);

    for (const [key, value] of Object.entries(editPosisi)) {
      formData.append(key, value);
    }

    try {
      const res = await fetch(`http://127.0.0.1:4000/posisi/${id_posisi}`, {
        method: "PATCH",
        body: formData,
      });
      const resJson = await res.json();
      if (res.status === 200) {
        alert("Your Update Already Saved");
        push("/posisi");
      } else {
        alert("Some error occured");
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
            Nama Lengkap
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Satya Wahyu"
            value={editPosisi.nama}
            onChange={(e) =>
              setEditPosisi({ ...editPosisi, nama: e.target.value })
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

export default FormUpdate;
