<template>
  <div id="app">
    <CustomNavbar v-if="isLoggedIn"/>
    <div class="container mx-auto">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CustomNavbar from "@/components/CustomNavbar.vue";
export default Vue.extend({
  data(){
    return{
      isLoggedIn: false
    }
  },
  components: {
    CustomNavbar,
  },
  beforeMount(){
    this.isLoggedIn = localStorage.getItem('accessToken') ? true : false
  }
});
</script>
<style>
body.ms-u-overflowHidden {
  overflow: auto;
}
</style>
