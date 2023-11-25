<template>
  <div>
    <!-- 头部信息，包括评论者头像和名字 -->
    <van-cell-group v-for="comment in props.commentList">
      <van-row class="header">
        <van-col span="4">
          <img class="avatar" :src="comment.commenter.avatarUrl" alt="头像"/>
        </van-col>
        <van-col span="16">
          <div class="name">{{ comment.commenter.username }}</div>
          <div class="info">{{ comment.replyInfo }}</div>
        </van-col>
        <van-col span="4">
          <!-- 博文封面 -->
          <img class="cover-image" :src="comment.blogCover" alt="博文封面"/>
        </van-col>
      </van-row>

      <!-- 评论内容 -->
      <div class="comment-content">
        <div class="line"></div>
        {{ comment.content }}
      </div>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {NewComment} from "../models/NewComment";


interface BlogCommentsProps {
  commentList: NewComment[]
}

let props = defineProps<BlogCommentsProps>();

// const commenter = {
//   avatar: 'https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/19/QQ图片20230807232937.jpg',
//   name: '评论者姓名',
// };
//
// const comment = {
//   replyInfo: '回复了我的评论 • 发布时间',
//   content: '这是一条新评论的内容。',
//   blogCover: 'https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/19/QQ图片20230807232937.jpg',
// };

const handleComment = () => {
  // 处理评论按钮点击事件
  console.log('点击了评论按钮');
};

const handleLike = () => {
  // 处理点赞按钮点击事件
  console.log('点击了点赞按钮');
};
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
