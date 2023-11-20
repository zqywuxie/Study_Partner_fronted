<template>
  <van-card
      v-for="user in userList"
      :desc=user.profile
      :title="`${user.username}(${user.id})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList||userList.length<1" description="搜索结果为空"/>
</template>

<script setup>
import {useRoute} from "vue-router";
import myAxios from "../../plugins/MyAxios.ts";
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import qs from "qs"

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
onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tags: tags
    },
    paramsSerializer: {
      serialize: params => qs.stringify(params, {indices: false})
    }
  }).then(function (response) {
    console.log("/user/search/tags" + response)
    Toast.success("请求成功")
    return response?.data
  }).catch(function (error) {
    console.log("/user/search/tags" + error)
    Toast.fail("请求失败")
  })
  if (userListData) {
    userListData.forEach(user => {
      if (user) {
        user.data.tags = JSON.parse(user.data.tags)
      }
    })
  }
  userList.value = userListData.map(function (item) {
    return item.data
  })
  // useList.value=userListData
})

</script>

<style scoped>

</style>