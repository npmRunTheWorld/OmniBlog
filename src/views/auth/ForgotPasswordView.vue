<script setup>
//imports
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { email } from "@/assets/icons";
import { getAuth, sendPasswordResetEmail } from "@firebase/auth";

import firebaseApp from "@/firebase/firebaseInit";

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

const form = reactive({
  isError: false,
  errorMsg: "",
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

function resetClicked(e) {
  const formInput = new FormData(e.currentTarget);

  const emailOrUser = String(formInput.get("email-or-username") ?? "");

  if (!emailOrUser) {
    form.isError = true;
    form.errorMsg = "Please enter a username or email";
    return;
  }

  form.isError = false;
  form.errorMsg = "";
  reset.isLoading = true;

  resetPassword();

  setTimeout(() => {
    reset.isConfirmed = true;
    reset.isLoading = false;
  }, 500);

  router.push({ name: "login" });
}
</script>

<template>
  <div class="reset-password auth auth-reset-password">
    <Modal
      modalMessage="If your account exists, you will receive an email."
      v-show="reset.isConfirmed"
      @closeModal="closeModal"
    />

    <Loading v-show="reset.isLoading" />

    <div class="login__container">
      <form class="login" @submit.prevent="resetClicked">
        <p>Forgot your password? Enter your email to reset it</p>
        <h2 class="gradient-text">Reset Password</h2>
        <div class="input__container">
          <div class="input">
            <input
              type="email"
              placeholder="Email / Username"
              name="email-or-username"
              v-model="reset.email"
            />
            <img :src="email" :width="30" />
          </div>
        </div>

        <div class="error-container">
          <div class="error" v-show="form.isError">{{ form.errorMsg }}</div>
        </div>

        <button type="submit" class="reset-button">Reset</button>
        <p class="login-register">
          Back to
          <RouterLink class="muted-hov" :to="{ name: 'login' }"
            >Log in</RouterLink
          >
        </p>
        <div class="angle angle-reset-password"></div>
      </form>
      <div class="bg"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/auth/authLayer.scss";

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
      text-decoration: underline;
    }

    h2 {
      display: flex;
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 60px;

      @media screen and (min-width: 900px) {
        font-size: 40px;
      }
    }
    p {
      text-align: center;
      font-size: 0.85rem;
    }
    .login__register {
      @include row-start;
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

    .reset-button {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  .bg {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("@/assets/images/whiteForestFog.avif");
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
    background-image: url("@/assets/images/whiteForestFog.avif");
    color: white;

    .link {
      color: beige;
    }
  }
}
</style>
