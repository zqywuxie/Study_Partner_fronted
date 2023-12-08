<template>
  <div id="userPage">
    <template v-if="user">
      <van-space style="margin-left: 20px;margin-top: 15px">
        <van-image
            round
            width="80"
            height="80"
            class="avatar"
            :src="user?.avatarUrl"
            @click="toUserUpdatePage"

        />
        <div class="custom-cell" @click="toUserUpdatePage">
          <div class="username">{{ user.username }}</div>
          <div class="user-info">
            <span class="count-label" @click.stop="router.push('/user/follows')">关注: {{ user.follow }}</span>
            <span class="count-label" @click.stop="toLikePage">点赞: {{ user.likeCount }}</span>
            <span class="count-label" @click.stop="router.push('/user/fans')">粉丝: {{ user.fans }}</span>
          </div>
        </div>


      </van-space>
      <van-cell :value="user.profile" @click.stop="router.push('/user/update')" center is-link title="个人简介"/>
      <van-cell center style="margin-top: 15px">
        <template #title>
          <span style="margin-left: 20px">我的标签</span>
        </template>
        <template #value>
          <van-tag v-for="tag in tags" plain type="danger" style="margin-right: 8px;margin-top: 8px">
            {{ tag }}
          </van-tag>
        </template>
      </van-cell>
      <van-grid :border="false" style="padding: 10px">
        <!--        todo 自定义图标-->
        <van-grid-item text="创建的队伍" to="/user/createTeam">
          <template #icon>
            <van-icon class-prefix="my-icon" name="wochuangjiande" size="23" style="margin-bottom: 8px;color: #0048ff"/>
          </template>
        </van-grid-item>
        <van-grid-item text="加入的队伍" to="/user/joinTeam">
          <template #icon>
            <van-icon class-prefix="my-icon" name="jiarubanji" size="23" style="margin-bottom: 8px;color: #11d35d"/>
          </template>
        </van-grid-item>
        <van-grid-item text="我的博文" to="/user/blog">
          <template #icon>
            <van-icon class-prefix="my-icon" name="wofadetiezi" size="23" style="margin-bottom: 8px;color: #10d1d9"/>
          </template>
        </van-grid-item>
        <van-grid-item text="好友列表" to="/friend/list">
          <template #icon>
            <van-icon name="contact" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>
          </template>
        </van-grid-item>
        <van-grid-item text="关注列表" to="/user/follows">
          <template #icon>
            <van-icon name="friends" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>
          </template>
        </van-grid-item>

        <!--        <van-grid-item text="粉丝列表" to="/my/fans">-->
        <!--          <template #icon>-->
        <!--            <van-icon class-prefix="my-icon" name="wodefensi" color="#65cdf2" size="23"/>-->
        <!--          </template>-->
        <!--        </van-grid-item>-->
        <!--        <van-grid-item text="用户签到" @click="userSign(user.id)">-->
        <!--          <template #icon>-->
        <!--            <van-icon name="bulb-o" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>-->
        <!--          </template>-->
        <!--        </van-grid-item>-->
        <!--        <van-grid-item text="历史签到" @click="toUserSignPage">-->
        <!--          <template #icon>-->
        <!--            <van-icon name="records" size="23" style="margin-bottom: 8px;color: #0c9dea"/>-->
        <!--          </template>-->
        <!--        </van-grid-item>-->
        <!--        <van-grid-item text="联系作者" @click="customerService">-->
        <!--          <template #icon>-->
        <!--            <van-icon class-prefix="my-icon" name="fankui" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>-->
        <!--          </template>-->
        <!--        </van-grid-item>-->
      </van-grid>
      <van-cell title="我的信息" style="padding: 20px" is-link @click="toUserUpdatePage" :center="true">
        <template #icon>
          <van-icon name="setting-o" size="20" style="margin-right: 5px" color="#1989fa"/>
        </template>
      </van-cell>
      <div style="margin: 16px;">
        <van-button style="background-color:#f3f0f0 ;margin-left: 60px;margin-top: 10px;width: 220px; font-size: 16px"
                    round
                    type="default" native-type="submit"
                    @click="logout">
          退 出
        </van-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {nextTick, onMounted, ref, watch} from "vue";
import myAxios from "../../plugins/MyAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../../service/user";
import {MessageTypeEnum} from "../../enum/MessageTypeEnum";

const router = useRouter()
const user = ref([])
const route = useRoute()
const tags = ref([])
let likeList = []
watch(route, (to, from) => {
  router.go(0)
})

const toLikePage = async () => {
  let blog_like_list = await myAxios.get("/message/get/" + MessageTypeEnum.BLOG_LIKE)

  let blog_comment_like_list = await myAxios.get("/message/get/" + MessageTypeEnum.BLOG_COMMENT_LIKE)
  likeList = blog_comment_like_list.data.concat(blog_like_list.data)
  await router.push({
    path: "/message/like",
    query: {
      likeList: JSON.stringify(likeList),
    }
  })
}
const toUserUpdatePage = () => {
  setTimeout(() => {
    router.push("/user/update")
  }, 500)
}
const logout = () => {
  const result = myAxios.post("/user/outLogin")
      .then((res) => {
        if (res?.data === 1 && res?.code === 0) {
          Toast("退出成功")
          refresh();
        } else {
          Toast("退出失败")
        }
      })
}
onMounted(async () => {
  const result = await getCurrentUser()

  //todo 数据没更新??
  if (result) {
    console.log(result.tags)
    // const tags = JSON.parse(result.tags)
    tags.value = JSON.parse(result.tags)
    user.value = result
    Toast("获得用户信息成功")
  } else {
    Toast("获得用户信息失败")
  }
  await fetchFollowersCount();
  await fetchLikeCount();
  await nextTick()
})

const fetchFollowersCount = async () => {
  const fans = await myAxios.get("/follow/fansCount");
  const myFollow = await myAxios.get("/follow/myCount");
  console.log(myFollow)
  user.value.fans = fans.data;
  user.value.follow = myFollow.data;
  // You may want to perform additional logic or error handling here
};

const fetchLikeCount = async () => {
  const likeCount = await myAxios.get("/like/count");
  user.value.likeCount = likeCount.data;
  // Additional logic or error handling can be added here
};
const refresh = () => {
  location.reload();
}
</script>

<style scoped>
.username {
  font-size: 18px; /* Adjust font size as needed */
  font-weight: bold; /* Add bold font style if desired */
  color: #333; /* Specify the desired text color */
  margin-bottom: 5px; /* Add margin for spacing */
}

.custom-cell {
  text-align: center;
}

.username {
  margin-bottom: 5px; /* 调整名字与下方的间距 */
}

.user-info {
  margin-top: 10px;
  cursor: pointer;
  color: #007bff;
}

.count-label {
  margin-top: 10px;
  cursor: pointer;
  color: #007bff;
}

.count-label:hover {
  color: #0056b3;
}


#userPage {
  margin-top: -20px;
}

:deep(.van-grid-item__text) {
  font-size: 12px;
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