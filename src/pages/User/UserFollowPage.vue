<template>
  <van-empty
      v-if="(!userList || userList.length===0) && loading===false"
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      image-size="80"
      description="您暂无关注的用户"
  />
  <van-loading vertical v-if="loading">
    <template #icon>
      <van-icon name="star-o" size="30"/>
    </template>
    加载中...
  </van-loading>
  <user-card-list :user-list="userList"/>
</template>

<script setup lang="ts">
import UserCardList from "../../components/UserCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/MyAxios";

const loading = ref(true)
const userList = ref([])
onMounted(async () => {
  let res = await myAxios.get("/follow/my");
  if (res?.data.code === 0) {
    res.data.data.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = res.data.data
  }
  loading.value = false
})
</script>

<style scoped>

</style>
