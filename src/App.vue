<script setup>
import { ref, reactive, onBeforeMount, onMounted, watchEffect } from "vue";
import { RouterView, useRouter } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import firebaseApp from "./firebase/firebaseInit";
import { getUser } from "./firebase/quries/getUser";
import { useUserStore } from "./stores/userStore";

//general
const router = useRouter();

//state
const currentPath = ref(router.path);
const isPageLoad = ref(true);
const navState = reactive({
  isNavOpen: null,
  userLoggedIn: null,
});

const auth = getAuth(firebaseApp);
const userStore = useUserStore();

//lifecycle
onMounted(() => {
  checkRoute();
});

onBeforeMount(() => {
  checkAuth();
});

watchEffect(() => {
  currentPath.value = router.path;
  checkRoute();
});

//functions
function checkRoute() {
  if (
    currentPath.value == "/login" ||
    currentPath.value == "/register" ||
    currentPath.value == "/forgot-password"
  ) {
    navState.isNavOpen = false;
  } else {
    navState.isNavOpen = true;
  }
}

function checkAuth() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const userSnapshot = await getUser(uid);
      navState.userLoggedIn = true;

      try {
        userSnapshot.forEach((doc) => {
          const data = doc.data();
          userStore.isUser = true;
          userStore.uid = data.uid;
          userStore.firstName = data.firstName;
          userStore.lastName = data.lastName;
          userStore.email = data.email;
          userStore.userName = data.username;
          userStore.setInitials();
          //console.log("working");
        });
      } catch (error) {
        //console.log(error);
      } finally {
        isPageLoad.value = false;
      }
    } else {
      navState.userLoggedIn = false;
      //console.log("No user found");
      setTimeout(() => {
        isPageLoad.value = false;
      }, 1500);
    }
  });
}

async function logout() {
  userStore.isUser = false;
  navState.isUserLoggedIn = false;
  localStorage.removeItem("userLoggedIn");
  await signOut(auth);
  router.push({ name: "home" });
}

//
</script>

<template>
  <div v-if="isPageLoad" class="app-screen-loader">
    <div class="screen-loader-container">
      <Loader />
      <p class="load-text">LOADING...</p>
    </div>
  </div>
  <div v-else>
    <Navigation
      v-show="navState.isNavOpen"
      :isUserLoggedIn="navState.userLoggedIn"
      @logout="logout"
    />
    <main>
      <RouterView />
    </main>
    <Footer v-show="navState.isNavOpen" />
  </div>
</template>

<style lang="scss">
@keyframes loadingAnimation {
  0% {
    content: "LOADING.";
  }

  50% {
    content: "LOADING..";
  }

  100% {
    content: "LOADING...";
  }
}

.load-text {
  color: rgb(163, 152, 152);
  font-weight: bold;
  font-style: italic;
  transform: translate(-20%, 150%);
  animation: loadingAnimation 1s linear infinite;
}
.app-screen-loader {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: $black;

  & > :first-child {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}

a {
  color: rgb(227, 227, 227);
  text-decoration: none;
}

main {
  min-height: 100vh;
  overflow: none;
  box-sizing: border-box;
  z-index: 0;
}

button {
  background-color: $black;
  color: $text2;
  border-radius: 15px;
  margin-top: 1rem;
  padding: 0.6rem;
  cursor: pointer;
  transition: scale 200ms ease-in;
  &:hover {
    scale: 1.06;
  }
}

.individual-blog-card__marquee {
  margin: 6rem 0;
  gap: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
