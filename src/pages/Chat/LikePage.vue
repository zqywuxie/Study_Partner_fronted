<template>
  <div>
    <!-- 头部信息，包括评论者头像和名字 -->
    <new-like-list :comment-list="resList"/>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import NewCommentList from "../../components/NewCommentList.vue";
import NewLikeList from "../../components/NewLikeList.vue";

const commenter = {
  avatar: 'https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/19/QQ图片20230807232937.jpg',
  name: '评论者姓名',
};

const resList = ref([])
const data = new Date()
const commentList = [
  {
    commenter: {
      avatarUrl: 'https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/19/QQ图片20230807232937.jpg',
      username: '评论者姓名1',
    },
    replyInfo: '回复了我的评论1' + data,
    content: '这是一条新评论的内容1。',
    blogCover: 'https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/19/QQ图片20230807232937.jpg',
  },
  {
    commenter: {
      avatarUrl: 'https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/19/QQ图片20230807232937.jpg',
      username: '评论者姓名2',
    },
    replyInfo: '回复了我的评论2' + data,
    content: '这是一条新评论的内容2。',
    blogCover: 'https://wuxie-image.oss-cn-chengdu.aliyuncs.com/2023/09/19/QQ图片20230807232937.jpg',
  },
  // 添加更多的评论对象...
];

resList.value = commentList

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

.avatar {
  width: 100%;
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
  padding: 15px;
  font-size: 16px;
}

.buttons {
  margin-top: 15px;
  text-align: center;
}

.van-icon {
  font-size: 20px;
  margin-right: 5px;
}

.button-text {
  font-size: 14px;
}

.cover-image {
  width: 100%;
  border-radius: 8px;
}
</style>
