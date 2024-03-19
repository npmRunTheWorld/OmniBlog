<script setup>
//imports

//states, props, general

//functions
</script>

<template>
  <div class="loader__container">
    <div class="spinner" v-custom="'rgba(0,0,0)'">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader__container {
  display: flex;
  z-index: 100000;
}
.spinner {
  width: 34px;
  height: 34px;
  animation: spinner-y0fdc1 5s infinite ease;
  transform-style: preserve-3d;
}

.spinner > div {
  height: 100%;
  position: absolute;
  width: 100%;
  border: 1px solid $secondary;
  background: linear-gradient(
    90deg,
    rgb(2, 23, 61) 0%,
    rgb(9, 121, 116) 85%,
    rgb(138, 108, 43) 100%
  );
  width: 35px;
  height: 35px;
}

.spinner div:nth-of-type(1) {
  transform: translateZ(-14px) rotateY(180deg);
}

.spinner div:nth-of-type(2) {
  transform: rotateY(-270deg) translateX(40%);
  transform-origin: top right;
}

.spinner div:nth-of-type(3) {
  transform: rotateY(270deg) translateX(-40%);
  transform-origin: center left;
}

.spinner div:nth-of-type(4) {
  transform: rotateX(90deg) translateY(-40%);
  transform-origin: top center;
}

.spinner div:nth-of-type(5) {
  transform: rotateX(-90deg) translateY(40%);
  transform-origin: bottom center;
}

.spinner div:nth-of-type(6) {
  transform: translateZ(21px);
}

@keyframes spinner-y0fdc1 {
  0% {
    transform: rotateZ(0) rotateX(-25deg) rotateY(25deg);
  }

  50% {
    transform: rotateZ(50deg) rotateX(-385deg) rotateY(25deg);
  }

  100% {
    transform: rotateZ(0) rotateX(-385deg) rotateY(385deg);
  }
}
</style>
