import Vue from 'vue'
import Router from 'vue-router'
import page from '@/components/page/page.vue'
import pagetwo from '@/components/page/pagetwo.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'dashboard'
    },
    {
      path: '/dashboard',
      name: 'page',
      component: page
    },
    {
      path:'/table',
      component:resolver=>require(['../components/page/pagetwo.vue'],resolver),
      meta:{title:'系统首页'}
    }
  ]
})
