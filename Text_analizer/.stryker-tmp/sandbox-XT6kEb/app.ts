// @ts-nocheck
import { analyzeText, TextStatistics } from './analyzer';

const textarea = document.getElementById('text-to-analyze') as HTMLTextAreaElement | null;
const analyzeButton = document.getElementById('analyze-button') as HTMLButtonElement | null;
const realtimeCharCount = document.getElementById('char-count-realtime');
const realtimeWordCount = document.getElementById('word-count-realtime');
const resultsDisplay = document.getElementById('results-display');
const topKeywordsList = document.getElementById('top-keywords-list');

// Actualiza el conteo simple de caracteres y palabras en tiempo real.
function updateRealtimeStats(text: string): void {
    if (realtimeCharCount) {
        realtimeCharCount.textContent = String(text.length);
    }
    if (realtimeWordCount) {
        // Conteo de palabras simple para el tiempo real (divide por espacios)
        const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        realtimeWordCount.textContent = String(wordCount);
    }
}

// Muestra las estadísticas completas en la interfaz de usuario (tarjetas y keywords).
function renderResults(stats: TextStatistics): void {
    // 1. Actualizar las tarjetas de estadísticas
    if (resultsDisplay) {
        // Itera sobre todos los elementos con la clase .stat-value y el atributo data-stat
        const statElements = resultsDisplay.querySelectorAll('.stat-value') as NodeListOf<HTMLElement>;

        statElements.forEach(element => {
            const statKey = element.dataset.stat as keyof TextStatistics;

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
        } else {
            stats.topKeywords.forEach(([word, count]: [string, number], index: number) => {
                // Ahora tienen tipos explícitos
                const li = document.createElement('li');
                li.innerHTML = `
        <span>${index + 1}. ${word}</span>
        <span class="keyword-count">(${count})</span>
    `;
                topKeywordsList?.appendChild(li); // Usa el operador de encadenamiento opcional si es necesario
            });
        }
    }
}

// Función que orquesta el análisis completo y la renderización de resultados.
function handleAnalysis(): void {
    if (textarea) {
        const text = textarea.value;
        if (text.trim() === "") {
            // Manejar caso de texto vacío
            renderResults(analyzeText("")); // Pasa una cadena vacía para resetear las estadísticas a 0
            return;
        }

        try {
            const stats: TextStatistics = analyzeText(text);
            renderResults(stats);
            console.log("Análisis completo:", stats);

        } catch (error) {
            console.error("Error durante el análisis del texto:", error);
            // Mostrar un mensaje de error amigable al usuario si el análisis falla
            alert("Ha ocurrido un error inesperado al procesar el texto.");
        }
    }
}



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
            const target = event.target as HTMLTextAreaElement;
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