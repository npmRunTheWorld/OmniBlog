import { defineStore } from "pinia";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogCardState: [],
    featureCardState: [],
    editPost: null,
  }),
  //getters are computed functions in which it doesnt alter the original state and returns a derived value
  getters: {},
  //actions allow us to directly change the state
  actions: {
    togglePost(payload) {
      this.editPost = payload;
    },
    sortBlogCards(order) {
      this.blogCardState.sort((a, b) => {
        return order === "asc" ? a.date - b.date : b.date - a.date;
      });
    },
    getBlogCardByIndex(index) {
      return this.blogCardState[index];
    },

    getBlogCardByAuthor(email) {
      return this.blogCardState.filter((blog) => blog.email === email);
    },
  },
  persist: true,
});


