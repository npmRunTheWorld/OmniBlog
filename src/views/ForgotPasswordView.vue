<script setup>
//imports
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { email, password } from "@/assets/icons";
import { getAuth, sendPasswordResetEmail } from "@firebase/auth";

import firebaseApp from "../firebase/firebaseInit";

defineProps({
  //props
});

//general
const router = useRouter();

//states
const reset = reactive({
  email: "",
  isConfirmed: false,
  isLoading: false,
});

//lifecycle

//functions
function closeModal() {
  reset.isConfirmed = false;
  reset.email = "";
}

async function resetPassword() {
  const auth = getAuth(firebaseApp);
  await sendPasswordResetEmail(auth, reset.email);
}

function resetClicked() {
  reset.isLoading = true;

  resetPassword();

  setTimeout(() => {
    reset.isConfirmed = true;
    reset.isLoading = false;
  }, 500);

  router.push({ name: "login" });
}

//
</script>

<template>
  <div class="reset-password">
    <Modal
      modalMessage="If your account exists, you will receive an email."
      v-show="reset.isConfirmed"
      @closeModal="closeModal"
    />

    <Loading v-show="reset.isLoading" />

    <div class="login__container">
      <form class="login">
        <p class="login-register">
          Back to
          <RouterLink class="link" :to="{ name: 'login' }">Log in</RouterLink>
        </p>

        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it</p>
        <div class="input__container">
          <div class="input">
            <input
              type="email"
              placeholder="Email / Username"
              v-model="reset.email"
            />
            <img :src="email" :width="30" />
          </div>
        </div>

        <button type="submit" @click.prevent="resetClicked">Reset</button>

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
  z-index: 0;

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
      margin-bottom: 8px;

      @media screen and (min-width: 900px) {
        font-size: 40px;
      }
    }
    p {
      text-align: center;
      margin-bottom: 30px;
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

    .error {
      color: $red;
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

.reset-password {
  @media screen and (max-width: 900px) {
    background-size: cover;
    background-image: url("../assets/background.png");
    color: white;

    .link {
      color: beige;
    }
  }
}
</style>
