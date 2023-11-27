<template>
  <div>
    <van-empty
        v-if="(!resList || resList.length===0) && loading===false"
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80"
        description="你还没有好友，快去认识新伙伴吧"
    />
    <!-- 头部信息，包括评论者头像和名字 -->
    <van-cell-group v-for="comment in resList">
      <van-row class="header">
        <van-col span="4">
          <img class="avatar" :src="comment.fromUser.avatarUrl" alt="头像"/>
        </van-col>
        <van-col span="16">
          <div class="name">{{ comment.fromUser.username }}</div>
          <div class="info">{{ comment.fromUser.profile }}</div>
        </van-col>
        <van-col span="4">
          <!-- 博文封面 -->
          <van-button type="success" round class="custom-button">关注</van-button>
        </van-col>
      </van-row>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router"
import myAxios from "../../plugins/MyAxios";
import {MessageTypeEnum} from "../../enum/MessageTypeEnum";



const resList = ref([])
const data = new Date()
const loading = ref(true)
let route = useRoute();
onMounted(async () => {
  await myAxios.get("/message/read/"+MessageTypeEnum.FOLLOW_NOTIFICATIONS)
  console.log(JSON.parse(route.query.fansList))
  resList.value = JSON.parse(route.query.fansList)
  loading.value = false
})
</script>

<style scoped>
.header {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.avatar {
  margin-left: -10px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.name {
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
}

.info {
  font-size: 14px;
  color: #888;
}

</style>
