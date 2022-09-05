
// Gustavo
let counterdeacertos = 0;
let iddoquiz;
let listaPerguntas = [];
let quizParaCriar = {
    title: '',
    image: '',
    questions: [],
    levels: [],
}

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

function exibirperguntasdeumquiz(r){
    const quiz = r.data;
    const gamequizzpagina = document.querySelector('.game-quizz');
    const paginadoquiz = document.querySelector('.paginadoquiz');
    gamequizzpagina.classList.remove("hidden");
    let perguntas = quiz.questions;
    perguntas.sort(comparador);
    for(const i of perguntas){
        i.answers.sort(comparador);
    }
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

// listar todos os quizzes
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
}

// listar seus quizzes


//Lucas
let titulo,capa,numPerguntas,numNiveis, perguntas, niveis, id

function passaPag1 () {
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
    numPerguntas = pag31.querySelector(".numPerguntas").value;
    if (isNaN(numPerguntas) || Number(numPerguntas) < 3) {
        alert("Digite como número a quantidade de questões e verifique se é maior que 3.");
        return
    }
    numNiveis = Number(pag31.querySelector(".numNiveis").value);
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
            <input class="titulo-pergunta q-${i}" placeholder="Texto da pergunta" required>
            <input class="hexadecimal q-${i}" placeholder="Cor de fundo da pergunta" type="url" required>
            <h5>Resposta correta</h5>
            <input class="resposta correta q-${i}" placeholder="Resposta correta" required>
            <input class="resposta-url correta q-${i}" placeholder="URL da imagem" required>
            <h5>Respostas incorretas</h5>
            <input class="resposta incorreta q-${i}" placeholder="Resposta incorreta 1" required>
            <input class="resposta-url incorreta q-${i}" placeholder="URL da imagem 1" required>
            <input class="resposta incorreta q-${i}" placeholder="Resposta incorreta 2" >
            <input class="resposta-url incorreta q-${i}" placeholder="URL da imagem 2" >
            <input class="resposta incorreta q-${i}" placeholder="Resposta incorreta 3" >
            <input class="resposta-url incorreta q-${i}" placeholder="URL da imagem 3" >
        </section>
        `
    }

    let niveis = document.querySelector(".niveis");
    niveis.innerHTML = ``;
    for (let i = 1; i <= numNiveis; i++) {
        niveis.innerHTML += `
    <section class="nivel${i}">
        <h5>Nível ${i}</h5>
        <input class="tituloNivel" placeholder="Título do nível" required>
        <input class="porcentagem" placeholder="% de acerto mínima" required>
        <input class="imagemNivel" placeholder="URL da imagem do nível" required>
        <input class="descricaoNivel" placeholder="Descrição do nível" required>
    </section>
        `
    }

    pag31.classList.add("hidden")
    let pag32 = document.querySelector(".pag03-2")
    pag32.classList.remove("hidden")
    
}

function passaPag2 () {
    let pag32 = document.querySelector(".pag03-2");
    const titulosPerguntas = pag32.querySelectorAll(".titulo-pergunta");
    const hexadecimais = pag32.querySelectorAll(".hexadecimal");
    const respostasCorretas = pag32.querySelectorAll(".resposta.correta");
    const respostasIncorretas = pag32.querySelectorAll(".resposta.incorreta");
    const urlsRespostasIncorretas = pag32.querySelectorAll(".resposta-url.incorreta");
    const urlsRespostasCorretas = pag32.querySelectorAll(".resposta-url.correta");

    for (let i = 0; i < titulosPerguntas.length; i++) {
        if (titulosPerguntas[i].value.length < 20) {
            alert("A pergunta deve ter mais que 20 caractéres!")
            return;
        }
    }

    for (let i = 0; i<hexadecimais.length; i++) { //testa se é hexadecimal
        let pattern = /^#[0-9A-F]{6}$/i
        if (!pattern.test(hexadecimais[i].value)) {
            alert("Verifique a cor informada está em formato hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)")
            return;
        }
    }

    for (let i = 0; i<respostasCorretas.length; i++) { //testa se o campo de respota correta e incorretas está preenchido
        if (respostasCorretas[i].value === "" ) {
            alert("Os campos de respostas corretas devem ser preenchidos.")
            return;
        }
    }

    for (let i = 0; i<respostasIncorretas.length; i++) { //testa se o campo de respota correta e incorretas está preenchido
        if (respostasIncorretas[i].value === "" ) {
            alert("Os campos de respostas incorretas devem ser preenchidos.")
            return;
        }
    }

    for (let i = 0; i<urlsRespostasIncorretas.length; i++) { //testa se imagem está em URL correta
        let pattern = /^https:\/\//i
        if (!pattern.test(urlsRespostasIncorretas[i].value)) {
            alert("As imagens devem estar em formato URL - Respostas Incorretas")
            return;
        }
    }

    for (let i = 0; i<urlsRespostasCorretas.length; i++) { //testa se imagem está em URL correta
        let pattern = /^https:\/\//i
        if (!pattern.test(urlsRespostasCorretas[i].value)) {
            alert("As imagens devem estar em formato URL  - Respostas Corretas")
            return;
        }
    }

    // //cria listas objeto com as infos de cada pergunta
    for (let i = 1; i<=numPerguntas; i++) {
        const respostasLista = [];
        const respostaPorQuestao = pag32.querySelectorAll(`.resposta.q-${i}`);
        const respostaUrlPorQuestao = pag32.querySelectorAll(`.resposta-url.q-${i}`);
        for (let j = 0; j < respostaPorQuestao.length; j++) {
            const resposta = {
                text: '',
                image: '',
                isCorrectAnswer: false,
            }

            if(respostaPorQuestao[j].classList.contains('correta')){
                resposta.text = respostaPorQuestao[j].value;
                resposta.image = respostaUrlPorQuestao[j].value;
                resposta.isCorrectAnswer = true;
            }else {
                resposta.text = respostaPorQuestao[j].value;
                resposta.image = respostaUrlPorQuestao[j].value;
                resposta.isCorrectAnswer = false;
            }
            respostasLista.push(resposta)
        }
        const questao = {
            title: titulosPerguntas[i-1].value,
            color: hexadecimais[i-1].value,
            answers: respostasLista,
        };
        listaPerguntas.push(questao);

    }

    pag32.classList.add("hidden")
    const pag33 = document.querySelector(".pag03-3")
    pag33.classList.remove("hidden")
}

function passaPag3 () {
    let tituloNivel = document.querySelectorAll(".tituloNivel");
    tituloNivel.forEach((titulo) => {
        if (titulo.length < 10) {
            alert("Os títulos devem ter no mínimo 20 caractéres")
            return
        }
    })

    let porcentagens = document.querySelectorAll(".porcentagem");
    let contador = 0;
    porcentagens.forEach((percent) => {
        percent = Number(percent.value)
        if (percent<0 || percent > 100) {
            alert("Digite o valor em formato percental (0-100)")
            return
        }
        if (percent === 0) {
            contador = 1;
        }  
    })
    if (contador === 0) {
        alert("Você deve adcionar um nível referente à 0%")
        return
    }

    let imagemNivel = document.querySelectorAll(".imagemNivel");
    imagemNivel.forEach((img) => {
        let pattern = /^https:\/\//i;
        if(!pattern.test(img.value)) {
            alert('A imagem deve estar em formato URL.')
        }
    })

    let descricaoNivel = document.querySelectorAll(".descricaoNivel");
    descricaoNivel.forEach((descricao)=> {
        if (descricao.value.length < 30) {
            alert("As descriçoes dos níveis devem ter ao menos 20 caraactéres")
        }
    })

    niveis = [];
    for (let i = 0; i<numNiveis; i++) {
        nivel = i+1;
        const level = {
            title: tituloNivel[i].value,
            minValue: porcentagens[i].value,
            image: imagemNivel[i].value,
            text: descricaoNivel[i].value,
        }
        niveis.push(level)
    }

    salvaQuiz()
}

function renderizarSeusQuizzes(resposta) {
    const page01 = document.querySelector('.page-01');
    const page0302 = document.querySelector('.pag03-2');
    const page0303 = document.querySelector('.pag03-3');
    page01.classList.remove('hidden');
    page0302.classList.add('hidden');
    page0303.classList.add('hidden');
    renderizarQuizzes(resposta);
}

function salvaQuiz () {
    let objeto = {
    
            title: titulo,
            image: capa,
            questions: listaPerguntas,
            levels: niveis
        }

    let promessa = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",objeto);
    promessa.then(sucessoQuiz)
}
function sucessoQuiz (resposta) {
    id = []
    id.push(resposta.data.id)
    const idSerializados = JSON.stringify(id);
    localStorage.setItem("quizzesUsuario", idSerializados);

    let pag34 = document.querySelector(".pag03-4") 
    let div = pag34.querySelector(".quizzFinal")
    div.innerHTML += `
    <figure class="image-quizz">
        <img src="${capa}" />
        <figcaption>
            <h3 class="title">
                ${titulo}
            </h3>
        </figcaption>
    </figure>
    `
    pag34.classList.remove(".hidden")

    let pag33 = document.querySelector(".pag03-3")
    pag33.classList.add(".hidden")   
}
function retornaMenu () {
    
    const promesa = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizParaCriar);
    promesa.then(renderizarSeusQuizzes)
    promesa.catch((err) => console.err(err))
}