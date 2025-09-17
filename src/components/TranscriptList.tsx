import React from "react";

interface TranscriptEntry {
  id: string;
  date: string;
  length: string;
}

interface Props {
  transcripts: TranscriptEntry[];
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

const TranscriptList: React.FC<Props> = ({ transcripts, onView, onDelete }) => {
  return (
    <table className="table-auto w-full text-white border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Audio length</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transcripts.map((t) => (
          <tr key={t.id}>
            <td className="border px-4 py-2">{t.date}</td>
            <td className="border px-4 py-2">{t.length}</td>
            <td className="border px-4 py-2">
              <button className="text-blue-400 mr-2" onClick={() => onView(t.id)}>
                View
              </button>
              <button className="text-red-400" onClick={() => onDelete(t.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TranscriptList;
