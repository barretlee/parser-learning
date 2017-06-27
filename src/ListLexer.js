import Lexer from './Lexer';
import Token from './Token';

export default class ListLexer extends Lexer {
  
  static NAME = 2;
  static COMMA = 3;
  static LBRACK = 4;
  static RBRACK = 5;
  static tokenNames = ['n/a', '<EOF>', 'NAME', 'COMMA', 'LBRACK', 'RBRACK'];

  getTokenName(x) {
    return ListLexer.tokenNames[x];
  }

  isLETTER() {
    return /[a-zA-Z]/.test(this.c);
  }

  nextToken() {
    while(this.c !== Lexer.EOF) {
      switch(this.c) {
        case ' ':
        case '\t':
        case '\n':
        case '\r':
          this.wordspace();
          continue;
        case ',':
          this.consume();
          return new Token(ListLexer.COMMA, ',');
        case '[':
          this.consume();
          return new Token(ListLexer.LBRACK, '[');
        case ']':
          this.consume();
          return new Token(ListLexer.RBRACK, ']');
        default:
          if (this.isLETTER()) {
            return this.getName();
          }
          throw new Error(`invalid charactor: ${this.c}`);
      }
    }
    return new Token(Lexer.EOF_TYPE, this.getTokenName(Lexer.EOF_TYPE));
  }

  wordspace() {
    let c = this.c;
    while(c === ' ' || c === '\t' || c === '\r' || c === '\n') {
      this.consume();
      c = this.c;
    }
  }

  getName() {
    const buf = [];
    while(this.isLETTER()) {
      buf.push(this.c);
      this.consume();
    }
    return new Token(ListLexer.NAME, buf.join(''));
  }

}