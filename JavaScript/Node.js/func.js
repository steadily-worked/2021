const { odd, even } = require("./var").default;

checkOddOrEven = (num) => {
  if (num % 2) {
    return odd;
  }
  return even;
};

module.exports = checkOddOrEven;
