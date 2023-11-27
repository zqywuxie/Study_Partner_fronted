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
          :key="application.fromUser.id"
          is-link
          class="custom-cell"
          @click="goToFriendDetail(application.fromUser.id)"
      >
        <template #icon>
          <img :src="application.fromUser.avatarUrl" class="friend-avatar"/>
        </template>

        <template #title>
        <span>
          {{ application.fromUser.username }}
          <span class="request-time">{{ formatRequestTime(application.fromUser.createTime) }}</span>
        </span>
        </template>

        <template #label>
          <span v-if="application.friendsRecordVO.status === 0">申请添加你为好友</span>
          <span v-else-if="application.friendsRecordVO.status === 1">申请已同意</span>
          <span v-else-if="application.friendsRecordVO.status === 2">申请已过期</span>
          <span v-else-if="application.friendsRecordVO.status === 3">申请已拒绝</span>
        </template>

        <template #right-icon>
          <div v-if="application.friendsRecordVO.status === 0 && !isRecordExpired(application)">
            <template v-if="!application.isRequestHandled">
              <van-button
                  type="primary"
                  size="small"
                  @click.stop="acceptFriendRequest(application.fromUser.id,application.fromUser.username)"
              >
                同意
              </van-button>
              <van-button
                  type="danger"
                  size="small"
                  @click.stop="rejectFriendRequest(application.fromUser.id,application.fromUser.username)"
              >
                拒绝
              </van-button>
            </template>
            <template v-else>
              <span v-if="application.friendsRecordVO.status === 1">已同意该请求</span>
              <span v-else-if="application.friendsRecordVO.status === 2">该请求已过期</span>
              <span v-else-if="application.friendsRecordVO.status === 3">已拒绝该请求</span>
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
  }
};

const rejectFriendRequest = async (id, name) => {
  // TODO: Handle rejecting friend request
  const request = await MyAxios.post("/friends/canceledApply/" + id)
  if (request) {
    Toast.success(`已拒绝${name}的好友申请`)
  }
};

const formatRequestTime = (requestTime) => {
  const formattedTime = new Date(requestTime).toLocaleString();
  return formattedTime;
};

let route = useRoute()
onMounted(async () => {
  await MyAxios.get("/message/read/" + MessageTypeEnum.FRIEND_APPLICATION)
  console.log(JSON.parse(route.query.applicationList))
  resList.value = JSON.parse(route.query.applicationList)
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
