import ListLexer from './ListLexer';

export default class ListParser extends ListLexer {

  constructor(input) {
    super(input);
  }

  // list: '[' elements ']' ;
  list() {
    this.match(ListLexer.LBRACK);
    this.elements();
    this.match(ListLexer.RBRACK);
  }

  // elements: element (',' element)* ;
  elements() {
    this.element();
    while(this.lookahead.type === ListLexer.COMMA) {
      this.match(ListLexer.COMMA);
      this.element();
    }
  }

  // element: NAME | list;
  element() {
    const lookahead = this.lookahead;
    if (lookahead.type === ListLexer.NAME) {
      this.match(ListLexer.NAME);
    } else if (lookahead.type === ListLexer.LBRACK) {
      this.list();
    } else {
      throw new Error(`expecting name or list; found ${lookahead}`);
    }
  }

}