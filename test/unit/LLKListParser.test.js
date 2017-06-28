import LLKParser from '../../src/LLKListParser';

describe('LL(k) parser', () => {

  it('#array', () => {
    const code = '[a , b ] ';
    const parser = new LLKParser(code, 2);
    parser.list();
  });

  it('#array parse error', () => {
    const code = '[a,] ';
    const parser = new LLKParser(code, 2);
    try {
      parser.list();
    } catch(e) {
      expect(e).not.to.eql(null);
    }
  });
  
});