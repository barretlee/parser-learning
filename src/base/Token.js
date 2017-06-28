export default class Token {

  constructor(type, text) {
    this.type = type;
    this.text = text;
  }

  toString(directory) {
    let type = directory ? directory[this.type] : this.type;
    return `<'${this.text}', ${type}>`;
  }

}