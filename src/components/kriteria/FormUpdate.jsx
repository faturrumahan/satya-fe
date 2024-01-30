"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormUpdate = ({ kriteria, id_kriteria }) => {
  const [editKriteria, setEditKriteria] = useState(kriteria[0]);
  const { push } = useRouter();

  const kriteriaSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("id", id_kriteria);

    for (const [key, value] of Object.entries(editKriteria)) {
      formData.append(key, value);
    }

    try {
      const res = await fetch(`http://127.0.0.1:4000/kriteria/${id_kriteria}`, {
        method: "PATCH",
        body: formData,
      });
      const resJson = await res.json();
      if (res.status === 200) {
        alert("Your Update Already Saved");
        push("/kriteria");
      } else {
        alert("Some error occured");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <form className="w-2/3" onSubmit={kriteriaSubmitHandler}>
        <div className="mb-5 w-full">
          <label for="nama" className="block mb-2 text-sm font-medium">
            Nama Kriteria
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="ipk"
            value={editKriteria.nama}
            onChange={(e) =>
              setEditKriteria({ ...editKriteria, nama: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-5 w-full">
          <label for="tipe" className="block mb-2 text-sm font-medium">
            Tipe Kriteria
          </label>
          <select
            id="tipe"
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            name="tipe"
            onChange={(e) =>
              setEditKriteria({ ...editKriteria, tipe: e.target.value })
            }
            required
          >
            <option disabled value="" hidden>
              Pilih Tipe
            </option>
            <option
              key="1"
              value="benefit"
              selected={kriteria[0].tipe === "benefit"}
            >
              Benefit
            </option>
            <option key="2" value="cost" selected={kriteria[0].tipe === "cost"}>
              Cost
            </option>
          </select>
        </div>
        <div className="mb-5 w-full">
          <label for="kepentingan" className="block mb-2 text-sm font-medium">
            Tingkat Kepentingan Kriteria
          </label>
          <select
            id="kepentingan"
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            name="kepentingan"
            onChange={(e) =>
              setEditKriteria({ ...editKriteria, kepentingan: e.target.value })
            }
            required
          >
            <option disabled value="" hidden>
              Pilih Kepentingan
            </option>
            <option
              value="sangat kurang penting"
              selected={kriteria[0].kepentingan === "sangat kurang penting"}
            >
              Sangat Kurang Penting
            </option>
            <option
              value="kurang penting"
              selected={kriteria[0].kepentingan === "kurang penting"}
            >
              Kurang Penting
            </option>
            <option
              value="menengah"
              selected={kriteria[0].kepentingan === "menengah"}
            >
              Menengah
            </option>
            <option
              value="penting"
              selected={kriteria[0].kepentingan === "penting"}
            >
              Penting
            </option>
            <option
              value="sangat penting"
              selected={kriteria[0].kepentingan === "sangat penting"}
            >
              Sangat Penting
            </option>
          </select>
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
