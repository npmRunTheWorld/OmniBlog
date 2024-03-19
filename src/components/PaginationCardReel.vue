<script setup>
//imports
import { ref, reactive, onMounted } from "vue";
import { useBlogStore } from "../stores/blogStore";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const blogStore = useBlogStore();
//props, general
const props = defineProps({
  blogCards: {
    type: Array,
    required: false,
  },
  isInEditMode: {
    type: Boolean,
    required: false,
    default: false,
  },
});

defineEmits(["handle-view-modal", "handle-edit-modal"]);
//states

//lifecycle
onMounted(() => {});
//functions
const itemsPerPage = 20;
const currentPage = ref(1);

const totalPages = computed(() => {
  const blogCards =
    props.blogCards ?? blogStore.getBlogCardByAuthor(userStore.email);

  return Math.ceil(blogCards.length / itemsPerPage);
});

const computedBlogCards = computed(() => {
  const blogCards =
    props.blogCards ?? blogStore.getBlogCardByAuthor(userStore.email);
  const startIndex = Math.max(
    0,
    Math.min(currentPage.value - 1 * itemsPerPage, blogCards.length - 1)
  );
  return blogCards.slice(startIndex, startIndex + itemsPerPage);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const firstPage = () => {
  if (currentPage.value > 1) {
    currentPage.value = 1;
  }
};

const lastPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value = totalPages.value;
  }
};

const maximumMidButtons = 5;
const midButtonsStart = computed(() => {
  if (totalPages.value <= maximumMidButtons) {
    return 2;
  }
  if (currentPage.value <= 3) {
    return 2;
  }
  if (currentPage.value >= totalPages.value - 2) {
    return totalPages.value - maximumMidButtons;
  }
  return currentPage.value - 2;
});

const midButtonsEnd = computed(() => {
  return Math.min(
    totalPages.value - 2,
    midButtonsStart.value + maximumMidButtons - 1
  );
});

const getMidButtons = computed(() => {
  const midButtons = [];
  for (let i = midButtonsStart.value - 1; i <= midButtonsEnd.value; i++) {
    midButtons.push(i);
  }
  return midButtons;
});
//
</script>

<template>
  <div class="pagination-reel-container">
    <div
      class="no-posts__container"
      v-if="
        isInEditMode
          ? blogStore.getBlogCardByAuthor(userStore.email).length == 0
          : false
      "
    >
      <p>
        You don't have any posts. Create some posts and you can edit them here!
      </p>
    </div>
    <div class="individual-blog-card__marquee main-frame">
      <BlogCard
        v-for="(content, index) in computedBlogCards"
        :key="`${content.uid}-individual-blog-card`"
        :content="content"
        :index="index"
        @open-modal="$emit('handle-view-modal', content, index)"
        @open-edit-modal="$emit('handle-edit-modal', content, index)"
      />
    </div>

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage <= 1">
        Previous
      </button>
      <button
        @click="firstPage"
        :disabled="currentPage <= 1"
        :style="
          currentPage == 1
            ? 'background-color:rgb(133, 96, 16); color:black'
            : ''
        "
      >
        1
      </button>

      <div class="mid-buttons" v-if="totalPages > 2">
        <button
          v-for="item in getMidButtons"
          :style="
            currentPage == item + 1
              ? 'background-color:rgb(133, 96, 16); color:black'
              : ''
          "
          @click="currentPage = item + 1"
          :key="`button-index-${item + 1}`"
        >
          {{ item + 1 }}
        </button>
      </div>

      <button
        @click="lastPage"
        :disabled="currentPage >= totalPages"
        v-if="totalPages > 1"
        :style="
          currentPage >= totalPages
            ? 'background-color:rgb(133, 96, 16); color:black'
            : ''
        "
      >
        {{ totalPages }}
      </button>
      <button @click="nextPage" :disabled="currentPage >= totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
  padding-bottom: 3rem;

  button {
    padding: 0.5rem 1rem;
    margin: 10px;
    border-radius: 5px;
    border: none;
    background-color: #0c4e3a;
    cursor: pointer;
    &:disabled {
      background-color: #d3d3d3;
      color: gray;
      cursor: not-allowed;
    }
  }

  .mid-buttons {
    display: flex;
    gap: 1rem;
  }
}

.pagination-reel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 900px;
  gap: 1rem;

  .main-frame {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .individual-blog-card__marquee {
    margin: 6rem 0;
    gap: 3rem;
    display: grid;
    grid-template-columns: 1fr;
    padding: 1rem;

    @media screen and (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .no-posts__container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .individual-blog-card__marquee > div {
    /* Assuming your cards are direct children of the grid container */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Adjust this as needed */
    height: 100%;
    background-color: #bdb5a0;
    border-radius: 5px;
  }
}
</style>
