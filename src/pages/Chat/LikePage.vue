<template>
  <!-- 头部信息，包括评论者头像和名字 -->
  <van-empty
      v-if="(!resList ||resList.length===0) && loading===false"
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      image-size="80"
      description="你还没有好友，快去认识新伙伴吧"
  />
  <van-cell-group v-for="comment in resList">
    <van-row class="header">
      <van-col span="4">
        <img class="avatar" :src="comment.fromUser.avatarUrl" alt="头像"/>
      </van-col>
      <van-col span="16">
        <div class="name">{{ comment.fromUser.username }}</div>
        <div class="info">{{ comment.comment.content }}</div>
      </van-col>
      <van-col span="4">
        <!-- 博文封面 -->
        <img class="cover-image" :src="comment.blog.coverImage" alt="博文封面"/>
      </van-col>
    </van-row>

    <!-- 评论内容 -->
    <div class="comment-content">
      <div class="line"></div>
      {{ comment.comment.content }}
    </div>
  </van-cell-group>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../../plugins/MyAxios";
import {MessageTypeEnum} from "../../enum/MessageTypeEnum";

const loading = ref(true)
const resList = ref([])
const data = new Date()
let route = useRoute();
// resList.value = commentList

onMounted(async () => {
  await myAxios.get("/message/read/"+MessageTypeEnum.BLOG_LIKE)
  await myAxios.get("/message/read/"+MessageTypeEnum.BLOG_COMMENT_LIKE)
  console.log(JSON.parse(route.query.likeList))
  resList.value = JSON.parse(route.query.likeList)
  loading.value = false
})
</script>

<style scoped>
.header {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.comment-content {
  margin-left: 60px;
  padding: 10px;
  font-size: 16px;
  color: #666; /* 设置评论内容的颜色为灰色，可以根据需要调整 */
  position: relative; /* 使用相对定位，以便后续绝对定位的竖线能够相对于评论内容定位 */
}

.line {
  position: absolute;
  left: -5px; /* 调整小竖线离评论内容的距离 */
  top: 0;
  width: 2px; /* 小竖线的宽度 */
  height: 100%; /* 小竖线的高度，与评论内容高度一致 */
  background-color: #ccc; /* 小竖线的颜色，可以根据需要调整 */
}

.avatar {
  width: 100%;
  height: 100%;
  margin-left: -10px;
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

.cover-image {
  width: 100%;
  border-radius: 8px;
}
</style>
