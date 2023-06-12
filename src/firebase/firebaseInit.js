import { initializeApp } from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyApTX0vyoH_YWHScV4NN1iR3mAK-5lpuXo",
  authDomain: "omniblog-49459.firebaseapp.com",
  projectId: "omniblog-49459",
  storageBucket: "omniblog-49459.appspot.com",
  messagingSenderId: "597402441506",
  appId: "1:597402441506:web:ace335161f67ae8da0377b",
  measurementId: "G-J0W7QH44PD"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;