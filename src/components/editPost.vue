<script setup>
//imports
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { quillEditor, Quill } from "vue3-quill";
import { db, storage } from "../firebase/connection";
import { useBlogStore } from "../stores/blogStore";
import { v4 as uuidv4 } from "uuid";

import {
  getDocs,
  query,
  collection,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { uploadBytes, deleteObject, ref as storageRef } from "firebase/storage";
import { useRouter } from "vue-router";

//props, general
const userStore = useUserStore();
const modalStore = useModalStore();
const blogStore = useBlogStore();
const router = useRouter();

const props = defineProps({
  blogObject: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["closed"]);

//states
const { blogObject } = toRefs(props);
const blogState = reactive({
  currentContent: {},
  isShowingAdditionalDetails: false,
  contentIndex: -1,
});

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

const fileInput = ref(null);
const imagePreview = ref("");
const isMounted = ref(false);
//lifecycle
onMounted(() => {
  //console.log("blogObject", blogObject.value);
  blogState.currentContent = blogObject.value;
  //console.log("blogState.currentContent", blogState.currentContent);
  blogState.contentIndex = blogObject.value.index;
  quillState.title = blogState.currentContent.title;
  quillState.content = blogState.currentContent.content;
  quillState.categories = blogState.currentContent?.categories || [];
  quillState.coverImage = blogState.currentContent.blogCoverPhotoUrl;
  imagePreview.value = blogState.currentContent.blogCoverPhotoUrl;
  const fileImagePathArr = blogState.currentContent.coverImageUri.split("/");
  //console.log(fileImagePathArr);
  fileInput.value = fileImagePathArr[fileImagePathArr.length - 1];
  isMounted.value = true;
  window.addEventListener("keydown", handleEscape);
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscape);
  document.body.style.overflow = "auto";
});
//functions
function createExcerpt(htmlContent, maxLength = 933) {
  const strippedString = htmlContent.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
  if (strippedString.length <= maxLength) return strippedString; // Return if already short enough
  return strippedString.substring(0, maxLength) + "..."; // Truncate and append ellipsis
}

function handleEscape(e) {
  if (e.key === "Escape") {
    emits("closed");
  }
}

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

  //console.log("blogObject", blogObject.value);

  quillState.date = quillState.time = new Date().toLocaleTimeString();
  const oldPostIndex = blogObject.value.postIndex;
  let uri = blogObject.value.coverImageUri;

  //if the cover image has changed, delete the old image and upload the new one
  if (quillState.coverImage !== blogObject.value.blogCoverPhotoUrl) {
    const imagePathInUrlForm = quillState.coverImage;
    //console.log(imagePathInUrlForm);
    const blogPhotoRef = storageRef(storage, imagePathInUrlForm);

    if (imagePathInUrlForm !== "" && imagePathInUrlForm) {
      deleteObject(blogPhotoRef)
        .then((res) => {
          //console.log("Images deleted successfully");
        })
        .catch((err) => {
          //console.log("Images failed to delete");
        });
    }

    //push the new image
    uri = `blogCovers/${userStore.uid}+${userStore.email}/${oldPostIndex}+${quillState.title}/${quillState.file.name}`;

    const blogCoversRef = storageRef(storage, uri);

    await uploadBytes(
      blogCoversRef,
      quillState.file,
      quillState.file.type
    ).then((snapshot) => {
      //console.log("Uploaded a blob or file!");
    });
  }

  //delete the old image

  //reason for using /\s+/ is to split the string by multiple spaces
  // if we used " " it would only split by one space
  const words = quillState.title.trim().split(/\s+/);
  const wordStart = words[0];
  const wordEnd = words[words.length - 1].replace(/\.$/, "");

  try {
    //we didnt use addDoc because addDoc automatically generates a unique id for the document
    //set doc(doc(db, collectionName, docId), dataToBeSet);
    await setDoc(doc(db, "posts", blogObject.value.docId), {
      postId: blogObject.value.uid + "+" + oldPostIndex,
      postIndex: oldPostIndex,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      title: quillState.title,
      content: quillState.content,
      firstName: userStore.firstName,
      lastName: userStore.lastName,
      email: userStore.email,
      uid: blogObject.value.uid,
      coverImageUri: uri,
      letterStart: wordStart[0],
      wordStart: wordStart,
      wordEnd: wordEnd,
      categories: quillState.categories,
      postUpdated: true,
    });

    const blog = blogStore.blogCardState.find((blog) => {
      return blog.uid === blogObject.value.uid;
    });

    blog.title = quillState.title;
    blog.content = quillState.content;
    blog.blogHTML = quillState.content;
    blog.blogCoverPhotoUrl = quillState.coverImage;
    blog.categories = quillState.categories;
    blog.date = new Date().toLocaleDateString();
    blog.time = new Date().toLocaleTimeString();
    blog.letterStart = wordStart[0];
    blog.wordStart = wordStart;
    blog.wordEnd = wordEnd;
    blog.coverImageUri = uri;
    blog.postUpdated = true;

    //console.log("blogObject", blogObject.value);

    modalStore.displayModal({
      icon: "success",
      title: "Post Updated!",
      text: "your post has been updated successfully!",
      onOk: () => {
        emits("closed");
      },
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    modalStore.displayModal({
      icon: "error",
      title: "Post Update Failed!",
      text: `your post failed to update, please try again later!\nerror : ${error}`,
    });
  }
}

function closeEmptyForm() {
  quillState.isError = false;
}

function handleFileSelect(event) {
  //if
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

function closeEdit() {
  emits("closed");
}
//
</script>

<template>
  <div class="additional-details-fixed-bg" v-if="isMounted">
    <div class="card-background">
      <div class="edit-post-upper-section">
        <div class="">
          <h1>Edit Post</h1>
        </div>

        <div class="">
          <span @click="closeEdit">X</span>
        </div>
      </div>

      <div class="quill-container">
        <div class="title-wrapper">
          <input type="text" placeholder="Title: " v-model="quillState.title" />
        </div>

        <div class="image-drop-container">
          <div class="image-drop-sub-container">
            <div class="title-container">
              <p>Add a cover image</p>
              <button v-show="imagePreview" @click="handleRemoveImage">
                X
              </button>
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
                  v-if="imagePreview || quillState.coverImage"
                  :src="imagePreview"
                  alt="Image Preview"
                  style="max-width: 100%"
                />
              </div>
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

        <div class="btn-container flex-end edit-post-wrapper">
          <button @click="submitPost">Edit Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.additional-details-fixed-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.603);
  z-index: 2000;

  .card-background {
    width: 80%;
    height: 90%;
    background-color: rgb(206, 205, 201);
    color: black;
    overflow: hidden;
    word-wrap: break-word;
    overflow-wrap: break-word;
    border-radius: 5px;
    z-index: 1000;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 6px 4px rgba(0, 0, 0, 0.5),
      0 2px 4px -1px rgba(0, 0, 0, 0.6);

    .edit-post-upper-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5%;
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        & > h1 {
          color: $teal;
          font-size: 1.5rem;
        }
        & > span {
          color: $teal;
          background-color: $background2-less;
          padding: 0.2rem;
          border-radius: 0.25rem;
          font-size: 1.5rem;
          cursor: pointer;
          transition: 0.3s ease-in all;
          &:hover {
            color: $brown;
          }
        }
      }
    }

    .quill-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      height: 95%;
      .title-wrapper {
        display: flex;
        width: 100%;
        height: 5%;
        & > input {
          width: 100%;
          height: 100%;
          padding: 0.5rem;
          font-size: 1.2rem;
          border: none;
          outline: none;
          color: $brown;
        }
      }

      .image-drop-container {
        display: flex;
        flex-direction: column;
        height: 30%;
        padding: 0.5rem;
        .image-drop-sub-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: space-between;

          width: 100%;
          height: 100%;
          .title-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 30%;
            & > p {
              color: $black;
              padding-top: 1rem;
            }
            & > button {
              background-color: $white;
              color: black;
              border: none;
              padding: 0.5rem;
              cursor: pointer;
              transition: 0.3s ease-in all;
              &:hover {
                background-color: $brown;
              }
            }
          }

          .input-container {
            display: flex;
            width: 100%;
            height: 70%;
            & > input {
              width: 100%;
              height: 100%;
              padding: 0.5rem;
              font-size: 0.9rem;
              border: none;
              outline: none;
              color: $brown;
            }
            & > div {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              & > img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 5px;
              }
            }
          }
        }
      }
      .quill-editor {
        height: 50vh;
        width: 100%;
        overflow: hidden;
        word-wrap: break-word;
        overflow-wrap: break-word;
        background-color: rgb(236, 236, 236);

        ::-webkit-scrollbar-thumb {
          background-color: $teal;
          border-radius: 5px;
          width: 10px;
        }

        ::-webkit-scrollbar {
          width: 10px; /* Set the width of the scrollbar */
        }
      }

      .categories-container {
        display: flex;
        gap: 1rem;
        .categories-selection {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          width: 100%;
          height: 65%;
          margin-top: auto;
          flex-wrap: wrap;
          background-color: $background2;
          padding: 1rem;
          .category-tag {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            background-color: $background2-less;
            border-radius: 5px;
            text-transform: capitalize;
            p {
              color: $brown;
            }
            .cancel-category {
              cursor: pointer;
              color: $brown;
              transition: 0.3s ease-in all;
              &:hover {
                color: $accent;
              }
            }
          }
        }
        .categories-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 30%;
          padding-top: 1rem;
          h3 {
            color: $black;
            font-size: 0.9rem;
          }
          select {
            width: 100%;
            height: 100%;
            padding: 0.5rem;
            font-size: 1rem;
            border: none;
            outline: none;
            color: $brown;
            background-color: $background2;
            border-radius: 5px;
            option {
              color: $brown;
              background-color: $background2;
            }
          }
        }
      }
    }
  }
}

.edit-post-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  button {
    padding: 0.5rem 1rem;
    background-color: $teal;
    color: $white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: $brown;
    }
  }
}
</style>
