// firebase-auth.js
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase-config";

const observeAuthState = (callback) => {
  onAuthStateChanged(firebaseAuth, (user) => {
    
    callback(user);
  });
  
};

export { observeAuthState };