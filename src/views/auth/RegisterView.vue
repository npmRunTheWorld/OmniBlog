<script setup>
//imports
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { email, password, userAlt } from "@/assets/Icons";

import firebaseApp from "@/firebase/firebaseInit";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useModalStore } from "@/stores/modalStore";

defineProps({
  //props
});

const router = useRouter();
const modalStore = useModalStore();
//states
const form = reactive({
  first: "",
  last: "",
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  isError: false,
  errorMsg: "",
  isLoading: false,
});

//lifecycle

//functions

async function persistError() {
  form.isLoading = false;
  form.isError = true;

  modalStore.displayModal({
    icon: "error",
    title: "Registration Failed!",
    text: form?.errorMsg || "An error occurred. Please try again later.",
    showCancelButton: false,
  });
}

async function register() {
  form.isLoading = true;

  if (
    form.first == "" ||
    form.last == "" ||
    form.username == "" ||
    form.email == "" ||
    form.password == "" ||
    form.passwordConfirm == ""
  ) {
    form.errorMsg = "Please fill up the entire form!";
    persistError();
    return;
  }

  if (form.password !== form.passwordConfirm) {
    form.errorMsg =
      "The password do not match. Please enter the password again.";
    persistError();
    return;
  }

  //form entry validated
  form.isError = true;
  form.errorMsg = "";

  try {
    //database access / initial username validation
    const db = getFirestore(firebaseApp);

    const userNameQuerySnap = await getDocs(
      query(collection(db, "users"), where("username", "==", form.username))
    );

    userNameQuerySnap.forEach((doc) => {
      if (doc.exists) {
        form.errorMsg = "Username already taken.";
        persistError();
        return;
      }
    });

    //authenticaiton
    const firebaseAuth = getAuth(firebaseApp);
    const createUser = await createUserWithEmailAndPassword(
      firebaseAuth,
      form.email,
      form.password
    );
    const result = await createUser;

    //database document setup upon full success
    await addDoc(collection(db, "users"), {
      uid: result.user.uid,
      firstName: form.first,
      lastName: form.last,
      username: form.username,
      email: form.email,
    });
  } catch (error) {
    console.log(error);

    if (error.code === "auth/email-already-in-use") {
      form.errorMsg = "The email is already in use.";
      persistError();
      return;
    }

    if (error.code === "auth/weak-password") {
      form.errorMsg = "The password is too weak.";
      persistError();
      return;
    }

    if (error.code === "auth/invalid-email") {
      form.errorMsg = "The email is invalid.";
      persistError();
      return;
    }
  }

  modalStore.displayModal({
    icon: "success",
    title: "Registration Successful!",
    text: "You have successfully registered. Please log in to continue.",
    showCancelButton: false,
    onOk: () => {
      router.push({ name: "login" });
    },
  });
}
</script>

<template>
  <div class="login-toplevel auth auth-register">
    <div class="login__container">
      <form class="login">
        <p class="login-register mobile-text-black">
          Already have an account?
          <RouterLink :to="{ name: 'login' }" class="muted-hov"
            >Log in</RouterLink
          >
        </p>

        <h2 class="gradient-text">Create Your Omni Blog Account</h2>
        <div class="input__container">
          <div class="input grid-input">
            <input type="text" placeholder="First Name" v-model="form.first" />

            <input type="text" placeholder="Last Name" v-model="form.last" />
          </div>

          <div class="input">
            <input type="text" placeholder="Username" v-model="form.username" />
            <img :src="userAlt" :width="30" />
          </div>

          <div class="input">
            <input type="email" placeholder="Email" v-model="form.email" />
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
          <div class="input">
            <input
              type="password"
              placeholder="Confirm Password"
              v-model="form.passwordConfirm"
            />
            <img :src="password" :width="30" />
          </div>
        </div>

        <div class="error-container">
          <div class="error" v-show="form.isError">{{ form.errorMsg }}</div>
        </div>

        <button type="submit" @click.prevent="register">Sign Up</button>

        <div class="angle angle-register"></div>
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

    .grid-input {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-content: center;
      align-items: center;
    }

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
      margin-bottom: 48px;

      @media screen and (min-width: 900px) {
        font-size: 40px;
      }
    }

    .login__register {
      @include row-start;
    }

    .forgot-password {
      color: $black;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 0.3rem;
      }
    }

    button {
      background-color: $black;
      color: $text2;
      border-radius: 15px;
      margin-top: 1rem;
      padding: 0.6rem;
    }
  }

  .bg {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("@/assets/images/forestPaintRegister.jpg");
    background-position: (bottom, center);
    width: 100%;
    height: 100%;

    @media screen and (min-width: 900px) {
      display: initial;
    }
  }
}

.login-toplevel {
  @media screen and (max-width: 900px) {
    background-size: cover;
    background-image: url("@/assets/images/forestPaintRegister.jpg");
  }
}
</style>
