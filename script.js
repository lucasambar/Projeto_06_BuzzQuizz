
// Gustavo
let counterdeacertos = 0;

function pegarperguntasdeumquiz(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ");
    promessa.then(exibirperguntasdeumquiz);
    /*Fazer catch*/
    promessa.catch();
}

function exibirperguntasdeumquiz(r){
    const quiz = r.data;
    const paginadoquiz = document.querySelector('.paginadoquiz');
    paginadoquiz.classList.remove("hidden");
    paginadoquiz.innerHTML = `<figure class="bannerdoquiz" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url("${quiz.image}");">
    <figcaption>
        <h3 class="titulobanner">${quiz.title}</h3>
    </figcaption>
</figure>
    `;
    let perguntas = quiz.questions;
    perguntas.sort(comparador);
    perguntas.map(respostasaleatorias);
    let perguntasinnerhtml = "";
    let perguntaslen = perguntas.length;
    for(let j = 0; j < perguntas.length; j++){
        perguntasinnerhtml += `<div class="perguntadoquiz">
                                   <div class="titulodapergunta" style="background-color:${perguntas[j].color};>
                                        ${perguntas[j].title}
                                   </div>
                                   <div class="containerdeopçoes container${j}">`;
        for(let i = 0; i <perguntas[j].answers.length; i++){
            perguntasinnerhtml += `
                    <div class="opçao" onclick="escolhadeopçoes(this,${j}, ${perguntaslen})" data-true="${perguntas[j].answers[i].isCorrectAnswer}">
                        <img src="${perguntas[j].answers[i].image}">
                        <h4>
                           ${perguntas[j].answers[i].text}
                        </h4>
                    </div>
                    `;
        }
        perguntasinnerhtml += `</div></div>`
    }
    // loop aqui
    for(let a = 0; a < quiz.levels.length;a++){
        perguntasinnerhtml += `<div class="level ${"level" + a} hidden data-minvalue="${quiz.levels[a].minValue}">
    <div class="textodefinalizaçao">
        ${quiz.levels[a].title}
    </div>
    <img class="imagemdefinalizaçao" src="${quiz.levels[a].image}">
    <div class="conclusaofinalizaçao">
        ${quiz.levels[a].text}
    </div>
</div>
    `;
    };
    perguntasinnerhtml += `<button class="reiniciarquiz hidden" onclick="reiniciarquiz()">Reiniciar Quiz</button>
    <a class="voltarparahome hidden" onclick="voltarparahome(this)">Voltar para Home</a>
    `;
}

function comparador() { 
	return Math.random() - 0.5; 
}

function respostasaleatorias(pergunta){
    pergunta.answers.sort(comparador);
    return pergunta;
}

function escolhadeopçoes(t, numerodocontainer, length){
   let selecionado = document.querySelector('.opçaoescolhida');
   let container = document.querySelector('.container' + numerodocontainer);
   if(selecionado != null){}
   else{
    selecionado = t;
    selecionado.classList.add("opçaoescolhida");
    let container2 = Array.from(container.children).map((elemento) => {elemento.classList.add("opaco");return elemento;});
    selecionado.classList.remove("opaco");
    if(selecionado.dataset.true === "true"){
        selecionado.classList.add("opçaocorreta");
        counterdeacertos++;
    }
    else{
        selecionado.classList.add("opçaoerrada");
    };
    const timeout = setTimeout(scrollarparaaproxima, 2000, numerodocontainer);
   };

   function scrollarparaaproxima(numerodocontainer){
    let proxima = document.querySelector('.container' + (numerodocontainer + 1));
    let resultado = parseInt(counterdeacertos / length * 100);
    if(proxima != null){
        proxima.scrollIntoView();
    }
    else{
        let definirproxima = document.querySelectorAll('.level');
        for(const i of definirproxima){
            if(resultado >= i.dataset.minvalue){
                /* funciona porque estao em ordem crescente */
                proxima = i;
            }
        }
        proxima.classList.remove("hidden");
        proxima.scrollIntoView();
        proxima.firstChild.textContent = `${resultado}% de acerto: ` + proxima.firstChild.textContent;
        /*aqui vem o calculo provavelmente, e precisa selecionar o level corretos*/
        counterdeacertos = 0;
    }
   }
}

function reiniciarquiz(){
    let paginadoquiz = document.querySelector('.paginadoquiz');
    paginadoquiz.innerHTML = "";
    paginadoquiz.classList.add("hidden");
    const header = document.querySelector(".header");
    header.scrollIntoView();
    pegarperguntasdeumquiz();
}

function voltarparahome(){
    let paginadoquiz = document.querySelector('.paginadoquiz');
    paginadoquiz.innerHTML = "";
    paginadoquiz.classList.add("hidden");
    const header = document.querySelector(".header");
    header.scrollIntoView();

}
// Gustavo

// Duda // 

// etapa 2: preciso pegar as receitas no servidor ( enviar a cartinha ) 

let quizzes= [];
const dados= axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
 dados.then(renderizarQuizzes);

// etapa 3: receber a resposta (cartinha) do servidor 

function responseQuizzes (response) {
    console.log(response);
    quizzes=response.data;
}

// etapa 4: processar a resposta e mostrar na tela ( renderizar ) as receitas
const ul = document.querySelector('.quizzes-cards');

function renderizarQuizzes(response){
    const quizzes=response.data;
    ul.innerHTML= '';
    let html = '';
    
    for ( let i= 0; i < quizzes.length; i++){
         html += `
            <li class="quizz" quizz-id=${quizzes[i].id}>
                <figure class="image-quizz">
                    <img src=${quizzes[i].image} />
                    <figcaption>
                        <h3 class="title">
                            ${quizzes[i].title}
                        </h3>
                    </figcaption>
                </figure>
            </li>
        `
    }
    ul.innerHTML = html;
}
