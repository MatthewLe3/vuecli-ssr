<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Home页面</h1>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>定义在data中的信息:{{msg}}</h1>
    <h1>在created中赋值0=>100:{{createdMsg}}</h1>
    <h1>在mounted中赋值0=>100:{{mountedMsg}},document显示0</h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      msg:'message',
      createdMsg:0,
      mountedMsg:0
    }
  },
  created(){
    this.createdMsg = 100
  },
  mounted(){
    this.mountedMsg = 100
  }
}
</script>
