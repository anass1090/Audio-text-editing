import React, { useState, useRef } from "react";

const Recorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    recorder.start();
    setIsRecording(true);

    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTime(0);

    mediaRecorder!.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      console.log("Recorded audio:", url); // later save
      chunks.current = [];
    };
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white">
      <h2 className="text-2xl">{new Date(time * 1000).toISOString().substr(14, 5)}</h2>
      <button
        className={`w-48 h-48 rounded-full text-xl font-bold ${
          isRecording ? "bg-red-600" : "bg-green-600"
        }`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "REFLECT" : "START"}
      </button>
      <div className="flex gap-4 mt-4">
        <button className="bg-green-500 px-4 py-2 rounded">Save</button>
        <button className="bg-yellow-500 px-4 py-2 rounded">Pause</button>
        <button className="bg-red-500 px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default Recorder;
