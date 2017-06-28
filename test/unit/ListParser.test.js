import Parser from '../../src/ListParser';

describe('LL(1) parser', () => {

  it('#array', () => {
    const code = '[a , b ] ';
    const parser = new Parser(code);
    parser.nextToken();
    parser.list();
  });

  it('#array parse error', () => {
    const code = '[a,] ';
    const parser = new Parser(code);
    parser.nextToken();
    try {
      parser.list();
    } catch(e) {
      expect(e).not.to.eql(null);
    }
  });
  
});