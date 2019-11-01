<template>
  <div>
    son1---{{toson1}}----{{string}}

    <ul style="border:1px solid red;height: 100px;"  v-show="flag">
      <li>假设以下是个列表</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <div style="border:1px solid red;height: 100px" v-show="!flag">初始渲染内容
      <button @click="changeData">按钮</button>
      <div>
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      msg: 'hello vue'
    };
  },
  props: {
    toson1: "",
    all: Object,
    string: String
  },
  mounted() {

  },
  updated() {
    console.log('updated')
  },
  methods: {
    changeFlag() {
      this.flag = !this.flag
    },
    changeData() {
      this.msg = 'hello world'
      this.msg = 'hello javascript'
    }
  }
};
</script>

<style>
</style>
