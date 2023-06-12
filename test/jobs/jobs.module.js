import { errorNumberAsArgument } from './utils/error-message.js';

export default {
  counter: function(amount) {
    if (typeof amount !== 'number') {
      throw new TypeError(errorNumberAsArgument);
    }

    let count = 0;

    for (let i = 0; i < amount; i++) {
      count++;
    }

    return count;
  },

  factorial: function(num) {
    if (typeof num !== 'number') {
      throw new TypeError(errorNumberAsArgument);
    }

    const firstNumbers = [0, 1];
    return firstNumbers.includes(num) ? 1 : num * this.factorial(num - 1);
  },
};
