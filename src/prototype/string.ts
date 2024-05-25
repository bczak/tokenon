declare global {
  interface String {
    compact(start?: number, end?: number): string,
    toTON(): string,
  }
}

String.prototype.compact = function (start = 4, end = 4) {
  return `${ this.substring(0, start) }...${ this.substring(this.length - end)}`
}

String.prototype.toTON = function () {
  return (Math.round((parseInt(this.valueOf()) * (10 ** -9) * 1000)) / 1000).toFixed(3).replace('.', ',')
}

export {}
