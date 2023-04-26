import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: ()=>import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Dashbord',
    component: Layout,
    redirect:'/dashbord',
    children:[
      {
        path:'dashbord',
        name:'MyDashbord',
        component:()=>import('../views/HomeView')
      }
    ]
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
