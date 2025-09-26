<script setup>
//imports
import { reactive, onMounted, onBeforeMount, onUnmounted, computed } from "vue";
import { RouterLink } from "vue-router";

import ProfileMenu from "./ProfileMenu.vue";
import { useUserStore } from "../stores/userStore";
import { Icon } from "@iconify/vue";
//states, props, general

const props = defineProps({
  titles: {
    type: String,
    required: false,
    default: "Home",
  },
  isUserLoggedIn: {
    type: Boolean,
    required: true,
    default: null,
  },
});

defineEmits(["logout"]);

//stores
const userStore = useUserStore();

//states
const mobile = reactive({
  isMobile: false,
  isMobileNav: false,
  isMobileMenuClicked: false,
  linkClick: false,
});

function checkScreen() {
  var screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  //console.log("Screen width: " + screenWidth);

  // Check screen height
  var screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  //console.log("Screen height: " + screenHeight);

  if (screenWidth <= 768) {
    mobile.isMobile = true;
  } else {
    mobile.isMobile = false;
    mobile.isMobileNav = false; // Close mobile nav when switching to desktop
    mobile.isMobileMenuClicked = false;
  }

  //console.log(screenWidth + "    h:" + screenHeight);
}

//lifecycle hooks
onBeforeMount(() => {
  window.addEventListener("resize", checkScreen);
  checkScreen();
  console.log("Navigation mounted", mobile.isMobile);
});

onMounted(() => {
  window.addEventListener("resize", checkScreen);
  checkScreen();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});

const isLoaded = computed(() => {
  if (props.isUserLoggedIn !== null) {
    return true;
  }

  return false;
});

//functions
function toggleMobileNav() {
  mobile.isMobileMenuClicked = !mobile.isMobileMenuClicked;
  mobile.isMobileNav = !mobile.isMobileNav;
}

function mobileRouteChangeEffect() {
  toggleMobileNav();
}
</script>

