import Vue from 'vue'
// import axios from axios
declare module 'vue/types/vue'{
   interface Vue{
       $axios: any
   }
}