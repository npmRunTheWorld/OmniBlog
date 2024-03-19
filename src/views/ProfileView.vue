<script setup>
//imports
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { adminIcon } from "../assets/Icons/index.js";
import { useUserStore } from "../stores/userStore";
import { setUser } from "../firebase/quries/getUser";

//props, general
defineProps({});

const userStore = useUserStore();
const { initials, email, firstName, lastName, userName, uid } =
  storeToRefs(userStore);
const inputs = reactive({
  firstName: "",
  lastName: "",
  email: "",
  username: "",
});

//states
const modal = reactive({
  modalActive: false,
  modalMessage: "Message",
});
//lifecycle
onMounted(() => {
  inputs.firstName = firstName.value;
  inputs.lastName = lastName.value;
  inputs.email = email.value;
  inputs.username = userName.value;
  console.log(userName.value);
});

//functions
function closeModal() {
  modal.modalActive = false;
  modal.modalMessage = "";
}
function updateProfile() {
  try {
    setUser(uid.value, {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      username: inputs.username,
    });
  } catch (error) {
    console.log("save unsuccessful");
  } finally {
    firstName.value = inputs.firstName;
    lastName.value = inputs.lastName;
    userName.value = inputs.username;
    userStore.setInitials();
    modal.modalMessage = "Changes Saved";
    modal.modalActive = true;
  }
}

//
</script>

<template>
  <div class="profile">
    <Modal
      v-if="modal.modalActive"
      :modalMessage="modal.modalMessage"
      v-on:close-modal="closeModal"
    />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ initials }}</div>
        <div class="admin-badge">
          <img :src="adminIcon" class="icon" />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="inputs.firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="inputs.lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="inputs.username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="inputs.email" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: center;
  width: 100%;
  .container {
    max-width: 1000px;
    width: 70%;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
          filter: invert(1);
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }

        #email {
          background-color: #a49e9e;
          font-weight: bold;
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