<template>
  <header class="modern-header">
    <!-- Animated Background Elements -->
    <div class="header-background">
      <div class="header-gradient"></div>
      <div class="floating-particles">
        <div class="nav-particle" v-for="n in 6" :key="n"></div>
      </div>
    </div>

    <!-- Logo Section with Brand Logo -->
    <div class="logo-section">
      <RouterLink to="/" class="modern-logo">
        <img
          src="@/assets/images/omniBlogLogo.png"
          alt="OmniBlog"
          class="brand-logo"
        />
        <div class="logo-text">
          <h1>
            <span class="logo-omni">Omni</span>
            <span class="logo-blog">Blog</span>
          </h1>
          <p class="logo-tagline">Transform Ideas</p>
        </div>
      </RouterLink>
    </div>

    <!-- Modern Navigation -->
    <div class="navigation-section">
      <nav v-show="!mobile.isMobile" class="desktop-nav">
        <ul class="nav-links">
          <li class="nav-item">
            <RouterLink :to="{ name: 'home' }" class="nav-link">
              <span class="link-text">{{ titles }}</span>
              <div class="link-underline"></div>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'blog' }" class="nav-link">
              <span class="link-text">Blog</span>
              <div class="link-underline"></div>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'post' }" class="nav-link">
              <span class="link-text">Create Post</span>
              <div class="link-underline"></div>
            </RouterLink>
          </li>
        </ul>

        <!-- Modern Auth Section -->
        <div class="auth-section">
          <div class="auth-loading" v-if="!isLoaded">
            <div class="loading-dots">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>

          <div class="auth-content" v-else>
            <RouterLink
              v-if="!isUserLoggedIn"
              :to="{ name: 'login' }"
              class="login-button"
              @click.stop="toggleMobileNav"
            >
              <span class="button-text">Log in</span>
              <div class="button-glow"></div>
            </RouterLink>

            <ProfileMenu
              v-else
              @logout="$emit('logout')"
              class="profile-menu"
            />
          </div>
        </div>
      </nav>

      <!-- Modern Mobile Menu Button -->
      <div
        class="mobile-menu-button"
        v-show="mobile.isMobile && !mobile.isMobileMenuClicked"
        @click="toggleMobileNav"
      >
        <div class="hamburger-icon">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </div>
      </div>

      <!-- Ultra-Modern Mobile Navigation -->
      <nav
        class="modern-mobile-nav"
        v-if="mobile.isMobile && mobile.isMobileNav"
      >
        <!-- Mobile Nav Background -->
        <div class="mobile-nav-background">
          <div class="mobile-gradient"></div>
          <div class="mobile-particles">
            <div class="mobile-particle" v-for="n in 8" :key="n"></div>
          </div>
        </div>

        <!-- Mobile Nav Content -->
        <div class="mobile-nav-content">
          <!-- Close Button -->
          <div class="mobile-close-button">
            <button @click.stop="toggleMobileNav" class="close-btn">
              <span class="close-line close-line-1"></span>
              <span class="close-line close-line-2"></span>
            </button>
          </div>

          <!-- Mobile Logo -->
          <div class="mobile-logo">
            <div class="mobile-butterfly">
              <div class="mobile-wing wing-left"></div>
              <div class="mobile-wing wing-right"></div>
              <div class="mobile-body"></div>
            </div>
            <h2>OmniBlog</h2>
          </div>

          <!-- Mobile Navigation Links -->
          <ul class="mobile-nav-links">
            <!-- Mobile Auth Section -->
            <li
              class="mobile-nav-item mobile-auth-section"
              v-if="!isUserLoggedIn"
            >
              <RouterLink
                :to="{ name: 'login' }"
                @click.stop="toggleMobileNav"
                class="mobile-login-btn"
              >
                <span class="mobile-link-icon">
                  <Icon icon="mdi-light:login" />
                </span>
                <span class="mobile-link-text">Log in</span>
              </RouterLink>
            </li>

            <!-- Mobile User Info -->
            <li class="mobile-nav-item mobile-user-info" v-if="isUserLoggedIn">
              <div class="mobile-user-details">
                <div class="mobile-user-avatar">
                  <span class="user-initials">{{
                    userStore.initials || "U"
                  }}</span>
                </div>
                <div class="mobile-user-text">
                  <p class="user-name">
                    {{ userStore.firstName || "User" }}
                    {{ userStore.lastName || "" }}
                  </p>
                  <p class="user-email">{{ userStore.email }}</p>
                </div>
              </div>
            </li>

            <li class="mobile-nav-item">
              <RouterLink
                :to="{ name: 'home' }"
                @click.stop="toggleMobileNav"
                class="mobile-nav-link"
              >
                <span class="mobile-link-icon">
                  <Icon icon="mdi-light:home" />
                </span>
                <span class="mobile-link-text">{{ titles }}</span>
              </RouterLink>
            </li>

            <li class="mobile-nav-item">
              <RouterLink
                :to="{ name: 'blog' }"
                @click.stop="toggleMobileNav"
                class="mobile-nav-link"
              >
                <span class="mobile-link-icon"
                  ><Icon icon="mdi-light:book"
                /></span>
                <span class="mobile-link-text">Blog</span>
              </RouterLink>
            </li>

            <li class="mobile-nav-item">
              <RouterLink
                :to="{ name: 'post' }"
                @click.stop="toggleMobileNav"
                class="mobile-nav-link"
              >
                <span class="mobile-link-icon">
                  <Icon icon="mdi-light:pencil" />
                </span>
                <span class="mobile-link-text">Create Post</span>
              </RouterLink>
            </li>

            <!-- Additional Navigation Links -->
            <li class="mobile-nav-item" v-if="isUserLoggedIn">
              <RouterLink
                :to="{ name: 'profile' }"
                @click.stop="toggleMobileNav"
                class="mobile-nav-link"
              >
                <span class="mobile-link-icon">👤</span>
                <span class="mobile-link-text">Profile</span>
              </RouterLink>
            </li>

            <li class="mobile-nav-item" v-if="isUserLoggedIn">
              <RouterLink
                :to="{ name: 'admin' }"
                @click.stop="toggleMobileNav"
                class="mobile-nav-link"
              >
                <span class="mobile-link-icon">⚙️</span>
                <span class="mobile-link-text">Admin</span>
              </RouterLink>
            </li>

            <!-- Mobile Logout Button -->
            <li class="mobile-nav-item" v-if="isUserLoggedIn">
              <button
                @click="
                  $emit('logout');
                  toggleMobileNav();
                "
                class="mobile-logout-btn"
              >
                <span class="mobile-link-icon">🚪</span>
                <span class="mobile-link-text">Log Out</span>
              </button>
            </li>
          </ul>

          <!-- Mobile Footer -->
          <div class="mobile-nav-footer">
            <p class="mobile-tagline">Transform Ideas Into Stories</p>
          </div>
        </div>

        <!-- Mobile Background Overlay -->
        <div class="mobile-nav-overlay" @click.stop="toggleMobileNav"></div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>

