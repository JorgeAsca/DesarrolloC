import { analyzeText } from '../analyzer';

describe('Pruebas Unitarias para analyzeText', () => {

    // CASOS LÍMITE (Oblsigatorios para alta cobertura)

    test('1. Debe devolver estadísticas de cero para una cadena vacía', () => {
        const stats = analyzeText("");
        expect(stats.wordCount).toBe(0);
        expect(stats.sentenceCount).toBe(0);
        expect(stats.averageWordLength).toBe(0);
        expect(stats.topKeywords.length).toBe(0);
    });

    test('2. Debe manejar texto con solo espacios y saltos de línea', () => {
        const stats = analyzeText(" \n \n \t ");
        expect(stats.wordCount).toBe(0);
        expect(stats.paragraphCount).toBe(0);
    });

    // PRUEBAS DE CONTEO DE ORACIONES Y PÁRRAFOS

    test('3. Debe contar oraciones y párrafos correctamente', () => {
        // 4 oraciones (1., 2!, 3?, 4.) y 2 párrafos (separados por \n\n)
        const text = "Frase uno. Frase dos!\n\nFrase tres? \n Frase cuatro.";
        const stats = analyzeText(text);

        expect(stats.sentenceCount).toBe(4);
        expect(stats.paragraphCount).toBe(2);
    });

    // PRUEBAS DE FRECUENCIA Y KEYWORDS

    test('4. Debe calcular la frecuencia de palabras sin distinguir mayúsculas/minúsculas', () => {
        const text = "CASA. Casa, casa."; // Aseguramos 3 instancias de la misma palabra
        const stats = analyzeText(text);

        // 1. Debe contar 'casa' 3 veces.
        expect(stats.wordFrequency.get('casa')).toBe(3);

        // 2. Debe contar SOLO 1 palabra única (que es 'casa').
        expect(stats.uniqueWordCount).toBe(1);
    });

    test('5. Debe identificar las 5 Keywords excluyendo Stop Words', () => {
        // 'el', 'un', 'la' son stop words. Keywords: casa (3), gato (2), perro (2).
        const text = `
            casa casa. la casa. el gato y el perro. un gato un perro.
        `;
        const stats = analyzeText(text);

        expect(stats.topKeywords.length).toBe(3); // Solo hay 3 palabras clave únicas
        expect(stats.topKeywords[0][0]).toBe('casa');
        expect(stats.topKeywords[0][1]).toBe(3);
    });

    // PRUEBAS DE PROMEDIOS

    test('6. Debe calcular la longitud media de la palabra', () => {
        // Palabras: la (2), casa (4), es (2), azul (4). Total de letras: 12. Total de palabras: 4.
        const text = "La casa es azul.";
        const stats = analyzeText(text);

        expect(stats.averageWordLength).toBeCloseTo(3.00);
    });

    test('7. Debe calcular correctamente la longitud media de la oración', () => {
        // Oración 1: 4 palabras. Oración 2: 3 palabras. Total: 7/2 = 3.5
        const text = "La casa es azul. El perro ladra.";
        const stats = analyzeText(text);

        expect(stats.averageSentenceLength).toBeCloseTo(3.50);
    });
});