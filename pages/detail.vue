<template>
  <div class="content">
    <h2>这里是使用less变量的橘色标题</h2>
    <br />
    <h2>params路由传参：{{ $route.params.keyword }}</h2>
    <h2>query跳转链接传参：{{ $route.query.id }}</h2>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "detail",
});
</script>

<style lang="less" scoped>
.content {
  h2 {
    font-size: 20px;
    color: @orange;
  }
}
</style>