// ====== MODERN HEADER CONTAINER ======
.modern-header {
  position: sticky;
  top: 0;
  width: 100%;
  height: var(--nav-height);
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--nav-border);
  box-shadow: var(--nav-shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
  // Animated Background
  .header-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;

    .header-gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(6, 214, 160, 0.05) 50%,
        transparent 100%
      );
      animation: gradientFlow 8s ease-in-out infinite;
    }

    .floating-particles {
      position: absolute;
      width: 100%;
      height: 100%;

      .nav-particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--nav-accent);
        border-radius: 50%;
        opacity: 0;
        animation: navParticleFloat 6s ease-in-out infinite;

        &:nth-child(1) {
          left: 10%;
          animation-delay: 0s;
        }
        &:nth-child(2) {
          left: 30%;
          animation-delay: 1s;
        }
        &:nth-child(3) {
          left: 50%;
          animation-delay: 2s;
        }
        &:nth-child(4) {
          left: 70%;
          animation-delay: 3s;
        }
        &:nth-child(5) {
          left: 90%;
          animation-delay: 4s;
        }
        &:nth-child(6) {
          left: 15%;
          animation-delay: 5s;
        }
      }
    }
  }
}

// ====== MODERN LOGO SECTION ======
.logo-section {
  flex-shrink: 0;

  .modern-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    transition: var(--transition-smooth);

    .brand-logo {
      width: 45px;
      height: 45px;
      object-fit: contain;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      padding: 6px;
      filter: drop-shadow(0 0 10px rgba(6, 214, 160, 0.4));
      transition: var(--transition-smooth);

      &:hover {
        background: rgba(255, 255, 255, 1);
        filter: drop-shadow(0 0 15px rgba(6, 214, 160, 0.6));
        transform: scale(1.08);
      }
    }

    .logo-text {
      h1 {
        font-size: 1.5rem;
        font-weight: 800;
        margin: 0;
        line-height: 1;

        .logo-omni {
          color: var(--nav-text);
        }

        .logo-blog {
          color: var(--nav-accent);
          text-shadow: 0 0 10px rgba(6, 214, 160, 0.5);
        }
      }

      .logo-tagline {
        font-size: 0.7rem;
        color: var(--nav-text-muted);
        margin: 2px 0 0 0;
        font-weight: 500;
        letter-spacing: 0.05em;
        opacity: 0.8;
      }
    }

    &:hover {
      transform: translateY(-1px);

      .logo-butterfly {
        .butterfly-wing {
          box-shadow: 0 0 20px rgba(6, 214, 160, 0.5);
        }
      }

      .logo-text {
        .logo-blog {
          text-shadow: 0 0 15px rgba(6, 214, 160, 0.7);
        }
      }
    }
  }
}

