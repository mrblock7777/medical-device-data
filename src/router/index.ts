import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ListMedicalDevice from '../views/MedicalDevice/ListMedicalDevice.vue'
import AddMedicalDevice from '../views/MedicalDevice/AddMedicalDevice.vue'
import axios from 'axios'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      requiresGuest: true
    }
  },
  {
    path: '/medical_device',
    name: 'Medical Device List',
    component: ListMedicalDevice,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/medical_device/add',
    name: 'Add Device Model',
    component: AddMedicalDevice,
    meta:{
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  const isRequireAuth = to.matched.some(record => record.meta.requiresAuth)
  const isRequireGuest = to.matched.some(record => record.meta.requiresGuest)
  const accessToken = localStorage.getItem('accessToken')
  if(isRequireAuth){
    if(!accessToken){
      next({
        path: '/login'
      })
    }
    else{
      next()
    }
  }
  else if(isRequireGuest){
    if(accessToken){
      next({
        path:'/medical_device'
      })
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router
