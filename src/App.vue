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
const currentPath = ref(router.currentRoute.value.path);
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
  currentPath.value = router.currentRoute.value.path;
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
</script>

<template>
  <!-- Ultra-Modern Loading Screen with Butterfly Animation -->
  <div v-if="isPageLoad" class="app-screen-loader">
    <div class="screen-loader-container">
      <!-- Butterfly Metamorphosis Loader -->
      <div class="butterfly-loader">
        <div class="metamorphosis-stage">
          <div class="cocoon"></div>
          <div class="butterfly">
            <div class="wing wing-left"></div>
            <div class="wing wing-right"></div>
            <div class="body"></div>
          </div>
        </div>
        <div class="loading-particles">
          <div class="particle" v-for="n in 12" :key="n"></div>
        </div>
      </div>
      <p class="load-text">
        <span
          class="letter"
          v-for="(letter, index) in 'OMNIBLOG'.split('')"
          :key="index"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          {{ letter }}
        </span>
      </p>
      <div class="loading-tagline">Transforming Ideas Into Stories</div>
    </div>
  </div>

  <!-- Main Application -->
  <div v-else class="app-wrapper">
    <!-- Dynamic Background with Butterfly Elements -->
    <div class="app-background">
      <!-- Floating Butterfly Silhouettes -->
      <div class="floating-butterflies">
        <div
          class="butterfly-silhouette"
          v-for="n in 6"
          :key="n"
          :class="`butterfly-${n}`"
        >
          <div class="silhouette-wing silhouette-wing-left"></div>
          <div class="silhouette-wing silhouette-wing-right"></div>
          <div class="silhouette-body"></div>
        </div>
      </div>

      <!-- Gradient Mesh Background -->
      <div class="gradient-mesh">
        <div class="mesh-gradient mesh-1"></div>
        <div class="mesh-gradient mesh-2"></div>
        <div class="mesh-gradient mesh-3"></div>
        <div class="mesh-gradient mesh-4"></div>
      </div>

      <!-- Animated Particles -->
      <div class="floating-particles">
        <div class="floating-particle" v-for="n in 20" :key="n"></div>
      </div>

      <!-- Teal Light Rays -->
      <div class="light-rays">
        <div class="ray ray-1"></div>
        <div class="ray ray-2"></div>
        <div class="ray ray-3"></div>
      </div>
    </div>

    <!-- Enhanced Navigation with Glass Effect -->
    <Navigation
      v-show="navState.isNavOpen"
      :isUserLoggedIn="navState.userLoggedIn"
      @logout="logout"
      class="enhanced-nav"
    />

    <!-- Main Content with Butterfly Theme -->
    <main class="enhanced-main">
      <RouterView />
    </main>

    <!-- Enhanced Footer -->
    <Footer v-show="navState.isNavOpen" class="enhanced-footer" />
  </div>
</template>

<style lang="scss">
// Ultra-Modern Butterfly Theme Variables

// Global Modern Enhancements
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.7;
  overflow-x: hidden;
  position: relative;
}

