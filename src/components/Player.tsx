import React from "react";

interface PlayerProps {
  audioUrl: string;
  transcript: string;
}

const Player: React.FC<PlayerProps> = ({ audioUrl, transcript }) => {
  return (
    <div className="flex flex-col items-center gap-4 text-white">
      <audio controls className="w-full max-w-md">
        <source src={audioUrl} type="audio/webm" />
        Your browser does not support the audio element.
      </audio>
      <div className="bg-gray-800 p-4 rounded-md w-full max-w-md">
        <h3 className="font-bold mb-2">Transcript</h3>
        <p className="text-sm leading-relaxed">{transcript}</p>
      </div>
    </div>
  );
};

export default Player;
