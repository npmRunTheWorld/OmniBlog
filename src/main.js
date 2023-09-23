import "./assets/styles/globals.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import customDirective from "./helpers/custom/customdir";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import App from "./App.vue";
import router from "./router";
import firebaseApp from "./firebase/firebaseInit";
import { quillEditor } from "vue3-quill";

let app;

const initializeApp = () => {
  app = createApp(App);
  app.use(quillEditor);
  app.use(createPinia());
  app.use(router);
  app.directive("custom", customDirective);
  app.mount("#app");
};

const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  if (!app) {
    initializeApp();
  }
});
