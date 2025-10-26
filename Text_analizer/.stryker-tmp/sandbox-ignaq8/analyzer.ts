// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
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
const STOP_WORDS: Set<string> = new Set(stryMutAct_9fa48("0") ? [] : (stryCov_9fa48("0"), [stryMutAct_9fa48("1") ? "" : (stryCov_9fa48("1"), "el"), stryMutAct_9fa48("2") ? "" : (stryCov_9fa48("2"), "la"), stryMutAct_9fa48("3") ? "" : (stryCov_9fa48("3"), "los"), stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), "las"), stryMutAct_9fa48("5") ? "" : (stryCov_9fa48("5"), "un"), stryMutAct_9fa48("6") ? "" : (stryCov_9fa48("6"), "una"), stryMutAct_9fa48("7") ? "" : (stryCov_9fa48("7"), "unos"), stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), "unas"), stryMutAct_9fa48("9") ? "" : (stryCov_9fa48("9"), "y"), stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), "o"), stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), "u"), stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), "a"), stryMutAct_9fa48("13") ? "" : (stryCov_9fa48("13"), "de"), stryMutAct_9fa48("14") ? "" : (stryCov_9fa48("14"), "del"), stryMutAct_9fa48("15") ? "" : (stryCov_9fa48("15"), "al"), stryMutAct_9fa48("16") ? "" : (stryCov_9fa48("16"), "en"), stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), "por"), stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), "para"), stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), "con"), stryMutAct_9fa48("20") ? "" : (stryCov_9fa48("20"), "sin"), stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), "sobre"), stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), "tras"), stryMutAct_9fa48("23") ? "" : (stryCov_9fa48("23"), "mi"), stryMutAct_9fa48("24") ? "" : (stryCov_9fa48("24"), "tu"), stryMutAct_9fa48("25") ? "" : (stryCov_9fa48("25"), "su"), stryMutAct_9fa48("26") ? "" : (stryCov_9fa48("26"), "nuestro"), stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), "vuestro"), stryMutAct_9fa48("28") ? "" : (stryCov_9fa48("28"), "sus"), stryMutAct_9fa48("29") ? "" : (stryCov_9fa48("29"), "nuestra"), stryMutAct_9fa48("30") ? "" : (stryCov_9fa48("30"), "vuestra"), stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), "es"), stryMutAct_9fa48("32") ? "" : (stryCov_9fa48("32"), "ser"), stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), "estar"), stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), "haber"), stryMutAct_9fa48("35") ? "" : (stryCov_9fa48("35"), "hacer"), stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), "tener"), stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), "que"), stryMutAct_9fa48("38") ? "" : (stryCov_9fa48("38"), "se"), stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), "no"), stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), "si"), stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), "como"), stryMutAct_9fa48("42") ? "" : (stryCov_9fa48("42"), "más"), stryMutAct_9fa48("43") ? "" : (stryCov_9fa48("43"), "pero"), stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), "cuando"), stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), "donde"), stryMutAct_9fa48("46") ? "" : (stryCov_9fa48("46"), "quien"), stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), "cual"), stryMutAct_9fa48("48") ? "" : (stryCov_9fa48("48"), "mientras"), stryMutAct_9fa48("49") ? "" : (stryCov_9fa48("49"), "siempre"), stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), "nunca"), stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), "todo"), stryMutAct_9fa48("52") ? "" : (stryCov_9fa48("52"), "nada"), stryMutAct_9fa48("53") ? "" : (stryCov_9fa48("53"), "algo"), stryMutAct_9fa48("54") ? "" : (stryCov_9fa48("54"), "alguien"), stryMutAct_9fa48("55") ? "" : (stryCov_9fa48("55"), "yo"), stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), "tú"), stryMutAct_9fa48("57") ? "" : (stryCov_9fa48("57"), "él"), stryMutAct_9fa48("58") ? "" : (stryCov_9fa48("58"), "ella"), stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), "nosotros"), stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), "vosotros"), stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), "ellos"), stryMutAct_9fa48("62") ? "" : (stryCov_9fa48("62"), "ellas"), stryMutAct_9fa48("63") ? "" : (stryCov_9fa48("63"), "esto"), stryMutAct_9fa48("64") ? "" : (stryCov_9fa48("64"), "eso"), stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), "aquel"), stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), "aquella"), stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "este"), stryMutAct_9fa48("68") ? "" : (stryCov_9fa48("68"), "esta"), stryMutAct_9fa48("69") ? "" : (stryCov_9fa48("69"), "otro"), stryMutAct_9fa48("70") ? "" : (stryCov_9fa48("70"), "otra"), stryMutAct_9fa48("71") ? "" : (stryCov_9fa48("71"), "mismo"), stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), "tanto"), stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), "tan"), stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "tal"), stryMutAct_9fa48("75") ? "" : (stryCov_9fa48("75"), "solo"), stryMutAct_9fa48("76") ? "" : (stryCov_9fa48("76"), "ya"), stryMutAct_9fa48("77") ? "" : (stryCov_9fa48("77"), "desde"), stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "hasta"), stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), "entre"), stryMutAct_9fa48("80") ? "" : (stryCov_9fa48("80"), "casi"), stryMutAct_9fa48("81") ? "" : (stryCov_9fa48("81"), "además"), stryMutAct_9fa48("82") ? "" : (stryCov_9fa48("82"), "pues"), stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), "luego"), stryMutAct_9fa48("84") ? "" : (stryCov_9fa48("84"), "así")]));

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
  if (stryMutAct_9fa48("85")) {
    {}
  } else {
    stryCov_9fa48("85");
    // Busca secuencias de letras y números (elimina la puntuación).
    // Nota: El flag 'i' es para ignorar mayúsculas en el match.
    const wordRegex = stryMutAct_9fa48("87") ? /[^a-záéíóúüñ0-9]+/gi : stryMutAct_9fa48("86") ? /[a-záéíóúüñ0-9]/gi : (stryCov_9fa48("86", "87"), /[a-záéíóúüñ0-9]+/gi);

    // El .match() devuelve un array de palabras, que luego mapeamos a minúsculas.
    return stryMutAct_9fa48("90") ? text.match(wordRegex)?.map(word => word.toLowerCase()) && [] : stryMutAct_9fa48("89") ? false : stryMutAct_9fa48("88") ? true : (stryCov_9fa48("88", "89", "90"), (stryMutAct_9fa48("91") ? text.match(wordRegex).map(word => word.toLowerCase()) : (stryCov_9fa48("91"), text.match(wordRegex)?.map(stryMutAct_9fa48("92") ? () => undefined : (stryCov_9fa48("92"), word => stryMutAct_9fa48("93") ? word.toUpperCase() : (stryCov_9fa48("93"), word.toLowerCase()))))) || (stryMutAct_9fa48("94") ? ["Stryker was here"] : (stryCov_9fa48("94"), [])));
  }
}
function countSentences(text: string): number {
  if (stryMutAct_9fa48("95")) {
    {}
  } else {
    stryCov_9fa48("95");
    const sentenceRegex = stryMutAct_9fa48("99") ? /[.!?]+(\S|$)/g : stryMutAct_9fa48("98") ? /[.!?]+(\s)/g : stryMutAct_9fa48("97") ? /[^.!?]+(\s|$)/g : stryMutAct_9fa48("96") ? /[.!?](\s|$)/g : (stryCov_9fa48("96", "97", "98", "99"), /[.!?]+(\s|$)/g);
    const matches = text.match(sentenceRegex);
    if (stryMutAct_9fa48("101") ? false : stryMutAct_9fa48("100") ? true : (stryCov_9fa48("100", "101"), matches)) {
      if (stryMutAct_9fa48("102")) {
        {}
      } else {
        stryCov_9fa48("102");
        return matches.length;
      }
    } else if (stryMutAct_9fa48("106") ? text.trim().length <= 0 : stryMutAct_9fa48("105") ? text.trim().length >= 0 : stryMutAct_9fa48("104") ? false : stryMutAct_9fa48("103") ? true : (stryCov_9fa48("103", "104", "105", "106"), (stryMutAct_9fa48("107") ? text.length : (stryCov_9fa48("107"), text.trim().length)) > 0)) {
      if (stryMutAct_9fa48("108")) {
        {}
      } else {
        stryCov_9fa48("108");
        return 1;
      }
    }
    return 0;
  }
}

