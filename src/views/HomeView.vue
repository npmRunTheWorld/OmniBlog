<script setup>
//imports
import { ref, reactive } from "vue";
import { useVirtualList } from "@vueuse/core";
//https://1fichier.com/?i8mvv00uw03l8h2b7w0b
import BlogPostCard from "../components/BlogPostCard.vue";
import BlogCard from "../components/BlogCard.vue";
import { arrowRight } from "../assets/Icons";
import useBlogStore from "../stores/blogStore";
import useUserStore from "../stores/userStore";
import { storeToRefs } from "pinia";
import { getDocs, collection } from "firebase/firestore";
import { db, storage } from "../firebase/connection";
import firebaseApp from "../firebase/firebaseInit";
import { ref as sref, getBlob, getDownloadURL } from "firebase/storage";

//props, general

const blogStore = useBlogStore();
const userStore = useUserStore();

const { isUser: user } = storeToRefs(userStore);
const defaultBucketUri = "gs://omniblog-49459.appspot.com";
//states
const welcomeScreen = reactive({
  title: "Welcome",
  blogPost: "Welcome to omni where new articles show up!",
  welcomeScreen: true,
  photo: "coding",
});

const sampleBlogPost = reactive([
  bp_fillerBlog(undefined, undefined, "beautiful-stories"),
  bp_fillerBlog(undefined, undefined, "designed-for-everyone"),
]);

//lifecycle
onMounted(async () => {
  blogStore.blogCardState = [];

  const postSnapshot = await getDocs(collection(db, "posts"));
  postSnapshot.forEach(async (doc) => {
    const data = doc.data();
    console.log(data);
    const imageRef = sref(storage, `${defaultBucketUri}/${data.coverImageUri}`);
    const url = await getDownloadURL(imageRef);
    console.log(url);
    const blogCard = {
      title: data.title,
      blogHTML: data.content,
      blogData: data.date,
      blogCoverPhoto: url,
    };
    blogStore.blogCardState.push(blogCard);
  });
});

//functions

function bp_fillerBlog(title, blog, image) {
  console.log("hello");
  return {
    title: title || "filler title",
    blogHTML: blog || "This is a filler blog post",
    blogCoverPhoto: image || "beautiful-stories",
  };
}

/* 
const data = ref(Array.from(Array(5000).keys(), (index) => `item #${index}`));

const data2 = ref(
  Array.from({ length: 5 }, (_, i) => {
    return i + 1;
  })
);

const { list, containerProps, wrapperProps } = useVirtualList(data, {
  //keep item height
  itemHeight: 96,
}); */
</script>

<template>
  <div class="container">
    <!-- <div class="listcont" v-bind="containerProps">
      <div class="wrapcont" v-bind="wrapperProps">
        <div class="list" v-for="{ index, data } in list" :key="index">
          <h1>Item {{ data }}</h1>
        </div>
      </div>
    </div>-->

    <BlogPostCard :post="welcomeScreen" v-show="!user" />
    <BlogPostCard
      v-for="(post, index) in sampleBlogPost"
      :key="index + 'hero'"
      :post="post"
      :index="index"
    />

    <div class="individual-blog-card__marquee">
      <BlogCard
        v-for="(content, index) in blogStore.blogCardState"
        :key="index + 'individual'"
        :content="content"
      />
    </div>

    <div class="updates">
      <div class="updates__container" v-show="!user">
        <h2>Never miss a post. Register for your free account today!</h2>
        <RouterLink :to="{ name: 'blog' }">
          Register for Omni Blogs! <img :src="arrowRight" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
}

.listcont {
  height: 60vh;
  padding: 2;
  border-radius: 5px;
  overflow-y: none;
}

.warpcont {
  max-width: fit-content;
  overflow-y: none;
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
