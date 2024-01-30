"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Select from "react-select";

const FormInput = ({ kriteria, jurusan, posisi }) => {
  const [newAlternatif, setNewAlternatif] = useState({});
  const { push } = useRouter();
  let posisiOpt = [];

  posisi.map((item) => {
    posisiOpt.push({ label: item.nama, value: item.nama });
    return 0;
  });

  const alternatifSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let listPosisi;
    // console.log(newAlternatif.posisi);

    for (const [key, value] of Object.entries(newAlternatif)) {
      if (key === "posisi") {
        for (let i = 0; i < newAlternatif.posisi.length; i++) {
          if (!listPosisi) {
            listPosisi = newAlternatif.posisi[i].value;
          } else {
            listPosisi += "," + newAlternatif.posisi[i].value;
          }
        }
        formData.append("posisi", listPosisi);
      } else {
        formData.append(key, value);
      }
    }
    try {
      const res = await fetch("http://127.0.0.1:4000/alternatif", {
        method: "POST",
        body: formData,
      });
      const resJson = await res.json();
      if (res.status === 200) {
        alert("Your Input Already Saved");
        push("/alternatif");
      } else {
        alert("Some error");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <form className="w-2/3" onSubmit={alternatifSubmitHandler}>
        <div className="mb-5 w-full">
          <label for="nama" className="block mb-2 text-sm font-medium">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={newAlternatif.nama}
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Satya Wahyu"
            onChange={(e) =>
              setNewAlternatif({ ...newAlternatif, nama: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-5 w-full">
          <label for="jurusan" className="block mb-2 text-sm font-medium">
            Jurusan
          </label>
          <select
            id="jurusan"
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            name="id_jurusan"
            onChange={(e) =>
              setNewAlternatif({ ...newAlternatif, id_jurusan: e.target.value })
            }
            required
          >
            <option disabled selected value="" hidden>
              Pilih Jurusan
            </option>
            {jurusan.map((item) => (
              <option key={item.id + item.nama} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5 w-full">
          <label for="posisi" className="block mb-2 text-sm font-medium">
            Posisi
          </label>
          <Select
            id="posisi"
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            name="posisi"
            options={posisiOpt}
            value={newAlternatif["posisi"]}
            onChange={(e) => setNewAlternatif({ ...newAlternatif, posisi: e })}
            isMulti
            required
          />
        </div>
        <div className="flex w-full flex-wrap justify-between">
          {kriteria.map((item) => (
            <div key={item.id + item.nama} className="mb-5 w-full">
              <label for={item.nama} className="block mb-2 text-sm font-medium">
                {item.nama}
              </label>
              {item.nama == "ipk" ? (
                <input
                  type="number"
                  min="0"
                  max="4"
                  step="0.01"
                  id={item.nama}
                  className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name={item.nama}
                  onChange={(e) =>
                    setNewAlternatif({
                      ...newAlternatif,
                      [item.nama]: e.target.value,
                    })
                  }
                  required
                />
              ) : (
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  id={item.nama}
                  className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name={item.nama}
                  onChange={(e) =>
                    setNewAlternatif({
                      ...newAlternatif,
                      [item.nama]: e.target.value,
                    })
                  }
                  required
                />
              )}
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
