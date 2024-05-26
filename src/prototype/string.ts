declare global {
  interface String {
    compact(start?: number, end?: number): string,
    toDecimals(dec?: number): string,
  }
}

String.prototype.compact = function (start = 4, end = 4) {
  return `${ this.substring(0, start) }...${ this.substring(this.length - end)}`
}

String.prototype.toDecimals = function (dec = 9) {
  const stringToNumber = parseInt(this.valueOf())
  const roundedNumber = Math.round(stringToNumber * (10 ** -dec) * (10 ** (dec / 3))) / (10 ** (dec / 3))
  const fixedString = roundedNumber.toFixed(2)
  const noTrailingZeros = fixedString.replace(/0+$/, '')
  const stringToFloat = parseFloat(noTrailingZeros)
  return stringToFloat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export {}
