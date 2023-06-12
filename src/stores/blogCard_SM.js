import { defineStore } from "pinia";

function bp_fillerCard(title, data, image) {
  return {
    title: title || "filler title",
    blogData: data || "This is a filler blog post",
    blogCoverPhoto: image || "stock-1",
  };
}

const useBlogCard = defineStore('blog', {
   state: () => ({
      blogCardState : [
       bp_fillerCard("Blog card #1", "May 1 , 2021", "stock-1"),
       bp_fillerCard("Blog card #2", "May 1 , 2021", "stock-2"),
       bp_fillerCard("Blog card #3", "May 1 , 2021", "stock-3"),
       bp_fillerCard("Blog card #4", "May 1 , 2021", "stock-4"),
       bp_fillerCard("Blog card #5", "May 1 , 2021", "stock-3"),
      ],
      editPost : false
   }
   
   ),
   //getters are computed functions in which it doesnt alter the original state and returns a derived value
   getters : {
      
   },
   //actions allow us to directly change the state
   actions : {
      togglePost(payload){
         this.editPost = payload;
         console.log(payload);
      }
   }
   
})


export default useBlogCard;