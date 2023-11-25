<template>
  <van-cell-group v-for="comment in props.commentList" :border="false" style="margin-left: 5px;margin-right: 5px">
    <van-cell center :border="false" :title="comment.commentUser.username"
              :label="moment(comment.createTime).format('YYYY-MM-DD HH:mm:ss') ">
      <template #icon>
        <van-image
            round
            width="40"
            height="40"
            style="margin-right: 10px"
            :src="comment.commentUser.avatarUrl"
        />
      </template>
      <template #value>
        <van-icon v-if="!comment.isLiked" name="thumb-circle-o" size="15" @click="likeComment(comment)">
          {{ comment.likedNum }}
        </van-icon>
        <van-icon v-else name="thumb-circle-o" color="red" size="15" @click="likeComment(comment)">
          {{ comment.likedNum }}
        </van-icon>
        <van-icon v-if="String(currentUser.id)==comment.commentUser.id || currentUser.role===1" name="delete-o"
                  size="15" style="margin-left: 10px" @click="deleteComment(comment.id)"/>
      </template>
    </van-cell>
    <div style="display: block;width: 80%;word-wrap: break-word;margin-left: 55px">
      {{ comment.content }}
    </div>
  </van-cell-group>

</template>

<script setup lang="ts">
import {CommentType} from "../models/comment";
import myAxios from "../plugins/MyAxios";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user";
import {Dialog, Toast} from "vant";
import moment from "moment";

let emits = defineEmits(['refresh']);

interface BlogCommentsProps {
  commentList: CommentType[]
}

const currentUser = ref()
let props = defineProps<BlogCommentsProps>();
onMounted(async () => {
  currentUser.value = await getCurrentUser()
})
const likeComment = async (comment) => {
  let res = await myAxios.put("/comments/like/" + comment.id);
  if (res?.code === 0) {
    let res_ = await myAxios.get("/comments/" + comment.id);
    if (res_?.code === 0) {
      comment.likedNum = res_.data.likedNum
      comment.isLiked = res_.data.isLiked
    }
  }
}
const deleteComment = async (id) => {
  Dialog.confirm({
    title: '确定要删除评论吗',
    message:
        '此操作无法撤回',
  })
      .then(async () => {
        let res = await myAxios.delete("/comments/" + id);
        if (res?.code === 0) {
          Toast.success("删除成功")
          setTimeout(() => {
            emits("refresh")
          }, 300)
        } else {
          Toast.fail("删除失败" + (res.message ? `,${res.data.message}` : ''))
        }
      })
      .catch(() => {
      });
}
</script>

<style scoped>

</style>
