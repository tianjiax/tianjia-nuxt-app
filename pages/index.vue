<template>
  <div class="">
    <div class="btns">
      <div class="btn">
        <a-button type="primary" block>
          <nuxt-link to="/detail">常规不传参</nuxt-link>
        </a-button>
      </div>
      <div class="btn">
        <a-input-search
          placeholder="input search text"
          size="large"
          v-model="searchKeyword"
        >
          <a-button slot="enterButton" type="primary" block>
            <nuxt-link
              class="right-link"
              :to="{ name: 'detail', params: { keyword: searchKeyword } }"
              >params路由传参</nuxt-link
            >
          </a-button>
        </a-input-search>
      </div>
      <div class="btn">
        <a-button type="danger" block>
          <nuxt-link :to="{ path: '/detail', query: { id: 1 } }"
            >query跳转链接传参</nuxt-link
          >
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Carousel from "@/components/Carousel.vue";
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
.btns {
  display: flex;
  width: 100%;
  align-items: center;
  .btn {
    flex: 1;
    padding: 0 10px;
    /deep/input {
      color: @green;
    }
  }
}
</style>