<template>
  <div>
    <van-empty
        v-if="(!resList ||resList.length===0) && loading===false"
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
          <div class="info">{{ moment(comment.comment.createTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </van-col>
        <van-col span="4">
          <!-- 博文封面 -->
          <img class="cover-image" :src="comment.blog.coverImage" alt="博文封面"/>
        </van-col>
      </van-row>

      <!-- 评论内容 -->


      <div class="comment-content">
        评论：{{ comment.comment.content }}
      </div>

      <!-- 按钮区域，包括评论和点赞按钮 -->
      <van-row class="buttons">
        <van-col span="12">
          <van-icon name="chat-o" @click="handleComment"/>
          <span class="button-text">评论</span>
        </van-col>
        <van-col span="12">
          <van-icon name="like-o" @click="handleLike"/>
          <span class="button-text">点赞</span>
        </van-col>
      </van-row>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import moment from "moment";
import {MessageTypeEnum} from "../../enum/MessageTypeEnum";
import myAxios from "../../plugins/MyAxios";

const resList = ref([])
const data = new Date()
const loading = ref(true)
let route = useRoute();

onMounted(async () => {
  console.log(JSON.parse(route.query.commentList))
  await myAxios.get("/message/read/" + MessageTypeEnum.COMMENT_ADD)
  resList.value = JSON.parse(route.query.commentList)
  loading.value = false
})
</script>

<style scoped>
.header {
  padding: 10px;
  border-bottom: 1px solid #eee;
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

.comment-content {
  margin-left: 60px;
  padding: 15px;
  font-size: 16px;
}

.buttons {
  margin-top: 15px;
  text-align: center;
}


.button-text {
  font-size: 14px;
}

.cover-image {
  width: 100%;
  border-radius: 8px;
}
</style>
