<template>
  <div class="content">
    <ul>
      <li>
        <nuxt-link to="/nuxtLinkDemo">nuxt-link与router跳转的demo</nuxt-link>
      </li>
      <li><nuxt-link to="/todos">待办事项vuex的demo</nuxt-link></li>
      <li><nuxt-link to="/axiosDemo">axios的Demo</nuxt-link></li>
      <li>
        <nuxt-link to="/777/777/777">错误页</nuxt-link>
      </li>
      <li><nuxt-link to="/users/1">三级自定义</nuxt-link></li>
      <li><nuxt-link to="/111/">二级自定义首页</nuxt-link></li>
      <li>
        <nuxt-link to="/111/comments">二级自定义三级固定页面</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/111/444">二级自定义三级自定义</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.content {
  ul {
    li {
      margin-bottom: 20px;
    }
  }
}
</style>