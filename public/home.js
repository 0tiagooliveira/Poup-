// Função para abrir novas opções do menu
function toggleMenu() {
    alert("Abrir novas opções do menu");
}

// Função para alternar a visibilidade da lista de meses
function toggleListaMeses() {
    document.getElementById("dropdown-meses").classList.toggle("show");
}

// Função para selecionar um mês
function selecionarMes(mes) {
    document.getElementById("mes-atual").innerText = mes;
    document.getElementById("dropdown-meses").classList.remove("show");
}

// Fechar a lista suspensa se o usuário clicar fora dela
window.onclick = function(event) {
    if (!event.target.matches('#mes-atual')) {
        const dropdowns = document.getElementsByClassName("dropdown-conteudo");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Função para adicionar uma nova conta
function adicionarConta() {
    const containerContas = document.querySelector('.container-contas');
    const novaConta = document.createElement('div');
    novaConta.classList.add('item-conta');
    novaConta.innerHTML = `
        <div class="info-conta">
            <img src="icon/carteira.svg" alt="Carteira">
            <div>
                <span class="titulo-conta">Nova Conta</span><br>
                <span class="saldo-conta">R$ 0,00</span>
            </div>
        </div>
        <button class="adicionar-conta">+</button>
    `;
    containerContas.insertBefore(novaConta, containerContas.querySelector('.btn-adicionar-conta'));
}

// Função para verificar se há contas registradas
function verificarContas() {
    const contas = document.querySelectorAll('.container-contas .item');
    if (contas.length === 0) {
        document.querySelector('.container-contas').innerHTML = `
            <div class="info info-sem-registro">
                <img src="icon/carteira.svg" alt="Carteira" class="icon-verde icon-tamanho"><br>
                <p>Opa! Você não tem contas registradas, registre uma abaixo.</p>
            </div>
            <button class="btn-adicionar" onclick="redirecionarNovaConta()">Registrar nova conta</button>
        `;
    }
}

// Função para verificar se há cartões de crédito registrados
function verificarCartoes() {
    const cartoes = document.querySelectorAll('.container-cartoes .item');
    if (cartoes.length === 0) {
        document.querySelector('.container-cartoes').innerHTML = `
            <div class="info info-sem-registro">
                <img src="icon/cartao-credito.svg" alt="Cartão de Crédito" class="icon-verde icon-tamanho"><br>
                <p>Opa! Você não tem cartões de crédito registrados, registre um abaixo.</p>
            </div>
            <button class="btn-adicionar" onclick="redirecionarNovoCartao()">Registrar novo cartão</button>
        `;
    }
}

// Função para redirecionar para a página de cadastro de nova conta
function redirecionarNovaConta() {
    window.location.href = 'nova-conta-banco.html';
}

// Função para redirecionar para a página de cadastro de novo cartão de crédito
function redirecionarNovoCartao() {
    window.location.href = 'novo-cartao-de-credito.html';
}

// Chamar as funções de verificação ao carregar a página
window.onload = function() {
    verificarContas();
    verificarCartoes();
};

const listas = document.querySelectorAll(".barra-navegacao ul");

listas.forEach((lista) => {
  const classeReset = lista.parentNode.getAttribute("class");
  const itens = lista.querySelectorAll("li");

  itens.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const alvo = e.currentTarget;

      if (
        alvo.classList.contains("ativo") ||
        alvo.classList.contains("follow")
      ) {
        return;
      }

      lista.parentNode.setAttribute(
        "class",
        `${classeReset} ${alvo.getAttribute("data-where")}-style`
      );

      itens.forEach((elemento) => removerClasse(elemento, "ativo"));

      adicionarClasse(alvo, "ativo");
    });
  });
});

function removerClasse(no, nomeClasse) {
  no.classList.remove(nomeClasse);
}

function adicionarClasse(no, nomeClasse) {
  no.classList.add(nomeClasse);
}