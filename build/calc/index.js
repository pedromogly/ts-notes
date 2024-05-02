"use strict";
const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
const btsom = document.getElementById('btsom');
const btsub = document.getElementById('btsub');
function operacao({ tipo, a, b }) {
    if (tipo === 'SOM') {
        return a + b;
    }
    else {
        return a - b;
    }
}
btsom.addEventListener('click', () => {
    const resultado = operacao({
        tipo: 'SOM',
        a: Number(input1.value),
        b: Number(input2.value)
    });
    input1.value = '';
    input2.value = '';
    console.log(resultado);
});
btsub.addEventListener('click', () => {
    const resultado = operacao({
        tipo: 'SUB',
        a: Number(input1.value),
        b: Number(input2.value)
    });
    input1.value = '';
    input2.value = '';
    console.log(resultado);
});
