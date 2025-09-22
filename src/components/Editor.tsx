type Word = { i: number; word: string; start: number; end: number };

const TranscriptEditor = ({ words }: { words: Word[] }) => {
    if (!words.length) {
        return <p className="text-sm text-gray-500">No transcript available</p>;
    }

    return (
        <div className="border rounded-lg p-4 bg-gray-50 leading-8">
            {words.map((w) => (
                <span
                    key={w.i}
                    className="inline-block px-1 mr-1 rounded hover:bg-blue-100 cursor-pointer"
                    title={`${w.start.toFixed(2)}s – ${w.end.toFixed(2)}s`}
                >
          {w.word}
        </span>
            ))}
        </div>
    );
};

export default TranscriptEditor;
