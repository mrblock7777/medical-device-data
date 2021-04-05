<template>
    <div>
        <ou-label>Username</ou-label>
        <ou-text-field v-model="username" placeholder="Username"/>
        <ou-label>Password</ou-label>
        <ou-text-field v-model="password" placeholder="Password" type="password"/>
    </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator'
export default class Login extends Vue{
    private username:string = ''
    private password:string = ''
}
</script>