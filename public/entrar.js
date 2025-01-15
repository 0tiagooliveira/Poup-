import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD8NyYByJD47mvYIa8x9PfNyXE-IfKjCuc",
    authDomain: "poup-fdce2.firebaseapp.com",
    projectId: "poup-fdce2",
    storageBucket: "poup-fdce2.firebasestorage.app",
    messagingSenderId: "135371191823",
    appId: "1:135371191823:web:0c52a521a03e8ab3d7957a",
    measurementId: "G-TVEMR4FSYS"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;
    const loginErro = document.getElementById("login-erro");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuário logado com sucesso:", user.uid);
        window.location.href = "home.html";
    } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Erro ao fazer login:", errorCode, errorMessage);

        switch (errorCode) {
            case 'auth/user-not-found':
                loginErro.innerHTML = "Usuário não encontrado. Verifique o email e tente novamente.";
                break;
            case 'auth/wrong-password':
                loginErro.innerHTML = "Senha incorreta. Por favor, tente novamente.";
                break;
            case 'auth/invalid-email':
                loginErro.innerHTML = "O email fornecido é inválido. Por favor, verifique e tente novamente.";
                break;
            case 'auth/invalid-login-credentials':
                loginErro.innerHTML = "Credenciais de login inválidas. Por favor, verifique e tente novamente.";
                break;
            case 'auth/too-many-requests':
                loginErro.innerHTML = "Muitas tentativas de login. Por favor, tente novamente mais tarde.";
                break;
            case 'auth/network-request-failed':
                loginErro.innerHTML = "Falha na solicitação de rede. Verifique sua conexão com a internet e tente novamente.";
                break;
            default:
                loginErro.innerHTML = "Erro ao fazer login: " + errorMessage;
                break;
        }
    }
}

// Adiciona o evento de tecla para acionar o login ao pressionar "Enter"
document.getElementById("email").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        login();
    }
});

document.getElementById("senha").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        login();
    }
});

// Torna a função login acessível no escopo global
window.login = login;