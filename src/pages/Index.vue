<template>
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
const mockUser = ref({
  id: 5339,
  username: 'wuxie',
  userAccount: '123',
  profile: '无邪',
  gender: 0,
  phone: '123456789101',
  email: 'shayu-yusha@qq.com',
  planetCode: '931',
  avatarUrl: 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/shayu931/shayu.png',
  tags: ['java', 'emo', '打工中', 'emo', '打工中'],
  createTime: new Date(),
})
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
      Toast("请求成功")
      return response?.data?.records
    }).catch(function (error) {
      console.log("/user/recommend" + error)
      Toast("请求失败")
    })
  } else {
    userListData = await myAxios.get('/user/match', {
      params: {
        num: 10
      },
    }).then(function (response) {
      console.log("/user/match" + response)
      Toast("请求成功")
      return response?.data
    }).catch(function (error) {
      console.log("/user/match" + error)
      Toast("请求失败")
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