/**
 * Base Parser, Abstract Class
 * 
 * @export
 * @class Lexer
 */
export default class Lexer {

  static EOF = -1;
  static EOF_TYPE = 1;
  c = null;
  p = 0;

  constructor(input) {
    this.input = input;
    this.c = input.charAt(this.p);
  }

  consume() {
    const p = ++this.p;
    const input = this.input;
    if (p >= input.length) {
      this.c = Lexer.EOF;
    } else {
      this.c = input.charAt(p);
    }
  }

  match(x) {
    if (this.c === x) {
      this.consume();
    } else {
      throw new Error(`expecting ${x}; found ${this.c}`);
    }
  }

  nextToken() {}

  getTokenName() {}

}