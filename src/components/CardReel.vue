<script setup>
//imports
import { ref, reactive } from "vue";

//props, general
defineProps({
  blogCards: {
    type: Array,
    required: true,
  },
});

//states

//lifecycle

//functions

//
</script>

<template>
  <div class="individual-blog-card__marquee">
    <BlogCard
      v-for="(content, index) in blogCardState"
      :key="index + 'individual'"
      :content="content"
      :index="index"
      @open-modal="handleAdditionalDetails"
      @open-edit-modal="handleEditDetails"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
}
</style>
