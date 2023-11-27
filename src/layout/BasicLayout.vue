<template>
  <div class="BasicLayout">
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
    <van-tabbar route @change="onChange" border="">
      <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>


      <van-tabbar-item to="/team" icon="search" name="group">队伍页</van-tabbar-item>
      <van-tabbar-item replace class="van-tabbar-addBlog" @click="EditBlog('/blog/edit',2)">
        <van-icon name="add-o" size="40" class="add-blog-btn"/>
      </van-tabbar-item>
      <van-tabbar-item to="/message" icon="search" name="message">消息</van-tabbar-item>

      <van-tabbar-item to="/user" icon="friends-o" name="user">用户页</van-tabbar-item>
    </van-tabbar>
    <!--    <Footer></Footer>-->

  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

import {Dialog, Toast} from "vant";
import {useRoute, useRouter} from "vue-router";
import routes from "../config/router";
import Footer from "../components/CopyRight.vue";
import {getCurrentUser} from "../service/user";

const router = useRouter()
const route = useRoute()
const DEFAULT_TITLE = "伙伴匹配"
const title = ref(DEFAULT_TITLE)
const onClickLeft =  () => {
  // const currentPath = route.path;
  //
  // if (currentPath.includes("/message")) {
  //   router.push("/message");
  // } else if (currentPath !== '/') {
  //   router.go(-1);
  // }
 router.go(-1)
};

const onClickRight = () => {
  router.push('/search')
}

const EditBlog = async (to, index) => {
  let user = await getCurrentUser();
  if (!user) {
    Dialog.alert({
      message:
          "该功能需要登陆后使用,是否登录",
      confirmButtonText: "去登录"
    })
        .then(() => {
          Toast.fail("未登录")
          router.replace("/user/login")
        })
        .catch(() => {
        });
  } else {
    await router.push(to)
    if (active.value === 'message') {
      let message = document.getElementsByClassName("message")
      message.item(0).style.color = '#007eff'
    }
  }
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