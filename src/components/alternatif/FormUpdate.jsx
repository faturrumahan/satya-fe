"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";

const FormUpdate = ({
  kriteria,
  posisi,
  jurusan,
  alternatif,
  value,
  id_alternatif,
}) => {
  const [editAlternatif, setEditAlternatif] = useState(value[0]);
  const { push } = useRouter();
  let posisiOpt = [];
  let oldPosisi = value[0]["posisi"]
    .split(",")
    .map((item) => ({ value: item, label: item }));

  posisi.map((item) => {
    posisiOpt.push({ label: item.nama, value: item.nama });
    return 0;
  });

  useEffect(() => {
    jurusan.map((item) => {
      if (item.nama == editAlternatif.nama_jurusan) {
        setEditAlternatif({
          ...editAlternatif,
          id_jurusan: item.id,
        });
      }
    });
  }, []);

  useEffect(() => {
    setEditAlternatif({
      ...editAlternatif,
      posisi: oldPosisi,
    });
  }, []);

  const alternatifSubmitHandler = async (e) => {
    e.preventDefault();
    setEditAlternatif((current) => {
      const { nama_jurusan, ...rest } = current;
      return rest;
    });
    let formData = new FormData();
    formData.append("id", id_alternatif);
    let listPosisi;
    // console.log(editAlternatif);

    for (const [key, value] of Object.entries(editAlternatif)) {
      if (key === "posisi") {
        for (let i = 0; i < editAlternatif.posisi.length; i++) {
          if (!listPosisi) {
            listPosisi = editAlternatif.posisi[i].value;
          } else {
            listPosisi += "," + editAlternatif.posisi[i].value;
          }
        }
        formData.append("posisi", listPosisi);
      } else {
        formData.append(key, value);
      }
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:4000/alternatif/${id_alternatif}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const resJson = await res.json();
      if (res.status === 200) {
        alert("Your Update Already Saved");
        push("/alternatif");
      } else {
        alert("Some error occured");
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
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Satya Wahyu"
            value={editAlternatif.nama}
            onChange={(e) =>
              setEditAlternatif({ ...editAlternatif, nama: e.target.value })
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
            name="id_jurusan"
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setEditAlternatif({
                ...editAlternatif,
                id_jurusan: e.target.value,
              })
            }
            required
          >
            {jurusan.map((item) => (
              <option
                key={item.id + item.nama}
                value={item.id}
                selected={item.id == alternatif.id_jurusan && true}
              >
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
            name="posisi"
            className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            options={posisiOpt}
            value={editAlternatif["posisi"]}
            onChange={(e) =>
              setEditAlternatif({ ...editAlternatif, posisi: e })
            }
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
                  name={item.nama}
                  value={editAlternatif[item.nama]}
                  className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) =>
                    setEditAlternatif({
                      ...editAlternatif,
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
                  name={item.nama}
                  value={editAlternatif[item.nama]}
                  className="border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) =>
                    setEditAlternatif({
                      ...editAlternatif,
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

export default FormUpdate;
