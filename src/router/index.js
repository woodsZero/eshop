import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/login'
import Register from '@/components/register'
import Index from '@/components/index'
import Home from '@/components/pages/home'
import Sort from '@/components/pages/sort'
import shopCar from '@/components/pages/shopCar'
import Mine from '@/components/pages/mine'
import goodsDetail from '@/components/goodsDetail'

Vue.use(Router)

const router = new Router({
  mode:'history',
  scrollBehavior(to,from,savedPosition){
    console.log(to,'tooooooooo')
    console.log(from,'frommmmmmmmm')
    console.log(savedPosition,'saveeeeeeeeee')
    if(savedPosition){
      return savedPosition
    }else{
      return{
        x:0,
        y:0
      }
    }
  },
  routes: [
    {
      path: '/login',
      component: LogIn
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/index',
      component:Index,
      children:[
        {
          path:'/home',
          component:Home
        },
        {
          path:'/sort',
          component:Sort
        },
        {
          path:'/shopCar',
          component:shopCar
        },
        {
          path:'/mine',
          component:Mine
        },
        {
          path:'',
          redirect:'/home'
        }
      ]
    },
    {
      path:'/goodsDetail',
      component:goodsDetail
    },
    {
      path:'*',
      redirect:'/home'
    }
  ]
})
export default router