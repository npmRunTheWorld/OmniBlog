import { reactive } from 'vue';


function bp_fillerCard(title, data, image) {
  return {
    title: title || "filler title",
    blogData: data || "This is a filler blog post",
    blogCoverPhoto: image || "stock-1",
  };
}

const createStore = () => {

   const blogCardState = reactive([
       bp_fillerCard("Blog card #1", "May 1 , 2021", "stock-1"),
       bp_fillerCard("Blog card #2", "May 1 , 2021", "stock-2"),
       bp_fillerCard("Blog card #3", "May 1 , 2021", "stock-3"),
       bp_fillerCard("Blog card #4", "May 1 , 2021", "stock-4"),
       bp_fillerCard("Blog card #4", "May 1 , 2021", "stock-4"),
   ])
   
   
   return{
      blogCardState
   }
}


export default createStore;

