// Carregar ícone e nome do banco a partir dos parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const bancoNome = urlParams.get('banco');
const bancoIcone = urlParams.get('icone');

if (bancoNome && bancoIcone) {
    document.getElementById('banco-nome').textContent = bancoNome;
    document.getElementById('banco-icone').src = bancoIcone;
}

// Função para alternar o estado do botão de deslizar on/off
function toggleDeslisar(button) {
    button.classList.toggle('on');
}

// Função para alternar a exibição do contêiner de opções de tipo de conta
function toggleTipoConta() {
    const container = document.getElementById('tipo-conta-opcoes');
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

// Função para selecionar uma opção de tipo de conta
function selecionarTipoConta(tipo, icone) {
    document.getElementById('tipo-conta-texto').textContent = tipo;
    document.getElementById('tipo-conta-icone').src = icone;
    toggleTipoConta();
}
