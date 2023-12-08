<template>
  <van-sticky>
    <van-nav-bar
        :title="title"
        @click-right="showUserDetail(stats.chatType)"
        @click-left="()=>{router.go(-1)}"
    >
      <template #left>
        <van-icon  name="arrow-left" color="#39a9ed"/>
      </template>
      <template #right>
        <van-icon class-prefix="my-icon" name="qita" color="#39a9ed"/>
      </template>
    </van-nav-bar>
  </van-sticky>
  <div class="chat-container">
    <div class="content" ref="chatRoom" v-html="stats.content"></div>
    <van-cell-group inset style="position: fixed;bottom: 40px;width: 100%">
      <div class="home-tool">
        <van-button type="default" class="emojibtn small-btn" @click="emojiShow">
          <van-icon name="smile-o" size="20px"/>
        </van-button>
        <div class="emoji-container direction-container" v-show="emojihowVisible" @click="emojiHide">
          <emojis @click.stop="chooseEmoji"></emojis>
        </div>
      </div>
      <van-field
          @focus="emojiHide"
          v-model="stats.text"
          center
          clearable
          placeholder="聊点什么吧...."
          style=" border: 1px solid #666; border-radius: 150px; padding: 10px; margin-right: 10px; margin-bottom: 15px; height: 50px"
      >


        <template #button>
          <van-button size="small" type="primary" @click="send" style="margin-right: 16px">发送</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>
<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";
import Emojis from "../../components/Emojis.vue";

import {getCurrentUser} from "../../service/user";
import myAxios from "../../plugins/MyAxios";

const route = useRoute()
const router = useRouter()


const emojihowVisible = ref(false)

const emojiShow = () => {
  emojihowVisible.value = !emojihowVisible.value
}

// 反正就是点到除表情框之外的地方我都给你隐藏
const emojiHide = () => {
  emojihowVisible.value = false
}


const stats = ref({
  user: {
    id: 0,
    username: "",
    avatarUrl: ''
  },
  isCollapse: false,
  users: [],
  chatUser: {
    id: 0,
    username: ''
  },
  chatEnum: {
    // 私聊
    PRIVATE_CHAT: 1,
    // 队伍聊天
    TEAM_CHAT: 2,
    // 大厅
    HALL_CHAT: 3
  },
  chatType: null,
  team: {
    teamId: 0,
    teamName: ''
  },
  text: "",
  messages: [],
  content: ''
})

const chooseEmoji = (e: any) => {
  if (e.target.textContent.length <= 2) {  //部分表情只占一位,同时如果点到旁边的一点区域会输出全部的表情有点bug
    stats.value.text = stats.value.text + e.target.textContent
  }
}
let socket = null;
const heartbeatInterval = 30 * 1000; // 30秒
let heartbeatTimer = null;

const startHeartbeat = () => {
  heartbeatTimer = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send("PING");
    }
  }, heartbeatInterval);
}

// 从路由中拿到用户id
const userId = route.query.id;

// 显示用户信息
const showUserDetail = (chatType: number) => {
  if (stats.value.chatEnum.PRIVATE_CHAT == chatType) {
    router.push({
      path: "/user/detail",
      query: {
        id: userId
      }
    })
  } else if (stats.value.chatEnum.TEAM_CHAT == chatType) {
    // todo 查看群成员
  } else {

  }
  // router.push({
  //   path: "/user/detail",
  //   query: {
  //     id: id
  //   }
  // })
}

const stopHeartbeat = () => {
  clearInterval(heartbeatTimer);
  heartbeatTimer = null;
}

const chatRoom = ref(null)
const DEFAULT_TITLE = "聊天"
const title = ref(DEFAULT_TITLE)

