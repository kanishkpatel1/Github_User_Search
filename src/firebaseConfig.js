import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAebRXRsA2AHzA7PV9L2fnz5weCpCAOJr0",
    authDomain: "github-user-search-5d050.firebaseapp.com",
    projectId: "github-user-search-5d050",
    storageBucket: "github-user-search-5d050.appspot.com",
    messagingSenderId: "593092014728",
    appId: "1:593092014728:web:2cae7d4961ccdb10c6a53d",
    measurementId: "G-LE06408T2J"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GithubAuthProvider();

export { auth, provider };
