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
const defaultBucketUri = "gs://omniblog-49459.appspot.com";
//states
const welcomeScreen = reactive({
  title: "Welcome",
  blogPost: "Welcome to omni where new articles show up!",
  welcomeScreen: true,
  photo: "beautealfly",
});


//lifecycle
onMounted(async () => {

  if(!user.value){
    blogStore.blogCardState = []
    blogStore.featureCard = []

  }

  blogStore.blogCardState = [];

  const postSnapshot = await getDocs(collection(db, "posts"));
  const blogCardPromises = postSnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const imageRef = storageRef(storage, `${defaultBucketUri}/${data.coverImageUri}`);
    const url = await getDownloadURL(imageRef);
    
    return {
      title: data.title,
      blogHTML: data.content,
      blogData: data.date,
      blogCoverPhoto: url,
      postId: data.postId, ...data
    };
  });

  // Wait for all blog cards to be fetched and URLs resolved
  blogStore.blogCardState = await Promise.all(blogCardPromises);

  // Now blogStore.blogCardState is fully populated and can be used
  console.log(blogStore.blogCardState);
  

  const featureShot = await getDocs(collection(db, "features"));
   blogStore.featureCard = featureShot.docs.map((doc) => {
    const data = doc.data();
    console.log(data);
    
    const featureCard = blogStore.blogCardState.find((blog) => {
      return blog.postId === data.postId;
    });
    
    console.log(featureCard);
    if(featureCard){
      return featureCard;
    }
  });
  
  
  
});

//functions



</script>

<template>
  <div class="home-container">
    
    <div class='main-content-view' v-if="!user" >
      <BlogPostCard :post="welcomeScreen" />
    </div>
    
    <div class='main-content-view' v-if="user" >
      <BlogPostCard
      v-for="(post, index) in blogStore.featureCard"
      :key="index + 'hero'"
      :post="post"
      :index="index"
      :originalPostIndex="blogStore.blogCardState.findIndex((blog) => blog.postId === post.postId)"
    />

    <div class="individual-blog-card__marquee">
      <BlogCard
        v-for="(content, index) in blogStore.blogCardState"
        :key="index + 'individual'"
        :content="content"
        :index="index"
      />
    </div>
    </div>
    

    
  </div>
</template>

<style lang="scss" scoped>
.home-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  .screen-loader{
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    width: 100%;
    height: 100%;
    
    .screen-loader-container{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
      .load-text{
        color: rgb(163, 152, 152);
        font-weight: bold;
        font-style: italic;
        transform: translate(5%, 150%);
        animation: loadingAnimation 1s linear infinite;
      
      }
    }
    
  }

}
.main-content-view{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

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
