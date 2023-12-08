<template>
  <div>
    <van-empty
        v-if="(!resList ||resList.length===0) && loading===false"
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80"
        description="你还没有好友，快去认识新伙伴吧"
    />
    <van-cell-group>
      <van-cell
          v-for="application in resList"
          :key="application.applyUser.id"
          is-link
          class="custom-cell"
          @click="goToFriendDetail(application.applyUser.id)"
      >
        <template #icon>
          <img :src="application.applyUser.avatarUrl" class="friend-avatar"/>
        </template>

        <template #title>
        <span>
          {{ application.applyUser.username }}
          <span class="request-time">{{ formatRequestTime(application.createTime) }}</span>
        </span>
        </template>

        <template #label>
          <span v-if="application.status === 0">{{ application.remark }}</span>
          <span v-else-if="application.status === 1">申请已同意</span>
          <span v-else-if="application.status === 2">申请已拒绝</span>
          <span v-else-if="application.status === 3">申请已过期</span>
        </template>

        <template #right-icon>
          <div v-if="application.status === 0 && !isRecordExpired(application)">
            <template v-if="application.status !== 4">
              <van-button
                  type="primary"
                  size="small"
                  @click.stop="acceptFriendRequest(application.applyUser.id,application.applyUser.username)"
              >
                同意
              </van-button>
              <van-button
                  type="danger"
                  size="small"
                  @click.stop="rejectFriendRequest(application.applyUser.id,application.applyUser.username)"
              >
                拒绝
              </van-button>
            </template>
            <template v-else>
              <span v-if="application.status === 1">已同意该请求</span>
              <span v-else-if="application.status === 2">已拒绝该请求</span>
              <span v-else-if="application.status === 3">请求已过期</span>
            </template>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>


<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import MyAxios from "../../plugins/MyAxios";
import {Toast} from "vant";
import {MessageTypeEnum} from "../../enum/MessageTypeEnum";

const loading = ref(true)
const isRecordExpired = (record) => {
  const expirationTime = new Date(record.requestTime);
  expirationTime.setDate(expirationTime.getDate() + 7);
  const currentTime = new Date();
  return expirationTime < currentTime;
};
const resList = ref([])
const router = useRouter();
const status = ref(0)
const goToFriendDetail = (id) => {
  const showUserDetail = (id: any) => {
    router.push({
      path: "/user/detail",
      query: {
        id: id
      }
    })
  }
};

const acceptFriendRequest = async (id, name) => {
  // TODO: Handle accepting friend request
  const request = await MyAxios.post("/friends/agree/" + id)
  if (request.code == 0) {
    Toast.success(`已同意${name}的好友申请`)
    resList.value.forEach((item) => {
      if (item.applyUser.id === id) {
        item.status = 1
      }
    })
  } else {
    Toast.fail("同意失败,请联系管理员解决")
  }
};

const rejectFriendRequest = async (id, name) => {
  // TODO: Handle rejecting friend request
  const request = await MyAxios.post("/friends/canceledApply/" + id)
  if (request.code === 0) {
    Toast.success(`已拒绝${name}的好友申请`)
    resList.value.forEach((item) => {
      if (item.applyUser.id === id) {
        item.status = 2
      }
    })
  } else {
    Toast.fail("拒绝失败，请联系管理员")
  }
};

const formatRequestTime = (requestTime) => {
  const formattedTime = new Date(requestTime).toLocaleString();
  return formattedTime;
};

let route = useRoute()
onMounted(async () => {
  await MyAxios.get("/message/read/" + MessageTypeEnum.FRIEND_APPLICATION)
  // /friends/getRecords
  const res = await MyAxios.get("/friends/getRecords")
  console.log(res.data)
  resList.value = res.data
  // console.log(JSON.parse(route.query.applicationList))
  // resList.value = JSON.parse(route.query.applicationList)
  loading.value = false
})

</script>

<style scoped>
.custom-cell {
  padding: 16px;
}

.friend-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.request-time {
  margin-left: 20px;
  font-size: 12px;
  color: #999;
}
</style>
