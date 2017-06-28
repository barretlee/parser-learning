list: '[' elements ']' ;
elements: element (',' element)* ;
element: NAME | list;