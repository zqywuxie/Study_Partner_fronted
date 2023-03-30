<template>
  <van-nav-bar
      :title=title
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>

  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="group">队伍页</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">用户页</van-tabbar-item>
  </van-tabbar>


</template>

<script setup lang="ts">
import {ref} from "vue";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import routes from "../config/router";

const router = useRouter()
const DEFAULT_TITLE = "伙伴匹配"
const title = ref(DEFAULT_TITLE)
const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  router.push('/search')
}

const active = ref("index");
// const onChange = (index) => Toast(`标签 ${index}`);

router.beforeEach((to, from) => {
  const toPath = to.path
  const route = routes.find((route) => {
    return route.path == toPath
  })
  title.value = route?.title ?? DEFAULT_TITLE

})
</script>
<style scoped>
#content {
  padding-bottom: 50px;
}
</style>