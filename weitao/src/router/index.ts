import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Cookies from 'js-cookie'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path:'/home',
    redirect:'/welcome',
    component: () => import('../components/Home.vue'),
    children:[
      {
        path:'/welcome',
        name:'welcome',
        component:() => import('../components/Welcome.vue')
      },
      {
        path:'/user',
        name:'user',
        component:() => import('../components/User/user.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode:"history",
  routes
})

export default router

// 导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){
    next()
  } else{
    if(Cookies.get("token")){
      next()
    }else{
      next('/login')
    }
  }
})
