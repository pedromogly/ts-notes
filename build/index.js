"use strict";
let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button');
let datahora = document.getElementById('data');
let xp = document.getElementById('xp');
let start = document.getElementById('start');
let totalview = document.getElementById('totalxp');
let levelview = document.getElementById('level');
let prox = document.getElementById('prox');
let totalXp = localStorage.getItem('@totalXp') || 0;
let level = localStorage.getItem('@level') || 1;
totalview.innerHTML = `Total XP Acumulado: ${totalXp}`;
levelview.innerHTML = `Level: ${level}`;
let listaSalva = localStorage.getItem('@listagem_tarefas');
let tarefas = listaSalva !== null && JSON.parse(listaSalva) || [];
setInterval(() => {
    let criarData = new Date();
    datahora.innerHTML = `${criarData.getHours()}:${criarData.getMinutes()}:${criarData.getSeconds()}`;
}, 1000);
let ligar = false;
let interval;
let xpNow = 0;
let snapshot = localStorage.getItem('@snapshot') || 12;
prox.innerHTML = `Proximo nivel ${totalXp}/${snapshot}`;
function xpF() {
    if (ligar === false) {
        ligar = true;
        start.innerHTML = 'Stop';
        interval = setInterval(() => {
            xpNow++;
            totalXp = Number(totalXp) + 1;
            xp.innerHTML = `${xpNow}`;
            totalview.innerHTML = `Total XP acumulado: ${totalXp}`;
            upgrade();
            let snapshotView = Number(snapshot);
            let snapshotViewNumber = snapshotView.toFixed(0);
            prox.innerHTML = `Proximo nivel ${totalXp}/${snapshotViewNumber}`;
        }, 1000);
    }
    else {
        ligar = false;
        clearInterval(interval);
        //totalXp = Number(totalXp) + xpNow
        localStorage.setItem('@totalXp', JSON.stringify(totalXp));
        start.innerHTML = 'Start';
        xpNow = 0;
        xp.innerHTML = `${xpNow}`;
    }
}
function upgrade() {
    if (Number(totalXp) >= Number(snapshot)) {
        level = Number(level) + 1;
        snapshot = Number(snapshot) * 1.2;
        localStorage.setItem('@snapshot', JSON.stringify(snapshot));
        console.log(snapshot);
        localStorage.setItem('@level', JSON.stringify(level));
        levelview.innerHTML = `Level: ${level}`;
    }
    console.log(snapshot);
}
function addTarefa() {
    if (inputElement.value) {
        console.log('addTarefa funcionando');
        let tarefaDigitada = inputElement.value;
        tarefas.push(tarefaDigitada);
        inputElement.value = '';
        salvarDados();
        listarTarefas();
    }
    else {
        alert('DIGITE ALGO DOENTE');
    }
}
buttonElement.addEventListener('click', () => {
    addTarefa();
    console.log(tarefas);
});
function salvarDados() {
    //ao salvar um array no local storage, é necessario converter em string
    localStorage.setItem('@listagem_tarefas', JSON.stringify(tarefas));
}
function listarTarefas() {
    listElement.innerHTML = '';
    tarefas.map(item => {
        let posicao = tarefas.indexOf(item);
        let liElement = document.createElement('li');
        let liText = document.createTextNode(item);
        let linkText = document.createTextNode('Excluir');
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('onclick', `deletarTarefa(${posicao})`);
        linkElement.appendChild(linkText);
        liElement.appendChild(liText);
        listElement.appendChild(linkElement);
        listElement.appendChild(liElement);
    });
}
listarTarefas();
function deletarTarefa(pos) {
    tarefas.splice(pos, 1);
    listarTarefas();
    salvarDados();
}
