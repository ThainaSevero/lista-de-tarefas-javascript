const form = document.getElementById('novaTarefa');
const lista = document.getElementById("lista");
//const do local de digitação
const input = document.querySelector('.tarefas');
//ve se o array está vazio ou nao
const itens = JSON.parse(localStorage.getItem('itens')) || [];

//quando a página for recarregada, itens que já estavam previamente no array, irão reaparecer
itens.forEach ( (elemento) => {
    criaTarefa(elemento);
}) 

//quando algo é digitado no formulário, guardamos o resultado
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    //pega o valor do elemento nomeado task, enviado no submit do form
    const tarefa = evento.target.elements['task'];

    //se input for vazio, avise
    if (input.value == ""){
        alert('Por favor insira uma tarefa')
        //adicionando o return evitamos que um item vazio seja criado 
        return;
    } 

    //itens.find procura algo dentro do array itens
    //primeiro parâmetro - função callback - se executa para cada item do array
    const existe = itens.find( elemento => elemento.tarefa === tarefa.value)

    const itemAtual = {
        'tarefa': tarefa.value,
    }

    //cria-se um id para cada item do array itens, assim n haverá repetições
    if (existe) {
        alert('Essa tarefa já está inserida')
        itemAtual.id = existe.id   
    } else {
        //o id de cada item será sua posição dentro do array
        itemAtual.id = itens[itens.length -1 ] ? (itens [itens.length -1]).id + 1 : 0

        criaTarefa(itemAtual);

        itens.push(itemAtual);
    }

    //armazena no localStorage
    localStorage.setItem('itens', JSON.stringify(itens)); 

    //após criar a tarefa, limpa input
    tarefa.value = "";
})

function criaTarefa(item) {
    //quando algo for inserido, ponha isso na lista
    //createElement cria elementos dentro do HTML 
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add("item");
    novaTarefa.dataset.id = item.id

    //usar innerHTML pois novatarefa é uma li, ou seja, uma tag dentro do html
    novaTarefa.innerHTML = item.tarefa;

    novaTarefa.appendChild(botaoDeleta(item.id))

    //dentro da lista foi criada uma nova tarefa
    //appendChild insere um elemento criado dentro do outro
    lista.appendChild(novaTarefa);    
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.classList.add('deleta')
    elementoBotao.innerText = 'X'

    elementoBotao.addEventListener('click', function() {
       deletaElemento(this.parentNode, id)
    })

    return elementoBotao;
}

function deletaElemento(elemento, id) {
    elemento.remove()

    //splice - remove itens
    itens.splice(itens.findIndex(item => item.id === id), 1) 

    localStorage.setItem('itens', JSON.stringify(itens));
}
