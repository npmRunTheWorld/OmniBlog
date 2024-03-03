import { defineStore } from "pinia";

/*

*/

export const useUserStore = defineStore("user", {
  state: () => ({
    isUser: null,
    email: null,
    firstName: null,
    lastName: null,
    userName: null,
    uid: null,
    initials: null,
  }),

  getters: {},

  actions: {
    setInitials() {
      this.initials = this.firstName.at(0) + this.lastName.at(0);
    },
  },
});

