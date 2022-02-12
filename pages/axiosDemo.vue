<template>
  <p>{{ text }}</p>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  async asyncData({ app }) {
    try {
      const ip = await app.$axios.$get("/try/ajax/ajax_info.txt");
      return { text: ip };
    } catch (error) {}
  },
};
</script>

<style>
</style>