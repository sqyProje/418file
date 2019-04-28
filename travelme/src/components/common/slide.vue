<template>
<div class="slideBody">
    <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      background-color="#364150"
      text-color="#fff"
      active-text-color="#7cb5ec"
      unique-opened
      router
    >
      <template v-for="itemData in slideData">
        <template v-if="itemData.subs">
          <el-submenu :index="itemData.index" :key="itemData.index">
            <template slot="title">
              <i :class="itemData.icon"></i>
              <span slot="title">{{itemData.title}}</span>
            </template>
            <template v-for="itemsub in itemData.subs">
              <el-submenu v-if="itemsub.subs"  :index="itemsub.index" :key="itemsub.index">
                <template slot="title">{{itemsub.title}}</template>
                <el-menu-item v-for="(threeItem,i) in itemsub.subs" :index="threeItem.index" :key="i">
                  {{threeItem.title}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="itemsub.index" :key="itemsub.index">
                <span slot="title">{{itemsub.title}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="itemData.index" :key="itemData.index">
            <i :class="itemData.icon"></i>
            <span slot="title">{{itemData.title}}</span>
          </el-menu-item>
        </template>

      </template>
    </el-menu>
</div>

</template>

<script type="text/ecmascript-6">
  import bus from '../common/bus.js'
  export default {
    data() {
      return{
        collapse:false,
        slideData:[
          {
            icon: 'el-icon-document',
            index: 'dashboard',
            title: '系统首页'
          },
          {
            icon: 'el-icon-s-open',
            index: 'table',
            title: '基础表格'
          },
          {
            icon: 'el-icon-eleme',
            index: 'tabs',
            title: 'tab选项卡'
          },
          {
            icon: 'el-icon-goods',
            index: '3',
            title: '表单相关',
            subs: [
              {
                index: 'form',
                title: '基本表单'
              },
              {
                index: '3-2',
                title: '三级菜单',
                subs: [
                  {
                    index: 'editor',
                    title: '富文本编辑器'
                  },
                  {
                    index: 'markdown',
                    title: 'markdown编辑器'
                  },
                ]
              },
              {
                index: 'upload',
                title: '文件上传'
              }
            ]
          },
          {
            icon: 'el-icon-folder',
            index: 'icon',
            title: '自定义图标'
          },
          {
            icon: 'el-icon-document',
            index: 'charts',
            title: 'schart图表'
          },
          {
            icon: 'el-icon-document-copy',
            index: '6',
            title: '拖拽组件',
            subs: [
              {
                index: 'drag',
                title: '拖拽列表',
              },
              {
                index: 'dialog',
                title: '拖拽弹框',
              }
            ]
          },
          {
            icon: 'el-icon-download',
            index: 'i18n',
            title: '国际化功能'
          },
          {
            icon: 'el-icon-tickets',
            index: '7',
            title: '错误处理',
            subs: [
              {
                index: 'permission',
                title: '权限测试'
              },
              {
                index: '404',
                title: '404页面'
              }
            ]
          }
        ]
      }
    },
    computed:{
      onRoutes(){
        return this.$route.path.replace('/','')
      }
    },
    created() {
      //控制菜单的展开和收缩
      bus.$on('collapse',msg=>{
        this.collapse = msg
      })
    }

  }

</script>


<style scope lang="stylus" rel="stylesheet/stylus">
  .slideBody
    background #364150
    text-align:left
    position absolute
    left:0
    top: 60px
    bottom: 0
    overflow-y auto
    .el-menu-vertical-demo:not(.el-menu--collapse)
      width:234px
    .el-menu{
      border-right:none
    }
</style>