/**
 * @function countParagraphs
 * La corrección anterior ya resolvió el Test 3.
 * @param {string} text - El texto a analizar.
 * @returns {number} El número total de párrafos.
 */
function countParagraphs(text: string): number {
  if (stryMutAct_9fa48("109")) {
    {}
  } else {
    stryCov_9fa48("109");
    const trimmedText = stryMutAct_9fa48("110") ? text : (stryCov_9fa48("110"), text.trim());
    if (stryMutAct_9fa48("113") ? trimmedText !== "" : stryMutAct_9fa48("112") ? false : stryMutAct_9fa48("111") ? true : (stryCov_9fa48("111", "112", "113"), trimmedText === (stryMutAct_9fa48("114") ? "Stryker was here!" : (stryCov_9fa48("114"), "")))) {
      if (stryMutAct_9fa48("115")) {
        {}
      } else {
        stryCov_9fa48("115");
        return 0;
      }
    }
    // Divide por DOBLE salto de línea o más.
    const paragraphs = stryMutAct_9fa48("116") ? trimmedText.split(/\r?\n\s*\r?\n/) : (stryCov_9fa48("116"), trimmedText.split(stryMutAct_9fa48("120") ? /\r?\n\s*\r\n/ : stryMutAct_9fa48("119") ? /\r?\n\S*\r?\n/ : stryMutAct_9fa48("118") ? /\r?\n\s\r?\n/ : stryMutAct_9fa48("117") ? /\r\n\s*\r?\n/ : (stryCov_9fa48("117", "118", "119", "120"), /\r?\n\s*\r?\n/)).filter(stryMutAct_9fa48("121") ? () => undefined : (stryCov_9fa48("121"), p => stryMutAct_9fa48("124") ? p.trim() === '' : stryMutAct_9fa48("123") ? false : stryMutAct_9fa48("122") ? true : (stryCov_9fa48("122", "123", "124"), (stryMutAct_9fa48("125") ? p : (stryCov_9fa48("125"), p.trim())) !== (stryMutAct_9fa48("126") ? "Stryker was here!" : (stryCov_9fa48("126"), ''))))));

    // Si la división falla pero hay texto, devuelve 1 (la base).
    return (stryMutAct_9fa48("130") ? paragraphs.length <= 0 : stryMutAct_9fa48("129") ? paragraphs.length >= 0 : stryMutAct_9fa48("128") ? false : stryMutAct_9fa48("127") ? true : (stryCov_9fa48("127", "128", "129", "130"), paragraphs.length > 0)) ? paragraphs.length : 1;
  }
}
function getWordFrequency(words: string[]): Map<string, number> {
  if (stryMutAct_9fa48("131")) {
    {}
  } else {
    stryCov_9fa48("131");
    const frequency = new Map<string, number>();
    for (const word of words) {
      if (stryMutAct_9fa48("132")) {
        {}
      } else {
        stryCov_9fa48("132");
        frequency.set(word, stryMutAct_9fa48("133") ? (frequency.get(word) || 0) - 1 : (stryCov_9fa48("133"), (stryMutAct_9fa48("136") ? frequency.get(word) && 0 : stryMutAct_9fa48("135") ? false : stryMutAct_9fa48("134") ? true : (stryCov_9fa48("134", "135", "136"), frequency.get(word) || 0)) + 1));
      }
    }
    return frequency;
  }
}
function getTopKeywords(wordFrequency: Map<string, number>): [string, number][] {
  if (stryMutAct_9fa48("137")) {
    {}
  } else {
    stryCov_9fa48("137");
    const keywords: [string, number][] = stryMutAct_9fa48("140") ? Array.from(wordFrequency.entries()).sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      return a[0].localeCompare(b[0]);
    }).slice(0, 5) : stryMutAct_9fa48("139") ? Array.from(wordFrequency.entries()).filter(([word, _]) => !STOP_WORDS.has(word)).slice(0, 5) : stryMutAct_9fa48("138") ? Array.from(wordFrequency.entries()).filter(([word, _]) => !STOP_WORDS.has(word)).sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      return a[0].localeCompare(b[0]);
    }) : (stryCov_9fa48("138", "139", "140"), Array.from(wordFrequency.entries()).filter(stryMutAct_9fa48("141") ? () => undefined : (stryCov_9fa48("141"), ([word, _]) => stryMutAct_9fa48("142") ? STOP_WORDS.has(word) : (stryCov_9fa48("142"), !STOP_WORDS.has(word)))).sort((a, b) => {
      if (stryMutAct_9fa48("143")) {
        {}
      } else {
        stryCov_9fa48("143");
        if (stryMutAct_9fa48("146") ? b[1] === a[1] : stryMutAct_9fa48("145") ? false : stryMutAct_9fa48("144") ? true : (stryCov_9fa48("144", "145", "146"), b[1] !== a[1])) {
          if (stryMutAct_9fa48("147")) {
            {}
          } else {
            stryCov_9fa48("147");
            return stryMutAct_9fa48("148") ? b[1] + a[1] : (stryCov_9fa48("148"), b[1] - a[1]);
          }
        }
        return a[0].localeCompare(b[0]);
      }
    }).slice(0, 5));
    return keywords;
  }
}

