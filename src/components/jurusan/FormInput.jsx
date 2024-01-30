"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormInput = ({ posisi }) => {
  const [newJurusan, setNewJurusan] = useState({});
  const { push } = useRouter();

  const jurusanSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    for (const [key, value] of Object.entries(newJurusan)) {
      formData.append(key, value);
    }

    try {
      const res = await fetch("http://127.0.0.1:4000/jurusan", {
        method: "POST",
        body: formData,
      });
      const resJson = await res.json();
      if (res.status === 200) {
        alert("Your Input Already Saved");
        push("/jurusan");
      } else {
        alert("Some error");
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
            value={newJurusan.nama}
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="teknik"
            onChange={(e) =>
              setNewJurusan({ ...newJurusan, nama: e.target.value })
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
                onChange={(e) =>
                  setNewJurusan({
                    ...newJurusan,
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

export default FormInput;
