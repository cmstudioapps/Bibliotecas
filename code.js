(function () {
    const charMap = { ".": "X1", "#": "X2", "$": "X3", "[": "X4", "]": "X5" };
    const reverseCharMap = Object.fromEntries(Object.entries(charMap).map(([k, v]) => [v, k]));

    // Função para codificar as chaves
    function encodeKey(key) {
        if (!key) return key;
        return btoa(key.split("").reverse().join(""))
            .replace(/[.=+/]/g, m => charMap[m] || m);
    }

    // Função para decodificar as chaves
    function decodeKey(encodedKey) {
        if (!encodedKey) return encodedKey;
        let base64Key = encodedKey.replace(/X[1-5]/g, m => reverseCharMap[m] || m);
        return atob(base64Key).split("").reverse().join("");
    }

    // Função para codificar os valores
    function encodeValue(value) {
        if (value === null || value === undefined) return value;
        if (typeof value !== "string") value = JSON.stringify(value);
        let scrambled = btoa(value).split("").reverse().join("");
        return scrambled.replace(/[.=+/]/g, m => charMap[m] || m);
    }

    // Função para decodificar os valores
    function decodeValue(encodedValue) {
        if (encodedValue === null || encodedValue === undefined) return encodedValue;
        let unscrambled = encodedValue.replace(/X[1-5]/g, m => reverseCharMap[m] || m);
        return JSON.parse(atob(unscrambled.split("").reverse().join("")));
    }

    // Função principal para codificar qualquer objeto
    function x(obj) {
        if (obj === null || obj === undefined) return obj;
        if (typeof obj !== "object") return encodeValue(obj);
        let encodedObj = {};
        for (let key in obj) {
            let newKey = encodeKey(key);
            let value = obj[key];
            encodedObj[newKey] = typeof value === "object" ? x(value) : encodeValue(value);
        }
        return encodedObj;
    }

    // Função principal para decodificar qualquer objeto
    function y(obj) {
        if (obj === null || obj === undefined) return obj;
        if (typeof obj !== "object") return decodeValue(obj);
        let decodedObj = {};
        for (let key in obj) {
            let newKey = decodeKey(key);
            let value = obj[key];
            decodedObj[newKey] = typeof value === "object" ? y(value) : decodeValue(value);
        }
        return decodedObj;
    }

    // Função para codificar todas as variáveis globais ou locais no escopo
    function encodeAll() {
        for (let key in window) {
            if (typeof window[key] !== 'function' && window[key] !== null && window[key] !== undefined) {
                window[key] = x(window[key]);
            }
        }
    }

    // Função para decodificar todas as variáveis globais ou locais no escopo
    function decodeAll() {
        for (let key in window) {
            if (typeof window[key] !== 'function' && window[key] !== null && window[key] !== undefined) {
                window[key] = y(window[key]);
            }
        }
    }

    window.code = { x, y, encodeAll, decodeAll };
})();