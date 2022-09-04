
// Gustavo
let counterdeacertos = 0;
let iddoquiz;
function pegarperguntasdeumquiz(id){
    if(!iddoquiz) {
        iddoquiz = id;
    }
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${iddoquiz}`);
    promessa.then(exibirperguntasdeumquiz);
    /*Fazer catch*/
    promessa.catch((err) => console.log(err));
}

function comparador() { 
	return Math.random() - 0.5; 
}

function respostasaleatorias(pergunta){
    pergunta.answers.sort(comparador);
    return pergunta;
}

function exibirperguntasdeumquiz(r){
    const quiz = r.data;
    const gamequizzpagina = document.querySelector('.game-quizz');
    const paginadoquiz = document.querySelector('.paginadoquiz');
    gamequizzpagina.classList.remove("hidden");
    let perguntas = quiz.questions;
    perguntas.sort(comparador);
    perguntas.map(respostasaleatorias);
    let perguntasinnerhtml = "";
    let perguntaslen = perguntas.length;
    paginadoquiz.innerHTML += `
    <figure class="bannerdoquiz" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quiz.image});background-repeat: no-repeat;background-size: cover">
        <figcaption>
            <h3 class="titulobanner">${quiz.title}</h3>
        </figcaption>
    </figure>
    <div class="perguntasdoquiz">
    `;

    for(let j = 0; j < perguntas.length; j++){
        perguntasinnerhtml += 
        `<div class="perguntadoquiz">
            <div class="titulodapergunta" style="background-color:${perguntas[j].color};">
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
        perguntasinnerhtml += 
        `<div class="level ${"level" + a} hidden" data-minvalue="${quiz.levels[a].minValue}">
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
    perguntasinnerhtml += 
    `<button class="reiniciarquiz" onclick="reiniciarquiz()">Reiniciar Quiz</button>
    <a class="voltarparahome" onclick="voltarparahome(this)">Voltar para Home</a></div>
    `;
    
    paginadoquiz.innerHTML += perguntasinnerhtml;

    // adicionar hidden na listagem de quizes
    const quizzesCards = document.querySelector('.page-01');
    quizzesCards.classList.add("hidden");
}

function escolhadeopçoes(t, numerodocontainer, length){
    //consertado
   let selecionado = document.querySelector('.opçaoescolhida' + '.escolhida' + numerodocontainer);
   let container = document.querySelector('.container' + numerodocontainer);
   let l = length;
   if(selecionado != null){}
   else{
    selecionado = t;
    selecionado.classList.add("opçaoescolhida");
    selecionado.classList.add("escolhida" + numerodocontainer)
    let container2 = Array.from(container.children).map((elemento) => {elemento.classList.add("opaco");return elemento;});
    selecionado.classList.remove("opaco");
    if(selecionado.dataset.true === "true"){
        selecionado.classList.add("opçaocorreta");
        counterdeacertos++;
    }
    else{
        selecionado.classList.add("opçaoerrada");
    };
    const timeout = setTimeout(scrollarparaaproxima, 2000, numerodocontainer, l);
   };

   function scrollarparaaproxima(numerodocontainer, length){
    let proxima = document.querySelector('.container' + (numerodocontainer + 1));
    let resultado = parseInt(counterdeacertos / length * 100);
    let selecionadas = document.querySelectorAll('.opçaoescolhida');
    if(proxima != null && (selecionadas.length < length)){
        proxima.scrollIntoView();
    }
    else if(selecionadas.length === length){
        let definirproxima = document.querySelectorAll('.level');
        for(const i of definirproxima){
            if(resultado >= i.dataset.minvalue){
                proxima = i;
            }
        }
        proxima.classList.remove("hidden");
        proxima.scrollIntoView();
        proxima.firstElementChild.textContent = `${resultado}% de acerto: ` + proxima.firstElementChild.textContent;
        counterdeacertos = 0;
    }
   }
}

function reiniciarquiz(){
    let paginadoquiz = document.querySelector('.paginadoquiz');
    paginadoquiz.innerHTML = "";
    paginadoquiz.classList.add("hidden");
    const header = document.querySelector("header");
    header.scrollIntoView();
    pegarperguntasdeumquiz(iddoquiz);
}

function voltarparahome(){
    let paginadoquiz = document.querySelector('.paginadoquiz');
    paginadoquiz.innerHTML = "";
    paginadoquiz.classList.add("hidden");
    const header = document.querySelector("header");
    header.scrollIntoView();

}


// Gustavo


// Duda // 

const dados= axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
dados.then(renderizarQuizzes);

const ul = document.querySelector('.quizzes-cards');

function renderizarQuizzes(response){
    const quizzes=response.data;
    ul.innerHTML= '';
    let html = '';
    
    for ( let i= 0; i < quizzes.length; i++){
         html += `
            <li class="quizz" quizz-id=${quizzes[i].id} onclick="pegarperguntasdeumquiz(${quizzes[i].id})">
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

 //passar para pagina dois

}

//Lucas
let titulo,capa
function passaPag1 () {
    console.log("funciona")
    let pag31 = document.querySelector(".pag03-1")
    titulo = pag31.querySelector(".titulo").value;
    if (titulo.length < 20 || titulo.length > 65) {
        alert("O título deve ter mais 20 e menos que 65 caractéres para ser válido!");
        return
    }
    capa = pag31.querySelector(".capa").value
    let pattern = /^https:\/\//i;
    if (!pattern.test(capa)) {
        alert("Confira se o que foi inserido é realmente um URL!");
        return
    }
    let numPerguntas = pag31.querySelector(".numPerguntas").value;
    if (isNaN(numPerguntas) || Number(numPerguntas) < 3) {
        alert("Digite como número a quantidade de questões e verifique se é maior que 3.");
        return
    }
    let numNiveis = Number(pag31.querySelector(".numNiveis").value);
    if (isNaN(numNiveis) || numNiveis < 2) {
        alert("Digite como número a quantidade de níveis e verifique se ele é maior que 2");
        return
    }

    Number(numPerguntas)
    Number(numNiveis)

    let perguntas = document.querySelector(".pergunta")
    perguntas.innerHTML = ``
    for (let i = 1; i <= numPerguntas; i++) {
        perguntas.innerHTML += `
        <section class="pergunta${i}">
        <h5>Pergunta ${i}</h5>
            <input placeholder="Texto da pergunta" required>
            <input placeholder="Cor de fundo da pergunta" type="url" required>
            <h5>Resposta correta</h5>
            <input placeholder="Resposta correta" required>
            <input placeholder="URL da imagem" required>
            <h5>Respostas incorretas</h5>
            <input placeholder="Resposta incorreta 1" required>
            <input placeholder="URL da imagem 1" required>
            <input placeholder="Resposta incorreta 2" required>
            <input placeholder="URL da imagem 2" required>
            <input placeholder="Resposta incorreta 3" required>
            <input placeholder="URL da imagem 3" required>
        </section>
        `
    }

    let niveis = document.querySelector(".niveis");
    niveis.innerHTML = ``;
    for (let i = 1; i <= numNiveis; i++) {
        niveis.innerHTML += `
    <section class="nivel${i}">
        <h5>Nível ${i}</h5>
        <input placeholder="Título do nível" required>
        <input placeholder="% de acerto mínima" required>
        <input placeholder="URL da imagem do nível" required>
        <input placeholder="Descrição do nível" required>
    </section>
        `
    }
}