onMounted(async () => {
  let {id, username, userType, teamId, teamName, teamType} = route.query
  stats.value.chatUser.id = Number.parseInt(id)
  stats.value.team.teamId = Number.parseInt(teamId)
  stats.value.chatUser.username = username
  stats.value.team.teamName = teamName
  if (userType && Number.parseInt(userType) === stats.value.chatEnum.PRIVATE_CHAT) {
    stats.value.chatType = stats.value.chatEnum.PRIVATE_CHAT
    title.value = stats.value.chatUser.username
  } else if (teamType && Number.parseInt(teamType) === stats.value.chatEnum.TEAM_CHAT) {
    stats.value.chatType = stats.value.chatEnum.TEAM_CHAT
    title.value = stats.value.team.teamName
  } else {
    stats.value.chatType = stats.value.chatEnum.HALL_CHAT
    title.value = "公共聊天室"
  }
  stats.value.user = await getCurrentUser()

  // 私聊
  if (stats.value.chatType === stats.value.chatEnum.PRIVATE_CHAT) {
    const privateMessage = await myAxios.post("/chat/privateChat",
        {
          toId: stats.value.chatUser.id,
        })
    privateMessage.data.forEach(chat => {
      if (chat.isMy === true) {
        createContent(null, chat.fromUser, chat.text, true, chat.createTime)
      } else {
        createContent(chat.toUser, null, chat.text, null, chat.createTime)
      }
    })
  }
  if (stats.value.chatType === stats.value.chatEnum.HALL_CHAT) {
    const hallMessage = await myAxios.get("/chat/hallChat")
    hallMessage.data.forEach(chat => {
      if (chat.isMy === true) {
        createContent(null, chat.fromUser, chat.text)
      } else {
        createContent(chat.fromUser, null, chat.text, chat.isAdmin, chat.createTime)
      }
    })
  }
  if (stats.value.chatType === stats.value.chatEnum.TEAM_CHAT) {
    const teamMessage = await myAxios.post("/chat/teamChat",
        {
          teamId: stats.value.team.teamId
        })
    teamMessage.data.forEach(message => {
      if (message.isMy === true) {
        createContent(null, message.fromUser, message.text)
      } else {
        createContent(message.fromUser, null, message.text, message.isAdmin, message.createTime)
      }
    })
  }
  init()
  // nextTick用于下次Dom更新循环结束之后执行延迟回调，在修改数据之后使用nextTick.则可以在回调中获取更新后的DOM
  await nextTick()
  const lastElement = chatRoom.value.lastElementChild
  lastElement.scrollIntoView()
})

const init = () => {
  let uid = stats.value.user?.id;
  if (typeof (WebSocket) == "undefined") {
    Toast.fail("您的浏览器不支持WebSocket")
  } else {
    // todo 修改为生产环境和上线环境后端启动地址和端口
    // let socketUrl = `wss://www.zqywuku.top/api/websocket/${uid}/${stats.value.team.teamId}`
    let socketUrl = `ws://localhost:8081/api/websocket/${uid}/${stats.value.team.teamId}`
    console.log(socketUrl)

    if (socket != null) {
      socket.close();
      socket = null;
    }
    // 开启一个websocket服务
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function () {
      startHeartbeat();
    };
    //  浏览器端收消息，获得从服务端发送过来的文本消息
    socket.onmessage = function (msg) {
      if (msg.data === "pong") {
        return;
      }
      // 对收到的json数据进行解析，
      let data = JSON.parse(msg.data)
      if (data.error) {
        Toast.fail(data.error)
        return
      }
      // 获取在线人员信息
      if (data.users) {
        stats.value.users = data.users.filter(user => {
          return user.id !== uid
        })
        // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
      } else {
        let flag;
        if (stats.value.chatType === data.chatType) {
          // 单聊
          flag = (uid === data.toUser?.id && stats.value.chatUser?.id === data.fromUser?.id)
        }
        if ((stats.value.chatType === data.chatType)) {
          // 大厅
          flag = (data.fromUser?.id != uid)
        }
        // 队伍
        if (stats.value.chatType === data.chatType && data.teamId && stats.value.team.teamId === data.teamId) {
          flag = (data.fromUser?.id != uid)
        }
        console.log(flag)
        if (flag) {
          stats.value.messages.push(data)
          // 构建消息内容
          createContent(data.fromUser, null, data.text, data.isAdmin, data.createTime)
        }
        nextTick(() => {
          const lastElement = chatRoom.value.lastElementChild
          lastElement.scrollIntoView()
        })
        flag = null;
      }
    };
    //关闭事件
    socket.onclose = function () {
      stopHeartbeat();
      setTimeout(init, 5000); // 5秒后重连
    };
    //发生了错误事件
    socket.onerror = function (error) {
      console.log(error)
      Toast.fail("websocket发生了错误")
    }
  }
}

