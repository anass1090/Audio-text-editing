import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Save, PauseCircle, Trash2 } from "lucide-react";

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
      console.log("Recorded audio:", url);
      chunks.current = [];
    };
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl backdrop-blur-lg bg-card/80 border border-border/40">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-extrabold tracking-tight">
          Start journaling
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        {/* Timer */}
        <h2 className="text-5xl font-mono tracking-tight">
          {new Date(time * 1000).toISOString().substr(14, 5)}
        </h2>

        {/* Record button with glow */}
        <div className="relative">
          {isRecording && (
            <span className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-ping"></span>
          )}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`relative w-40 h-40 flex items-center justify-center rounded-full shadow-xl transition-all duration-300 ${
              isRecording
                ? "bg-red-600 text-white"
                : "bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:scale-105"
            }`}
          >
            {isRecording ? <Square size={56} /> : <Mic size={56} />}
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-2">
          <Button variant="secondary">
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
          <Button variant="outline">
            <PauseCircle className="h-4 w-4 mr-1" /> Pause
          </Button>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recorder;
