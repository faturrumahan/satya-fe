import React from "react";

const ResultList = ({ result }) => {
  return (
    <table className="border-spacing-2 border border-slate-500 w-full">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="py-3">Peringkat</th>
          <th>Nama</th>
          <th>Jurusan</th>
          <th>Posisi</th>
          <th>Nilai</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {result &&
          result.map((item, index) => (
            <tr
              key={item.id + item.nama}
              className={index % 2 != 0 ? `bg-gray-200` : undefined}
            >
              <td className="py-3">{index + 1}</td>
              <td className="py-3">{item.nama}</td>
              <td className="py-3">{item.nama_jurusan}</td>
              <td className="py-3">{item.posisi}</td>
              <td className="py-3">{item.skor}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ResultList;