// ====== DESKTOP NAVIGATION ======
.navigation-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 2rem;

    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;

      .nav-item {
        position: relative;

        .nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: var(--nav-text);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.5rem 0;
          transition: var(--transition-smooth);
          position: relative;

          .link-text {
            position: relative;
            z-index: 2;
          }

          .link-underline {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(
              90deg,
              var(--nav-accent),
              var(--nav-accent-light)
            );
            transition: var(--transition-spring);
            transform: translateX(-50%);
            border-radius: 2px;
          }

          &:hover {
            color: var(--nav-accent);
            text-shadow: 0 0 8px rgba(6, 214, 160, 0.3);

            .link-underline {
              width: 100%;
            }
          }

          &.router-link-active {
            color: var(--nav-accent);

            .link-underline {
              width: 100%;
              box-shadow: 0 0 10px rgba(6, 214, 160, 0.5);
            }
          }
        }
      }
    }

    .auth-section {
      margin-left: 1rem;

      .auth-loading {
        .loading-dots {
          display: flex;
          gap: 4px;

          .dot {
            width: 6px;
            height: 6px;
            background: var(--nav-accent);
            border-radius: 50%;
            animation: loadingPulse 1.4s ease-in-out infinite;

            &:nth-child(1) {
              animation-delay: 0s;
            }
            &:nth-child(2) {
              animation-delay: 0.2s;
            }
            &:nth-child(3) {
              animation-delay: 0.4s;
            }
          }
        }
      }

      .auth-content {
        .login-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, var(--nav-accent), #118a73);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          position: relative;
          overflow: hidden;
          transition: var(--transition-smooth);
          box-shadow: 0 4px 15px rgba(6, 214, 160, 0.3);

          .button-text {
            position: relative;
            z-index: 2;
          }

          .button-glow {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: left 0.5s;
          }

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(6, 214, 160, 0.4);

            .button-glow {
              left: 100%;
            }
          }

          &:active {
            transform: translateY(-1px);
          }
        }

        .profile-menu {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

// ====== MOBILE MENU BUTTON ======
.mobile-menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(6, 214, 160, 0.1);
  border: 1px solid rgba(6, 214, 160, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: var(--transition-smooth);
  backdrop-filter: blur(10px);
  z-index: 1001;

  .hamburger-icon {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .hamburger-line {
      width: 20px;
      height: 2px;
      background: var(--nav-accent);
      border-radius: 2px;
      transition: var(--transition-smooth);
      box-shadow: 0 0 4px rgba(6, 214, 160, 0.3);
    }
  }

  &:hover {
    background: rgba(6, 214, 160, 0.15);
    border-color: var(--nav-accent);
    transform: scale(1.05);

    .hamburger-line {
      box-shadow: 0 0 8px rgba(6, 214, 160, 0.5);
    }
  }

  &:active {
    transform: scale(0.95);
  }
}

// ====== ULTRA-MODERN MOBILE NAVIGATION ======
.modern-mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999 !important;
  display: flex;

  .mobile-nav-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .mobile-gradient {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(10, 10, 15, 1) 0%,
        rgba(5, 5, 16, 1) 100%
      );
      backdrop-filter: blur(20px);
    }

    .mobile-particles {
      position: absolute;
      width: 100%;
      height: 100%;

      .mobile-particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: var(--nav-accent);
        border-radius: 50%;
        opacity: 0;
        animation: mobileParticleFloat 8s ease-in-out infinite;

        &:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        &:nth-child(2) {
          top: 40%;
          right: 15%;
          animation-delay: 1s;
        }
        &:nth-child(3) {
          bottom: 30%;
          left: 20%;
          animation-delay: 2s;
        }
        &:nth-child(4) {
          top: 60%;
          right: 25%;
          animation-delay: 3s;
        }
        &:nth-child(5) {
          bottom: 20%;
          left: 60%;
          animation-delay: 4s;
        }
        &:nth-child(6) {
          top: 10%;
          right: 40%;
          animation-delay: 5s;
        }
        &:nth-child(7) {
          bottom: 60%;
          left: 80%;
          animation-delay: 6s;
        }
        &:nth-child(8) {
          top: 80%;
          right: 60%;
          animation-delay: 7s;
        }
      }
    }
  }

  .mobile-nav-content {
    width: 320px;
    height: 100%;
    background: #0f0f19 !important;
    backdrop-filter: blur(30px);
    border-left: 2px solid rgba(6, 214, 160, 0.4);
    box-shadow: -10px 0 50px rgba(0, 0, 0, 0.8);
    padding: 2rem;
    display: flex !important;
    flex-direction: column;
    margin-left: auto;
    position: relative;
    overflow-y: auto;

    .mobile-close-button {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;

      .close-btn {
        width: 40px;
        height: 40px;
        background: rgba(6, 214, 160, 0.1);
        border: 1px solid rgba(6, 214, 160, 0.2);
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: var(--transition-smooth);

        .close-line {
          position: absolute;
          width: 18px;
          height: 2px;
          background: var(--nav-accent);
          border-radius: 2px;
          transition: var(--transition-smooth);

          &.close-line-1 {
            transform: rotate(45deg);
          }

          &.close-line-2 {
            transform: rotate(-45deg);
          }
        }

        &:hover {
          background: rgba(6, 214, 160, 0.2);
          border-color: var(--nav-accent);
          transform: scale(1.1);

          .close-line {
            box-shadow: 0 0 8px rgba(6, 214, 160, 0.5);
          }
        }
      }
    }

    .mobile-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 2rem 0 3rem 0;
      padding-bottom: 2rem;
      border-bottom: 1px solid rgba(6, 214, 160, 0.1);

      .mobile-butterfly {
        position: relative;
        width: 35px;
        height: 28px;

        .mobile-wing {
          position: absolute;
          background: linear-gradient(
            135deg,
            var(--nav-accent),
            var(--nav-accent-light)
          );
          border-radius: 50% 10% 50% 80%;
          box-shadow: 0 0 10px rgba(6, 214, 160, 0.3);
          animation: mobileWingFlap 2.5s ease-in-out infinite;

          &.wing-left {
            width: 16px;
            height: 20px;
            top: 4px;
            left: 6px;
            transform-origin: bottom right;
          }

          &.wing-right {
            width: 16px;
            height: 20px;
            top: 4px;
            right: 6px;
            transform-origin: bottom left;
            transform: scaleX(-1);
            animation-delay: 0.1s;
          }
        }

        .mobile-body {
          position: absolute;
          width: 2px;
          height: 18px;
          background: linear-gradient(to bottom, var(--nav-accent), #118a73);
          border-radius: 2px;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 6px rgba(6, 214, 160, 0.4);
        }
      }

      h2 {
        color: var(--nav-text);
        font-size: 1.4rem;
        font-weight: 800;
        margin: 0;
        text-shadow: 0 0 10px rgba(6, 214, 160, 0.3);
      }
    }

    .mobile-nav-links {
      list-style: none;
      margin: 2rem 0;
      padding: 0;
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .mobile-nav-item {
        margin-bottom: 0;
        width: 100%;
        display: block;

        .mobile-auth {
          .mobile-login-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, var(--nav-accent), #118a73);
            color: white;
            text-decoration: none;
            border-radius: 16px;
            font-weight: 600;
            font-size: 1rem;
            position: relative;
            overflow: hidden;
            transition: var(--transition-smooth);
            box-shadow: 0 4px 20px rgba(6, 214, 160, 0.3);
            margin-bottom: 2rem;

            .mobile-btn-text {
              position: relative;
              z-index: 2;
            }

            .mobile-btn-glow {
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.2),
                transparent
              );
              transition: left 0.5s;
            }

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 25px rgba(6, 214, 160, 0.4);

              .mobile-btn-glow {
                left: 100%;
              }
            }
          }
        }

        .mobile-profile {
          margin-bottom: 2rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: #ffffff;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          transition: var(--transition-smooth);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(6, 214, 160, 0.2);
          width: 100%;

          .mobile-link-icon {
            font-size: 1.2rem;
            opacity: 0.8;
          }

          .mobile-link-text {
            flex: 1;
          }

          &:hover {
            background: rgba(6, 214, 160, 0.1);
            border-color: rgba(6, 214, 160, 0.3);
            color: var(--nav-accent);
            transform: translateX(8px);

            .mobile-link-icon {
              opacity: 1;
            }
          }

          &.router-link-active {
            background: rgba(6, 214, 160, 0.15);
            border-color: var(--nav-accent);
            color: var(--nav-accent);
            box-shadow: 0 0 20px rgba(6, 214, 160, 0.2);
          }
        }

        .mobile-logout-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: var(--transition-smooth);
          width: 100%;

          .mobile-link-icon {
            font-size: 1.2rem;
            opacity: 0.8;
          }

          .mobile-link-text {
            flex: 1;
            text-align: left;
          }

          &:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.4);
            transform: translateX(8px);

            .mobile-link-icon {
              opacity: 1;
            }
          }
        }

        .mobile-login-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: var(--nav-text);
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          transition: var(--transition-smooth);
          background: linear-gradient(
            135deg,
            var(--nav-accent),
            var(--nav-accent-light)
          );
          border: 1px solid var(--nav-accent);
          box-shadow: 0 4px 12px rgba(6, 214, 160, 0.3);

          .mobile-link-icon {
            font-size: 1.2rem;
          }

          .mobile-link-text {
            flex: 1;
            color: white;
            font-weight: 700;
          }

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(6, 214, 160, 0.4);
          }
        }

        .mobile-user-info {
          margin-bottom: 1.5rem;
          padding: 0 !important;

          .mobile-user-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.5rem;
            background: rgba(6, 214, 160, 0.1);
            border: 1px solid rgba(6, 214, 160, 0.2);
            border-radius: 12px;

            .mobile-user-avatar {
              width: 48px;
              height: 48px;
              background: var(--nav-accent);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;

              .user-initials {
                color: white;
                font-weight: 700;
                font-size: 1.1rem;
              }
            }

            .mobile-user-text {
              flex: 1;

              .user-name {
                color: var(--nav-text);
                font-weight: 600;
                font-size: 1rem;
                margin: 0 0 0.25rem 0;
              }

              .user-email {
                color: var(--nav-text-muted);
                font-size: 0.875rem;
                margin: 0;
                opacity: 0.8;
              }
            }
          }
        }
      }
    }

    .mobile-nav-footer {
      padding-top: 2rem;
      border-top: 1px solid rgba(6, 214, 160, 0.1);

      .mobile-tagline {
        text-align: center;
        color: var(--nav-text-muted);
        font-size: 0.9rem;
        font-weight: 500;
        margin: 0;
        opacity: 0.8;
      }
    }
  }

  .mobile-nav-overlay {
    flex: 1;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }
}

