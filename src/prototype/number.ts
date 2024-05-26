declare global {
  interface Number {
    toDecimals(dec?: number): string,
  }
}

Number.prototype.toDecimals = function (dec = 9) {
  return (Math.round((this.valueOf() * (10 ** -dec) * (10 ** (dec / 3)))) / (10 ** (dec / 3))).toFixed(3).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

export {}
