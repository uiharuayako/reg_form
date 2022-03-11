<template>
  <div id="app">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="home">
        <router-link to="/">
          <a-icon type="home"/>
          注册
        </router-link>
      </a-menu-item>
      <a-menu-item key="about">
        <router-link to="/about">
          <a-icon type="profile"/>
          用户列表
        </router-link>
      </a-menu-item>
      <a-menu-item key="calc">
        <router-link to="/calc">
          <a-icon type="calculator"/>
          简易计算器
        </router-link>
      </a-menu-item>
    </a-menu>
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: ['home']
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position:relative;
}
</style>
