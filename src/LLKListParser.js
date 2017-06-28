import ListParser from './ListParser';

/**
 * LL(k) 语法解析器
 * 
 * @export
 * @class LLKListParser
 * @extends {ListParser}
 */
export default class LLKListParser extends ListParser {

  lookahead = [];
  k = 2;
  llkp = 0;

  /**
   * rewrite constructor, accept two param
   * 
   * @param {any} input - code
   * @param {any} k - forward count
   * @memberof LLKListParser
   */
  constructor(input, k) {
    super(input);
    this.k = k || 1;
    for (let i = 0; i < this.k; i++) {
      this.nextToken();
    }
  }

  /**
   * rewrite consume method
   * 
   * @memberof ListLexer
   */
  consume() {
    const p = ++this.p;
    const input = this.input;
    if (p >= input.length) {
      this.c = LLKListParser.EOF;
    } else {
      this.c = input.charAt(p);
    }
  }

  /**
   * 返回第 i 个向前看词法单元的类型
   * 
   * @param {any} i 
   * @returns 
   * @memberof LLKListParser
   */
  LA(i) {
    return this.LT(i).type;
  }

  /**
   * 返回第 i 个向前看词法单元
   * 
   * @param {any} i 
   * @returns 
   * @memberof LLKListParser
   */
  LT(i) {
    return this.lookahead[(this.llkp + i - 1) % this.k];
  }

  /**
   * rewrite match method
   * 
   * @memberof LLKListParser
   */
  match(x) {
    if (this.LA(1) === x) {
      this.lookahead.shift();
      this.nextToken(token => {
        this.lookahead.push(token);
        return token;
      });
    } else {
      throw new Error(`expecting ${this.getTokenName(x)}; found ${this.LT(1)}`)
    }
  }

  /**
   * rewrite element method
   * 
   * @memberof LLKListParser
   */
  elements() {
    this.element();
    while(this.LA(1) === ListParser.COMMA) {
      this.match(ListParser.COMMA);
      this.element();
    }
  }

  /**
   * rewrite element method
   * element: NAME '=' NAME | NAME | list
   * 
   * @memberof LLKListParser
   */
  element() {
    if (this.LA(1) === LLKListParser.NAME 
      && this.LA(2) === LLKListParser.EQUALS) {
      this.match(LLKListParser.NAME);
      this.match(LLKListParser.EQUALS);
      this.match(LLKListParser.NAME);
    } else if (this.LA(1) === LLKListParser.NAME) {
      this.match(LLKListParser.NAME);
    } else if (this.LA(1) === LLKListParser.LBRACK ){
      this.list();
    } else {
      throw new Error(`expecting name or list; found ${this.LT(1)}`);
    }
  }

}