<script setup>
//imports
import { ref, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { email, password } from "@/assets/icons";
import firebaseApp from "../firebase/firebaseInit";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";

defineProps({
  //props
});

//general
const router = useRouter();

//states
const form = reactive({
  email: "",
  password: "",
  errorMsg: "",
  isError: false,
  isLoading: false,
});

//lifecycle

//functions

function persistError() {
  form.isError = true;
  form.isLoading = false;
}

function login() {
  form.isLoading = true;

  if (form.email === "") {
    form.errorMsg = "Please enter an email";
    persistError();
    return;
  }

  if (form.password === "") {
    form.errorMsg = "Please enter a password";
    persistError();
    return;
  }

  signInWithEmailAndPassword(getAuth(firebaseApp), form.email, form.password)
    .then((user) => {
      form.errorMsg = "";
      form.isError = false;
      form.isLoading = false;
      router.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error);
      form.errorMsg = "Email or Password is invalid.";
      persistError();
    });

  form.isLoading = false;
}

//
</script>

<template>
  <div class="login-toplevel">
    <Loading v-show="form.isLoading" />

    <div class="login__container">
      <form class="login">
        <p class="login-register">
          Don't have an account?
          <RouterLink :to="{ name: 'register' }">Sign up</RouterLink>
        </p>

        <h2>Login to Omni Blog</h2>
        <div class="input__container">
          <div class="input">
            <input
              type="email"
              placeholder="Email / Username"
              v-model="form.email"
            />
            <img :src="email" :width="30" />
          </div>

          <div class="input">
            <input
              type="password"
              placeholder="Password"
              v-model="form.password"
            />
            <img :src="password" :width="30" />
          </div>
        </div>
        <div class="error-container">
          <div class="error" v-show="form.isError">{{ form.errorMsg }}</div>
        </div>

        <RouterLink :to="{ name: 'forgotpassword' }" class="forgot-password"
          >Forgot your password?</RouterLink
        >

        <button type="submit" @click.prevent="login">Sign in</button>

        <div class="angle"></div>
      </form>
      <div class="bg"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login__container {
  display: flex;
  height: 100vh;
  width: 90%;
  overflow: hidden;
  justify-content: center;
  align-self: center;
  margin: 0 auto;

  @media screen and (min-width: 900px) {
    width: 100%;
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media screen and (min-width: 900px) {
      padding: 0 50px;
    }

    a {
      color: $black;
      text-decoration: underline;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 0.3rem;
      }
    }

    h2 {
      display: flex;
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 48px;

      @media screen and (min-width: 900px) {
        font-size: 40px;
      }
    }

    .login__register {
      @include row-start;
    }

    .input__container {
      @include col-start;
      max-width: 350px;
      gap: 1rem;
      .input {
        @include row-start;
        gap: 1rem;
        position: relative;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #ebebeb;
          padding: 4px 4px 4px 30px;

          &:focus {
            outline: none;
          }
        }

        img {
          width: 14px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .error-container {
      display: flex;
      height: 14px;
      min-height: 14px;
      margin-top: 0.3rem;
      margin-bottom: 0.6rem;
      .error {
        color: $red;
      }
    }

    .forgot-password {
      color: $black;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 0.3rem;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: $primary;
      transform: rotateZ(3deg);
      width: 60px;
      right: -38px;
      height: 101%;

      @media screen and (min-width: 900px) {
        display: initial;
      }
    }
  }

  .bg {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/background.png");
    width: 100%;
    height: 100%;

    @media screen and (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
