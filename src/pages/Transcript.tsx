import Player from "../components/Player";

const TranscriptPage = () => {
  const dummyAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const dummyTranscript =
    "This is a placeholder transcript. Later this will show what you spoke during reflection.";

  return (
    <div className="flex flex-col items-center">
      <Player audioUrl={dummyAudioUrl} transcript={dummyTranscript} />
    </div>
  );
};

export default TranscriptPage;
