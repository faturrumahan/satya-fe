"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FormInput = () => {
  const [newKriteria, setNewKriteria] = useState({});
  const { push } = useRouter();

  const kriteriaSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    for (const [key, value] of Object.entries(newKriteria)) {
      formData.append(key, value);
    }

    try {
      const res = await fetch("http://127.0.0.1:4000/kriteria", {
        method: "POST",
        body: formData,
      });
      const resJson = await res.json();
      if (res.status === 200) {
        alert("Your Input Already Saved");
        push("/kriteria");
      } else {
        alert("Some error");
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
            value={newKriteria.nama}
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="ipk"
            onChange={(e) =>
              setNewKriteria({ ...newKriteria, nama: e.target.value })
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
              setNewKriteria({ ...newKriteria, tipe: e.target.value })
            }
            required
          >
            <option disabled selected value="" hidden>
              Pilih Tipe
            </option>
            <option key="1" value="benefit">
              Benefit
            </option>
            <option key="2" value="cost">
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
              setNewKriteria({ ...newKriteria, kepentingan: e.target.value })
            }
            required
          >
            <option disabled selected value="" hidden>
              Pilih Kepentingan
            </option>
            <option key="1" value="sangat kurang penting">
              Sangat Kurang Penting
            </option>
            <option key="2" value="kurang penting">
              Kurang Penting
            </option>
            <option key="2" value="menengah">
              Menengah
            </option>
            <option key="2" value="penting">
              Penting
            </option>
            <option key="2" value="sangat penting">
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

export default FormInput;
