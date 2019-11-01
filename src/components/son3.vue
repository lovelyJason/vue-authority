<template>
  <div>
    <div @click="changeName">点击跳往tab1</div>
  </div>
</template>

<script>
export default {
  methods: {
    changeName() {
        console.log(this.$parent)
      this.$parent.$parent.$parent.index = "1";

    }
  }
};
</script>

<style>
</style>
