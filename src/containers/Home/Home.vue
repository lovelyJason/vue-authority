<template>
  <div id="Home">
    <img src="../../assets/logo.png" /><br>
    <router-link to="/exam1">to exam1</router-link><br>
    <router-link to="/exam2">to exam2</router-link><br>
    <button :style="{ marginTop: '80px' }" @click="logout">登出</button>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
    logout() {
      window.localStorage.removeItem('userId')
      // 退出登录清除store
      this.$store.dispatch('setRights',null)
      this.$router.push('/login')
    }
  }

};
</script>

<style>
#Home {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
