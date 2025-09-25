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
  <div class="modern-blog-grid">
    <!-- Animated Background -->
    <div class="grid-background">
      <div class="gradient-mesh"></div>
      <div class="floating-elements">
        <div class="float-element" v-for="n in 8" :key="n"></div>
      </div>
    </div>

    <!-- No Posts Message -->
    <div
      class="no-posts-message"
      v-if="
        isInEditMode
          ? blogStore.getBlogCardByAuthor(userStore.email).length == 0
          : false
      "
    >
      <div class="no-posts-content">
        <div class="no-posts-icon">
          <!-- #todoArt: Add empty state icon here -->
        </div>
        <h3>No Posts Yet</h3>
        <p>You don't have any posts. Create some posts and you can edit them here!</p>
      </div>
    </div>

    <!-- Modern Blog Grid -->
    <div class="blog-cards-grid" v-if="computedBlogCards.length > 0">
      <BlogCard
        v-for="(content, index) in computedBlogCards"
        :key="`${content.uid}-blog-card`"
        :content="content"
        :index="index"
        @open-modal="$emit('handle-view-modal', content, index)"
        @open-edit-modal="$emit('handle-edit-modal', content, index)"
      />
    </div>

    <!-- Modern Pagination -->
    <div class="modern-pagination" v-if="totalPages > 1">
      <button 
        class="pagination-btn nav-btn" 
        @click="previousPage" 
        :disabled="currentPage <= 1"
      >
        <span>Previous</span>
      </button>

      <div class="page-numbers">
        <button
          class="pagination-btn page-btn"
          :class="{ active: currentPage === 1 }"
          @click="firstPage"
          :disabled="currentPage <= 1"
        >
          1
        </button>

        <div class="mid-buttons" v-if="totalPages > 2">
          <button
            v-for="item in getMidButtons"
            :key="`page-${item + 1}`"
            class="pagination-btn page-btn"
            :class="{ active: currentPage === item + 1 }"
            @click="currentPage = item + 1"
          >
            {{ item + 1 }}
          </button>
        </div>

        <button
          v-if="totalPages > 1"
          class="pagination-btn page-btn"
          :class="{ active: currentPage >= totalPages }"
          @click="lastPage"
          :disabled="currentPage >= totalPages"
        >
          {{ totalPages }}
        </button>
      </div>

      <button 
        class="pagination-btn nav-btn" 
        @click="nextPage" 
        :disabled="currentPage >= totalPages"
      >
        <span>Next</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// ====== ULTRA-MODERN BLOG GRID VARIABLES ======
:root {
  --grid-bg: rgba(10, 10, 15, 0.9);
  --grid-accent: #06d6a0;
  --grid-accent-light: #40f99b;
  --grid-text: #f8fafc;
  --grid-text-muted: #cbd5e1;
  --grid-border: rgba(6, 214, 160, 0.15);
  --pagination-bg: rgba(15, 15, 20, 0.8);
}

