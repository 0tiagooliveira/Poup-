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