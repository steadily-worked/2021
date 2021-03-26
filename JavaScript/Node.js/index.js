const { odd, even } = require("./var").default;
const checkNumber = require("./func");

checkStringOddOrEven = (str) => {
  if (str.length % 2) {
    // 홀수면
    return odd;
  }
  return even;
};

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
