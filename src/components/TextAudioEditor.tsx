import React, { useEffect, useMemo, useRef, useState } from "react";

export type Word = {
    i: number;
    word: string;
    start: number;
    end: number;
};

type CutRange = { start: number; end: number };

export default function TextAudioEditor({
                                            audioSrc,
                                            words,
                                        }: {
    audioSrc: string;
    words: Word[];
}) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [deleted, setDeleted] = useState<Set<number>>(new Set());
    const PAD = 0.40; // 50ms pad around cuts
    const FADE_MS = 50; // fade duration
a
    // Merge consecutive deleted words into cut ranges
    const cutRanges: CutRange[] = useMemo(() => {
        const ids = [...deleted].sort((a, b) => a - b);
        const ranges: CutRange[] = [];
        let k = 0;
        while (k < ids.length) {
            const first = ids[k];
            let start = first > 0 ? words[first - 1].end - PAD : words[first].start;
            let end = words[first].end + 0.05;
            let j = k + 1;
            while (j < ids.length && ids[j] === ids[j - 1] + 1) {
                end = words[ids[j]].end + 0.05;
                j++;
            }
            ranges.push({ start, end });
            k = j;
        }
        return ranges;
    }, [deleted, words]);

    // Handle playback skipping + fading
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        let fadeTimer: NodeJS.Timeout | null = null;

        const handler = () => {
            const t = audio.currentTime;
            for (const r of cutRanges) {
                if (t >= r.start && t < r.end) {
                    // fade out quickly
                    if (fadeTimer) clearInterval(fadeTimer);
                    let step = audio.volume / (FADE_MS / 10);
                    fadeTimer = setInterval(() => {
                        if (audio.volume - step <= 0) {
                            audio.volume = 0;
                            clearInterval(fadeTimer!);
                            audio.currentTime = r.end; // jump
                            // fade in
                            let upStep = 1 / (FADE_MS / 10);
                            fadeTimer = setInterval(() => {
                                if (audio.volume + upStep >= 1) {
                                    audio.volume = 1;
                                    clearInterval(fadeTimer!);
                                } else {
                                    audio.volume += upStep;
                                }
                            }, 10);
                        } else {
                            audio.volume -= step;
                        }
                    }, 10);
                    break;
                }
            }
        };

        audio.addEventListener("timeupdate", handler);
        return () => {
            audio.removeEventListener("timeupdate", handler);
            if (fadeTimer) clearInterval(fadeTimer);
        };
    }, [cutRanges]);

    return (
        <div className="max-w-3xl mx-auto p-6 font-sans">
            <h2 className="text-2xl font-bold mb-4">Transcript & audio editor</h2>

            {/* Audio player */}
            <audio
                ref={audioRef}
                src={audioSrc}
                controls
                className="w-full mb-6"
            />

            {/* Transcript */}
            <div className="border rounded-lg p-4 bg-gray-50 leading-8">
                {words.map((w) => (
                    <span
                        key={w.i}
                        onClick={() =>
                            setDeleted((prev) => {
                                const next = new Set(prev);
                                next.has(w.i) ? next.delete(w.i) : next.add(w.i);
                                return next;
                            })
                        }
                        className={`inline-block px-1 mr-1 rounded cursor-pointer transition 
              ${
                            deleted.has(w.i)
                                ? "line-through bg-red-200 text-red-800 opacity-70"
                                : "hover:bg-blue-100"
                        }`}
                        title={`${w.start.toFixed(2)}s – ${w.end.toFixed(2)}s`}
                    >
            {w.word}
          </span>
                ))}
            </div>

            {/* Debug ranges */}
            <div className="mt-4 text-sm text-gray-600 bg-gray-100 p-3 rounded">
                <pre>Cut ranges: {JSON.stringify(cutRanges, null, 2)}</pre>
            </div>
        </div>
    );
}
