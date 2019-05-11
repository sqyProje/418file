<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active':isActive(item.path)}" :key="index">
        <router-link :to="item.path" class="tags-li-title">
          {{item.title}}
        </router-link>
        <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
      </li>

    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags" >
        <el-button type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command = 'all'>关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from "../common/bus"
export default {
  data(){
    return {
      tagsList:[],
      command:false
    }
  },
  methods:{

    isActive(path){
      return path === this.$route.fullPath
    },
    //关闭当前
    closeTags(index){
      //console.log(index);
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      }else{
        this.$router.push('/');
      }

    },
    //关闭全部标签
    closeAll(){
      this.tagsList=[]
      this.$router.push('/')
    },
    //关闭其他标签
    closeOther(){
      const curItem = this.tagsList.filter(item=>{
        return item.path === this.$route.fullPath
      })
      console.log(curItem)
      this.tagsList = curItem
    },
    // 设置标签
    setTags(route){
      //console.log(route,this.tagsList)
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      })
      if(!isExist){
        if(this.tagsList.length >= 8){
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[0].components.default.name
        })
      }
      bus.$emit('tags', this.tagsList);
    },
    handleTags(command){
      command === 'other' ? this.closeOther() : this.closeAll()
    }
  },
  computed:{
    showTags(){
      return this.tagsList.length > 0
    }
  },
  mounted(){
    console.log(this)

  },
  watch:{
    $route(newValue,oldValue){
      this.setTags(newValue)
    }
  },
  created() {
    this.setTags(this.$route);
    // 监听关闭当前页面的标签页
    bus.$on('close_current_tags', () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if(item.path === this.$route.fullPath){
          if(i < len - 1){
            this.$router.push(this.tagsList[i+1].path);
          }else if(i > 0){
            this.$router.push(this.tagsList[i-1].path);
          }else{
            this.$router.push('/');
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    })
  }
}

</script>
<style scope lang="stylus" rel="stylesheet/stylus">
  .tags
    height:32px;
    background:#fff;
    overflow: hidden
    padding-right:120px
    position:relative
    ul
      box-sizing :border-box
      width: 100%
      height :100%
      .tags-li
        float:left
        font-size:14px
        margin: 3px 5px 2px 3px
        border-radius 3px
        overflow hidden
        cursor pointer
        height: 24px
        line-height:24px;
        text-align center
        border:1px solid #e9eaec
        padding 0 5px 0 12px
        vertical-align middle
        transition: all 0.3d ease-in
        &.active
          background:#409eff
          border:1px solid #409eff
          a,i
            color:#fff

    .tags-close-box
      position:absolute
      right: 0
      top:0px
</style>
