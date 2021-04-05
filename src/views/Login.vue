<template>
    <div>
        <ou-label>Email</ou-label>
        <ou-text-field v-model="email" placeholder="Email"/>
        <ou-label>Password</ou-label>
        <ou-text-field v-model="password" placeholder="Password" input-type="password"/>
        <ou-button type="primary" @click="login()">Login</ou-button>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
const Component = Vue.extend({
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        async login(){
            try{
            let res = await this.$axios.post('/login',{
                email: this.email,
                password: this.password
            })
            console.log(res)
            }catch(e){
                console.log(e)
            }
        }
    }
})
export default Component
</script>