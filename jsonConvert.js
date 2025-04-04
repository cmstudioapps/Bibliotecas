// jsonConverter.js
const jsonConverter = (() => {
  function toJSON(data) {
    try {
      if (Array.isArray(data) || typeof data === 'object') {
        return JSON.stringify(data, null, 2); // com identação
      } else {
        throw new Error('Tipo inválido. Apenas objetos ou arrays são permitidos.');
      }
    } catch (err) {
      return `Erro ao converter para JSON: ${err.message}`;
    }
  }

  return {
    toJSON
  };
})();

// Exemplo de uso:
const obj = { nome: 'Caio', idade: 25 };
const arr = [1, 2, 3];

console.log(jsonConverter.toJSON(obj));
console.log(jsonConverter.toJSON(arr));