// ====== ULTRA-MODERN BUTTERFLY LOADING SCREEN ======
.app-screen-loader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  overflow: hidden;

  // Animated background during loading
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 50%,
        rgba(6, 214, 160, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 107, 157, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 80%,
        rgba(255, 210, 63, 0.1) 0%,
        transparent 50%
      );
    animation: backgroundPulse 4s ease-in-out infinite;
  }

  .screen-loader-container {
    text-align: center;
    position: relative;
    z-index: 2;
  }

  // Butterfly Metamorphosis Loader
  .butterfly-loader {
    position: relative;
    width: 120px;
    height: 120px;
    margin-bottom: 3rem;

    .metamorphosis-stage {
      position: relative;
      width: 100%;
      height: 100%;

      .cocoon {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 80px;
        background: linear-gradient(45deg, #2a2a2f, #1a1a1f);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: cocoonBreak 3s ease-in-out infinite;
        box-shadow: inset 0 0 20px rgba(6, 214, 160, 0.3),
          0 0 30px rgba(6, 214, 160, 0.2);
      }

      .butterfly {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        animation: butterflyEmerge 3s ease-in-out infinite;
        animation-delay: 1.5s;

        .wing {
          position: absolute;
          background: linear-gradient(
            135deg,
            var(--butterfly-teal),
            var(--butterfly-light)
          );
          border-radius: 50% 10% 50% 80%;
          box-shadow: 0 0 20px var(--butterfly-shadow);

          &.wing-left {
            width: 30px;
            height: 40px;
            top: -20px;
            left: -25px;
            transform-origin: bottom right;
            animation: wingFlap 0.8s ease-in-out infinite;
          }

          &.wing-right {
            width: 30px;
            height: 40px;
            top: -20px;
            right: -25px;
            transform-origin: bottom left;
            transform: scaleX(-1);
            animation: wingFlap 0.8s ease-in-out infinite;
            animation-delay: 0.1s;
          }
        }

        .body {
          width: 3px;
          height: 30px;
          background: linear-gradient(
            to bottom,
            var(--butterfly-deep),
            var(--butterfly-teal)
          );
          border-radius: 2px;
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 10px var(--butterfly-shadow);
        }
      }
    }

    .loading-particles {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--butterfly-teal);
        border-radius: 50%;
        opacity: 0;
        animation: particleFloat 2s ease-in-out infinite;

        @for $i from 1 through 12 {
          &:nth-child(#{$i}) {
            animation-delay: #{$i * 0.1}s;
            transform: rotate(#{$i * 30}deg) translateX(40px);
          }
        }
      }
    }
  }

  .load-text {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    margin-bottom: 1rem;

    .letter {
      display: inline-block;
      animation: letterPulse 2s ease-in-out infinite;
      color: var(--butterfly-teal);
      text-shadow: 0 0 20px var(--butterfly-shadow);
    }
  }

  .loading-tagline {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    opacity: 0;
    animation: fadeInUp 1s ease-out 2s forwards;
  }
}

// ====== ULTRA-MODERN APP WRAPPER ======
.app-wrapper {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  z-index: 1;
}

