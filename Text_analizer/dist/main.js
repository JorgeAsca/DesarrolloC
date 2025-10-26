"use strict";

const STOP_WORDS = new Set([
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

function getWords(text) {
    // Expresión regular para encontrar secuencias de letras y números (excluye la mayoría de la puntuación)
    const wordRegex = /[a-záéíóúüñÁÉÍÓÚÜÑ0-9]+/g;
    // Convierte a minúsculas para un conteo consistente y luego encuentra todas las coincidencias
    return text.toLowerCase().match(wordRegex) || [];
}

function countSentences(text) {
    // La expresión busca cualquier carácter seguido de un punto, signo de exclamación o interrogación
    // seguido opcionalmente de comillas o paréntesis, y un espacio o fin de línea.
    const sentenceRegex = /[.!?]+(\s|$)/g;
    const matches = text.match(sentenceRegex);
    // Si no hay signos de puntuación final, y hay texto que no es solo espacio, se cuenta como 1 oración.
    if (matches) {
        return matches.length;
    }
    else if (text.trim().length > 0) {
        return 1;
    }
    return 0;
}

function countParagraphs(text) {
    // Elimina espacios al inicio y final del texto
    const trimmedText = text.trim();
    if (trimmedText === "") {
        return 0;
    }
    // Divide por uno o más saltos de línea (\n+) y cuenta los fragmentos.
    const paragraphs = trimmedText.split(/\n+/).filter(p => p.trim() !== '');
    return paragraphs.length;
}
/**
 * @function getWordFrequency
 * Calcula la frecuencia de aparición de cada palabra.
 * @param {string[]} words - Array de palabras.
 * @returns {Map<string, number>} Un mapa con la palabra como clave y su frecuencia como valor.
 */
function getWordFrequency(words) {
    const frequency = new Map();
    for (const word of words) {
        frequency.set(word, (frequency.get(word) || 0) + 1);
    }
    return frequency;
}
/**
 * @function getTopKeywords
 * Identifica las 5 palabras más frecuentes, excluyendo las stop words.
 * @param {Map<string, number>} wordFrequency - Mapa de frecuencia de palabras.
 * @returns {[string, number][]} Un array con las 5 palabras más comunes y sus conteos.
 */
function getTopKeywords(wordFrequency) {
    const keywords = Array.from(wordFrequency.entries())
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
/**
 * @function analyzeText
 * Función principal que orquesta todas las estadísticas de un texto dado.
 * @param {string} text - El texto a analizar.
 * @returns {TextStatistics} Un objeto con todas las métricas calculadas.
 */
function analyzeText(text) {
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
// import { analyzeText, type TextStatistics } from './analyzer'; 
const textarea = document.getElementById('text-to-analyze');
const analyzeButton = document.getElementById('analyze-button');
const realtimeCharCount = document.getElementById('char-count-realtime');
const realtimeWordCount = document.getElementById('word-count-realtime');
const resultsDisplay = document.getElementById('results-display');
const topKeywordsList = document.getElementById('top-keywords-list');
/**
 * @function updateRealtimeStats
 * Actualiza el conteo simple de caracteres y palabras en tiempo real.
 */
function updateRealtimeStats(text) {
    if (realtimeCharCount) {
        realtimeCharCount.textContent = String(text.length);
    }
    if (realtimeWordCount) {
        // Conteo de palabras simple para el tiempo real (divide por espacios)
        const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        realtimeWordCount.textContent = String(wordCount);
    }
}
/**
 * @function renderResults
 * Muestra las estadísticas completas en la interfaz de usuario (tarjetas y keywords).
 * @param {TextStatistics} stats - El objeto de estadísticas devuelto por analyzeText.
 */
function renderResults(stats) {
    // 1. Actualizar las tarjetas de estadísticas
    if (resultsDisplay) {
        // Itera sobre todos los elementos con la clase .stat-value y el atributo data-stat
        const statElements = resultsDisplay.querySelectorAll('.stat-value');
        statElements.forEach(element => {
            const statKey = element.dataset.stat;
            if (statKey && stats[statKey] !== undefined) {
                // El tipado seguro nos permite acceder a la clave del objeto TextStatistics
                element.textContent = String(stats[statKey]);
            }
        });
    }
    // 2. Actualizar la lista de palabras clave principales
    if (topKeywordsList) {
        topKeywordsList.innerHTML = ''; // Limpia la lista anterior
        if (stats.topKeywords.length === 0) {
            topKeywordsList.innerHTML = '<li class="placeholder">No se encontraron palabras clave.</li>';
        }
        else {
            stats.topKeywords.forEach(([word, count], index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${index + 1}. ${word}</span>
                    <span class="keyword-count">(${count})</span>
                `;
                topKeywordsList.appendChild(li);
            });
        }
    }
}
/**
 * @function handleAnalysis
 * Función que orquesta el análisis completo y la renderización de resultados.
 */
function handleAnalysis() {
    if (textarea) {
        const text = textarea.value;
        if (text.trim() === "") {
            // Manejar caso de texto vacío
            renderResults(analyzeText("")); // Pasa una cadena vacía para resetear las estadísticas a 0
            return;
        }
        try {
            const stats = analyzeText(text);
            renderResults(stats);
            console.log("Análisis completo:", stats);
        }
        catch (error) {
            console.error("Error durante el análisis del texto:", error);
            // Mostrar un mensaje de error amigable al usuario si el análisis falla
            alert("Ha ocurrido un error inesperado al procesar el texto.");
        }
    }
}
// -------------------------- EVENT LISTENERS --------------------------
/**
 * Inicializa los manejadores de eventos al cargar el DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa el análisis al cargar con un texto vacío
    handleAnalysis();
    // 2. Evento para estadísticas en tiempo real (conteo simple)
    if (textarea) {
        // Usamos 'input' para capturar cambios en el texto inmediatamente
        textarea.addEventListener('input', (event) => {
            const target = event.target;
            updateRealtimeStats(target.value);
            // Ejecutar el análisis completo en el evento 'input' para una UX fluida
            handleAnalysis();
        });
    }
    // 3. Evento para el análisis completo (redundante si se hace en 'input', pero buena práctica)
    if (analyzeButton) {
        analyzeButton.addEventListener('click', handleAnalysis);
    }
});
//# sourceMappingURL=main.js.map