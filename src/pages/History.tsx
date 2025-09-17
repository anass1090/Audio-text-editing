import TranscriptList from "../components/TranscriptList";

const HistoryPage = () => {
  const dummyTranscripts = [
    { id: "1", date: "09-09-2025", length: "02:40" },
    { id: "2", date: "08-09-2025", length: "03:20" },
  ];

  const handleView = (id: string) => {
    console.log("View transcript:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete transcript:", id);
  };

  return (
    <div className="w-full max-w-3xl">
      <TranscriptList
        transcripts={dummyTranscripts}
        onView={handleView}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default HistoryPage;