const send = () => {
  if (stats.value.chatUser.id === 0) {
    return;
  }
  if (stats.value.chatUser.id === stats.value.user.id) {
    Toast("不能给自己发信息")
    return;
  }
  if (!stats.value.text.trim()) {
    Toast("请输入内容")
  } else {
    if (typeof (WebSocket) == "undefined") {
      Toast("您的浏览器不支持WebSocket")
    } else {
      let message = {
        fromId: stats.value.user.id,
        toId: stats.value.chatUser.id,
        text: stats.value.text,
        chatType: stats.value.chatType,
        teamId: stats.value.team.teamId,
      }

      console.log(message)
      //todo 发送消息
      socket.send(JSON.stringify(message));

      // stats.value.messages.push({user: stats.value.user.id, text: stats.value.text})
      var currentDate = new Date();
      var currentTimeString = currentDate.toString();
      //

      createContent(null, stats.value.user, stats.value.text, null, currentTimeString)


      stats.value.text = '';
      nextTick(() => {
        const lastElement = chatRoom.value.lastElementChild
        lastElement.scrollIntoView()
      })
    }
  }
}

const showUser = (id) => {
  router.push({
    path: '/user/detail',
    query: {
      id: id
    }
  })
}

/**
 * 这个方法是用来将 json的聊天消息数据转换成 html的。
 */
const createContent = (remoteUser, nowUser, text, isAdmin, createTime) => {
  // 当前用户消息
  let html;
  if (nowUser) {
    // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
    html = `
    <div class="message self">
    <div class="myInfo info">
        <span class="username">${nowUser.username}</span>
      <img :alt=${nowUser.username} class="avatar" onclick="showUser(${nowUser.id})" src=${nowUser.avatarUrl}>

    </div>
      <p class="text">${text}</p>
    </div>
`
  } else if (remoteUser) {
    // remoteUser表示远程用户聊天消息，灰色的气泡
    html = `
     <div class="message other">
      <img :alt=${remoteUser.username} class="avatar" onclick="showUser(${remoteUser.id})" src=${remoteUser.avatarUrl}>
    <div class="info">
      <span class="username">${remoteUser.username.length < 10 ? remoteUser.username : remoteUser.username}&nbsp;&nbsp;&nbsp;${createTime}</span>
      <p class="${isAdmin ? 'admin text' : 'text'}" >${text}</p>
    </div>
    </div>
`
  }
  stats.value.content += html;
}
// window.showUser = showUser
</script>
<style>
.message-time {
  font-size: 12px;
  color: #999; /* 根据需要调整颜色 */
  margin-top: 5px; /* 根据需要调整上边距 */
}

.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.message {
  display: flex;
  align-items: center;
  margin: 10px 10px;
}

.content {
  padding-top: 22px;
  padding-bottom: 57px;
  display: flex;
  flex-direction: column
}

.self {
  align-self: flex-end;
}

.avatar {
  align-self: flex-start;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 10px;
}

.username {
  align-self: flex-start;
  text-align: center;
  max-width: 200px;
  font-size: 12px;
  color: #999;
  padding-bottom: 4px;
  white-space: nowrap;
  overflow: visible;
  background-color: rgba(255, 255, 255, 0.16);
}

.info {
  display: flex;
  flex-direction: column;
  order: 2;
}

.myInfo {
  align-self: flex-start;
}

.text {
  padding: 10px;
  border-radius: 10px;
  background-color: #eee;
  word-wrap: break-word;
  word-break: break-all;
}

.other .text {
  align-self: flex-start;
}

.self .text {
  background-color: #0084ff;
  color: #fff;
}

.emojibtn {
  width: 30px; /* 调整按钮宽度 */
  height: 30px; /* 调整按钮高度 */
  border-radius: 15px; /* 使按钮变成圆形 */
}

.small-btn {
  width: 20px; /* 可根据需要调整小按钮的大小 */
  height: 20px;
  border-radius: 10px; /* 使小按钮变成小圆形 */
}

.emoji-container {
  transform: rotate(90deg); /* 使表情选择界面旋转90度，变成横向显示 */
}

.direction-container {
  transform: rotate(0deg); /* 如果已经有其他样式影响了方向，可以重置为0度 */
}
</style>
