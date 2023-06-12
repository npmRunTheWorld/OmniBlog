<script setup>
//imports
import { ref, reactive } from "vue";

defineProps({
  //props
});

//general

//states

//lifecycle

//functions

//
</script>

<template>
  <div class="loading-container">
    <span>♣</span>
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $t-black5;

  @keyframes spinner {
    to {
      transform: rotateZ(360deg);
    }
  }

  span {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto;
    border: 3px solid transparent;
    border-top-color: #fff;
    border-bottom-color: #fff;
    animation: spinner ease 1000ms infinite;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