// ====== MODERN BLOG GRID CONTAINER ======
.modern-blog-grid {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;

  // ====== ANIMATED BACKGROUND ======
  .grid-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    .gradient-mesh {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        ellipse at top left,
        rgba(6, 214, 160, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at bottom right,
        rgba(64, 249, 155, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse at center,
        rgba(17, 138, 115, 0.03) 0%,
        transparent 70%
      );
      animation: gridMeshFlow 20s ease-in-out infinite;
    }

    .floating-elements {
      position: absolute;
      width: 100%;
      height: 100%;

      .float-element {
        position: absolute;
        width: 3px;
        height: 3px;
        background: var(--grid-accent);
        border-radius: 50%;
        opacity: 0.4;
        animation: gridElementFloat 8s ease-in-out infinite;

        &:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
        &:nth-child(2) { top: 30%; left: 80%; animation-delay: 1s; }
        &:nth-child(3) { top: 70%; left: 10%; animation-delay: 2s; }
        &:nth-child(4) { top: 90%; left: 60%; animation-delay: 3s; }
        &:nth-child(5) { top: 50%; left: 40%; animation-delay: 4s; }
        &:nth-child(6) { top: 20%; left: 90%; animation-delay: 5s; }
        &:nth-child(7) { top: 80%; left: 30%; animation-delay: 6s; }
        &:nth-child(8) { top: 40%; left: 70%; animation-delay: 7s; }
      }
    }
  }

  // ====== NO POSTS MESSAGE ======
  .no-posts-message {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;

    .no-posts-content {
      text-align: center;
      padding: 3rem;
      background: var(--pagination-bg);
      border: 1px solid var(--grid-border);
      border-radius: 24px;
      backdrop-filter: blur(20px);
      max-width: 500px;

      .no-posts-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 2rem;
        background: linear-gradient(135deg, var(--grid-accent), var(--grid-accent-light));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
      }

      h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--grid-text);
        margin-bottom: 1rem;
      }

      p {
        color: var(--grid-text-muted);
        line-height: 1.6;
        font-size: 1rem;
      }
    }
  }

  // ====== QUANTUM BLOG GRID SYSTEM ======
  .blog-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2.5rem;
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem 0;
    
    // Modern staggered layout
    &:hover {
      .ultra-modern-card:not(:hover) {
        opacity: 0.7;
        transform: scale(0.98);
      }
    }

    // Masonry-style variations
    .ultra-modern-card {
      &:nth-child(3n+1) {
        transform: translateY(-10px);
      }
      
      &:nth-child(3n+3) {
        transform: translateY(10px);
      }

      // Reset on hover
      &:hover {
        transform: translateY(-12px) scale(1.02) !important;
      }
    }
  }

  // ====== MODERN PAGINATION ======
  .modern-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 4rem auto 2rem;
    padding: 2rem;
    max-width: 800px;

    .pagination-btn {
      border: none;
      background: var(--pagination-bg);
      color: var(--grid-text);
      padding: 12px 20px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid var(--grid-border);
      backdrop-filter: blur(10px);

      &:hover:not(:disabled) {
        background: rgba(6, 214, 160, 0.1);
        border-color: var(--grid-accent);
        transform: translateY(-2px);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      &.nav-btn {
        padding: 12px 24px;
        font-weight: 600;

        &:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--grid-accent), var(--grid-accent-light));
          color: white;
          box-shadow: 0 8px 25px rgba(6, 214, 160, 0.3);
        }
      }

      &.page-btn {
        min-width: 45px;
        padding: 12px 16px;

        &.active {
          background: linear-gradient(135deg, var(--grid-accent), var(--grid-accent-light));
          color: white;
          box-shadow: 0 4px 15px rgba(6, 214, 160, 0.4);
        }
      }
    }

    .page-numbers {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .mid-buttons {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
}

// ====== ANIMATIONS ======
@keyframes gridMeshFlow {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1) rotate(0deg);
  }
  50% { 
    opacity: 0.8; 
    transform: scale(1.05) rotate(2deg);
  }
}

@keyframes gridElementFloat {
  0%, 100% { 
    opacity: 0.2; 
    transform: translateY(0px);
  }
  50% { 
    opacity: 0.6; 
    transform: translateY(-20px);
  }
}

// ====== RESPONSIVE DESIGN ======
@media (max-width: 1400px) {
  .modern-blog-grid {
    .blog-cards-grid {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      
      .ultra-modern-card {
        &:nth-child(3n+1),
        &:nth-child(3n+3) {
          transform: translateY(0);
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .modern-blog-grid {
    .blog-cards-grid {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
  }
}

@media (max-width: 768px) {
  .modern-blog-grid {
    padding: 1rem;

    .blog-cards-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .modern-pagination {
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 3rem auto 1rem;
      padding: 1rem;

      .pagination-btn {
        padding: 10px 16px;
        font-size: 0.85rem;

        &.nav-btn {
          padding: 10px 20px;
        }

        &.page-btn {
          min-width: 40px;
          padding: 10px 12px;
        }
      }
    }

    .no-posts-message .no-posts-content {
      padding: 2rem;
      margin: 1rem;

      h3 {
        font-size: 1.3rem;
      }

      p {
        font-size: 0.9rem;
      }
    }
  }
}
</style>
