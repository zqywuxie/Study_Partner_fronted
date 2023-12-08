<template>
  <div id="messagePage" style="margin-top: 1px">
    <van-grid :border="false">
      <van-grid-item v-if="commentNum === 0" icon="comment" icon-color="#767ffe" text="评论" @click="toCommentPage"/>
      <van-grid-item v-else icon="comment" :badge="commentNum" icon-color="#767ffe" text="评论" @click="toCommentPage"/>

      <van-grid-item v-if="likeNum===0" icon="good-job" icon-color="#639efc" text="赞" @click="toLikePage"/>
      <van-grid-item v-else icon="good-job" icon-color="#639efc" text="赞" :badge="likeNum" @click="toLikePage"/>

      <van-grid-item icon="friends" v-if="friendApplication === 0" icon-color="#a778fc" text="新朋友"
                     @click="toApplicationPage"/>
      <van-grid-item icon="friends" v-else icon-color="#a778fc" text="新朋友" @click="toApplicationPage"
                     :badge="friendApplication"/>


      <van-grid-item @click="toFansPage" v-if="fansNum===0">
        <template #icon>
          <van-icon class-prefix="my-icon" name="wodefensi" color="#65cdf2" size="28"/>
        </template>
        <template #text>
          <span style="margin-top: 8px;font-size: 14px">粉丝</span>
        </template>
      </van-grid-item>
      <van-grid-item @click="toFansPage" v-else :badge="fansNum">
        <template #icon>
          <van-icon class-prefix="my-icon" name="wodefensi" color="#65cdf2" size="28"/>
        </template>
        <template #text>
          <span style="margin-top: 8px;font-size: 14px">粉丝</span>
        </template>
      </van-grid-item>

    </van-grid>
    <van-divider/>
    <van-cell to="/friend/application">
      <template #title>
        <span class="cell-span">系统消息</span>
      </template>
      <template #icon>
        <van-badge>
          <div class="icon_area">
            <van-icon name="bell" size="25"
                      style="margin-left: 12px;margin-top: 13px;color: #e89817"/>
          </div>
        </van-badge>
      </template>
    </van-cell>
    <van-cell to="/friends">
      <template #title>
        <span class="cell-span">新增关注</span>
      </template>
      <template #icon>
        <van-badge>
          <div class="icon_area" style="background-color: rgba(255,0,183,0.88)">
            <van-icon name="star" size="25"
                      style="margin-left: 12px;margin-top: 12px;color: #ffffff"/>
          </div>
        </van-badge>
      </template>
    </van-cell>
    <van-cell @click="toHallChat">
      <template #title>
        <span class="cell-span">公共聊天室</span>
      </template>
      <template #label>
        <span class="cell-span">官方聊天室</span>
      </template>
      <template #icon>
        <div class="icon_area" style="background-color: #0F64EC">
          <van-image :src=favicon width="56" height="56" round style="margin-top: -4px;margin-left:-4px"/>
        </div>
      </template>
      <template #value>
        <van-tag type="primary">官 方</van-tag>
      </template>
    </van-cell>
    <!--    <van-cell-group v-for="user in privateChatUserList">-->
    <!--      <template #title>-->
    <!--        <span class="cell-span">{{user.username}}</span>-->
    <!--      </template>-->
    <!--      <template #label>-->
    <!--        <span class="cell-span">官方聊天室</span>-->
    <!--      </template>-->
    <!--      <template #icon>-->
    <!--        <div class="icon_area" style="background-color: #0F64EC">-->
    <!--          <van-image :src="user.avatarUrl"  width="56" height="56" round style="margin-top: -4px;margin-left:-4px"/>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--      <template #value>-->
    <!--        <van-tag style="color:#ecdcdc;background-color:#0F64EC">私聊</van-tag>-->
    <!--      </template>-->
    <!--    </van-cell-group>-->
    <van-cell-group v-for="user in privateChatUserList">
      <van-cell @click="toPrivateChat(user.id,user.username)">
        <template #title>
          <span class="cell-span">{{ user.username }}</span>
        </template>
        <template #label>
          <span class="cell-span">{{ user.profile }}</span>
        </template>
        <template #icon>
          <van-image :src="user.avatarUrl || defaultImg" round width="50" height="50" style="margin-left: 10px"/>
          <!--                    <van-icon name="volume" color="#2a2e31" class="icon" size="20px"/>-->
        </template>
        <template #value>
          <van-tag type="danger">私聊</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-for="team in teamList">
      <van-cell @click="toChatRoom(team.id,team.name)">
        <template #title>
          <span class="cell-span">{{ `${team.name}` + '聊天室' }}</span>
        </template>
        <template #label>
          <span class="cell-span">{{ team.description }}</span>
        </template>
        <template #icon>
          <van-image :src="team.coverImage || defaultImg" round width="50" height="50" style="margin-left: 10px"/>
          <!--                    <van-icon name="volume" color="#2a2e31" class="icon" size="20px"/>-->
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/MyAxios"
import {useRouter} from "vue-router";
import defaultImg from "../../assets/avatar.jpg";
import favicon from "../../assets/logo.png"
import {MessageTypeEnum} from "../../enum/MessageTypeEnum";

