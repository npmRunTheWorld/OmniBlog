<script setup>
//imports
import { ref, reactive, toRef, computed } from "vue";

import { arrowRight, edit, trash } from "@/assets/icons";
import { useModalStore } from "../stores/modalStore";
import { useBlogStore } from "../stores/blogStore";
import { doc, collection, deleteDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/connection";

const modalStore = useModalStore();

const props = defineProps({
  //props
  content: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["open-modal", "open-edit-modal"]);

const { content, index } = toRefs(props);

//boner overlord
//states
const blogStore = useBlogStore();
const hover = ref(false);
const showAdditionalDetails = ref(false);
const defaultBucketUri = import.meta.env.VITE_APP_STORAGE_ROOT;
//lifecycle

//functions
function deletePost() {
  //console.log("delete post", content.value);
  modalStore.displayModal({
    title: "Are you sure?",
    text: "this will delete your post forever",
    showCancelButton: true,
    onOk: async () => {
      const storage = getStorage();

      //delete all files that are stored in this path

      //the image path in URL form contains %
      const imagePathInUrlForm = content.value.blogCoverPhotoUrl;
      //console.log(imagePathInUrlForm);
      const blogPhotoRef = storageRef(storage, imagePathInUrlForm);

      if (imagePathInUrlForm !== "" && imagePathInUrlForm) {
        deleteObject(blogPhotoRef)
          .then((res) => {
            //console.log("Images deleted successfully");
          })
          .catch((err) => {
            //console.log("Images failed to delete");
            modalStore.displayModal({
              title: "Error",
              text: "Failed to delete the image",
              showCancelButton: false,
            });
          });
      }

      // Delete the file

      deleteDoc(doc(db, "posts", content.value.docId))
        .then(() => {
          modalStore.displayModal({
            title: "Success",
            text: "Post deleted successfully",
            showCancelButton: false,
          });
          blogStore.blogCardState.splice(index.value, 1);
        })
        .catch((error) => {
          modalStore.displayModal({
            title: "Error",
            text: "Failed to delete the post",
            showCancelButton: false,
          });
        });
    },
  });
}

function editPost() {
  emits("open-edit-modal", content.value, index.value);
}
</script>

<template>
  <div class="card-container">
    <div
      class="card__container"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <div class="card__container-background"></div>

      <div class="icons-box">
        <div class="icon">
          <img
            :src="edit"
            :width="30"
            class="edit"
            v-if="blogStore.editPost"
            @click="editPost"
          />
        </div>

        <div class="icon">
          <img
            :src="trash"
            :width="24"
            class="trash"
            v-if="blogStore.editPost"
            @click="deletePost"
          />
        </div>
      </div>
      <img
        :src="`${content.blogCoverPhotoUrl}`"
        alt="blog-image"
        class="cover-photo"
        @click.prevent="$emit('open-modal', content, index)"
      />
      <div></div>
      <div class="content__information" :class="hover ? 'hover-effect' : ''">
        <h4>{{ content.title }}</h4>
        <h6>Posted on: {{ content.blogData }}</h6>
      </div>
      <RouterLink
        :to="{ name: 'viewPost', params: { uid: content?.uid, index: index } }"
      >
        View The Post <img :src="arrowRight" :width="18" />
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.card__container {
  min-width: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  gap: 1rem;
  color: $black;
  height: 100%;
  .icons-box {
    display: flex;
    gap: 1rem;
    width: 100%;
    align-items: flex-end;
    justify-content: flex-end;
    transition: none;
    height: 50px;

    img {
      width: 16px;
      height: 16px;
      cursor: pointer;
      filter: invert(0.75) sepia(1) saturate(4) hue-rotate(180deg)
        brightness(0.7);
    }

    .icon {
      &:hover {
        scale: 1.1;
        filter: invert(1);
      }
    }
  }

  .card__container-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(209, 207, 199);

    border-radius: 5px;
    z-index: 0;
  }
  transition: 0.5s ease-in transform;

  &:hover {
    transform: rotateZ(-0.5deg) scale(0.99);
    border-radius: 5px;
    box-shadow: 0 4px 6px 4px rgba(0, 0, 0, 0.5),
      0 2px 4px -1px rgba(0, 0, 0, 0.6);
    color: black;
    a {
      color: $primary;
    }
  }

  .content__information {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    height: 100%;
    gap: 1rem;
  }

  .cover-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      filter: brightness(0.8);
    }
  }
  a {
    margin-top: auto;
    color: $accent;

    img {
      margin-left: 0.3rem;
      transform: translateY(25%);
    }
  }

  :not(.card__container-background) {
    z-index: 1;
  }

  &:hover .card__container-background {
    background-color: rgb(34, 34, 34);

    color: $background2-less;
  }
}

.hover-effect {
  color: $background2-less;
}
</style>
