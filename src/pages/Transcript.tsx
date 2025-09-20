import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const TranscriptPage = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const dummyAudioUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const dummyTranscript =
    "Today I reflected on my progress. I feel motivated but also a bit tired. This journaling helps me clear my thoughts and see patterns more clearly.";

  // typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(dummyTranscript.slice(0, i));
      i++;
      if (i > dummyTranscript.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-2xl shadow-2xl backdrop-blur-lg bg-card/80 border border-border/40">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Transcript</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Audio controls */}
        <div className="flex items-center gap-4">
          <Button size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <audio ref={audioRef} src={dummyAudioUrl} preload="metadata" />
          <span className="text-sm text-muted-foreground">
            {isPlaying ? "Playing…" : "Paused"}
          </span>
        </div>

        {/* Transcript text with animation */}
        <div className="rounded-md border bg-card/60 p-4 max-h-64 overflow-y-auto shadow-inner">
          <h3 className="font-semibold mb-2">Your Reflection</h3>
          <p className="text-sm leading-relaxed whitespace-pre-line animate-fade-in">
            {displayedText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranscriptPage;
