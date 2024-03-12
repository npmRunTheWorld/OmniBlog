<script setup>
//imports
import {
  ref,
  reactive,
  watch,
  computed,
  onBeforeUnmount,
  onMounted,
} from "vue";
import { useBlogStore } from "../stores/blogStore";
import BlogCard from "../components/BlogCard.vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

//pinia state management we must use toreToRefs to destruct the blogStore state
const blogStore = useBlogStore();
const { blogCardState } = storeToRefs(blogStore);

//states, props, general

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
const selectedBlog = ref({});
const isShowingAdditionalDetails = ref(false);
const isShowingEditPost = ref(false);
function handleAdditionalDetails(content, index) {
  const blog = { ...content, index };
  selectedBlog.value = blog;
  isShowingAdditionalDetails.value = true;
}
function handleEditDetails(content, index) {
  const blog = { ...content, index };
  selectedBlog.value = blog;
  isShowingEditPost.value = true;
}
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
        @open-modal="handleAdditionalDetails"
        @open-edit-modal="handleEditDetails"
      />
    </div>

    <additional-details
      :blog-object="selectedBlog"
      v-if="isShowingAdditionalDetails"
      @closed="isShowingAdditionalDetails = false"
    />

    <edit-post
      v-if="isShowingEditPost"
      :blog-object="selectedBlog"
      @closed="isShowingEditPost = false"
    />
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
    appearance: none;
    -webkit-appearance: none;
    background-color: #fff;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px $t-black1, 0 2px 4px -1px $t-black0;
    cursor: pointer;
    transition: 350ms ease background 100ms;
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
    transition: 550ms ease all;
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

.individual-blog-card__marquee > div {
  /* Assuming your cards are direct children of the grid container */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Adjust this as needed */
  height: 100%;
}
</style>