// -------------------------- FUNCIÓN PRINCIPAL --------------------------

export function analyzeText(text: string): TextStatistics {
  if (stryMutAct_9fa48("149")) {
    {}
  } else {
    stryCov_9fa48("149");
    const words = getWords(text);
    const wordCount = words.length;
    const wordFrequency = getWordFrequency(words);
    const uniqueWordCount = wordFrequency.size;
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(stryMutAct_9fa48("150") ? /\S/g : (stryCov_9fa48("150"), /\s/g), stryMutAct_9fa48("151") ? "Stryker was here!" : (stryCov_9fa48("151"), '')).length;
    const sentenceCount = countSentences(text);
    const paragraphCount = countParagraphs(text);

    // Cálculo de promedios
    const totalWordLength = words.reduce(stryMutAct_9fa48("152") ? () => undefined : (stryCov_9fa48("152"), (sum, word) => stryMutAct_9fa48("153") ? sum - word.length : (stryCov_9fa48("153"), sum + word.length)), 0);
    const averageWordLength = (stryMutAct_9fa48("157") ? wordCount <= 0 : stryMutAct_9fa48("156") ? wordCount >= 0 : stryMutAct_9fa48("155") ? false : stryMutAct_9fa48("154") ? true : (stryCov_9fa48("154", "155", "156", "157"), wordCount > 0)) ? stryMutAct_9fa48("158") ? totalWordLength * wordCount : (stryCov_9fa48("158"), totalWordLength / wordCount) : 0;
    const averageSentenceLength = (stryMutAct_9fa48("162") ? sentenceCount <= 0 : stryMutAct_9fa48("161") ? sentenceCount >= 0 : stryMutAct_9fa48("160") ? false : stryMutAct_9fa48("159") ? true : (stryCov_9fa48("159", "160", "161", "162"), sentenceCount > 0)) ? stryMutAct_9fa48("163") ? wordCount * sentenceCount : (stryCov_9fa48("163"), wordCount / sentenceCount) : 0;

    // Palabras clave principales
    const topKeywords = getTopKeywords(wordFrequency);
    return stryMutAct_9fa48("164") ? {} : (stryCov_9fa48("164"), {
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
      topKeywords
    });
  }
}