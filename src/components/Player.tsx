import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface PlayerProps {
    audioUrl: string;
}

const Player: React.FC<PlayerProps> = ({ audioUrl }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => setProgress(audio.currentTime);
        const setAudioData = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", setAudioData);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("loadedmetadata", setAudioData);
        };
    }, []);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setProgress(newTime);
    };

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const newVolume = parseFloat(e.target.value);
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full px-4">
            {/* Custom audio player */}
            <div className="w-full max-w-lg bg-white dark:bg-gray-900 shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
                    Audio Player
                </h2>

                <audio ref={audioRef} src={audioUrl} preload="metadata" />

                <div className="flex items-center gap-4">
                    <button
                        onClick={togglePlay}
                        className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={progress}
                        onChange={handleSeek}
                        className="w-full accent-indigo-600"
                    />

                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        {formatTime(progress)} / {formatTime(duration)}
                    </span>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2 mt-3">
                    {volume === 0 ? (
                        <VolumeX className="text-gray-700 dark:text-gray-300" size={18} />
                    ) : (
                        <Volume2 className="text-gray-700 dark:text-gray-300" size={18} />
                    )}
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolume}
                        className="w-32 accent-indigo-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default Player;
