<script setup>
//imports
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { quillEditor, Quill } from "vue3-quill";
import { db, storage } from "../firebase/connection";
import { useRouter } from "vue-router";
import {
  addDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { ref as sref, uploadBytes } from "firebase/storage";

import useUserStore from "../stores/userStore";
// Attention:
// customQuillModule means 'custom module name of Quill',
// not a package's name called 'customQuillModule'.
// Such as:
// import ImageUploader from "quill.imageUploader.js";
// Quill.register("modules/imageUploader", ImageUploader);

// Register the customQuillModule with Quill
//props, general
defineProps({});

const userStore = useUserStore();
const router = useRouter();
//states
const quillState = reactive({
  title: "",
  coverImage: "",
  content: "",
  file: null,
  _content: "",
  isError: false,
});
//lifecycle
onMounted(() => {});

//functions
async function submitPost() {
  if (
    quillState.title === "" ||
    quillState.content === "" ||
    quillState.coverImage === ""
  ) {
    quillState.isError = true;
    return;
  }

  quillState.date = quillState.time = new Date().toLocaleTimeString();

  let uniquePostId;

  const userNameQuerySnap = await getDocs(
    query(collection(db, "users"), where("uid", "==", userStore.uid))
  );

  userNameQuerySnap.forEach((doc) => {
    console.log("found");
    uniquePostId =
      doc.data().posts.length > 0 ? doc.data().posts.length + 1 : 1;
  });

  if (uniquePostId === undefined) {
    uniquePostId = 1;
  }
  console.log(uniquePostId);

  const uri = `blogCovers/${userStore.uid}/${uniquePostId}/${quillState.file.name}`;

  const blogCoversRef = sref(storage, uri);

  await uploadBytes(blogCoversRef, quillState.file, quillState.file.type).then(
    (snapshot) => {
      console.log("Uploaded a blob or file!");
    }
  );

  await addDoc(collection(db, "posts"), {
    postId: userStore.uid + "/" + uniquePostId,
    postIndex: uniquePostId,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    title: quillState.title,
    content: quillState.content,
    firstName: userStore.firstName,
    lastName: userStore.lastName,
    uid: userStore.uid,
    coverImageUri: uri,
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      userNameQuerySnap.forEach((doc) => {
        const posts = doc.data().posts;
        posts.push(docRef.id);
        setDoc(doc.ref, { posts: posts }, { merge: true });
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    })
    .finally(() => {
      router.push({ name: "blog" });
    });
}

function closeEmptyForm() {
  quillState.isError = false;
}

const fileInput = ref(null);
const imagePreview = ref("");
function handleFileSelect(event) {
  const selectedFile = fileInput?.value?.files[0];
  if (selectedFile) {
    console.log(URL.createObjectURL(selectedFile));
    const imageObject = URL.createObjectURL(selectedFile);
    imagePreview.value = imageObject;
    quillState.coverImage = imagePreview.value;
    quillState.file = selectedFile;
  }
}

function handleRemoveImage() {
  fileInput.value.value = "";
  imagePreview.value = "";
}

function handleQuillChange(event) {
  console.log(event.html);
}
//
</script>

<template>
  <div class="quill-container">
    <div class="title-wrapper">
      <input type="text" placeholder="Title: " v-model="quillState.title" />
    </div>
    <div class="image-drop-container">
      <div class="title-container">
        <p>Add a cover image</p>
        <button v-show="imagePreview" @click="handleRemoveImage">X</button>
      </div>
      <div class="input-container">
        <input
          type="file"
          accept="image/*"
          placeholder="Add your cover image"
          ref="fileInput"
          @change="handleFileSelect"
        />
        <div class="">
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Image Preview"
            style="max-width: 100%"
          />
        </div>
      </div>
    </div>

    <quill-editor
      class="quill-editor"
      v-model:value="quillState.content"
      tabindex=""
    />
    <div class="btn-container flex-end">
      <button @click="submitPost">Create Post</button>
    </div>

    <Modal
      modalMessage="Please fill up the entire form!"
      v-show="quillState.isError"
      @closeModal="closeEmptyForm"
    />
  </div>
</template>

<style lang="scss" scoped>
button {
  background-color: rgb(10, 63, 45);
  color: rgb(139, 113, 26);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  font-family: monospace;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgb(139, 113, 26);
    color: rgb(14, 88, 64);
  }
}

.title-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-family: monospace;
  & > input {
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 1.8rem;
    font-weight: 600;
    font-family: monospace;
    background-color: $primary;
    outline: none;

    color: rgb(139, 113, 26);
    &:hover {
      border: 1px solid black;
    }
  }
}

.image-drop-container {
  display: flex;
  flex-direction: column;

  .title-container {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    p {
      font-size: 1.8rem;
      color: #533d27;
      font-family: monospace;
    }
  }
  .input-container {
    display: flex;
    align-items: center;
    max-height: 600px;
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;

    input {
      width: 100%;
    }
    div {
      display: flex;
      justify-content: flex-end;
      width: 60%;
      height: 100%;
      img {
        height: 50%;
        width: 100%;
        max-height: 600px;
        object-fit: cover;
      }
    }
  }
}

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

:deep(.ql-toolbar) {
  svg {
    filter: grayscale(0.3) hue-rotate(180deg);
    color: red;
  }

  svg:hover {
    filter: grayscale(0.3) hue-rotate(180deg);
  }

  span {
    color: rgb(22, 97, 97);
  }
  span:hover {
    color: rgb(95, 78, 23);
  }
}

:deep(.ql-picker-options) {
  background-color: rgb(3, 63, 63);
  color: #533d27;

  :hover {
    filter: grayscale(0.3) hue-rotate(180deg);
  }

  :active {
    filter: grayscale(0.3) hue-rotate(180deg);
  }
  :focus {
    filter: grayscale(0.3) hue-rotate(180deg);
  }

  .ql-picker-item {
    color: rgb(139, 113, 26);

    :active {
      color: rgb(139, 113, 26);
    }
    :focus {
      color: rgb(139, 113, 26);
    }
  }

  .ql-selected {
    color: rgb(139, 113, 26) !important;

    &:focus {
      color: rgb(139, 113, 26) !important;
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
