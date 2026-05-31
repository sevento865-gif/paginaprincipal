import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";
 
const firebaseConfig = {
  apiKey: "AIzaSyDBlRVmXvNSFEpizbQwIatjFy2qQUHVuyE",
  authDomain: "tienda-de-laptops.firebaseapp.com",
  projectId: "tienda-de-laptops",
  storageBucket: "tienda-de-laptops.firebasestorage.app",
  messagingSenderId: "960054286626",
  appId: "1:960054286626:web:b19cd4e03bfd16ddc26d7b"
};
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
 
export { db, storage };