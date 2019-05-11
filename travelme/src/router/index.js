import Vue from 'vue'
import Router from 'vue-router'
import page from '@/components/page/page.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*', //若是其他路由没有找到，点击防止报错，直接跳转到系统首页
      redirect:'dashboard',
      meta:{title:'系统首页'},
      name:'dashboard'
    },
    {
      path: '/dashboard',
      component: page,
      meta:{title:'系统首页'},
      name:'dashboard'
    },
    {
      path:'/table',
      component:resolver=>require(['../components/page/pagetwo.vue'],resolver),
      meta:{title:'基础表格'},
      name: 'table'

    },
    {
      path:'/tabs',
      component:resolver=>require(['../components/page/pagethree.vue'],resolver),
      meta:{title:'tabs选项卡'},
      name: 'tabs'
    }
  ]
})
