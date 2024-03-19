<script setup>
//imports
import { ref, reactive } from "vue";
import { useModalStore } from "../stores/modalStore";

//props, general
defineProps({});
const modalStore = useModalStore();
//states
const adminEmail = ref("");
const functionMsg = ref(null);
//lifecycle

//functions
async function addAdmin() {
  modalStore.displayModal({
    icon: "error",
    title: "Permission Denied",
    text: "User does not have permission to perform this action, contact blog admin",
  });
}

//
</script>

<template>
  <div class="admin">
    <div class="container">
      <h2>Administration</h2>
      <div class="admin-info">
        <h2>Add Admin</h2>
        <div class="input">
          <input
            placeholder="Enter user email to make them an admin"
            type="text"
            id="addAdmins"
            v-model="adminEmail"
          />
        </div>
        <span>{{ functionMsg }}</span>
        <button @click="addAdmin" class="button">Submit</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin {
  display: flex;
  justify-content: center;
  width: 100%;
  .container {
    max-width: 1000px;
    width: 60%;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      span {
        font-size: 14px;
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
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
