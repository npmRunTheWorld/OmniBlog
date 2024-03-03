<script setup>
//imports
import { ref, reactive, toRef, computed } from "vue";

import { arrowRight, edit, trash } from "@/assets/Icons";
import { useBlogStore } from "../stores/blogStore";

defineProps({
  //props
  content: {
    type: Object,
    required: true,
  },
  index :{
    type: Number,
    required: true
  }
});

//states
const cardStore = useBlogStore();
const hover = ref(false);
//lifecycle

//functions
function deletePost() {
  console.log('delete post')
}  

function editPost() {
  console.log('edit post')
}


</script>

<template>
  <div class="container">
    <div class="card__container" @mouseenter="hover = true" @mouseleave="hover = false">
      <div class="card__container-background"></div>

      <div class="icons">
        <div class="icon">
          <img :src="edit" :width="30" class="edit" v-show="editPost" @click="editPost"/>
        </div>

        <div class="icon">
          <img :src="trash" :width="24" class="trash" v-show="editPost" @click="deletePost" />
        </div>
      </div>

      <img :src="`${content.blogCoverPhoto}`" alt="blog-image" />

      <div class="content__information" :class="hover ? 'hover-effect' : ''">
        <h4>{{ content.title }}</h4>
        <h6>Posted on: {{ content.blogData }}</h6>
      </div>
      <RouterLink :to="{ name: 'viewPost' , params : { uid : content?.uid, index : index}}">
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
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  gap: 1rem;
  color: $background2-less;
  .icons {
    display: flex;
    gap: 1rem;
    width: 100%;
    align-items: flex-end;
    justify-content: flex-end;
    transition: none;
    color: white;
    
    img {
      width: 16px;
      height: 16px;
      cursor: pointer;
      filter: invert(0.65);
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
    background: rgb(34, 34, 34);
    border-radius: 5px;
    z-index: 0;
  }
  transition: 0.5s ease-in transform;

  &:hover {
    transform: rotateZ(-0.5deg) scale(0.99);
    border-radius: 5px;
    box-shadow: 0 4px 6px 4px rgba(0, 0, 0, 0.5),
      0 2px 4px -1px rgba(0, 0, 0, 0.6);
    color: black;
    a {
      color: $accent;
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

  :not(.card__container-background) {
    z-index: 1;
  }

  &:hover .card__container-background {
    background-color: rgb(209, 207, 199);
    color: black;
  }
}

.hover-effect{
  color: black;
}
</style>
