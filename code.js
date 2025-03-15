(function () {
    const charMap = { ".": "X1", "#": "X2", "$": "X3", "[": "X4", "]": "X5" };
    const reverseCharMap = Object.fromEntries(Object.entries(charMap).map(([k, v]) => [v, k]));

    function encodeKey(key) {
        return btoa(key.split("").reverse().join(""))
            .replace(/[.=+/]/g, m => charMap[m] || m);
    }

    function decodeKey(encodedKey) {
        let base64Key = encodedKey.replace(/X[1-5]/g, m => reverseCharMap[m] || m);
        return atob(base64Key).split("").reverse().join("");
    }

    function encodeValue(value) {
        if (typeof value !== "string") value = JSON.stringify(value);
        let scrambled = btoa(value).split("").reverse().join("");
        return scrambled.replace(/[.=+/]/g, m => charMap[m] || m);
    }

    function decodeValue(encodedValue) {
        let unscrambled = encodedValue.replace(/X[1-5]/g, m => reverseCharMap[m] || m);
        return JSON.parse(atob(unscrambled.split("").reverse().join("")));
    }

    function x(obj) {
        if (typeof obj !== "object" || obj === null) return encodeValue(obj);
        let encodedObj = {};
        for (let key in obj) {
            let newKey = encodeKey(key);
            let value = obj[key];
            encodedObj[newKey] = typeof value === "object" ? x(value) : encodeValue(value);
        }
        return encodedObj;
    }

    function y(obj) {
        if (typeof obj !== "object" || obj === null) return decodeValue(obj);
        let decodedObj = {};
        for (let key in obj) {
            let newKey = decodeKey(key);
            let value = obj[key];
            decodedObj[newKey] = typeof value === "object" ? y(value) : decodeValue(value);
        }
        return decodedObj;
    }

    window.code = { x, y };
})();