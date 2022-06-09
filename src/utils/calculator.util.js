import BigNumber from "bignumber.js";

const numberToBigNumber = (number, decimal = 7) => {
  return BigNumber(number).decimalPlaces(decimal);
};

export {
  numberToBigNumber
};