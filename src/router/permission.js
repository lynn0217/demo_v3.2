import router from "./index.js";
import store from '@/store'

const whiteList = ['/login']
router.beforeEach((to,from,next)=>{
  if(store.getters.token) {
    if(to.path === '/login'){
      next('/')
    }else {
      next()
    }
  }else {
      if(whiteList.includes(to.path)){
        next()
      }else {
        next('/login')
      }
  }
})