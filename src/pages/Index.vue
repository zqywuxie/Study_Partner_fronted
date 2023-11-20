<template>
  <van-notice-bar
      color="#1989fa"
      background="#ecf9ff"
      left-icon="volume-o"
      style="margin-bottom: 10px;margin-top: -10px"
      text="校园有着你朗朗书声，有着你写不完的试卷，有着你忘不掉的老师，有着你共同学习的同学，在这里你可以尽情发挥你最好的水平。在这里可以找到志同道合的校友奋笔直追！！"
  />
  <van-cell center title="匹配模式">
    <template #right-icon>
      <van-switch v-model="checked" size="24"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"></user-card-list>
  <van-empty v-if="!userList||userList.length<1" description="数据为空"/>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import myAxios from "../plugins/MyAxios.ts";
import {onMounted, ref, watchEffect} from "vue";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const checked = ref<boolean>(false);

const route = useRoute()
const {tags} = route.query;
const userList = ref([])
const loading = ref(true)
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
      // console.log("/user/recommend" + response)
      Toast.success("请求成功")
      console.log(response?.data?.records)
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