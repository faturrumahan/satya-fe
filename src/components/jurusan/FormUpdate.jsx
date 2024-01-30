"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const FormUpdate = ({ posisi, value, id_jurusan }) => {
  const [editJurusan, setEditJurusan] = useState(value[0]);
  const { push } = useRouter();

  const jurusanSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("id", id_jurusan);

    for (const [key, value] of Object.entries(editJurusan)) {
      formData.append(key, value);
    }

    try {
      const res = await fetch(`http://127.0.0.1:4000/jurusan/${id_jurusan}`, {
        method: "PATCH",
        body: formData,
      });
      const resJson = await res.json();
      if (res.status === 200) {
        alert("Your Update Already Saved");
        push("/jurusan");
      } else {
        alert("Some error occured");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <form className="w-2/3" onSubmit={jurusanSubmitHandler}>
        <div className="mb-5 w-full">
          <label for="nama" className="block mb-2 text-sm font-medium">
            Nama Jurusan
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={editJurusan.nama_jurusan}
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="teknik"
            onChange={(e) =>
              setEditJurusan({ ...editJurusan, nama_jurusan: e.target.value })
            }
            required
          />
        </div>
        <div className="flex w-full flex-wrap justify-between">
          {posisi.map((item) => (
            <div key={item.id + item.nama} className="mb-5 w-full">
              <label
                htmlFor={item.nama}
                className="block mb-2 text-sm font-medium"
              >
                {item.nama}
              </label>
              <input
                type="number"
                step="1"
                min="1"
                max="5"
                id={item.nama}
                className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name={item.nama}
                value={editJurusan[item.nama]}
                onChange={(e) =>
                  setEditJurusan({
                    ...editJurusan,
                    [item.nama]: e.target.value,
                  })
                }
                required
              />
            </div>
          ))}
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
