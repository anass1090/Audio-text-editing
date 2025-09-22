import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, PauseCircle, Trash } from "lucide-react";
import RecordButton from "@/components/Recorder/RecordButton";
import useRecorder from "@/components/Recorder/UseRecorder";

const Recorder: React.FC = () => {
    const navigate = useNavigate();
    const {
        startRecording,
        stopRecording,
        resetRecording,
        isRecording,
        time,
        audioUrl,
        words,
    } = useRecorder(navigate);

    const handleSave = () => {
        if (audioUrl && words.length > 0) {
            navigate("/transcript", { state: { audioUrl, words } });
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };


    return (
        <Card className="w-full max-w-lg shadow-2xl backdrop-blur-lg bg-card/80 border border-border/40">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-extrabold tracking-tight">
                    Start journaling
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-8">
                <h2 className="text-5xl font-mono tracking-tight">
                    {formatTime(time)}
                </h2>

                <RecordButton
                    isRecording={isRecording}
                    startRecording={startRecording}
                    stopRecording={stopRecording}
                />

                <div className="flex gap-3 mt-2">
                    <Button
                        variant="secondary"
                        onClick={handleSave}
                        disabled={!audioUrl || words.length === 0}
                    >
                        <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button variant="outline" disabled>
                        <PauseCircle className="h-4 w-4 mr-1" /> Pause
                    </Button>
                    <Button variant="destructive" onClick={resetRecording}>
                        <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default Recorder;
