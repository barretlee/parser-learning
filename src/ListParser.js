import ListLexer from './ListLexer';

/**
 * LL(1) 语法解析器
 * 
 * @export
 * @class ListParser
 * @extends {ListLexer}
 */
export default class ListParser extends ListLexer {

  constructor(input) {
    super(input);
  }

  // list: '[' elements ']' ;
  list() {
    this.match(ListParser.LBRACK);
    this.elements();
    this.match(ListParser.RBRACK);
  }

  // elements: element (',' element)* ;
  elements() {
    this.element();
    while(this.lookahead.type === ListParser.COMMA) {
      this.match(ListParser.COMMA);
      this.element();
    }
  }

  // element: NAME | list;
  element() {
    const lookahead = this.lookahead;
    if (lookahead.type === ListParser.NAME) {
      this.match(ListParser.NAME);
    } else if (lookahead.type === ListParser.LBRACK) {
      this.list();
    } else {
      throw new Error(`expecting name or list; found ${lookahead}`);
    }
  }

}