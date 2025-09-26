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
import { useUserStore } from "../stores/userStore";
import BlogCard from "../components/BlogCard.vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import PaginationCardReel from "../components/PaginationCardReel.vue";

//pinia state management we must use toreToRefs to destruct the blogStore state
const blogStore = useBlogStore();
const userStore = useUserStore();
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

    <PaginationCardReel
      :is-in-edit-mode="true"
      @handle-view-modal="handleAdditionalDetails"
      @handle-edit-modal="handleEditDetails"
    />

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

// ====== MOBILE RESPONSIVE STYLES ======
@media (max-width: 768px) {
  .blog__container {
    padding: 1rem;
    margin: 1rem 0;

    .toggle {
      .toggle-header {
        padding: 1rem;

        h2 {
          font-size: 1.5rem;
        }

        p {
          font-size: 0.9rem;
          margin: 0.75rem 0;
        }
      }

      .toggle-edit {
        padding: 1rem;
        
        span {
          font-size: 0.9rem;
        }
      }
    }

    .blog-card-wrap {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .blog__container {
    padding: 0.5rem;
    margin: 0.5rem 0;

    .toggle {
      .toggle-header {
        padding: 0.75rem;

        h2 {
          font-size: 1.25rem;
        }

        p {
          font-size: 0.8rem;
          margin: 0.5rem 0;
        }
      }

      .toggle-edit {
        padding: 0.75rem;
        
        span {
          font-size: 0.8rem;
        }

        input[type="checkbox"] {
          width: 60px;
          height: 30px;

          &::before {
            width: 22px;
            height: 22px;
          }

          &:checked[type="checkbox"]::before {
            left: 32px;
          }
        }
      }
    }

    .blog-card-wrap {
      gap: 1rem;
      padding: 0.5rem;
    }
  }
}
</style>
