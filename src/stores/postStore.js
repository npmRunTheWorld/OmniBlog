import { defineStore } from 'pinia';


export const usePostStore = defineStore('post',{
   state : () => ({
      postLoaded : null,
      blogHTML : "Write your blog title here...",
      blogTitle : "",
      blogPhotoName : "",
      blogPhotoFileURL : "",
      blogPhotoPreview : "",
      blogAuthorId :  "",
   
   }),
   
   getters : {
            
   }, 
   
   actions : {
            
   }
   
})