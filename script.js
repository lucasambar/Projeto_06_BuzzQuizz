/*
// Gustavo
function pegarperguntasdeumquiz(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ");
    promessa.then(exibirperguntasdeumquiz);
    /*Fazer catch*
    promessa.catch();
}

function exibirperguntasdeumquiz(r){
    const quiz = r.data;
    const paginadoquiz = document.createElement('div');
    paginadoquiz.classList.add("paginadoquiz");
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
    let j = 0;
    for(let j = 0; j < perguntas.length; j++){
        perguntasinnerhtml += `<div class="perguntadoquiz">
                                   <div class="titulodapergunta">
                                        ${perguntas[j].title}
                                   </div>
                                   <div class="containerdeopçoes">`;
        for(let i = 0; i <perguntas[j].answers.length; i++){
            perguntasinnerhtml += `
                    <div class="opçao">
                        <img src="${perguntas[j].answers[i].image}">
                        <h4>
                           ${perguntas[j].answers[i].text}
                        </h4>
                    </div>
                    `;
        }
        perguntasinnerhtml += `</div></div>`
    }

}

function comparador() { 
	return Math.random() - 0.5; 
}

function respostasaleatorias(pergunta){
    pergunta.answers.sort(comparador);
    return pergunta;
}
// Gustavo
*/

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
