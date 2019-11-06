<template>
  <div id="login">
    <button @click="login">登录</button>
    <router-link to="/home">首页</router-link>
    <router-link to="/exam1">exam1</router-link>
    <router-link to="/exam2">exam2</router-link>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {

    }
  },
  methods: {
    login() {
      this.$http.get('/login').then( res => {
        console.log(res)
      })
      window.localStorage.setItem('userId','admin')
      // window.sessionStorage.setItem('userId','admin')
      this.$router.push('/home')
    }
  }
}
</script>

<style>

</style>
