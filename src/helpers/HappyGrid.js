export default class HappyGrid {
  constructor(array, rowLength, currentElement) {
    this.array = array;
    this.rowLength = rowLength;
    this.currentElement = currentElement;
    this.firstRow = this.array.slice(0, this.rowLength);
    this.lastRow = this.array.slice(this.array.length - this.array.length % this.rowLength);
  }
  setCurrentElement(currentElement) {
    this.currentElement = currentElement;
  }
  horizontalJump(direction) {
    const anyIndex = this.array.indexOf(this.currentElement) + direction;
    const index = anyIndex % this.array.length;
    return this.array.slice(index)[0];
  }
  safeJump(cb) {
    if (!this.currentElement) {
      return this.array[0];
    } else {
      return cb();
    }
  }
  jumpLeft() {
    return this.safeJump(() => this.horizontalJump(-1));
  }
  jumpRight() {
    return this.safeJump(() => this.horizontalJump(1));
  }
  jumpDown() {
    return this.safeJump(() => {
      const currentElementIndex = this.array.indexOf(this.currentElement);
      const nextElementIndex = currentElementIndex + this.rowLength;
      if (this.array[nextElementIndex]) {
        return this.array[nextElementIndex];
      } else {
        const currentElementIndexInRow = currentElementIndex % this.rowLength;
        return this.firstRow[currentElementIndexInRow] || this.currentElement;
      }
    });
  }
  // There must be a better way to do this.
  jumpUp() {
    return this.safeJump(() => {
      const currentElementIndex = this.array.indexOf(this.currentElement);
      const nextElementIndex = currentElementIndex - this.rowLength;
      if (this.array[nextElementIndex]) {
        return this.array[nextElementIndex];
      } else {
        const currentElementIndexInRow = currentElementIndex % this.rowLength;
        const matchingLastRowElement = this.lastRow[currentElementIndexInRow];
        if (matchingLastRowElement) {
          return matchingLastRowElement;
        } else {
          const lastMatchingElementIndex = this.array.length -
                                           this.lastRow.length -
                                           this.rowLength +
                                           currentElementIndexInRow;
          return this.array[lastMatchingElementIndex] || this.currentElement;
        }
      }
    });
  }
}
