import { defineStore } from "pinia";

export const useLoadStore = defineStore("load", {
  state: () => ({
    isGloballyLoading: false,
  }),

  getters: {},

  actions: {},
});
