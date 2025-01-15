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
    const senhaInput = document.getElementById("senha");
    const senhaErro = document.getElementById("senha-erro");
    const errors = [];

    if (password.length < 8) {
        errors.push("A senha deve ter pelo menos 8 caracteres.");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("A senha deve conter pelo menos uma letra maiúscula.");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("A senha deve conter pelo menos uma letra minúscula.");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("A senha deve conter pelo menos um número.");
    }

    if (errors.length > 0) {
        senhaErro.innerHTML = errors.join("<br>");
        senhaInput.style.borderColor = "red";
        return false;
    }
    senhaErro.innerHTML = "";
    senhaInput.style.borderColor = "";
    return true;
}

function validateEmail(email) {
    const emailInput = document.getElementById("email");
    const emailErro = document.getElementById("senha-erro");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailErro.innerHTML = "O email fornecido é inválido. Por favor, verifique e tente novamente.";
        emailInput.style.borderColor = "red";
        return false;
    }
    emailErro.innerHTML = "";
    emailInput.style.borderColor = "";
    return true;
}

async function criarConta() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;
    const senhaErro = document.getElementById("senha-erro");

    if (!nome || !email || !password) {
        senhaErro.innerHTML = "Todos os campos são obrigatórios.";
        if (!nome) document.getElementById("nome").style.borderColor = "red";
        else document.getElementById("nome").style.borderColor = "";
        
        if (!email) document.getElementById("email").style.borderColor = "red";
        else document.getElementById("email").style.borderColor = "";
        
        if (!password) document.getElementById("senha").style.borderColor = "red";
        else document.getElementById("senha").style.borderColor = "";
        
        return;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
        return; // Se o email ou a senha não forem válidos, interrompe a criação da conta
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

        switch (errorCode) {
            case 'auth/email-already-in-use':
                senhaErro.innerHTML = "Este email já está em uso. Por favor, faça login.";
                document.getElementById("email").style.borderColor = "red";
                break;
            case 'auth/invalid-email':
                senhaErro.innerHTML = "O email fornecido é inválido. Por favor, verifique e tente novamente.";
                document.getElementById("email").style.borderColor = "red";
                break;
            case 'auth/operation-not-allowed':
                senhaErro.innerHTML = "A criação de contas com email e senha não está habilitada.";
                break;
            case 'auth/weak-password':
                senhaErro.innerHTML = "A senha fornecida é muito fraca. Por favor, escolha uma senha mais forte.";
                document.getElementById("senha").style.borderColor = "red";
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