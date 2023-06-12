<script setup>
//imports
import { ref } from "vue";
import { RouterLink } from "vue-router";

import linkedlnIcon from "@/assets/icons/linkedin-brands.svg";
import instagramIcon from "@/assets/icons/instagram-brands.svg";
import youtubeIcon from "@/assets/icons/youtube-brands.svg";
//props

//states

//lifecycle

//functions
</script>

<template>
  <div class="container">
    <div class="container__divider">
      <section class="section__title">
        <RouterLink :to="{ name: 'home' }"><h1>Omni Blog</h1></RouterLink>

        <div class="social__icons">
          <a href="https://www.google.com" target="_blank">
            <img :src="linkedlnIcon" />
          </a>
          <a href="https://www.google.com" target="_blank">
            <img :src="instagramIcon" />
          </a>
          <a href="https://www.google.com" target="_blank">
            <img :src="youtubeIcon" />
          </a>
        </div>
      </section>

      <div class="title__divider"></div>

      <section class="section__site-links">
        <div class="site-links__container">
          <RouterLink :to="{ name: 'blog' }">Blog</RouterLink>
          <RouterLink :to="{ name: 'post' }">Post</RouterLink>
          <RouterLink :to="{ name: 'post' }">Style</RouterLink>
        </div>
      </section>

      <div class="title__divider"></div>

      <section class="section__copyright">
        <p>Copyright of AceJokerCapital 2020</p>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 36vh;
  background-color: $background3;
  color: $text2;
  @include col-start2;
}

.container__divider {
  @include row-start;
}

section {
  @include col-start;
  flex: 0.3;
}

a {
  text-decoration: none;
  font-size: 16px;
  color: $text2;
}

.section__title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  a {
    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }
  }
  .social__icons {
    @include row;
    gap: 30px;
    width: 100%;
  }
}

.section__site-links {
  flex: 0.4;
  @include col-start;

  div {
    @include col;
    flex-wrap: wrap;
    gap: 30px;

    a {
      &:hover {
        text-decoration: underline;
        text-underline-offset: 0.3rem;
        text-decoration-color: $primary;
      }
    }
  }
}

.section__copyright {
  flex: 0.3;
  @include col-end;
  height: 100%;
  padding: 1rem;
}

.title__divider {
  min-height: 100%;
  min-width: 3px;
  background-color: $primary;
}

img {
  width: 30px;
  aspect-ratio: 1/1;
  color: white;
  background-color: $primary;
  cursor: pointer;
}

@media screen and (max-width: 480px) {
  .container {
    height: 45vh;
  }
  .container__divider {
    @include col;
  }
  .title__divider {
    min-height: 3px;
    min-width: 80%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
