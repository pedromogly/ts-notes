const input1 = document.getElementById('num1') as HTMLInputElement
const input2 = document.getElementById('num2') as HTMLInputElement
const btsom = document.getElementById('btsom') as HTMLElement
const btsub = document.getElementById('btsub') as HTMLElement

type Operacoes = 'SOM' | 'SUB'

interface Valores{
    tipo: Operacoes
    a: number
    b: number
}

function operacao({tipo,a,b}: Valores){
    if(tipo === 'SOM'){
        return a+b
    } else{
        return a-b
    }
}

btsom.addEventListener('click', ()=>{
    const resultado = operacao({
        tipo: 'SOM',
        a: Number(input1.value),
        b: Number(input2.value)
    })
    input1.value = ''
    input2.value = ''
    console.log(resultado)
})

btsub.addEventListener('click', ()=>{
    const resultado = operacao({
        tipo: 'SUB',
        a: Number(input1.value),
        b: Number(input2.value)
    })
    input1.value = ''
    input2.value = ''
    console.log(resultado)
})