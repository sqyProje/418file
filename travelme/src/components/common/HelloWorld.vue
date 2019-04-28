<template>
  <el-header class="header">
    <div class="leftBody">
     后台管理系统
      <i class="el-icon-menu" @click="collapseChage"></i>
    </div>
    <div class="rightBody">
      <div class="rightlist">
        <el-tooltip class="item" effect="dark" content="消息" placement="bottom">
          <i class="el-icon-chat-dot-round"></i>
        </el-tooltip>
      </div>
      <div class="rightlist" @click="fullScreen">
        <el-tooltip class="item" effect="dark" :content='fullscreen?`取消全屏`:`全屏`' placement="bottom">
          <i class="el-icon-data-board"></i>
        </el-tooltip>

      </div>
      <el-dropdown class="user-name" >
        <span class="el-dropdown-link">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
          <el-dropdown-item>注册</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>

</template>

<script type="text/ecmascript-6">
import ElHeader from "../../../node_modules/element-ui/packages/header/src/main.vue"
import bus from '../common/bus.js'
export default {
  data() {
    return {
      collapse:false,
      fullscreen:false
    }
  },
  components: {ElHeader},
  methods:{
    collapseChage() {
      this.collapse= !this.collapse
      bus.$emit('collapse',this.collapse)
    },
    //全屏
    fullScreen(){
      let documentElement= document.documentElement;
      console.log(documentElement);
      if(this.fullscreen){
        if(document.exitFullscreen()){
          document.exitFullscreen()
        }else if(document.webkitCancelFullScreen){
          document.webkitCancelFullScreen()
        }else if(document.mozCancelFullScreen){
          document.mozCancelFullScreen()
        }else if(document.msExitFullScreen){
          document.msExitFullScreen()
        }
      }else{
        if(documentElement.requestFullscreen){
          documentElement.requestFullscreen()
        }else if(documentElement.webkitRequestFullScreen){
          documentElement.webkitRequestFullScreen()
        }else if(documentElement.mozRequestFullScreen){
          documentElement.mozRequestFullScreen()
        }else if(documentElement.msRequestFullScreen){
          //ie 11
          documentElement.msRequestFullScreen()
        }
      }

      this.fullscreen = !this.fullscreen
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus" >
  .header
    width 100%;
    color #fff;
    line-height 60px
    background #2b3643;
    .leftBody
      float left
      font-size 26px
      .el-icon-menu
        cursor pointer
    .rightBody
      float right;
      .rightlist
        display inline-block
        margin-right:20px
        i
          font-size 18px
      .user-name
        &.el-dropdown
          color: #fff

</style>
