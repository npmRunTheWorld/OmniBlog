<script setup>
//imports
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import  { useBlogStore }  from '../stores/blogStore';
import BlogCard from "../components/BlogCard.vue";

//props, general
const router = useRoute();
const blogStore = useBlogStore();
defineProps({})

//states
const blogPost = ref({});
const hasDataMounted = ref(false);
//lifecycle
onMounted(() => {
   hasDataMounted.value = false;
   console.log(router.params.index);
   blogPost.value = blogStore.getBlogCardByIndex(router.params.index);
   console.log(blogPost.value);
   hasDataMounted.value = true;
});

//functions

//
</script>

<template>
   <div class='view-post-page'>
      <div class='blog-cover-photo-container' >
         <img :src="`${blogPost.blogCoverPhoto}`" alt="blog-image" />
      </div>
      
      <div class='blog-post-content' >
         <div class='blog-title-wrapper'>
            <h1>{{ blogPost.title }}</h1>
         </div>
         <div class='user-information-container' >
         <div class='user-container' >
            <span>Author: </span>
            <p>{{ `${blogPost.firstName} ${blogPost.lastName}` }}</p>
         </div>
            <div class='date-container' >
               <span>Posted Date: </span>
            <p>{{ blogPost.date }}</p>
            </div>
            
         </div>
         
         <div class='blog-content' v-html="blogPost.blogHTML" ></div>
      </div>
      
      <div class='related-post-container' >
         <div class='related-post-heading' >
            <h2>Related Posts</h2>
         </div>
         
         <div class='individual-blog-card__marquee' v-if="hasDataMounted">
            <BlogCard v-for="(post, index) in blogStore.getBlogCardByAuthor(blogPost.email)" :key="`author-related-post${post.email}-${post.uid}`" :content="post" :index="index" />
         </div>
         
      </div>
      
      
   </div>
</template>


<style lang="scss" scoped>
   .view-post-page{
      display: flex;
      flex-direction: column;
      padding: 1rem;
      width: 100%;
      height: 100%;
      
      .blog-cover-photo-container{
         width: 100%;
         height: 300px;
         img{
            width: 100%;
            height: 100%;
            object-fit: cover;
         border-radius: 10px;
            
         }
      }
      
   }
   
   .blog-post-content{
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      gap: 1rem;
      
      .blog-title-wrapper{
         padding-top: 2rem;
         h1{
            font-family: 'Poppins', sans-serif;
            font-size: 2.25rem;
            padding: 1rem;
            color: $secondary;
         }
      }
      
      .user-information-container{
         display: flex;
         flex-direction: row;
         justify-content: flex-end;
         gap: 3rem;
         .user-container{
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            span{
               font-weight: bold;
            }
         }
         .date-container{
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
            span{
               font-weight: bold;
            }
         }
      }
      
      
      
   }
   
   .related-post-container{
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      margin-top: 6rem;
      
      .individual-blog-card__marquee {

         background-color: rgb(231, 231, 231);
         margin-top: 1rem;
        
       }
         
   }
   
   
  :deep(.blog-content){
   display: flex;
   flex-direction: column;
   background-color: rgb(231, 231, 231);
   padding: 2rem;
   
   h2{
      font-size: 1.5rem;
      margin-bottom: 1rem;
      margin-top: 1rem;
   }
   p{
      font-size: 0.9rem;
      margin-bottom: 1rem;
   }
  }
  
  
   
</style>