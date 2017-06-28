list    : '[' elements ']' ;
elements: element (',' element)* ;
element : NAME '=' NAME
        | NAME 
        | list
        ;