.app-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;

  // Floating Butterfly Silhouettes
  .floating-butterflies {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.1;

    .butterfly-silhouette {
      position: absolute;
      animation: butterflyFloat 20s ease-in-out infinite;

      .silhouette-wing {
        position: absolute;
        background: linear-gradient(
          135deg,
          var(--butterfly-teal),
          var(--butterfly-light)
        );
        border-radius: 50% 10% 50% 80%;
        animation: silhouetteFlap 3s ease-in-out infinite;

        &.silhouette-wing-left {
          width: 20px;
          height: 25px;
          top: 0;
          left: -15px;
          transform-origin: bottom right;
        }

        &.silhouette-wing-right {
          width: 20px;
          height: 25px;
          top: 0;
          right: -15px;
          transform-origin: bottom left;
          transform: scaleX(-1);
          animation-delay: 0.5s;
        }
      }

      .silhouette-body {
        width: 2px;
        height: 15px;
        background: var(--butterfly-deep);
        border-radius: 1px;
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
      }

      // Different butterfly positions and timings
      &.butterfly-1 {
        top: 10%;
        left: 20%;
        animation-delay: 0s;
        animation-duration: 25s;
      }

      &.butterfly-2 {
        top: 30%;
        right: 15%;
        animation-delay: 5s;
        animation-duration: 30s;
      }

      &.butterfly-3 {
        bottom: 25%;
        left: 10%;
        animation-delay: 10s;
        animation-duration: 22s;
      }

      &.butterfly-4 {
        top: 60%;
        right: 30%;
        animation-delay: 15s;
        animation-duration: 28s;
      }

      &.butterfly-5 {
        bottom: 40%;
        left: 60%;
        animation-delay: 20s;
        animation-duration: 35s;
      }

      &.butterfly-6 {
        top: 80%;
        right: 50%;
        animation-delay: 12s;
        animation-duration: 26s;
      }
    }
  }

  // Gradient Mesh Background
  .gradient-mesh {
    position: absolute;
    width: 100%;
    height: 100%;

    .mesh-gradient {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.3;
      animation: meshMove 15s ease-in-out infinite;

      &.mesh-1 {
        width: 400px;
        height: 400px;
        background: radial-gradient(
          circle,
          var(--butterfly-teal) 0%,
          transparent 70%
        );
        top: 20%;
        left: 10%;
        animation-delay: 0s;
      }

      &.mesh-2 {
        width: 300px;
        height: 300px;
        background: radial-gradient(
          circle,
          var(--butterfly-accent) 0%,
          transparent 70%
        );
        top: 60%;
        right: 20%;
        animation-delay: 5s;
      }

      &.mesh-3 {
        width: 250px;
        height: 250px;
        background: radial-gradient(
          circle,
          var(--butterfly-light) 0%,
          transparent 70%
        );
        bottom: 30%;
        left: 50%;
        animation-delay: 10s;
      }

      &.mesh-4 {
        width: 350px;
        height: 350px;
        background: radial-gradient(
          circle,
          var(--butterfly-gold) 0%,
          transparent 70%
        );
        top: 10%;
        right: 40%;
        animation-delay: 7s;
      }
    }
  }

  // Floating Particles
  .floating-particles {
    position: absolute;
    width: 100%;
    height: 100%;

    .floating-particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: var(--butterfly-teal);
      border-radius: 50%;
      opacity: 0;
      animation: particleDrift 8s linear infinite;

      &:nth-child(1) {
        left: 10%;
        animation-delay: 0.4s;
        animation-duration: 8s;
      }
      &:nth-child(2) {
        left: 20%;
        animation-delay: 0.8s;
        animation-duration: 9s;
      }
      &:nth-child(3) {
        left: 15%;
        animation-delay: 1.2s;
        animation-duration: 10s;
      }
      &:nth-child(4) {
        left: 35%;
        animation-delay: 1.6s;
        animation-duration: 11s;
      }
      &:nth-child(5) {
        left: 45%;
        animation-delay: 2s;
        animation-duration: 8s;
      }
      &:nth-child(6) {
        left: 55%;
        animation-delay: 2.4s;
        animation-duration: 9s;
      }
      &:nth-child(7) {
        left: 65%;
        animation-delay: 2.8s;
        animation-duration: 10s;
      }
      &:nth-child(8) {
        left: 75%;
        animation-delay: 3.2s;
        animation-duration: 11s;
      }
      &:nth-child(9) {
        left: 85%;
        animation-delay: 3.6s;
        animation-duration: 8s;
      }
      &:nth-child(10) {
        left: 25%;
        animation-delay: 4s;
        animation-duration: 9s;
      }
      &:nth-child(11) {
        left: 5%;
        animation-delay: 4.4s;
        animation-duration: 10s;
      }
      &:nth-child(12) {
        left: 40%;
        animation-delay: 4.8s;
        animation-duration: 11s;
      }
      &:nth-child(13) {
        left: 60%;
        animation-delay: 5.2s;
        animation-duration: 8s;
      }
      &:nth-child(14) {
        left: 70%;
        animation-delay: 5.6s;
        animation-duration: 9s;
      }
      &:nth-child(15) {
        left: 80%;
        animation-delay: 6s;
        animation-duration: 10s;
      }
      &:nth-child(16) {
        left: 90%;
        animation-delay: 6.4s;
        animation-duration: 11s;
      }
      &:nth-child(17) {
        left: 30%;
        animation-delay: 6.8s;
        animation-duration: 8s;
      }
      &:nth-child(18) {
        left: 50%;
        animation-delay: 7.2s;
        animation-duration: 9s;
      }
      &:nth-child(19) {
        left: 95%;
        animation-delay: 7.6s;
        animation-duration: 10s;
      }
      &:nth-child(20) {
        left: 12%;
        animation-delay: 8s;
        animation-duration: 11s;
      }
    }
  }

  // Teal Light Rays
  .light-rays {
    position: absolute;
    width: 100%;
    height: 100%;

    .ray {
      position: absolute;
      background: linear-gradient(
        45deg,
        transparent,
        var(--butterfly-shadow),
        transparent
      );
      opacity: 0.1;
      animation: rayRotate 20s linear infinite;

      &.ray-1 {
        width: 2px;
        height: 100%;
        left: 30%;
        animation-delay: 0s;
      }

      &.ray-2 {
        width: 1px;
        height: 100%;
        right: 40%;
        animation-delay: 7s;
      }

      &.ray-3 {
        width: 1.5px;
        height: 100%;
        left: 70%;
        animation-delay: 14s;
      }
    }
  }
}

