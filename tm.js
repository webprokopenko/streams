const { Export1 } = require('./export');

const exp1 = new Export1;

//console.log(exp1.name);

exp1.name = 'New name';

//console.log(exp1.name);

//console.log(typeof exp1);

Object.keys(exp1).forEach(element => {
    console.log(exp1[element]);
})

const t = 'JKJKJKJ___---'.split('_');

console.log(t);