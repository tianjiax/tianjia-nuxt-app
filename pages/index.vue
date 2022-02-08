<template>
  <a-row type="flex" justify="center" align="top">
    <a-col :span="12">
      <div class="">
        <h2>路由跳转</h2>
        <nuxt-link to="/detail">常规不传参</nuxt-link>
        <br>
        <br>
        <div class="search-box">
          <a-input placeholder="搜索关键词" v-model="searchKeyword" />
          <nuxt-link
            :to="{ name: 'detail', params: { keyword: searchKeyword } }"
            >params路由传参</nuxt-link
          >
        </div>
        <br>
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
