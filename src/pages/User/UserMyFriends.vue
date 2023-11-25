<template>
  <div id="userMyFriendsPage">
    <van-empty
        v-if="(!userList || userList.length===0) && loading===false"
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80"
        description="你还没有好友，快去认识新伙伴吧"
    />
    <van-loading vertical v-if="loading">
      <template #icon>
        <van-icon name="star-o" size="30"/>
      </template>
      加载中...
    </van-loading>
    <van-card v-for="(user,index) in userList"
              :title="user.username"
              :key="index"
              :desc="user.profile"
              style="border-radius: 15px;background-color: #e8e8e8;margin-top: 20px"
    >
      <template #thumb>
        <van-image :src="user?.avatarUrl" round width="88" height="88" @click="showUserDetail(user?.id)"/>
      </template>
      <template #tags>
        <van-tag v-for="tag in user?.tags" plain type="danger" style="margin-right: 8px;margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
      <template #price>
        <van-icon v-if="user.phone" name="phone-o" style="">{{ ':' + user.phone }}</van-icon>
        <van-icon else="user.phone" name="phone-o" style="">:这个人很懒，没有设置联系电话</van-icon>


        <br/>
        <van-icon name="envelop-o" style="">{{ ':' + user.email }}</van-icon>
      </template>
      <template #num>
        <van-button size="mini" plain type="primary"
                    style="width: 48px;height: 28px;margin-top: 10px" @click="toChat(user)">
          私聊
        </van-button>
        <van-button size="mini" plain type="danger"
                    style="width: 48px;height: 28px;margin-top: 10px" @click="toDelete(user)">
          删除
        </van-button>
      </template>
    </van-card>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/MyAxios";
import {useRoute, useRouter} from "vue-router";
import {Dialog, Toast} from "vant";

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const userList = ref([])
const friendStatus = ref([]);
onMounted(async () => {
  let res = await myAxios.get("/friends/my/list");
  console.log(res)
  console.log("申请列表", res.data);
  if (res?.code === 0) {
    res.data.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
      userList.value.push(user)
      friendStatus.value.push(user.status)
    })
  }
  loading.value = false
})


const toDelete = (user) => {
  Dialog.confirm({
    title: '确定要删除<' + user.username + '>吗？',
    message:
        '如果删除，你将失去了一位好友☹️',
  })
      .then(async () => {
        let res = await myAxios.post("/friends/delete", {
          friendId: user.id
        });
        if (res?.code === 0) {
          Toast.success("删除成功")
          // setTimeout(() => {
          //   emits("refresh")
          // }, 300)
        } else {
          Toast.fail("删除失败" + (res.message ? `,${res.message}` : ''))
        }
      })
      .catch(() => {
      });
}
const showUserDetail = (id) => {
  router.push({
    path: "/user/detail",
    query: {
      id: id
    }
  })
}

const toChat = (user) => {
  router.push({
    path: "/chat",
    query: {
      id: user.id,
      username: user.username,
      userType: 1
    }
  })
}

</script>

<style scoped>
#userMyFriendsPage {
  margin-top: -15px;
  margin-left: 15px;
  margin-right: 15px;
}

.friend-button {
  position: fixed;
  bottom: 60px;
  right: 20px;
}

</style>
