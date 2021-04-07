const { odd, even } = require("./var");

checkOddOrEven = (num) => {
  if (num % 2) {
    return odd;
  }
  return even;
};

module.exports = checkOddOrEven;
