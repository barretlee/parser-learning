import Lexer from '../../src/ListLexer';

describe('list lexer', () => {

  it('#array', () => {
    const code = ' [a , b ] ';
    const lexer = new Lexer(code);
    let t, ret = [];
    while(t = lexer.nextToken(), t.type !== Lexer.EOF_TYPE) {
      ret.push(t.text);
      // console.log(t.toString(Lexer.tokenNames));
    }
    expect(ret.join('')).to.eql('[a,b]');
  });
  
});