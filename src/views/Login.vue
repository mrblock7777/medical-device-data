<template>
  <div class="flex flex-col items-center justify-center my-auto h-screen">
    <div class="login-form border-2 p-20">
        <p class="text-3xl my-4">Medical Device Manager</p>
      <ou-text-field v-model="email" placeholder="Email" label="Email" />
      <ou-text-field
        v-model="password"
        placeholder="Password"
        label="Password"
        input-type="password"
      />
      <ou-button type="primary" @click="login()">
        <span v-show="!isLoading">Login</span>
        <ou-spinner v-show="isLoading" />
      </ou-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    async login(): Promise<void> {
      try {
        this.isLoading = true;
        let res = await this.$axios.post("/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("accessToken", res.data.access_token);
        this.$router.go(0);
      } catch (e) {
        this.isLoading = false;
        console.log(e);
      }
    },
  },
});
</script>