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


const STOP_WORDS: Set<string> = new Set([
    "el", "la", "los", "las", "un", "una", "unos", "unas", "y", "o", "u", "a",
    "de", "del", "al", "en", "por", "para", "con", "sin", "sobre", "tras",
    "mi", "tu", "su", "nuestro", "vuestro", "sus", "nuestra", "vuestra",
    "es", "ser", "estar", "haber", "hacer", "tener", "que", "se", "no", "si",
    "como", "más", "pero", "cuando", "donde", "quien", "cual", "mientras",
    "siempre", "nunca", "todo", "nada", "algo", "alguien", "yo", "tú", "él", "ella",
    "nosotros", "vosotros", "ellos", "ellas", "esto", "eso", "aquel", "aquella",
    "este", "esta", "otro", "otra", "mismo", "tanto", "tan", "tal", "solo", "ya",
    "desde", "hasta", "entre", "casi", "además", "pues", "luego", "así"
]);




function getWords(text: string): string[] {
    // Expresión regular para encontrar secuencias de letras y números (excluye la mayoría de la puntuación)
    const wordRegex = /[a-záéíóúüñÁÉÍÓÚÜÑ0-9]+/g;
    // Convierte a minúsculas para un conteo consistente y luego encuentra todas las coincidencias
    return text.toLowerCase().match(wordRegex) || [];
}


function countSentences(text: string): number {
    // La expresión busca cualquier carácter seguido de un punto, signo de exclamación o interrogación
    // seguido opcionalmente de comillas o paréntesis, y un espacio o fin de línea.
    const sentenceRegex = /[.!?]+(\s|$)/g;
    const matches = text.match(sentenceRegex);
    // Si no hay signos de puntuación final, y hay texto que no es solo espacio, se cuenta como 1 oración.
    if (matches) {
        return matches.length;
    } else if (text.trim().length > 0) {
        return 1;
    }
    return 0;
}


function countParagraphs(text: string): number {
    // Elimina espacios al inicio y final del texto
    const trimmedText = text.trim();
    if (trimmedText === "") {
        return 0;
    }
    // Divide por uno o más saltos de línea (\n+) y cuenta los fragmentos.
    const paragraphs = trimmedText.split(/\n+/).filter(p => p.trim() !== '');
    return paragraphs.length;
}


function getWordFrequency(words: string[]): Map<string, number> {
    const frequency = new Map<string, number>();
    for (const word of words) {
        frequency.set(word, (frequency.get(word) || 0) + 1);
    }
    return frequency;
}


function getTopKeywords(wordFrequency: Map<string, number>): [string, number][] {
    const keywords: [string, number][] = Array.from(wordFrequency.entries())
        // Filtra las stop words
        .filter(([word, _]) => !STOP_WORDS.has(word))
        // Ordena por frecuencia (descendente) y luego alfabéticamente (ascendente)
        .sort((a, b) => {
            if (b[1] !== a[1]) {
                return b[1] - a[1]; // Mayor frecuencia primero
            }
            return a[0].localeCompare(b[0]); // Alfabético para desempate
        })
        // Toma solo las 5 primeras
        .slice(0, 5);

    return keywords;
}


// -------------------------- FUNCIÓN PRINCIPAL --------------------------


 function analyzeText(text: string): TextStatistics {
    // Limpia y normaliza el texto para el análisis
    const words = getWords(text);
    const wordCount = words.length;
    const wordFrequency = getWordFrequency(words);
    const uniqueWordCount = wordFrequency.size;
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(/\s/g, '').length;
    const sentenceCount = countSentences(text);
    const paragraphCount = countParagraphs(text);
    
    // Cálculo de promedios
    const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
    const averageWordLength = wordCount > 0 ? totalWordLength / wordCount : 0;
    const averageSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    
    // Palabras clave principales
    const topKeywords = getTopKeywords(wordFrequency);

    return {
        characterCount,
        characterCountNoSpaces,
        wordCount,
        uniqueWordCount,
        sentenceCount,
        paragraphCount,
        averageWordLength: parseFloat(averageWordLength.toFixed(2)), // Redondea a 2 decimales
        averageSentenceLength: parseFloat(averageSentenceLength.toFixed(2)), // Redondea a 2 decimales
        wordFrequency,
        topKeywords,
    };
}