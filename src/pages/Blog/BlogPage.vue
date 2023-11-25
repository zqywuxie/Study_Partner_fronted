<template>
  <van-sticky>
    <van-nav-bar
        @click-left="onClickLeft"
        @click-right="showBottom=true"
    >
      <template #right>
        <van-icon class-prefix="my-icon" name="qita" color="#39a9ed"/>
      </template>
    </van-nav-bar>
  </van-sticky>

  <div v-if="images.length > 0">
    <div style="width: 100%; height: 2px; background-color: #ffffff"/>
    <van-swipe :autoplay="3000" lazy-render style="height: 250px">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" class="avatar" style="height: 250px; width: 100%; border-radius: 5px;" alt=""/>
      </van-swipe-item>
    </van-swipe>
  </div>

  <van-cell-group inset>
    <van-cell :title="blog.title" title-style="font-size: 22px; font-weight: bold; color: #333;"/>

    <van-cell center style="padding-right: 6px">
      <template #title>
        <span class="author-username" @click="toAuthor(author.id)">{{ author.username }}</span>
      </template>
      <template #icon>
        <van-image :src="author.avatarUrl" width="40" height="40" round class="author-avatar"
                   @click="toAuthor(author.id)"/>
      </template>
      <template #right-icon>
        <div v-if="author.id !== currentUser.id" class="follow-buttons">
          <van-button v-if="author.isFollow" type="danger" size="small" @click="followUser(author)">取消关注
          </van-button>
          <van-button v-else icon="plus" type="primary" size="small" @click="followUser(author)">关注</van-button>
        </div>
      </template>
    </van-cell>

    <van-cell :title="blog.content" style="word-wrap: break-word; position: relative;"/>
  </van-cell-group>

  <!-- 博文底部按钮 -->
  <!-- 放在合适的位置，比如整个页面的最右边 -->
  <div style="display: flex; align-items: center; justify-content: flex-end;">
    <van-icon name="smile-comment-o" size="20" style="margin-right: 5px; color: #999;" @click="toggleCommentInput">
      <span style="margin-left: 2px; font-size: 14px;">{{ blog.commentsNum }}</span>
    </van-icon>
    <van-icon v-if="!blog.isLike" name="thumb-circle-o" size="20" @click="likeBlog(blog)" style="color: #999;">
      <span style="margin-left: 2px; font-size: 14px;">{{ blog.likedNum }}</span>
    </van-icon>
    <van-icon v-else name="thumb-circle-o" color="red" size="20" @click="likeBlog(blog)"
              style="margin-right: 2px">
      <span style="margin-left: 2px; font-size: 14px;">{{ blog.likedNum }}</span>
    </van-icon>
  </div>
  <!-- 显示评论输入框 -->
  <div>


    <!-- 遮罩层和评论输入 -->
    <div v-if="showCommentInput" class="comment-overlay" @click="toggleCommentInput">
      <div class="comment-input-container">
        <van-field
            left-icon="chat-o"
            v-model="comment"
            :autosize="{ minHeight: 32 }"
            type="textarea"
            rows="1"
            placeholder="输入评论"
            :border="false"
            style="flex: 1; position: relative; padding-left: 16px; border-bottom: 1px solid #C1C1C1; padding-right: 2px;"
            @click.stop
            ref="commentInput"
        />

        <van-icon
            class-prefix="my-icon"
            name="shangchuan"
            size="40"
            color="#4387f6"
            @click="addComment"
        />
      </div>
    </div>
  </div>
  <van-divider/>
  <van-cell-group inset>
    <van-cell :title="`共 ${blog.commentsNum} 条评论`" title-style="color: #333; font-size: 16px; font-weight: bold;"/>
  </van-cell-group>
  <div class="line"/>

  <div style="padding-bottom: 80px">
    <comment-list :comment-list="commentList" @refresh="refresh"/>
  </div>


  <van-popup
      v-if="blog.userId === currentUser.id || currentUser.role === 1"
      v-model:show="showBottom"
      round
      position="bottom"
      :style="{ height: '88px' }"
  >
    <van-grid :border="false">
      <van-grid-item @click="copyUrl">
        <template #icon>
          <van-icon class-prefix="my-icon" name="lianjie" size="24"/>
        </template>
        <template #text>
          <span class="grid-font">复制链接</span>
        </template>
      </van-grid-item>
      <van-grid-item @click="updateBlog">
        <template #icon>
          <van-icon class-prefix="my-icon" name="tianxie" size="24"/>
        </template>
        <template #text>
          <span class="grid-font">编辑</span>
        </template>
      </van-grid-item>
      <van-grid-item @click="deleteBlog">
        <template #icon>
          <van-icon class-prefix="my-icon" name="shanchu" size="24"/>
        </template>
        <template #text>
          <span class="grid-font">删除</span>
        </template>
      </van-grid-item>
      <van-grid-item @click="report">
        <template #icon>
          <van-icon class-prefix="my-icon" name="jubao" size="24"/>
        </template>
        <template #text>
          <span class="grid-font">举报</span>
        </template>
      </van-grid-item>
    </van-grid>
  </van-popup>

  <van-popup
      v-else
      v-model:show="showBottom"
      round
      position="bottom"
      :style="{ height: '88px' }"
  >
    <van-grid :border="false" :column-num="2">
      <van-grid-item @click="copyUrl">
        <template #icon>
          <van-icon class-prefix="my-icon" name="lianjie" size="24"/>
        </template>
        <template #text>
          <span class="grid-font">复制链接</span>
        </template>
      </van-grid-item>
      <van-grid-item @click="report">
        <template #icon>
          <van-icon class-prefix="my-icon" name="jubao" size="24"/>
        </template>
        <template #text>
          <span class="grid-font">举报</span>
        </template>
      </van-grid-item>
    </van-grid>
  </van-popup>
