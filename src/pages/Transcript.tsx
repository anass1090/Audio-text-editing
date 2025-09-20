import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import AudioPlayer from "@/components/AudioPlayer";
import TranscriptEditor from "@/components/TranscriptEditor";

type Word = { i: number; word: string; start: number; end: number };

const TranscriptPage = () => {
  const location = useLocation();
  const { audioUrl, words = [] } =
    (location.state as { audioUrl: string; words: Word[] }) || { words: [] };

  return (
    <Card className="w-full max-w-3xl shadow-2xl backdrop-blur-lg bg-card/80 border border-border/40">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Transcript Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AudioPlayer audioUrl={audioUrl} />
        <TranscriptEditor words={words} />
      </CardContent>
    </Card>
  );
};

export default TranscriptPage;
