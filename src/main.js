import "./assets/styles/globals.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import customDirective from "./helpers/custom/customdir";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import App from "./App.vue";
import router from "./router";
import firebaseApp from "./firebase/firebaseInit";
import { quillEditor } from "vue3-quill";

import piniaPluginPersistedState from "pinia-plugin-persistedstate";

let app;

const initializeApp = () => {
  app = createApp(App);
  app.use(quillEditor);
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedState);
  app.use(pinia);
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
