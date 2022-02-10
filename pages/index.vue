<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <div class="content">
        <h2>路由跳转</h2>
        <nuxt-link to="/detail">常规不传参</nuxt-link>
        <br />
        <br />
        <div class="search-box">
          <a-input placeholder="搜索关键词" v-model="searchKeyword" />
          <nuxt-link
            class="right-link"
            :to="{ name: 'detail', params: { keyword: searchKeyword } }"
            >params路由传参</nuxt-link
          >
        </div>
        <br />
        <nuxt-link :to="{ path: '/detail', query: { id: 1 } }"
          >query跳转链接传参</nuxt-link
        >
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "IndexPage",
  data() {
    return {
      searchKeyword: "",
    };
  },
});
</script>

<style lang="less" scoped>
.content {
  // background-color: #cccccc;
  h2 {
    font-size: 20px;
    color: @orange;
  }
  .search-box{
    display: flex;
    align-items: center;
    .right-link{
      width: 200px;
      text-align: right;
    }
  }
}
</style>