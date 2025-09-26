<script setup>
//imports
import { ref, reactive, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { quillEditor, Quill } from "vue3-quill";
import { db, storage } from "../firebase/connection";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
  doc,
} from "firebase/firestore";
import { ref as storageRef, uploadBytes } from "firebase/storage";

import { useUserStore } from "../stores/userStore";
import { useModalStore } from "../stores/modalStore";
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
const modalStore = useModalStore();
const router = useRouter();
//states
const quillState = reactive({
  title: "",
  categories: [],
  coverImage: "",
  content: "",
  file: null,
  _content: "",
  isError: false,
  categoriesError: false,
});
//lifecycle
onMounted(() => {
  if (!userStore.email) {
    modalStore.displayModal({
      icon: "error",
      title: "User Authentication Failed!",
      text: "Please log back in again before trying to submit!",
      onOk: () => {
        router.push({ name: "login" });
      },
    });
  }
});

//functions
async function submitPost() {
  if (!userStore.email) {
    modalStore.displayModal({
      icon: "error",
      title: "User Authentication Failed!",
      text: "Please log back in again before trying to submit!" + missingFields,
      onOk: () => {
        router.push({ name: "login" });
      },
    });
    return;
  }

  if (
    quillState.title === "" ||
    quillState.content === "" ||
    quillState.coverImage === ""
  ) {
    //console.log("empty form", quillState);

    let missingFields = "";
    if (!quillState.title) {
      missingFields += " Title,";
    }
    if (!quillState.content) {
      missingFields += " Content,";
    }
    if (!quillState.coverImage) {
      missingFields += " Cover Image,";
    }

    missingFields = missingFields.slice(0, -1) + ".";

    modalStore.displayModal({
      title: "Empty Form",
      text: "Please fill out the following fields: " + missingFields,
    });
    return;
  }

  quillState.date = quillState.time = new Date().toLocaleTimeString();

  let uniquePostId;

  const userNameQuerySnap = await getDocs(
    query(collection(db, "users"), where("uid", "==", userStore.uid))
  );

  userNameQuerySnap.forEach((doc) => {
    //console.log("found");
    uniquePostId =
      doc.data()?.posts?.length > 0 ? doc.data()?.posts?.length + 1 ?? 1 : 1;
  });

  if (uniquePostId === undefined) {
    uniquePostId = 1;
  }
  //console.log(uniquePostId);

  const uri = `blogCovers/${userStore.uid}+${userStore.email}/${uniquePostId}+${quillState.title}/${quillState.file.name}`;

  const blogCoversRef = storageRef(storage, uri);

  await uploadBytes(blogCoversRef, quillState.file, quillState.file.type).then(
    (snapshot) => {
      //console.log("Uploaded a blob or file!");
    }
  );
  //reason for using /\s+/ is to split the string by multiple spaces
  // if we used " " it would only split by one space
  const words = quillState.title.trim().split(/\s+/);
  const wordStart = words[0];
  const wordEnd = words[words.length - 1].replace(/\.$/, "");

  try {
    //we didnt use addDoc because addDoc automatically generates a unique id for the document
    //set doc(doc(db, collectionName, docId), dataToBeSet);
    const uuid = uuidv4() + "+" + Math.floor(Math.random() * 1000);

    await setDoc(
      doc(
        db,
        "posts",
        `${quillState.title}+${userStore.uid}+${userStore.email}`
      ),
      {
        postId: uuid + "+" + uniquePostId,
        postIndex: uniquePostId,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        title: quillState.title,
        content: quillState.content,
        firstName: userStore.firstName,
        lastName: userStore.lastName,
        email: userStore.email,
        uid: uuid,
        coverImageUri: uri,
        letterStart: wordStart[0],
        wordStart: wordStart,
        wordEnd: wordEnd,
        categories: quillState.categories,
        postUpdated: false,
      }
    );

    modalStore.displayModal({
      icon: "success",
      title: "Post Updated!",
      text: "your post has been updated successfully!",
    });
  } catch (error) {
    console.error("Error adding document: ", error);

    modalStore.displayModal({
      icon: "error",
      title: "Post Update Failed!",
      text: `your post failed to update, please try again later!\nerror : ${error}`,
    });
  } finally {
    router.push({ name: "home" });
  }
}

function closeEmptyForm() {
  quillState.isError = false;
}

