import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const db = getFirestore(app);

function validatePassword(password) {
    const senhaErro = document.getElementById("senha-erro");
    if (password.length < 6) {
        senhaErro.innerHTML = "A senha deve ter pelo menos 6 caracteres.";
        return false;
    }
    senhaErro.innerHTML = "";
    return true;
}

async function criarConta() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    if (!validatePassword(password)) {
        return; // Se a senha não for válida, interrompe a criação da conta
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuário criado com sucesso:", user.uid);

        const userData = {
            nome: nome,
            email: email,
            criadoEm: new Date() // Adiciona um campo de data de criação
        };
        console.log("Dados do usuário a serem salvos no Firestore:", userData);

        // Define o ID do documento como o UID do usuário
        await setDoc(doc(db, "users", user.uid), userData);
        console.log("Dados do usuário salvos no Firestore");

        window.location.href = "home.html";
    } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Erro ao criar conta:", errorCode, errorMessage);

        const senhaErro = document.getElementById("senha-erro");
        switch (errorCode) {
            case 'auth/email-already-in-use':
                senhaErro.innerHTML = "Este email já está em uso. Por favor, use outro email.";
                break;
            case 'auth/invalid-email':
                senhaErro.innerHTML = "O email fornecido é inválido. Por favor, verifique e tente novamente.";
                break;
            case 'auth/operation-not-allowed':
                senhaErro.innerHTML = "A criação de contas com email e senha não está habilitada.";
                break;
            case 'auth/weak-password':
                senhaErro.innerHTML = "A senha fornecida é muito fraca. Por favor, escolha uma senha mais forte.";
                break;
            default:
                senhaErro.innerHTML = errorMessage;
                break;
        }
    }
}

// Adiciona o evento de input ao campo de senha para validação em tempo real
document.getElementById("senha").addEventListener("input", function() {
    validatePassword(this.value);
});

// Torna a função criarConta acessível no escopo global
window.criarConta = criarConta;