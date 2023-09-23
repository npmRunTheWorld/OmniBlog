<script setup>
//imports
import { ref, reactive, onMounted } from "vue";
import { quillEditor, Quill } from "vue3-quill";
// Attention:
// customQuillModule means 'custom module name of Quill',
// not a package's name called 'customQuillModule'.
// Such as:
// import ImageUploader from "quill.imageUploader.js";
// Quill.register("modules/imageUploader", ImageUploader);

// Register the customQuillModule with Quill
//props, general
defineProps({});

//states
const quillState = reactive({
  content: "",
  _content: "",
});
//lifecycle
onMounted(() => {});

//functions
function submitPost() {
  console.log(quillState.content);
}
//
</script>

<template>
  <div class="quill-container">
    <quill-editor class="quill-editor" v-model:value="quillState.content" />

    <div class="btn-container flex-end">
      <button @click="submitPost">Create Post</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quill-container {
  width: 100%;
  height: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: $primary;
  padding: 3rem;
  margin-top: 10vh;
  gap: 1rem;
}

.quill-container > :nth-child(1) {
  & > :nth-child(odd) {
    & > :hover {
      filter: grayscale(0.3) hue-rotate(180deg);
    }

    & > {
      color: red;
      background-color: red;
      filter: grayscale(0.3) hue-rotate(180deg);
    }

    & > :nth-child(odd) > :nth-child(1) {
      & {
        filter: grayscale(0.3) hue-rotate(180deg);
        color: red;
      }
    }

    & > :nth-child(even) > :nth-child(1) {
      & {
        filter: grayscale(0.3) hue-rotate(180deg);
        color: red;
      }
    }
  }

  & > :nth-child(even) {
    & > :hover {
      filter: grayscale(0.3) hue-rotate(180deg);
    }

    & > :nth-child(odd) > :nth-child(1) {
      & {
        filter: grayscale(0.3) hue-rotate(180deg);
        color: red;
      }
    }

    & > :nth-child(even) > :nth-child(1) {
      & {
        filter: grayscale(0.3) hue-rotate(180deg);
        color: red;
      }
    }
  }
}
.quill-container > :nth-child(2) {
  border: 1px solid $black;
}

.quill-editor {
  display: flex;
  flex-direction: column;
  height: 60vh;

  ::-webkit-scrollbar-track {
    background-color: $primary; /* Change this to the color you want for the scrollbar track */
  }

  /* Style the scrollbar thumb (the draggable part) */
  ::-webkit-scrollbar-thumb {
    background-color: rgb(88, 124, 112);
    border-radius: 15px;
    /* Change this to the color you want for the scrollbar thumb */
  }

  /* Style the scrollbar thumb on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #533d27; /* Change this to the color you want for the hovered scrollbar thumb */
  }

  ::-webkit-scrollbar {
    width: 10px; /* Set the width of the scrollbar */
  }
}
</style>
