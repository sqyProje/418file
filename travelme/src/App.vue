<template>
  <div id="app">
    <HeaderTop></HeaderTop>
    <Slide></Slide>
    <div class="content-box" :class="{contentCollapse:collapse}">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../src/components/common/HelloWorld.vue'
  import Slide from '../src/components/common/slide.vue'
  import bus from '../src/components/common/bus'
export default {
  name: 'App',
  data(){
    return{
      collapse:false,
    }
  },
  created() {
    //控制菜单的展开和收缩
    bus.$on('collapse',msg=>{
      this.collapse = msg
    })
  },
  components:{
    HeaderTop,
    Slide
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.content-box
  position: absolute
  left: 234px
  top:60px
  bottom:0
  right:0
  padding-bottom 30px
  transition left 0.3s ease-in-out
  background #b3f3ed
  &.contentCollapse
    left:65px

</style>
