// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtN7DZguxzGM318tilSNxfVWPh-J7J6LM",
  authDomain: "refrigerator-2ca47.firebaseapp.com",
  projectId: "refrigerator-2ca47",
  storageBucket: "refrigerator-2ca47.appspot.com",
  messagingSenderId: "763121036145",
  appId: "1:763121036145:web:f4ee72030d1d2b3768e4d0"
};
//
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app); // 변경된 부분: 다른 이름으로 변경

export { firebaseAuth };