<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <Header />
      <a-layout-content>
        <nuxt />
      </a-layout-content>
      <Footer />
    </a-layout>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: [Header, Footer],
};
</script>

<style  lang="less" scoped>
#components-layout-demo-basic {
  text-align: center;
  display: flex;
  height: 100%;
  .ant-layout-header {
    background: #7dbcea;
    color: #fff;
  }
  .ant-layout-footer {
    background: #7dbcea;
    color: #fff;
  }
  .ant-layout-content {
    flex: 1;
    padding: 40px;
  }
}
</style>