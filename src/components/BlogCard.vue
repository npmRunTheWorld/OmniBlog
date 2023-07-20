<script setup>
//imports
import { ref, reactive, toRef, computed } from "vue";

import { arrowRight, edit, trash } from "@/assets/Icons";
import useBlogCard from "../stores/blogStore";

defineProps({
  //props
  content: {
    type: Object,
    required: true,
  },
});

//states
const cardStore = useBlogCard();

//lifecycle

//functions
const editPost = computed(() => cardStore.editPost);
</script>

<template>
  <div class="container">
    <div class="card__container">
      <div class="card__container-background"></div>

      <div class="icons">
        <div class="icon">
          <img :src="edit" :width="30" class="edit" v-show="editPost" />
        </div>

        <div class="icon">
          <img :src="trash" :width="24" class="trash" v-show="editPost" />
        </div>
      </div>

      <img
        :src="`src/assets/blogCards/${content.blogCoverPhoto}.jpg`"
        alt="blog-image"
      />

      <div class="content__information">
        <h4>{{ content.title }}</h4>
        <h6>Posted on: {{ content.blogData }}</h6>
      </div>
      <RouterLink :to="{ name: post }">
        View The Post <img :src="arrowRight" :width="18" />
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

.card__container {
  min-width: 100%;
  width: 30%;
  color: $black;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  gap: 1rem;

  .icons {
    display: flex;
    gap: 1rem;
    width: 100%;
    align-items: flex-end;
    justify-content: flex-end;
    transition: none;
    img {
      cursor: pointer;
    }
  }

  .card__container-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $black;
    z-index: 0;
    filter: invert(1) brightness(40%);
  }
  transition: 0.5s ease-in transform;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px 4px rgba(0, 0, 0, 0.5),
      0 2px 4px -1px rgba(0, 0, 0, 0.6);
    a {
      color: $secondary;
    }
  }

  .content__information {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  a {
    color: $primary;
    margin-top: auto;
    img {
      margin-left: 0.3rem;
      transform: translateY(25%);
    }
  }

  &:hover .card__container-background {
    background-color: $primary;
    filter: invert(0);
  }

  :not(.card__container-background) {
    z-index: 1;
  }
}
</style>
