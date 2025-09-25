<script setup>
//imports
import { ref, reactive, watch } from "vue";
import { useVirtualList } from "@vueuse/core";
//https://1fichier.com/?i8mvv00uw03l8h2b7w0b
import BlogPostCard from "../components/BlogPostCard.vue";
import BlogCard from "../components/BlogCard.vue";
import { useBlogStore } from "../stores/blogStore";
import { useUserStore } from "../stores/userStore";
import { useLoadStore } from "../stores/loadStore";
import { storeToRefs } from "pinia";
import { getDocs, collection } from "firebase/firestore";
import { db, storage } from "../firebase/connection";
import firebaseApp from "../firebase/firebaseInit";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

//props, general

const blogStore = useBlogStore();
const userStore = useUserStore();
const { isUser: user } = storeToRefs(userStore);
const defaultBucketUri = import.meta.env.VITE_FIREBASE_STORAGE_ROOT;
//states
const welcomeScreen = reactive({
  title: "Welcome",
  blogPost: "Welcome to omni where new articles show up!",
  welcomeScreen: true,
  photo: "beautealfly",
});

//lifecycle
onMounted(async () => {
  if (!user.value) {
    blogStore.blogCardState = [];
    blogStore.featureCard = [];
  }

  try {
    blogStore.blogCardState = [];

    const postSnapshot = await getDocs(collection(db, "posts"));
    const blogCardPromises = postSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      //console.log(doc.data());

      const imageRef = storageRef(
        storage,
        `${defaultBucketUri}/${data.coverImageUri}`
      );

      //we try to get the URL of the image
      const url = await getDownloadURL(imageRef)
        .then((url) => {
          //returns the URL upon success
          return url;
        })
        .catch((error) => {
          //If for some reason this file is not in the server through manual deletion or some other reason, handles an error and the url ?? ""
          //console.log(error);
        });

      return {
        title: data.title,
        blogHTML: data.content,
        blogData: data.date,
        blogCoverPhotoUrl: url ?? "",
        postId: data.postId,
        docId: doc.id,
        ...data,
      };
    });

    // Wait for all blog cards to be fetched and URLs resolved
    blogStore.blogCardState = await Promise.all(blogCardPromises);

    // Now blogStore.blogCardState is fully populated and can be used
    console.log(blogStore.blogCardState);

    const featureShot = await getDocs(collection(db, "features"));
    blogStore.featureCard = featureShot.docs
      .map((doc) => {
        const data = doc.data();
        console.log(data);

        const featureCard = blogStore.blogCardState.find((blog) => {
          return blog.postId === data.postId;
        });

        console.log(featureCard);
        if (featureCard) {
          return featureCard;
        }
      })
      .filter((blog) => blog);
  } catch (error) {
    console.log(error);
  }
});

const selectedBlog = ref({});
const isShowingAdditionalDetails = ref(false);
function handleAdditionalDetails(content, index) {
  const blog = { ...content, index };
  selectedBlog.value = blog;
  isShowingAdditionalDetails.value = true;
}
//functions
</script>

<template>
  <div class="home-container">
    <div class="main-content-view" v-if="!user">
      <BlogPostCard :post="welcomeScreen" />
    </div>

    <div class="main-content-view" v-if="user">
      <BlogPostCard
        v-for="(post, index) in blogStore.featureCard"
        :key="index + 'hero'"
        :post="post"
        :index="index"
        :originalPostIndex="
          blogStore.blogCardState.findIndex(
            (blog) => blog.postId === post.postId
          )
        "
      />

      <pagination-card-reel
        :blog-cards="blogStore.blogCardState"
        @handle-view-modal="handleAdditionalDetails"
      />

      <additional-details
        :blog-object="selectedBlog"
        v-if="isShowingAdditionalDetails"
        @closed="isShowingAdditionalDetails = false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// ====== MODERN HOME VIEW VARIABLES ======
:root {
  --home-bg: rgba(5, 5, 10, 0.95);
  --home-accent: #06d6a0;
  --home-text: #f8fafc;
}

// ====== MODERN HOME CONTAINER ======
.home-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--home-bg);

  // ====== MAIN CONTENT VIEW ======
  .main-content-view {
    position: relative;
    z-index: 2;
    width: 100%;
    min-height: 100vh;

    // For welcome screen (not logged in)
    &:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    // For logged in users with blog content
    &:last-child {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding-bottom: 2rem;
    }
  }

  // ====== LOADING SCREEN ======
  .screen-loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(6, 214, 160, 0.1) 50%,
      rgba(0, 0, 0, 0.95) 100%
    );
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    .screen-loader-container {
      text-align: center;

      .load-text {
        color: var(--home-accent);
        font-size: 1.2rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        animation: modernLoadingPulse 2s ease-in-out infinite;
      }
    }
  }
}

// ====== ANIMATIONS ======
@keyframes modernLoadingPulse {
  0%, 100% { 
    opacity: 0.6; 
    transform: scale(1);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.02);
  }
}

// ====== RESPONSIVE DESIGN ======
@media (max-width: 768px) {
  .home-container {
    .main-content-view {
      padding-bottom: 1rem;
    }

    .screen-loader {
      .screen-loader-container {
        .load-text {
          font-size: 1rem;
        }
      }
    }
  }
}

.list {
  height: 86px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: none;
}

.updates {
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: $background2;

  .updates__container {
    display: flex;
    flex-direction: row;
    h2 {
      flex: 0.9;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1rem;
    }

    a {
      color: $secondary;
      background-color: $background2-less;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      gap: 0.5rem;
      border-radius: 15px;
      margin-left: 10%;
      width: fit-content;
      padding: 1rem;
      transition: 0.5s ease-in-out color;
      img {
        width: 20px;
        filter: invert(0);
      }

      &:hover {
        color: $accent;
        filter: invert(1);
      }
    }

    @media screen and (max-width: 700px) {
      flex-direction: column;
      h2 {
        margin-bottom: 2rem;
        padding: 1rem;
      }

      a {
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
