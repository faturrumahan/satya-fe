import React from "react";
import Link from "next/link";

const JurusanList = ({ jurusan }) => {
  const deleteRequestHandler = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/jurusan/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        alert("Your Data Already Deleted");
        location.reload();
      } else {
        alert("Some error occured");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <table className="border-spacing-2 border border-slate-500 w-full">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="py-3">ID</th>
          <th>Nama</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {jurusan &&
          jurusan.map((item, index) => (
            <tr
              key={item.id + item.nama}
              className={index % 2 != 0 ? `bg-gray-200` : undefined}
            >
              <td className="py-3">{item.id}</td>
              <td className="py-3">{item.nama}</td>
              <td className="flex space-x-5 w-full justify-center py-3">
                <Link href={`jurusan/ubah/${item.id}`}>Ubah</Link>
                <button
                  onClick={() => {
                    if (window.confirm(`Yakin Ingin Menghapus ${item.nama}?`))
                      deleteRequestHandler(item.id);
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default JurusanList;
