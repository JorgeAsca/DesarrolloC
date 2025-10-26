// @ts-nocheck
interface TextStatistics {
    characterCount: number;
    characterCountNoSpaces: number;
    wordCount: number;
    uniqueWordCount: number;
    sentenceCount: number;
    paragraphCount: number;
    averageWordLength: number;
    averageSentenceLength: number;
    wordFrequency: Map<string, number>;
    topKeywords: [string, number][];
}
// Extrae una lista de palabras del texto
declare function getWords(text: string): string[];

// Cuenta el número de oraciones basándose en los signos de puntuación finales.
declare function countSentences(text: string): number;

// Cuenta el número de párrafos basándose en uno o más saltos de línea (\n\n o \n).
declare function countParagraphs(text: string): number;

// Calcula la frecuencia de aparición de cada palabra
declare function getWordFrequency(words: string[]): Map<string, number>;

// Identifica las 5 palabras más frecuentes, excluyendo las stop words.
declare function getTopKeywords(wordFrequency: Map<string, number>): [string, number][];
// Función principal que orquesta todas las estadísticas de un texto dado.

declare function analyzeText(text: string): TextStatistics;
declare const textarea: HTMLTextAreaElement | null;
declare const analyzeButton: HTMLButtonElement | null;
declare const realtimeCharCount: HTMLElement | null;
declare const realtimeWordCount: HTMLElement | null;
declare const resultsDisplay: HTMLElement | null;
declare const topKeywordsList: HTMLElement | null;

// Actualiza el conteo simple de caracteres y palabras en tiempo real.
declare function updateRealtimeStats(text: string): void;

// Muestra las estadísticas completas en la interfaz de usuario (tarjetas y keywords).
declare function renderResults(stats: TextStatistics): void;

// Función que orquesta el análisis completo y la renderización de resultados.
declare function handleAnalysis(): void;
//# sourceMappingURL=main.d.ts.map