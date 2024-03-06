import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useModalStore = defineStore("modalStore", {
  state: () => ({
    isModalShowing: false,
  }),
  getters: {},
  actions: {
    displayModal() {
      this.isModalShowing = true;
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
    },
  },
});
