import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/Home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../pages/Login")
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../components/Tabbar/News')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../components/Tabbar/Mine')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../components/Tabbar/Order')
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('../pages/Booking')
  },
  {
    path: '/detailsPage',
    name: 'DetailsPage',
    component: () => import('../pages/Detailspage')
  },
  {
    path: "/modifyUserInf",
    name: 'ModifyUserInf',
    component: () => import('../pages/ModifyUserInf')
  },
  {
    path: "/face",
    name: 'Face',
    component: () => import('../pages/Face')
  },
  {
    path: "/collect",
    name: 'Collect',
    component: () => import('../pages/Collect')
  },
  {
    path: "/identity",
    name: 'Identity',
    component: () => import('../pages/Identity')
  },
  {
    path: "/conService",
    name: 'ConService',
    component: () => import('../pages/ConService')
  }
]

const router = new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location,onResolve,onReject) {
  if(onResolve || onReject) return originalPush.call(this,location,onResolve,onReject)
  return originalPush.call(this,location).catch(err => err)
}

//挂载路由导航守卫
// router.beforeEach((to,from,next) => {
//   //to: 将要访问
//   //from: 从哪访问
//   //next: 接着干 next(url) 重定向到url上 next() 继续访问 to路径
//   if(to.path == '/login') return next();
//   //获取user
//   const userFlag = window.sessionStorage.getItem("user"); //取出当前用户
//   if(!userFlag) return next("/login"); //无值,返回登陆页
//   next();
// })
export default router