</template>

<style scoped>

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

.comment-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; /* 添加淡入淡出的过渡效果 */
  z-index: 9999;
}

.comment-overlay.active {
  background-color: rgba(0, 0, 0, 0.5); /* 显示时的背景颜色 */
}


.comment-input-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 80%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
}

/* Add the following style to override the transparency in the van-field */
.comment-input-container .van-field {
  background-color: #ffffff !important; /* Use !important to ensure it overrides other styles */
}

/* 添加自定义样式 */
.author-username {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.author-avatar {
  margin-right: 10px;
}

.follow-buttons {
  display: flex;
  align-items: center;
}

.grid-font {
  font-size: 14px;
}

.line {
  border-bottom: 1px solid #ddd;
  margin: 10px 0;
}
</style>


<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../../plugins/MyAxios";
import CommentList from "../../components/CommentList.vue";
import {Dialog, Toast} from "vant";
import {getCurrentUser} from "../../service/user";

const showBottom = ref(false)
let router = useRouter();
const comment = ref("")
const showCommentInput = ref(false)
const commentInputRef = ref(null);
let emits = defineEmits(['refresh']);
const toAuthor = (id) => {
  setTimeout(() => {
    router.push({
      path: "/user/detail",
      query: {
        id: id
      }
    })
  }, 1000)

}

const toggleCommentInput = () => {
  showCommentInput.value = !showCommentInput.value;
}
const onClickLeft = () => {
  router.push("/")
};
const images = ref([])
let route = useRoute();
const blog = ref({});
const author = ref({})
const commentList = ref([])
const currentUser = ref({})
const listComments = async () => {
  let id = route.query.id;
  let commentRes = await myAxios.get("/comments?blogId=" + id);
  if (commentRes?.code === 0) {
    commentList.value = commentRes.data
  }
}
onMounted(async () => {
  currentUser.value = await getCurrentUser();
  let id = route.query.id;
  let res = await myAxios.get("/blog/" + id);
  if (res?.code === 0) {
    blog.value = res.data
    author.value = res.data.author
    if (res.data.images) {
      let imgStrs = res.data.images.split(",");
      imgStrs.forEach((imgstr) => {
        images.value.push(imgstr)
      })
    }
  }
  await listComments()
})


const likeBlog = async (blog) => {
  let res = await myAxios.put("/blog/like/" + blog.id);
  if (res?.code === 0) {
    let res_ = await myAxios.get("/blog/" + blog.id);
    if (res_?.code === 0) {
      blog.likedNum = res_.data.likedNum
      blog.isLike = res_.data.isLike
    }
  }
}
const addComment = async () => {
  if (comment.value === "") {
    Toast.fail("请输入评论内容")
  } else {
    let res = await myAxios.post("/comments/add", {
      blogId: blog.value.id,
      content: comment.value
    });
    if (res?.code === 0) {
      Toast.success("添加成功")
      setTimeout(async () => {
        await listComments()
      }, 500)
      blog.value.commentsNum++
    } else {
      Toast.fail("添加失败" + (res.message ? `,${res.message}` : ''))
    }


    comment.value = ""

    let id = route.query.id;
    let newBlogRes = await myAxios.get("/blog/" + id);
    if (newBlogRes?.data.code === 0) {
      blog.value.commentsNum = newBlogRes.data.data.commentsNum
    }
  }
}


const copyUrl = () => {

  // 获取当前页面的URL
  const currentUrl = window.location.href;

  // 创建一个临时的文本输入框
  const tempInput = document.createElement('input');
  tempInput.value = currentUrl;
  document.body.appendChild(tempInput);

  // 选择文本
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // 兼容移动端

  // 执行复制命令
  document.execCommand('copy');

  // 移除临时输入框
  document.body.removeChild(tempInput);

  // 可以在这里添加一些提示或反馈
  Toast.success("复制成功")
  showBottom.value = false
}
const report = () => {
  Toast.success("举报成功(虚假)")
  showBottom.value = false
}
const deleteBlog = async () => {
  Dialog.confirm({
    title: '确定要删除博文吗',
    message:
        '此操作无法撤回',
  })
      .then(async () => {
        let res = await myAxios.delete("/blog/" + blog.value.id);
        if (res?.data.code === 0) {
          await router.replace("/")
          Toast.success("删除成功")
        } else {
          Toast.fail("删除失败")
        }
      })
      .catch(() => {
        showBottom.value = false
      });
}
const updateBlog = () => {
  router.push({
    path: "/blog/edit",
    query: {
      id: blog.value.id,
      images: images.value,
      title: blog.value.title,
      content: blog.value.content
    }
  })
}
const followUser = async (author) => {
  let res = await myAxios.post("/follow/" + author.id);
  if (res?.data.code === 0) {
    let res_ = await myAxios.get("/user/" + author.id);
    if (res_.data.code === 0) {
      author.isFollow = res_.data.data.isFollow
    }
  }
}
const refresh = () => {
  location.reload();
}
</script>