// ====== MODERN NAVIGATION ANIMATIONS ======
@keyframes gradientFlow {
  0%,
  100% {
    transform: translateX(-50px);
    opacity: 0.3;
  }
  50% {
    transform: translateX(50px);
    opacity: 0.6;
  }
}

@keyframes navParticleFloat {
  0%,
  100% {
    opacity: 0;
    transform: translateY(var(--nav-height)) scale(0);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-10px) scale(1);
  }
}

@keyframes logoButterfly {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-2px) rotate(1deg);
  }
}

@keyframes logoWingFlap {
  0%,
  100% {
    transform: rotateY(0deg) rotateX(0deg);
  }
  50% {
    transform: rotateY(-10deg) rotateX(5deg);
  }
}

@keyframes loadingPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes mobileParticleFloat {
  0%,
  100% {
    opacity: 0;
    transform: translate(0, 0) scale(0);
  }
  50% {
    opacity: 0.4;
    transform: translate(20px, -20px) scale(1);
  }
}

@keyframes mobileWingFlap {
  0%,
  100% {
    transform: rotateY(0deg) rotateX(0deg);
  }
  50% {
    transform: rotateY(-12deg) rotateX(6deg);
  }
}

// ====== TRANSITION ANIMATIONS ======
.mobile-nav-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mobile-nav-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.mobile-nav-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.mobile-nav-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

// ====== RESPONSIVE DESIGN ======
@media (max-width: 768px) {
  .modern-header {
    padding: 0 1rem;
    height: 70px;
    z-index: 10;

    .logo-section .modern-logo {
      gap: 0.75rem;

      .logo-butterfly {
        width: 35px;
        height: 25px;

        .butterfly-wing {
          &.wing-left,
          &.wing-right {
            width: 15px;
            height: 18px;
          }
        }

        .butterfly-body {
          height: 16px;
        }
      }

      .logo-text {
        h1 {
          font-size: 1.3rem;
        }

        .logo-tagline {
          font-size: 0.65rem;
        }
      }
    }
  }
  .navigation-section {
    z-index: 10002 !important;
  }
  .modern-mobile-nav .mobile-nav-content {
    width: 280px;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .modern-mobile-nav .mobile-nav-content {
    width: 100%;
    border-left: none;
  }
}
</style>
