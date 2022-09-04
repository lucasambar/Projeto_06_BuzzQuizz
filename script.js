
// Gustavo
let counterdeacertos = 0;

function pegarperguntasdeumquiz(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1");
    promessa.then(exibirperguntasdeumquiz);
    /*Fazer catch*/
    promessa.catch();
}

function exibirperguntasdeumquiz(r){
    const quiz = r.data;
    const paginadoquiz = document.querySelector('.paginadoquiz');
    paginadoquiz.classList.remove("hidden");
    paginadoquiz.innerHTML = `<figure class="bannerdoquiz" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quiz.image});background-repeat: no-repeat;background-size: cover">
    <figcaption>
        <h3 class="titulobanner">${quiz.title}</h3>
    </figcaption>
</figure><div class="perguntasdoquiz">
    `;
    let perguntas = quiz.questions;
    perguntas.sort(comparador);
    perguntas.map(respostasaleatorias);
    let perguntasinnerhtml = "";
    let perguntaslen = perguntas.length;
    for(let j = 0; j < perguntas.length; j++){
        perguntasinnerhtml += `<div class="perguntadoquiz">
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
        perguntasinnerhtml += `<div class="level ${"level" + a} hidden" data-minvalue="${quiz.levels[a].minValue}">
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
    perguntasinnerhtml += `<button class="reiniciarquiz" onclick="reiniciarquiz()">Reiniciar Quiz</button>
    <a class="voltarparahome" onclick="voltarparahome(this)">Voltar para Home</a></div>
    `;
    paginadoquiz.innerHTML += perguntasinnerhtml;
}

function comparador() { 
	return Math.random() - 0.5; 
}

function respostasaleatorias(pergunta){
    pergunta.answers.sort(comparador);
    return pergunta;
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
    pegarperguntasdeumquiz();
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

//Lucas
let titulo,capa,numPerguntas,numNiveis

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
            <input placeholder="Texto da pergunta" required>
            <input placeholder="Cor de fundo da pergunta" type="url" required>
            <h5>Resposta correta</h5>
            <input placeholder="Resposta correta" required>
            <input placeholder="URL da imagem" required>
            <h5>Respostas incorretas</h5>
            <input placeholder="Resposta incorreta 1" required>
            <input placeholder="URL da imagem 1" required>
            <input placeholder="Resposta incorreta 2" >
            <input placeholder="URL da imagem 2" >
            <input placeholder="Resposta incorreta 3" >
            <input placeholder="URL da imagem 3" >
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

    pag31.classList.add("hidden")
    let pag32 = document.querySelector(".pag03-2")
    pag32.classList.remove("hidden")
    
}

function passaPag2 () {
    let pag32 = document.querySelector(".pag03-2");
    let arr = pag32.querySelectorAll("input").value;
    console.log(arr)
    for(let i = 0; i<arr.length; i+10) { //testa tamanho do titulo
        if (arr[1].lenght < 20) {
            alert("A pergunta deve ter mais que 20 caractéres!")
            return
        }
    }

    for (let i = 1; i<arr.length; i+10) { //testa se é hexadecimal
        let pattern = /^#[0-9A-F]{6}$/i
        if (!pattern.test(arr[i])) {
            alert("Verifique a cor informada está em formato hexadecimal (começar em '#', seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F)")
            return
        }
    }

    for (let i = 2; i<arr.length; i+10) { //testa se o campo de respota correta e incorreta está preenchido
        if (arr[i] === "" || arr[i+1] === "" || arr[i+2] === "" || arr[i+3] === "") {
            alert("Os campos de respostas corretas devem ser preenchidos.")
        }
    }

    for (let i = 3; i< arr.length; i+10) { //testa se imagem está em URL
        let pattern = /^https:\/\//i
        if (!pattern.test(arr[i]) || !pattern.test(arr[i+2])) {
            alert("As imagens devem estar em formato URL")
        }
    }

    //cria listas objeto com as infos de cada pergunta
    let perguntas = []
    for (let i = 1; i<numPerguntas; i++) {
        if (i===1) {
            perguntas.push({i: arr.slice(0,11)})
        }
        else {
            perguntas.push({i: arr.slice(10*(i-1)+1,10*i+1)})
        }
    } 

    console.log(perguntas)

    pag32.classList.add("hidden")
    let pag33 = document.querySelector("pag03-3")
    pag33.classList.remove("hidden")
}

