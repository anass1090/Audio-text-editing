import React from "react";
import { Mic, Square } from "lucide-react";

interface RecordButtonProps {
    isRecording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({
                                                       isRecording,
                                                       startRecording,
                                                       stopRecording,
                                                   }) => (
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
);

export default RecordButton;