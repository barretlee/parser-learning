import Lexer from '../../src/base/Lexer';

describe('base lexer', () => {

  it('#array', () => {
    const code = ' [a , b ] ';
    const lexer = new Lexer(code);
    for (let i = 0, len = code.length; i < len; i++) {
      lexer.match(code[i]);
    }
  });
  
});