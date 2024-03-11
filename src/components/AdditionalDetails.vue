<script setup>
//imports
import { ref, reactive, onMounted } from "vue";

//props, general
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

const isMounted = ref(false);
//lifecycle
onMounted(() => {
  console.log("blogObject", blogObject.value);
  blogState.currentContent = blogObject.value;
  console.log("blogState.currentContent", blogState.currentContent);
  blogState.contentIndex = blogObject.value.index;
  isMounted.value = true;
  window.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscape);
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

//
</script>

<template>
  <div class="additional-details-fixed-bg" v-if="isMounted">
    <div class="card-background">
      <div class="blog-cover-bg">
        <img
          :src="`${blogState.currentContent.blogCoverPhotoUrl}`"
          alt="blog-image"
          class="background-image"
        />

        <div class="foreground-content">
          <div class="close-section">
            <div class="button-wrapper">
              <button @click="$emit('closed')">X</button>
            </div>
          </div>

          <div class="additional-details-container">
            <div class="title-container">
              <h1>{{ blogState.currentContent.title }}</h1>
            </div>

            <div class="content-container">
              <div class="left-side">
                <div class="author-container icon-title-container">
                  <BsFileEarmarkPerson />

                  <p>
                    {{
                      blogState.currentContent.firstName +
                      " " +
                      blogState.currentContent.lastName
                    }}
                  </p>
                </div>

                <div class="icon-title-container">
                  <UiDate />

                  <p>
                    {{ `${blogState.currentContent?.date}` }}
                  </p>
                </div>

                <div class="icon-title-container">
                  <McTimeLine />

                  <p>
                    {{ `${blogState.currentContent?.time}` }}
                  </p>
                </div>

                <div class="icon-title-container">
                  <CaCategories />

                  <p>
                    {{
                      `${
                        blogState.currentContent?.categories ??
                        "[     ...............    ]"
                      }`
                    }}
                  </p>
                </div>
              </div>

              <div class="right-side">
                <div class="content-summary">
                  <BxSolidBookContent class="icon" />
                  <div
                    v-html="createExcerpt(blogState.currentContent.content)"
                  ></div>
                </div>

                <div class="view-post-container icon-title-container">
                  <AkLinkOut />
                  <RouterLink
                    :to="{
                      name: 'viewPost',
                      params: {
                        uid: blogState.currentContent.uid,
                        index: blogState.contentIndex,
                      },
                    }"
                  >
                    View Full Post
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
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
  background-color: rgba(0, 0, 0, 0.603);
  z-index: 2000;

  .card-background {
    width: 80%;
    height: 80%;
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
    margin-top: 5rem;
    box-shadow: 0 4px 6px 4px rgba(0, 0, 0, 0.5),
      0 2px 4px -1px rgba(0, 0, 0, 0.6);

    .blog-cover-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        pointer-events: none;
        user-select: none;
        z-index: -1;
        filter: brightness(0.25);
      }

      .foreground-content {
        position: inherit;
        z-index: 2000;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        gap: 1rem;
        padding: 1rem;

        .button-wrapper {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          button {
            background-color: $background2-less;
            border: 1px solid white;
            color: $teal;
            border-radius: 5px;
            &:hover {
              background-color: $teal;
              color: rgb(168, 163, 144);
            }
          }
        }

        .additional-details-container {
          display: flex;
          flex-direction: column;
          margin-top: auto;
          gap: 1rem;
          padding: 1rem;
          overflow: hidden;
          height: 50%;
          background-color: #fdfdfdb9;
          .title-container {
            h1 {
              width: 100%;
              display: flex;
              justify-content: center;
              font-size: 18px;
              text-decoration-line: underline;
              text-underline-offset: 9.5px;
              color: $brown;
              -webkit-text-stroke: 0.3px $black;
            }
          }

          .content-container {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            overflow: hidden;
            height: 100%;
            background-color: #fdfdfd18;
            color: rgb(37, 71, 82);

            .icon-title-container {
              display: flex;
              flex-direction: row;
              gap: 0.5rem;
              align-items: center;
              p {
                font-weight: bold;
              }
            }

            .left-side {
              display: flex;
              flex-direction: column;
              gap: 2em;
              width: 50%;

              .author-container {
                margin-top: 2rem;
                p {
                }
              }
            }

            .right-side {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              width: 100%;
              height: 100%;
              gap: 2rem;

              .content-summary {
                display: flex;
                gap: 1rem;
                max-height: 80%;
                overflow: hidden;
                text-overflow: ellipsis;

                .icon {
                  font-size: 1.3em;
                }
                div {
                  width: 100%;
                }
              }

              .view-post-container {
                display: flex;
                gap: 1rem;
                margin-top: auto;

                a {
                  color: $teal;
                  font-weight: bold;
                  &:hover {
                    color: $brown;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
