<template>
  <div id="app">
    <HeaderTop></HeaderTop>
    <Slide></Slide>
    <div class="content-box" :class="{contentCollapse:collapse}">
      <Tags></Tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../src/components/common/HelloWorld.vue'
  import Slide from '../src/components/common/slide.vue'
  import Tags from '../src/components/common/tags.vue'
  import bus from '../src/components/common/bus'
export default {
  name: 'App',
  data(){
    return{
      collapse:false,
      tagsList:[]
    }
  },
  created() {
    //控制菜单的展开和收缩
    bus.$on('collapse',msg=>{
    //  console.log(msg)
      this.collapse = msg
    });
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      console.log(msg)
      let arr = [];
      for(let i = 0, len = msg.length; i < len; i ++){
        // 提取组件名存到tagsList中，通过include匹配
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    })
  },
  components:{
    HeaderTop,
    Slide,
    Tags
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
  background #f1f1f1
  &.contentCollapse
    left:65px

</style>
