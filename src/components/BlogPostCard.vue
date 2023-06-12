<script setup>
//imports
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { arrowRight } from "@/assets/icons";

//props
defineProps({
  post: {
    type: Object,
    required: true,
  },
  content: {
    type: Array,
    required: false,
    default: [],
  },
  index: {
    type: Number,
    required: false,
  },
});
//states

//lifecycle
onMounted(() => {});
//functions
</script>

<template>
  <div class="container">
    <div class="blot__content">
      <div>
        <section v-if="post.welcomeScreen" class="blog__hero-container">
          <div class="hero-container__title">
            <h1>{{ post.title }}</h1>
            <p>{{ post.blogPost }}</p>

            <RouterLink :to="{ name: login }"
              >Login Register <img :src="arrowRight" width="30" height="30"
            /></RouterLink>
          </div>

          <div class="hero-container__img">
            <img
              :src="`src/assets/blogPhotos/${post.photo}.jpg`"
              :alt="post.photo"
            />
          </div>
        </section>

        <section
          v-else
          :class="
            index % 2 == 0
              ? 'blog__regular-container'
              : 'blog__regular-container-odd'
          "
        >
          <div class="regular-container__title">
            <h1>{{ post.title }}</h1>
            <p>{{ post.blogHTML }}</p>
            <RouterLink :to="{ name: posta }">View Post</RouterLink>
          </div>

          <div class="regular-container__img">
            <img :src="`src/assets/blogPhotos/${post.blogCoverPhoto}.jpg`" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 0;
  overflow: hidden;
}

a {
  border-bottom: 1px solid transparent;
  transition: 0.3s ease-in all;
  &:hover {
    border-bottom: 1px solid black;
  }
}

.blog__hero-container {
  min-width: 100%;
  width: 100%;
  min-height: 30vh;
  flex: 1;
  @include row-start;
  background-color: $background3;
  color: $text2;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;

  .hero-container__title {
    @include col-start;
    gap: 1rem;
    margin-left: 15%;
    width: 85%;
    width: 50%;

    h1 {
      text-transform: uppercase;
    }
    p {
      text-overflow: ellipsis;
    }
    a {
      color: $primary;
      img {
        color: $text;
        filter: invert(1);
        transform: translate(0%, 25%);
        width: 18px;
        height: 18px;
      }

      &:hover {
        color: $text2;
        border-bottom: 1px solid $text2;
      }
    }
  }

  .hero-container__img {
    width: 50%;
    height: 100%;
    display: flex;
    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
    }
  }
}

.blog__regular-container {
  min-width: 100%;
  width: 100%;
  flex: 1;
  min-height: 33vh;
  @include row-start;
  flex-direction: row-reverse;
  background-color: $background2-less;
  border-width: 5px 0px 0;
  border-color: black;
  border-style: solid;
  gap: 3rem;

  .regular-container__title {
    @include col-start;
    width: 50%;
    gap: 1rem;
    overflow: hidden;
    h1 {
      margin-left: 15%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      text-transform: uppercase;
    }
    p {
      margin-left: 15%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      text-overflow: ellipsis;
    }

    a {
      color: $accent;
      margin-left: 15%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      img {
        background-color: $secondary;
        transform: translate(0%, 30%);
      }

      &:hover {
        color: $black;
      }
    }
  }

  .regular-container__img {
    display: flex;
    width: 50%;
    height: 100%;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
}

.blog__regular-container-odd {
  min-width: 100%;
  width: 100%;
  flex: 1;
  min-height: 30vh;
  @include row-start;
  background-color: $background2;
  color: $text;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;

  .regular-container__title {
    @include col-start;
    gap: 1rem;
    margin-left: 15%;
    width: 85%;
    width: 50%;

    h1 {
      text-transform: uppercase;
    }
    p {
      text-overflow: ellipsis;
    }
    a {
      color: $accent;
      img {
        color: $text;
        filter: invert(1);
        transform: translate(0%, 25%);
        width: 18px;
        height: 18px;
      }

      &:hover {
        color: $text;
        border-bottom: 1px solid $text;
      }
    }
  }

  .regular-container__img {
    display: flex;
    width: 50%;
    height: 100%;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
}

@media screen and (max-width: 700px) {
  .blog__hero-container {
    flex-direction: column;

    .hero-container__title {
      order: 2;
      width: 100%;
      margin: 0;
      padding: 3rem;
      transform: none;
    }
    .hero-container__img {
      order: 1;
      width: 100%;
    }
  }

  .blog__regular-container {
    flex-direction: column-reverse;
    padding: 1rem;

    .regular-container__title {
      margin-left: 0;
      width: 100%;

      h1 {
        margin-left: 0;
      }

      p {
        margin-left: 0;
      }
      a {
        margin-left: 0;
      }
    }
  }

  .blog__regular-container-odd {
    flex-direction: column-reverse;
    padding: 1rem;
    .regular-container__title {
      margin-left: 0;
      width: 100%;
    }
  }
}
</style>
