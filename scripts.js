function entrar() {
  let senha = document.getElementById("senha").value;

  if (hex_md5(senha) === "c1e42e1461a07a11c528a3d1fe956d26") {
    window.sessionStorage.setItem("logado", "logado");
    window.location = "principal.html";
  } else {
    alert("Senha incorreta!");
  }
}

function sair() {
  window.sessionStorage.removeItem("logado");
  window.location.href = "index.html";
}

function carregar(tipo) {
  fetch("https://botafogo-atletas.mange.li/" + tipo)
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (jogadores) {
      criarCards(jogadores);
    })
    .catch(function (erro) {
      alert("Erro ao obter os dados." + tipo);
    });
}

function irParaDetalhes(event) {
  window.location = "jogador.html?id=" + event.target.closest("div").id;
}

function criarCards(jogadores) {
  document.getElementById("elenco").innerHTML = "";

  for (var i = 0; i < jogadores.length; i++) {
    jogador = jogadores[i];

    var div = document.createElement("div");
    var titulo = document.createElement("h3");
    var detalhes = document.createElement("h4");
    var img = document.createElement("img");

    div.id = jogador.id;
    div.classList.add("card");
    titulo.textContent = jogador.nome;
    img.src = jogador.imagem;
    img.alt = jogador.nome;
    detalhes.textContent = "Mais detalhes";
    div.onclick = irParaDetalhes;

    div.appendChild(titulo);
    div.appendChild(img);
    div.appendChild(img);
    div.appendChild(detalhes);

    document.getElementById("elenco").appendChild(div);
  }

  document.getElementById("text").style.display = "none";
}

function buscarJogadorPorId(id) {
  fetch("https://botafogo-atletas.mange.li/" + id)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      mostrarDados(data);
    })
    .catch(function (erro) {
      alert("Não foi possível obter os dados no momento, tente novamente.");
    });
}

function mostrarDados(jogador) {
  var article = document.createElement("article");

  var divImg = document.createElement("div");
  var nome = document.createElement("h3");
  var img = document.createElement("img");

  var divDetalhes = document.createElement("div");
  var nome_completo = document.createElement("p");
  var nascimento = document.createElement("p");
  var altura = document.createElement("p");
  var elenco = document.createElement("p");
  var posicao = document.createElement("p");
  var descricao = document.createElement("p");

  article.classList.add("jogador");

  divImg.id = "foto-jogador";
  nome.textContent = jogador.nome;
  img.alt = jogador.nome;
  img.src = jogador.imagem;
  divImg.appendChild(img);
  divImg.appendChild(nome);
  article.appendChild(divImg);

  divDetalhes.id = "detalhes";
  nome_completo.textContent = jogador.nome_completo;
  nascimento.textContent  = jogador.nascimento;
  altura.textContent  = jogador.altura;
  elenco.textContent  = jogador.elenco;
  posicao.textContent  = jogador.posicao;
  descricao.textContent  = jogador.descricao;

  divDetalhes.appendChild(nome_completo);
  divDetalhes.appendChild(nascimento);
  divDetalhes.appendChild(altura);
  divDetalhes.appendChild(elenco);
  divDetalhes.appendChild(posicao);
  divDetalhes.appendChild(descricao);
  
  article.appendChild(divDetalhes)

  document.getElementById("jogador").appendChild(article);
}

window.onload = () => {
  let paginaLogin = window.location.href.indexOf("index") > -1;
  let paginaJogador = window.location.href.indexOf("jogador") > -1;

  if (!paginaLogin && !window.sessionStorage.getItem("logado")) {
    window.location = "index.html";
  }

  if (paginaJogador) {
    var queryString = new URLSearchParams(document.location.search);
    var id = parseInt(queryString.get("id"));
    buscarJogadorPorId(id);
  }
};