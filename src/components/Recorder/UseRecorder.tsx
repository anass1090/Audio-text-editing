import { useState, useRef } from "react";

export default function useRecorder(navigate: (path: string, opts?: any) => void) {
    const chunks = useRef<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [time, setTime] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [words, setWords] = useState<any[]>([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    /** Start a new recording */
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

    /** Stop recording and send audio to backend */
    const stopRecording = () => {
        mediaRecorder?.stop();
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
        setTime(0);

        mediaRecorder!.onstop = async () => {
            const blob = new Blob(chunks.current, { type: "audio/webm" });
            chunks.current = [];
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);

            // Send to backend
            const file = new File([blob], "recording.webm", { type: "audio/webm" });
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("http://localhost:8001/api/transcribe", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();
                setWords(data.words);

                navigate("/transcript", { state: { audioUrl: url, words: data.words } });
            } catch (err) {
                console.error("Upload error:", err);
            }
        };
    };

    /** Reset state */
    const resetRecording = () => {
        setAudioUrl(null);
        setWords([]);
        chunks.current = [];
        setTime(0);
        setIsRecording(false);
    };

    return {
        startRecording,
        stopRecording,
        resetRecording,
        isRecording,
        time,
        audioUrl,
        words,
    };
}
