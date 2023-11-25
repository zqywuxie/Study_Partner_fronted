<template>
  <div id="messagePage" style="margin-top: 1px">
    <van-grid :border="false">
      <van-grid-item v-if="commentNum === 0" icon="comment" icon-color="#767ffe" text="评论" to="/message/comment"/>
      <van-grid-item v-else icon="comment" :badge="commentNum" icon-color="#767ffe" text="评论" to="/message/comment"/>

      <van-grid-item v-if="likeNum===0" icon="good-job" icon-color="#639efc" text="赞" to="/message/like"/>
      <van-grid-item v-else icon="good-job" icon-color="#639efc" text="赞" :badge="likeNum" to="/message/like"/>

      <van-grid-item icon="friends" v-if="friendApplication === 0" icon-color="#a778fc" text="新朋友"
                     to="/message/application"/>
      <van-grid-item icon="friends" v-else icon-color="#a778fc" text="新朋友" to="/message/application"
                     :badge="friendApplication"/>


      <van-grid-item to="/message/fans" v-if="fansNum===0">
        <template #icon>
          <van-icon class-prefix="my-icon" name="wodefensi" color="#65cdf2" size="28"/>
        </template>
        <template #text>
          <span style="margin-top: 8px;font-size: 14px">粉丝</span>
        </template>
      </van-grid-item>
      <van-grid-item to="/message/fans" v-else :badge="fansNum">
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
import favicon from "../../assets/logo.ico"

const teamList = ref()
const privateChatUserList = ref()
const likeNum = ref(0)
const commentNum = ref(0)
const fansNum = ref(0)
const friendApplication = ref(0)
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
  console.log(userList)
  if (userList.code == 0) {
    privateChatUserList.value = userList.data
  }
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
