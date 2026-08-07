// Configuração do projeto Firebase — LB Academy
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBYN3INWKhLQTZCoKEUtC_LK0xZLSWy-YM",
  authDomain: "lb-acadamy.firebaseapp.com",
  projectId: "lb-acadamy",
  storageBucket: "lb-acadamy.firebasestorage.app",
  messagingSenderId: "362797904397",
  appId: "1:362797904397:web:7a0dc59e0d3f042c589b44"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// E-mail(s) com acesso de administrador ao painel admin
export const ADMIN_EMAILS = [
  "lincoln@lbmarketplace.com.br"
];
