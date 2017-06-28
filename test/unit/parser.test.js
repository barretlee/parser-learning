import Parser from '../../src/ListParser';

describe('parser', () => {

  it('#array', () => {
    const code = '[a , b ] ';
    const parser = new Parser(code);
    parser.nextToken();
    parser.list();
  });
  
});