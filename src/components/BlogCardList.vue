<template>
  <van-card
      v-for="(item, index) in blogList"
      :desc="item.content"
      :title="item.title"
      :thumb="item.coverImage"
      @click="toBlog(item.id)"
      style="margin-bottom: 20px; border-radius: 16px;"
  >
    <template #bottom>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 16px; font-weight: bold; color: #333;">{{ item.author.username }}</span>
        </div>
        <van-image
            class="avatar"
            @click.stop="toUser(item.author.id)"
            :src="item.author.avatarUrl"
            style="width: 30px; height: 30px; border-radius: 50%; margin-left: 8px; overflow: hidden;"
        />
      </div>
    </template>
    <template #footer>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
        <div style="display: flex; align-items: center;">
          <van-icon name="smile-comment-o" size="14" color="#999" style="margin-right: 5px;">
            <span style="margin-left: 2px; color: #999;">{{ item.commentsNum }}</span>
          </van-icon>
          <van-icon name="thumb-circle-o" :color="item.isLike ? 'red' : 'blue'" size="14">
            <span style="margin-left: 2px; color: #999;">{{ item.likedNum }}</span>
          </van-icon>
        </div>
        <span style="color: #999; font-size: 12px;">{{ moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
    </template>
  </van-card>
</template>


<script setup lang="ts">
import {BlogType} from "../models/blog";
import {useRouter} from "vue-router";
import moment from "moment";

interface BlogCardListProps {
  blogList: BlogType[]
}

let props = defineProps<BlogCardListProps>();
let router = useRouter();


const toUser = (id: any) => {
  setTimeout(()=>{
    router.push({
      path: "/user/detail",
      query: {
        id: id
      }
    })
  },200)

}
const toBlog = async (blogId) => {
  await router.push({
    path: '/blog/details',
    query: {
      id: blogId
    }
  })
}
</script>

<style scoped>
:deep(.van-cell__label) {
  margin-top: 38px;
}

:deep(.van-cell) {
  padding-left: 0;
  padding-right: 0;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 8px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.avatar:hover {
  transform: scale(1.2); /* 可根据需要调整放大倍数 */
  cursor: pointer;
}
</style>
