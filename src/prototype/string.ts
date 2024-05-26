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
  return (Math.round((parseInt(this.valueOf()) * (10 ** -dec) * (10 ** (dec / 3)))) / (10 ** (dec / 3))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export {}