const fileInput = ref(null);
const imagePreview = ref("");
function handleFileSelect(event) {
  const selectedFile = fileInput?.value?.files[0];
  if (selectedFile) {
    //console.log(URL.createObjectURL(selectedFile));
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
  //console.log(event.html);
}

const selectedCategories = ref([]);

const updateCategories = () => {
  // Assuming quillState is part of a larger state management or needs to be emitted
  //console.log(selectedCategories.value); // Replace with appropriate action, like updating a store or emitting an event
  if (quillState.categories.length > 2) {
    quillState.categoriesError = true;
    return;
  }

  if (quillState.categories.includes(selectedCategories.value[0])) {
    return;
  }
  quillState.categories.push(selectedCategories.value[0]);
  quillState.categoriesError = false;
};
function removeCategory(category) {
  quillState.categories = quillState.categories.filter(
    (cat) => cat !== category
  );
  selectedCategories.value = [];
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
    <section class="categories-container">
      <div class="categories-selection">
        <div
          v-for="(category, index) in quillState.categories"
          :key="`quillCat-${category}-${
            Math.random(10000) * index + index + 2
          }`"
        >
          <div class="category-tag">
            <p>{{ category }}</p>
            <span class="cancel-category" @click="removeCategory(category)"
              >x</span
            >
          </div>
        </div>
      </div>

      <div class="categories-wrapper">
        <h3>Please select up to 3 categories</h3>
        <select
          class=""
          multiple
          value=""
          name="categories"
          @change="updateCategories"
          v-model="selectedCategories"
        >
          <option value="art">Art</option>
          <option value="abstract">Abstract</option>
          <option value="games">Games</option>
          <option value="food">Food</option>
          <option value="science">Science</option>
          <option value="sliceOfLife">Slice Of Life</option>
          <option value="entertainment">Entertainment</option>
          <option value="fashion">Fashion</option>
          <option value="news">News</option>
          <option value="beauty">Beauty</option>
          <option value="lifestyle">Life Style</option>
          <option value="fitness">Fitness</option>
          <option value="photography">Photography</option>
          <option value="education">Education</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>
      </div>
    </section>

    <div class="btn-container flex-end">
      <button @click="submitPost">Create Post</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  background-color: rgba(170, 163, 101, 0.199);

  color: rgb(139, 113, 26);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: monospace;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgb(10, 76, 78);
    color: rgb(139, 113, 26);
  }
}

.image-drop-container {
  display: flex;
  flex-direction: column;
  border: 1px solid black;

  .title-container {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    p {
      font-size: 1.4rem;
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
  background-color: rgba(170, 163, 101, 0.199);
  padding: 3rem;
  margin-top: 10vh;
  gap: 1rem;

  .title-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-family: monospace;
    width: 100%;
    & > input {
      width: 100%;
      height: 100%;
      padding: 0.5rem 0.5rem;
      border: 1px solid black;
      font-size: 1.4rem;
      font-weight: 600;
      font-family: monospace;
      background-color: rgba(170, 163, 101, 0.199);
      outline: none;

      color: rgb(139, 113, 26);
      &:hover {
        border: 1px solid black;
      }
    }
  }
  .categories-container {
    width: 100%;
    display: flex;
    gap: 1rem;

    .categories-selection {
      display: flex;
      border: 1px solid black;
      width: 80%;
      font-size: 1rem;
      gap: 1rem;
      padding: 1rem;
      flex-wrap: wrap;
      .category-tag {
        background-color: #1d472b;
        width: max-content;
        min-width: 100px;
        display: flex;
        justify-content: space-around;
        padding: 0.5rem;
        border-radius: 5px;
        gap: 1rem;
        text-transform: capitalize;

        p {
          color: rgb(139, 113, 26);
          font-size: 1rem;
          font-weight: 600;
          font-family: monospace;
        }

        span {
          color: rgb(139, 113, 26);
          font-size: 1rem;
          font-weight: 600;
          font-family: monospace;
          cursor: pointer;
        }
      }
    }

    .categories-wrapper {
      width: 20%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 0.8rem;

      ::-webkit-scrollbar-track {
        background-color: rgba(
          170,
          163,
          101,
          0.199
        ); /* Change this to the color you want for the scrollbar track */
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
      select {
        width: 100%;
        font-size: 1rem;
        background-color: rgba(170, 163, 101, 0.199);
        padding: 0.5rem 0.5rem;
        border-radius: 5px;

        option {
          &:hover {
            background-color: rgb(211, 197, 151);
          }

          &:active {
            background-color: rgb(211, 197, 151);
          }

          &::selection {
            background-color: rgb(211, 197, 151);
          }
          &.selected {
            background-color: rgb(211, 197, 151);
          }
        }
      }
      select[multiple]:focus option:checked {
        background: rgb(52, 85, 75)
          linear-gradient(0deg, rgb(52, 85, 75) 0%, rgb(52, 85, 75) 100%);
      }
    }
  }
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
  background-color: rgba(170, 163, 101, 0.199);

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

// ====== MOBILE RESPONSIVE STYLES ======
@media (max-width: 768px) {
  .create__post {
    padding: 1rem;
    margin: 1rem;

    .container {
      padding: 1.5rem 1rem;

      h2 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .post-title {
        input {
          font-size: 1.1rem;
          padding: 0.75rem;
        }
      }

      .categories {
        .selectric-wrapper {
          margin-bottom: 1rem;
        }

        p {
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        .category-chips {
          gap: 0.5rem;

          .category-chip {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      }

      .image-upload {
        .file-input-container {
          padding: 1.5rem 1rem;
        }

        img {
          max-height: 200px;
        }
      }

      .quill-editor {
        height: 40vh;
      }

      .buttons {
        gap: 1rem;
        flex-direction: column;

        button {
          width: 100%;
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .create__post {
    margin: 0.5rem;
    padding: 0.5rem;

    .container {
      padding: 1rem 0.75rem;

      h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }

      .post-title input {
        font-size: 1rem;
        padding: 0.6rem;
      }

      .image-upload {
        .file-input-container {
          padding: 1rem 0.75rem;
        }

        img {
          max-height: 150px;
        }
      }

      .quill-editor {
        height: 35vh;
      }

      .categories {
        .category-chips .category-chip {
          font-size: 0.75rem;
          padding: 0.3rem 0.6rem;
        }
      }
    }
  }
}
</style>
