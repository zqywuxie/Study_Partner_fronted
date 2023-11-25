<template>
  <user-card-list :user-list="userList" :loading="loading"></user-card-list>
  <van-empty v-if="!userList||userList.length<1" description="搜索结果为空"/>
</template>

<script setup>
import {useRoute} from "vue-router";
import myAxios from "../../plugins/MyAxios.ts";
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import qs from "qs"
import UserCardList from "../../components/UserCardList.vue";

const route = useRoute()
const {tags} = route.query;
const loading = ref(true)
// const mockUser = ref({
//   id: 5339,
//   username: 'wuxie',
//   userAccount: '123',
//   profile: '无邪',
//   gender: 0,
//   phone: '123456789101',
//   email: 'shayu-yusha@qq.com',
//   planetCode: '931',
//   avatarUrl: 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/shayu931/shayu.png',
//   tags: ['java', 'emo', '打工中', 'emo', '打工中'],
//   createTime: new Date(),
// })
const userList = ref([])
onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tags: tags
    },
    paramsSerializer: {
      serialize: params => qs.stringify(params, {indices: false})
    }
  }).then(function (response) {
    console.log("/user/search/tags" + response.data)
    Toast.success("请求成功")
    return response?.data
  }).catch(function (error) {
    console.log("/user/search/tags" + error)
    Toast.fail("请求失败")
  })
  console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      console.log(user)
      if (user) {
        user.tags = JSON.parse(user.tags)
      }
    })
  }
  userList.value = userListData
  loading.value = false
  // useList.value=userListData
})

</script>

<style scoped>

</style>