// ====== ULTRA-MODERN COMPONENTS ======
.enhanced-nav {
  backdrop-filter: var(--glass-backdrop);
  background: var(--glass-bg);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  position: sticky;
  top: 0;
  transition: var(--transition-smooth);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--butterfly-teal) 20%,
      var(--butterfly-light) 50%,
      var(--butterfly-teal) 80%,
      transparent 100%
    );
    opacity: 0.6;
  }
}

.enhanced-main {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.enhanced-footer {
  backdrop-filter: var(--glass-backdrop);
  background: var(--glass-bg);
  border-top: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--butterfly-teal) 20%,
      var(--butterfly-light) 50%,
      var(--butterfly-teal) 80%,
      transparent 100%
    );
    opacity: 0.6;
  }
}

// ====== ULTRA-MODERN GLOBAL STYLES ======
a {
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition-smooth);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--butterfly-teal),
      var(--butterfly-light)
    );
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--butterfly-teal);
    text-shadow: 0 0 10px var(--butterfly-shadow);

    &::after {
      width: 100%;
    }
  }
}

// Ultra-Modern Button Styles
button {
  background: var(--glass-bg);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 0.875rem 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition-spring);
  backdrop-filter: var(--glass-backdrop);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      var(--butterfly-shadow),
      transparent
    );
    transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      var(--butterfly-shadow) 0%,
      transparent 70%
    );
    transition: all 0.4s ease;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: var(--shadow-glow);
    border-color: var(--butterfly-teal);
    background: var(--glass-bg);
    color: var(--butterfly-light);

    &::before {
      left: 100%;
    }

    &::after {
      width: 100px;
      height: 100px;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }
}

// ====== ENHANCED BLOG GRID ======
.individual-blog-card__marquee {
  margin: 4rem auto;
  max-width: 1400px;
  gap: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 2rem;

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
  }

  // Enhanced card styling
  & > * {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 1.5rem;
    transition: var(--transition-smooth);
    backdrop-filter: blur(15px);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(
        90deg,
        var(--primary-teal),
        var(--secondary-teal),
        var(--dark-teal)
      );
      opacity: 0;
      transition: var(--transition-smooth);
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-teal);
      border-color: var(--primary-teal);
      background: var(--glass-hover);

      &::before {
        opacity: 1;
      }
    }
  }
}

// ====== ULTRA-MODERN BUTTERFLY ANIMATIONS ======

// Loading Screen Animations
@keyframes backgroundPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

@keyframes cocoonBreak {
  0%,
  40% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  60%,
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@keyframes butterflyEmerge {
  0%,
  50% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  70% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes wingFlap {
  0%,
  100% {
    transform: rotateY(0deg) rotateX(0deg);
  }
  50% {
    transform: rotateY(-20deg) rotateX(10deg);
  }
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: rotate(0deg) translateX(40px) scale(0);
  }
  20% {
    opacity: 1;
    transform: rotate(72deg) translateX(50px) scale(1);
  }
  80% {
    opacity: 1;
    transform: rotate(288deg) translateX(60px) scale(1);
  }
  100% {
    opacity: 0;
    transform: rotate(360deg) translateX(40px) scale(0);
  }
}

@keyframes letterPulse {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-5px) scale(1.1);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

// Background Animations
@keyframes butterflyFloat {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(30px, -20px) rotate(5deg);
  }
  50% {
    transform: translate(-20px, -40px) rotate(-3deg);
  }
  75% {
    transform: translate(40px, -10px) rotate(7deg);
  }
}

@keyframes silhouetteFlap {
  0%,
  100% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(-15deg);
  }
}

