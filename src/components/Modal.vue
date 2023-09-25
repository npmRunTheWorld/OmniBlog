<script setup>
//imports
import { ref, reactive } from "vue";

defineProps({
  //props
  modalMessage: {
    type: String,
    required: true,
    defaut: "Warning! ",
  },
});

defineEmits(["closeModal"]);

//general

//states

//lifecycle

//functions

//
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <p>{{ modalMessage }}</p>
      <button @click="$emit('closeModal')">Close</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: $t-black7;

  .modal-content {
    @include col;
    align-self: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: $background2;
  }

  p {
    text-align: center;
  }
}
</style>
