<script setup>
//imports
import { ref, reactive, watch, computed, onBeforeUnmount, onMounted } from "vue";
import { useBlogStore } from "../stores/blogStore";
import BlogCard from "../components/BlogCard.vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { doc, deleteDoc } from "firebase/firestore";
//states, props, general

//pinia state management we must use toreToRefs to destruct the blogStore state
const blogStore = useBlogStore();
const { blogCardState } = storeToRefs(blogStore);

const router = useRoute();

//lifecycle
onBeforeUnmount(() => {
  blogStore.togglePost(false);
});

onMounted(() => {
  blogStore.editPost = false;
});

//functions
/* const editPost = computed({
  //persome computation
  get() {
    return blogStore.editPost;
  },
  set(payload) {
    blogStore.togglePost(payload);
  },
}); */




</script>

<template>
  <div class="container">
    <div class="toggle-edit__container">
      <h3>Edit Post</h3>
      <input type="checkbox" v-model="blogStore.editPost" />
    </div>

    <div class="individual-blog-card__marquee">
      <BlogCard
        v-for="(content, index) in blogCardState"
        :key="index + 'individual'"
        :content="content"
        :index="index"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @include col;
}

.toggle-edit__container {
  @include row-end;
  margin-right: 3rem;
  gap: 1rem;
  margin-top: 3rem;

  input[type="checkbox"] {
    position: relative;
    border: none;
    -webkit-appearance: none;
    background-color: #fff;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px $t-black1, 0 2px 4px -1px $t-black0;
    transition: 550ms ease background 200ms;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: $secondary;
    transform: scale(0.9);
    transition: 750ms ease all;
    box-shadow: 0 4px 6px -1px $t-black1, 0 2px 4px -1px $t-black0;
  }

  input:checked[type="checkbox"]::before {
    left: 52px;
    background-color: $primary;
    @keyframes middleGround {
      0% {
        transform: scale(0.9);
      }

      25% {
        transform: scale(0.3);
      }

      50% {
        transform: scale(0.5);
      }

      75% {
        transform: scale(0.9);
      }
    }
    animation: middleGround 750ms;
  }

  input:checked[type="checkbox"] {
    background-color: $secondary;
  }
}
</style>