@keyframes meshMove {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  33% {
    transform: translate(20px, -30px) scale(1.1);
    opacity: 0.4;
  }
  66% {
    transform: translate(-15px, 20px) scale(0.9);
    opacity: 0.2;
  }
}

@keyframes particleDrift {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0);
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) scale(1);
  }
  90% {
    opacity: 1;
    transform: translateY(-10vh) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20vh) scale(0);
  }
}

@keyframes rayRotate {
  0% {
    transform: rotate(0deg) translateX(-50px);
    opacity: 0.1;
  }
  50% {
    transform: rotate(180deg) translateX(0px);
    opacity: 0.3;
  }
  100% {
    transform: rotate(360deg) translateX(-50px);
    opacity: 0.1;
  }
}

// Legacy animations (simplified)
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// ====== RESPONSIVE DESIGN ======
@media (max-width: 768px) {
  .individual-blog-card__marquee {
    padding: 0 1rem;
    margin: 2rem auto;
    gap: 1.5rem;
  }

  button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

// ====== COMPREHENSIVE MOBILE RESPONSIVENESS ======
@media (max-width: 768px) {
  .app-screen-loader {
    padding: 1rem;

    .butterfly-loader {
      width: 100px;
      height: 100px;
      margin-bottom: 2rem;

      .metamorphosis-stage {
        .cocoon {
          width: 60px;
          height: 60px;
        }

        .butterfly {
          .wing {
            &.wing-left,
            &.wing-right {
              width: 25px;
              height: 35px;
              top: -17px;
            }

            &.wing-left {
              left: -20px;
            }

            &.wing-right {
              right: -20px;
            }
          }

          .body {
            width: 2px;
            height: 25px;
            top: -12px;
          }
        }
      }

      .loading-particles .particle {
        @for $i from 1 through 12 {
          &:nth-child(#{$i}) {
            transform: rotate(#{$i * 30}deg) translateX(30px);
          }
        }
      }
    }

    .load-text {
      font-size: 1rem;
      margin-bottom: 0.75rem;
    }

    .loading-tagline {
      font-size: 0.8rem;
    }
  }

  .app-wrapper {
    z-index: 1;
    .app-background {
      .floating-butterflies .butterfly-silhouette {
        .silhouette-wing {
          width: 8px;
          height: 12px;

          &.silhouette-wing-left {
            left: -6px;
          }

          &.silhouette-wing-right {
            right: -6px;
          }
        }

        .silhouette-body {
          width: 1px;
          height: 8px;
        }
      }

      .floating-particles .floating-particle {
        width: 2px;
        height: 2px;
      }
    }

    .enhanced-main {
      padding: 0;
      margin: 0;
    }
  }
}

@media (max-width: 480px) {
  .app-screen-loader {
    .butterfly-loader {
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;

      .metamorphosis-stage {
        .cocoon {
          width: 50px;
          height: 50px;
        }

        .butterfly {
          .wing {
            &.wing-left,
            &.wing-right {
              width: 20px;
              height: 28px;
              top: -14px;
            }

            &.wing-left {
              left: -16px;
            }

            &.wing-right {
              right: -16px;
            }
          }

          .body {
            width: 2px;
            height: 20px;
            top: -10px;
          }
        }
      }

      .loading-particles .particle {
        width: 3px;
        height: 3px;

        @for $i from 1 through 12 {
          &:nth-child(#{$i}) {
            transform: rotate(#{$i * 30}deg) translateX(25px);
          }
        }
      }
    }

    .load-text {
      font-size: 0.9rem;
      letter-spacing: 0.15em;
    }

    .loading-tagline {
      font-size: 0.75rem;
    }
  }
}

// ====== ACCESSIBILITY ======
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// ====== DARK MODE OPTIMIZATION ======
@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #fafafa;
    --bg-secondary: #f0f9ff;
    --text-primary: #1a1a1a;
    --text-secondary: #4a4a4a;
    --glass-bg: rgba(20, 184, 166, 0.05);
    --glass-border: rgba(20, 184, 166, 0.2);
  }
}

// Support for original SCSS variables (if they exist elsewhere)
main {
  min-height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 0;
}
</style>
