<template>
  <div class="">
    <h1>nuxt-link跳转</h1>
    <br />
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
    <br />
    <h1>router跳转</h1>
    <br />
    <div class="btns">
      <div class="btn">
        <a-button type="primary" block @click="toDetail(0)">
          <span>常规不传参</span>
        </a-button>
      </div>
      <div class="btn">
        <a-input-search
          placeholder="input search text"
          size="large"
          v-model="searchKeyword"
          @search="toDetail(1)"
        >
          <a-button slot="enterButton" type="primary" block>
            <span>params路由传参</span>
          </a-button>
        </a-input-search>
      </div>
      <div class="btn">
        <a-button type="danger" block @click="toDetail(2)">
          <span>query跳转链接传参</span>
        </a-button>
      </div>
    </div>
  </div>
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
  methods: {
    // 0 常规不传参 1 params路由传参 2 query跳转链接传参
    toDetail(type: 0 | 1 | 2) {
      let searchKeyword = this.$data.searchKeyword;
      switch (type) {
        case 0:
          this.$router.push("/detail");
          break;
        case 1:
          this.$router.push({
            name: "detail",
            params: { keyword: searchKeyword },
          });
          break;
        case 2:
          this.$router.push({ path: "/detail", query: { id: "1" } });
          break;

        default:
          break;
      }
    },
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