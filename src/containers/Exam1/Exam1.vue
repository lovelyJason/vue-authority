<template>
  <div>
    exam1
    <router-link to="/exam2">跳转</router-link>
    <div
      @click="handleClick(index)"
      :class="{active: index === parseInt(index1),title: true}"
      v-for="(item,index) in list"
      :key="index"
    >{{item.name}}</div>
  </div>
</template>

<script>
export default {
  name: "exam1",
  data() {
    return {
      msg: "hello world",
      list: [
        { name: "zs", age: 17 },
        { name: "ls", age: 18 },
        { name: "ww", age: 19 }
      ],
      index1: null
    };
  },
  methods: {
    handleClick(index) {
      this.index1 = index;
    }
  }
};
</script>

<style>
.active {
  background-color: red;
}
.title {
  color: peru;
}
</style>
