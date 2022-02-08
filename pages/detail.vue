<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="6">
      <p>params路由传参：{{ $route.params.keyword }}</p>
    </a-col>
    <a-col :span="6">
      <p>query跳转链接传参：{{ $route.query.id }}</p>
    </a-col>
  </a-row>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "detail",
});
</script>

<style>
</style>