<template>
    <nav class="bg-green-800 px-4 py-4">
        <div class="text-right">
            <a href="#" class="text-white" @click="logout()">Logout</a>
        </div>
    </nav>
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