// utils/loadWords.ts
export type Word = {
    i: number;
    word: string;
    start: number;
    end: number;
    speaker?: string;
    score?: number;
};

export function loadWords(json: any): Word[] {
    return (json.word_segments || []).map((w: any, i: number) => ({
        i,
        word: w.word,
        start: w.start,
        end: w.end,
        speaker: w.speaker,
        score: w.score,
    }));
}
