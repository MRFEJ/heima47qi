<template>
    <router-view></router-view>
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