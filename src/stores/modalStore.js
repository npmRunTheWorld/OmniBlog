import { defineStore, acceptHMRUpdate } from "pinia";
import Swal from "sweetalert2";

export const useModalStore = defineStore("modalStore", {
  state: () => ({
    isModalShowing: false,
  }),
  getters: {},
  actions: {
    displayModal({
      title,
      text,
      icon,
      confirmButtonText,
      showCancelButton,
      cancelButtonText,
      onOk,
      onCancel,
    }) {
      this.isModalShowing = true;

      Swal.fire({
        title: title || "Are you sure?",
        text: text || "You won't be able to revert this!",
        icon: icon || "warning",
        confirmButtonText: showCancelButton ? "Yes" : confirmButtonText || "Ok",
        cancelButtonText: showCancelButton ? "Cancel" : cancelButtonText,
        showCancelButton: showCancelButton,
      }).then(async (result) => {
        if (result.isConfirmed && typeof onOk === "function") {
          await onOk();
        }

        if (result.isDismissed && typeof onCancel === "function") {
          await onCancel();
        }

        this.isModalShowing = false;
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot));
}
