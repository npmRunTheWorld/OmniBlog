<script setup>
//imports
import { ref, reactive } from "vue";

//props, general
defineProps({});

//states

//lifecycle

//functions

//
</script>

<template>
  <div class="about-container">
    <div class="content-container">
      <h1>About Omni Blog</h1>
      <p>
        Welcome to Omni Blog, your ultimate destination for unleashing your
        creativity, sharing your passions, and connecting with like-minded
        individuals across the online space. At Omni Blog, we believe that
        everyone has a story to tell and unique insights to share, and our
        platform is designed to empower you to do just that.
      </p>
      <h1>Our Mission</h1>
      <p>
        Our mission at Omni Blog is simple: to provide a platform where users
        can freely express themselves, create compelling content, and engage
        with a vibrant community of writers, thinkers, and creators. We strive
        to foster an inclusive and supportive environment where diversity of
        thought and expression is celebrated.
      </p>
      <h1>What We Offer</h1>
      <p>
        Omni Blog offers a user-friendly interface and a suite of powerful tools
        to help you bring your ideas to life. Whether you're a seasoned blogger
        or just starting out, our platform makes it easy to create, publish, and
        share your content with the world. From thought-provoking articles to
        captivating stories, from stunning visuals to engaging videos, Omni Blog
        empowers you to express yourself in any format you choose.
      </p>
      <h1>Join Our Community</h1>
      <p>
        Joining the Omni Blog community means more than just creating a blog—it
        means becoming part of a dynamic network of creators and enthusiasts who
        share your interests and passions. Connect with other users, discover
        new perspectives, and build meaningful relationships as you explore the
        diverse range of content on our platform.
      </p>
      <h1>Get Started Today</h1>
      <p>
        Ready to embark on your blogging journey? Signing up for Omni Blog is
        quick, easy, and completely free. Whether you're passionate about
        travel, technology, fashion, food, or anything in between, there's a
        place for you here. So why wait? Join us today and start sharing your
        stories with the world on Omni Blog. Your voice matters, and we can't
        wait to hear what you have to say.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-container {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
  background-image: url("../assets/images/star-bg.jpg");
  background-size: contain;
  color: white;

  .content-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 3rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
    p {
      margin-bottom: 5rem;
      width: 50%;
      &:hover {
        background-color: black;
      }
    }
  }
}
</style>