const teamList = ref()
const privateChatUserList = ref()
const likeNum = ref(0)
let likeList: any[] = [];
const commentNum = ref(0)
let commentList: any[] = []
const fansNum = ref(0)
let fansList: any[] = [];
const friendApplication = ref(0)
let friendApplicationList: any[] = []
onMounted(async () => {
  // let res = await myAxios.get("/team/list/my/join/all");
  // if (res?.code === 0) {
  //   teamList.value = res.data
  // }
  // let res2 = await myAxios.get("/message/like/num");
  // if (res2.code === 0) {
  //   likeNum.value = Number(res2.data)
  // }
  // let res3 = await myAxios.get("/message/blog/num");
  // if (res3?.code === 0) {
  //   blogNum.value = Number(res3.data)
  // }

  let userList = await myAxios.get("/chat/privateUser")
  if (userList.code == 0) {
    privateChatUserList.value = userList.data
  }
  let blog_like = await myAxios.get("/message/num/" + MessageTypeEnum.BLOG_LIKE)
  let blog_like_list = await myAxios.get("/message/get/" + MessageTypeEnum.BLOG_LIKE)

  let blog_comment_like = await myAxios.get("/message/num/" + MessageTypeEnum.BLOG_COMMENT_LIKE)
  let blog_comment_like_list = await myAxios.get("/message/get/" + MessageTypeEnum.BLOG_COMMENT_LIKE)
  // console.log(blog_comment_like_list.data)
  likeList = blog_like_list.data.concat(blog_comment_like_list.data)


  likeNum.value = blog_like.data + blog_comment_like.data
  let comment_add = await myAxios.get("/message/num/" + MessageTypeEnum.COMMENT_ADD)
  let comment_add_list = await myAxios.get("/message/get/" + MessageTypeEnum.COMMENT_ADD)
  commentNum.value = comment_add.data
  commentList = comment_add_list.data
  //todo
  // let system_messages = await myAxios.get("/message/num/" + MessageTypeEnum.SYSTEM_MESSAGES)

  let follow_notifications = await myAxios.get("/message/num/" + MessageTypeEnum.FOLLOW_NOTIFICATIONS)
  let follow_notifications_list = await myAxios.get("/message/get/" + MessageTypeEnum.FOLLOW_NOTIFICATIONS)
  console.log("follow" + follow_notifications_list.data)
  console.log("follow" + follow_notifications.data)
  fansNum.value = follow_notifications.data
  fansList = follow_notifications_list.data

  let friend_application = await myAxios.get("/message/num/" + MessageTypeEnum.FRIEND_APPLICATION)
  let friend_application_list = await myAxios.get("/message/get/" + MessageTypeEnum.FRIEND_APPLICATION)
  friendApplication.value = friend_application.data
  friendApplicationList = friend_application_list.data


})
let router = useRouter();


const toPrivateChat = (id, username) => {
  router.push({
    path: "/chat",
    query: {
      id: id,
      username: username,
      userType: 1
    }
  })
}

const toCommentPage = () => {
  router.push({
    path: "/message/comment",
    query: {
      commentList: JSON.stringify(commentList)
    }
  })
}
const toFansPage = () => {
  router.push({
    path: "/message/fans",
    query: {
      fansList: JSON.stringify(fansList)
    }
  })
}
const toLikePage = () => {
  router.push({
    path: "/message/like",
    query: {
      likeList: JSON.stringify(likeList),
    }
  })
}

const toApplicationPage = () => {
  router.push({
    path: "/message/application",
    query: {
      applicationList: JSON.stringify(friendApplicationList)
    }
  })
}
const toChatRoom = (id, name) => {
  router.push({
    path: "/chat",
    query: {
      teamId: id,
      teamName: name,
      teamType: 2
    }
  })
}
const toHallChat = () => {
  router.push("/chat")
}
const toAIChat = () => {
  window.open("https://c.binjie.fun/", "_blank");
}
</script>

<style scoped>
#messagePage {
  margin-top: -30px;
}

.icon_area {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ededed;
  position: relative;
  margin-left: 10px;
}

.van-cell {
  padding-left: 5px;
}

.icon {
  position: absolute;
  left: 14px;
  top: 14px
}

.van-divider {
  margin: 2px;
}

.cell-span {
  margin-top: 15px;
  margin-left: 10px;
}

:root:root {
  --van-grid-item-text-font-size: 14px
}

.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
}
</style>
