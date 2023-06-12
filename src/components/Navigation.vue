<script setup>
//imports
import {
  ref,
  reactive,
  watch,
  onMounted,
  onBeforeMount,
  onUnmounted,
  computed,
} from "vue";
import { RouterLink } from "vue-router";

import Loader from "./Loader.vue";
import menuIcon from "../assets/Icons/bars-regular.svg";

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
  console.log("Screen width: " + screenWidth);

  // Check screen height
  var screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  console.log("Screen height: " + screenHeight);

  if (screenWidth < 767) {
    mobile.isMobile = true;
  } else {
    mobile.isMobile = false;
  }

  console.log(screenWidth + "    h:" + screenHeight);
}

//lifecycle hooks
onBeforeMount(() => {
  window.addEventListener("resize", checkScreen);
  checkScreen();
});

onMounted(() => {});

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
</script>

<template>
  <header class="header__container">
    <div class="header__logo-container">
      <Loader />
      <h1>Omni Blog</h1>
    </div>

    <div class="header__navigation">
      <nav v-show="!mobile.isMobile">
        <ul>
          <RouterLink :to="{ name: 'home' }">{{ titles }}</RouterLink>
          <RouterLink :to="{ name: 'blog' }">Blog</RouterLink>
          <RouterLink :to="{ name: 'post' }">Create Post</RouterLink>
          <div class="navigation-container">
            <div class="navigation-login-fallback" v-if="!isLoaded"></div>

            <div class="navigation__login" v-else>
              <RouterLink
                v-if="!isUserLoggedIn"
                :to="{ name: 'login' }"
                @click.stop="toggleMobileNav"
                >Log in</RouterLink
              >

              <ProfileMenu v-else @logout="$emit('logout')" />
            </div>
          </div>
        </ul>
      </nav>

      <img
        :src="menuIcon"
        width="30"
        height="30"
        v-show="mobile.isMobile && !mobile.isMobileMenuClicked"
        @click="toggleMobileNav"
      />
      <Transition
        name="mobile-nav-trans"
        v-if="mobile.isMobile && mobile.isMobileNav"
      >
        <nav class="mobile-nav" v-show="!mobile.linkClick">
          <div class="mobile-nav__container">
            <div class="close__menu">
              <p @click.stop="toggleMobileNav">X</p>
            </div>
            <ul>
              <div class="navigation__login">
                <RouterLink
                  v-if="!isUserLoggedIn"
                  :to="{ name: 'login' }"
                  @click.stop="toggleMobileNav"
                  >Log in</RouterLink
                >

                <ProfileMenu
                  :isMobile="mobile.isMobile"
                  v-else
                  @logout="$emit('logout')"
                />
              </div>
              <RouterLink
                :to="{ name: 'home' }"
                @click.stop="toggleMobileNav"
                >{{ titles }}</RouterLink
              >
              <RouterLink :to="{ name: 'blog' }" @click.stop="toggleMobileNav"
                >Blog</RouterLink
              >
              <RouterLink :to="{ name: 'post' }" @click.stop="toggleMobileNav"
                >Create Post</RouterLink
              >
            </ul>
          </div>
          <div
            class="mobile-nav__transparency-back"
            @click.stop="
              () => {
                toggleMobileNav();
                console.log('clicked');
              }
            "
          ></div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header__container {
  display: flex;
  background-color: $background2;
  margin: 0;
  padding: 1rem;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.295);
  width: 100%;
  z-index: 0;
}

.header__logo-container {
  @include row-start;
  color: $secondary;
  gap: 1.8rem;

  &:first-child {
    margin-left: 1rem;
  }
}

.header__navigation {
  @include row-end;
  width: 100%;

  nav ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    flex: auto;
    width: 100%;
    flex-wrap: wrap;
    & > * {
      text-decoration: none;
      color: $secondary;
      font-size: 15px;
      font-weight: 600;
      width: max-content;

      &:hover {
        color: black;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.281);
      }
    }
  }

  .navigation-container {
    width: 45px;

    .navigation-login-fallback {
      display: inline-block;
    }

    .navigation__login {
      cursor: pointer;
      a {
        color: $black;
      }
    }
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: -100%;
    height: 100%;
    width: 63%;
    background-color: black;
    color: white;
    z-index: 100;

    @keyframes showNav {
      0% {
        right: -100%;
      }

      100% {
        right: 0%;
      }
    }

    animation: showNav ease-in forwards 300ms;

    .mobile-nav__container {
      display: flex;
      flex-direction: column;
      height: 100%;
      z-index: 101;

      ul {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 50%;
        width: 100%;
        translate: -10%;
        margin-top: 21%;

        & > * {
          color: $text2;
        }

        z-index: 101;
      }

      .close__menu {
        display: flex;
        justify-content: flex-end;
        background-color: rgb(188, 188, 188);
        color: $text;
        width: fit-content;
        z-index: 101;
        width: 100%;

        p {
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
          margin-right: 10%;
          box-sizing: border-box;
          display: inline-block;
          &:hover {
            color: $accent;
          }
        }
      }

      .navigation__login {
        a {
          color: $text2;
        }
      }
    }
  }

  .mobile-nav__transparency-back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 90;
    background-color: rgba(0, 0, 0, 0.33);
  }
}
</style>
