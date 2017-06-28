import Lexer from './base/Lexer';
import Token from './base/Token';

/**
 * LL(1) 词法解析器 + lookahead(1)
 * 
 * @export
 * @class ListLexer
 * @extends {Lexer}
 */
export default class ListLexer extends Lexer {
  
  static NAME = 2;
  static COMMA = 3;
  static LBRACK = 4;
  static RBRACK = 5;
  static EQUALS = 6;
  static tokenNames = ['n/a', '<EOF>', 'NAME', 'COMMA', 'LBRACK', 'RBRACK', 'EQUALS'];

  lookahead = null;

  /**
   * rewrite match method
   * 
   * @param {any} x 
   * @memberof ListLexer
   */
  match(x) {
    if (this.lookahead.type === x) {
      this.nextToken();
    } else {
      throw new Error(`expecting ${x}; found ${this.c}`);
    }
  }

  getTokenName(x) {
    return ListLexer.tokenNames[x];
  }

  isLETTER() {
    return /[a-zA-Z]/.test(this.c);
  }

  nextToken(resolve) {
    resolve = resolve || (token => {
      if (this.lookahead instanceof Array) {
        // compatiable for LL(k)
        this.lookahead.push(token);
      } else {
        this.lookahead = token;
      }
      return token;
    });
    while(this.c !== ListLexer.EOF) {
      switch(this.c) {
        case ' ':
        case '\t':
        case '\n':
        case '\r':
          this.wordspace();
          continue;
        case ',':
          this.consume();
          return resolve(new Token(ListLexer.COMMA, ','));
          break;
        case '[':
          this.consume();
          return resolve(new Token(ListLexer.LBRACK, '['));
          break;
        case ']':
          this.consume();
          return resolve(new Token(ListLexer.RBRACK, ']'));
          break;
        default:
          if (this.isLETTER()) {
            return resolve(this.getName());
          }
          throw new Error(`invalid charactor: ${this.c}`);
      }
    }
    const eofTokenName = this.getTokenName(ListLexer.EOF_TYPE);
    return resolve(new Token(ListLexer.EOF_TYPE, eofTokenName));
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