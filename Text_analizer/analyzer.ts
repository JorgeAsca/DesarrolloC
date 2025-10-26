export interface TextStatistics {
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


// -------------------------- FUNCIONES AUXILIARES --------------------------

/**
 * @function getWords
 * CORRECCIÓN: La regex ahora está marcada como global ('g') y case-insensitive ('i')
 * para garantizar la extracción correcta y uniforme de todas las palabras.
 * Esto asegura que 'casa', 'Casa', 'CASA.', etc. se cuenten como 'casa' (resuelve Test 4)
 * y que las longitudes sean correctas (resuelve Test 6).
 * @param {string} text - El texto a procesar.
 * @returns {string[]} Un array de palabras en minúsculas.
 */
function getWords(text: string): string[] {
    // Busca secuencias de letras y números (elimina la puntuación).
    // Nota: El flag 'i' es para ignorar mayúsculas en el match.
    const wordRegex = /[a-záéíóúüñ0-9]+/gi; 
    
    // El .match() devuelve un array de palabras, que luego mapeamos a minúsculas.
    return text.match(wordRegex)?.map(word => word.toLowerCase()) || [];
}


function countSentences(text: string): number {
    const sentenceRegex = /[.!?]+(\s|$)/g;
    const matches = text.match(sentenceRegex);
    if (matches) {
        return matches.length;
    } else if (text.trim().length > 0) {
        return 1;
    }
    return 0;
}


/**
 * @function countParagraphs
 * La corrección anterior ya resolvió el Test 3.
 * @param {string} text - El texto a analizar.
 * @returns {number} El número total de párrafos.
 */
function countParagraphs(text: string): number {
    const trimmedText = text.trim();
    if (trimmedText === "") {
        return 0;
    }
    // Divide por DOBLE salto de línea o más.
    const paragraphs = trimmedText.split(/\r?\n\s*\r?\n/).filter(p => p.trim() !== '');

    // Si la división falla pero hay texto, devuelve 1 (la base).
    return paragraphs.length > 0 ? paragraphs.length : 1;
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
        .filter(([word, _]) => !STOP_WORDS.has(word))
        .sort((a, b) => {
            if (b[1] !== a[1]) {
                return b[1] - a[1];
            }
            return a[0].localeCompare(b[0]);
        })
        .slice(0, 5);

    return keywords;
}


// -------------------------- FUNCIÓN PRINCIPAL --------------------------

export function analyzeText(text: string): TextStatistics {
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
        // Redondeo de los promedios
        averageWordLength: parseFloat(averageWordLength.toFixed(2)), 
        averageSentenceLength: parseFloat(averageSentenceLength.toFixed(2)), 
        wordFrequency,
        topKeywords,
    };
}