<template>
  <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="volume-o"
      style="margin-bottom: 10px;margin-top: -10px"
      text="在这个校园里，我们不仅有共同学习的同学，更有志同道合的伙伴。让我们一起努力，共同追求梦想，创造更美好的未来！"
  />

  <van-tabs v-model:active="active" @change="changeTab">
    <van-tab title="🤩伙伴匹配">
      <van-cell center title="匹配模式">
        <template #right-icon>
          <van-switch v-model="checked" size="24"/>
        </template>
      </van-cell>
      <user-card-list :user-list="userList" :loading="loading"></user-card-list>
      <van-empty v-if="!userList||userList.length<1" description="数据为空"/>
    </van-tab>
    <van-tab title="🏠博客广场">
      <blog-card-list :loading="loading" :blog-list="blogList"/>
      <van-empty v-if="!userList||userList.length<1" description="数据为空"/>
    </van-tab>
  </van-tabs>


</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import myAxios from "../plugins/MyAxios";
import {onMounted, ref, watchEffect} from "vue";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import BlogCardList from "../components/BlogCardList.vue";

const checked = ref<boolean>(false);

const active = ref(0)
const route = useRoute()
const {tags} = route.query;
const userList = ref([])
const blogList = ref([])
const loading = ref(true)

const changeTab = async (name) => {
  if (name === 1) {
    const res = await myAxios.get("/blog/list", {
      params: {
        currentPage: 1
      }
    }).then(function (response) {
      Toast.success("博客信息加载成功")
      return response?.data?.records
    }).catch(function (error) {
      console.log("/blog/list:" + error)
    })
    blogList.value = res
  }
}
const loadData = async () => {
  loading.value = true
  let userListData;
  if (!checked.value) {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 5,
        pageNum: 1
      },
    }).then(function (response) {
      Toast.success("请求成功")
      return response?.data?.records
    }).catch(function (error) {
      console.log("/user/recommend" + error)
      Toast.fail("请求失败")
    })
  } else {
    userListData = await myAxios.get('/user/match', {
      params: {
        num: 10
      },
    }).then(function (response) {
      console.log("/user/match" + response)
      Toast.success("请求成功")
      return response?.data
    }).catch(function (error) {
      console.log("/user/match" + error)
      Toast.fail("请求失败")
    })

  }
  if (userListData) {
    userListData.forEach(user => {
      if (user) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData
  }
  loading.value = false
}
watchEffect(() => {
  loadData();
})
</script>

<style scoped>

</style>