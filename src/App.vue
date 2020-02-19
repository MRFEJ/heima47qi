<template>
  <div>
    <!-- <router-link to="#">点我啊</router-link> -->
    <el-button @click="gologin">点我</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    gologin(){
      this.$router.push('/login')
    }
  },
};
</script>

<style>
</style>