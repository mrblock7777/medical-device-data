<template>
  <div id="app" class="container mx-auto">
    <ou-button @click="logout()">Logout</ou-button>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods:{
    logout(): void{
      localStorage.removeItem('accessToken')
      this.$router.go(0)
    }
  }
})
</script>
<style>
body.ms-u-overflowHidden{
  overflow: auto;
}
</style>
