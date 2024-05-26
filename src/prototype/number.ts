declare global {
  interface Number {
    toDecimals(dec?: number): string,
  }
}

Number.prototype.toDecimals = function (dec = 9) {
  const thiValue = this.valueOf()
  const roundedNumber = Math.round(thiValue * (10 ** -dec) * (10 ** (dec / 3))) / (10 ** (dec / 3))
  const fixedString = roundedNumber.toFixed(3)
  const noTrailingZeros = fixedString.replace(/0+$/, '')
  const stringToFloat = parseFloat(noTrailingZeros)
  return stringToFloat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export {}
