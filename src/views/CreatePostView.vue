<script setup>
//imports
import { ref, reactive, onMounted } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
//props, general
defineProps({});

//states

//lifecycle
onMounted(() => {});

//functions

//
</script>

<template>
  <QuillEditor toolbar="#my-toolbar"></QuillEditor>
  <div id="my-toolbar">
    <!-- Add buttons as you would before -->
    <button class="ql-bold"></button>
    <button class="ql-italic"></button>
  </div>
</template>

<style lang="scss" scoped>
.container {
}
</style>
