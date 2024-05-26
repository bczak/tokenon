declare global {
  interface Number {
    toTON(): string,
  }
}

Number.prototype.toTON = function () {
  return (Math.round((this.valueOf() * (10 ** -9) * 1000)) / 1000).toFixed(3).replace('.', ',')
}

export {}
