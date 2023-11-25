<template>
  <van-cell-group>
    <van-cell
        v-for="(request, index) in friendRequests"
        :key="request.id"
        is-link
        class="custom-cell"
        @click="goToFriendDetail(request.id)"
    >
      <template #icon>
        <img :src="request.avatar" class="friend-avatar" />
      </template>

      <template #title>
        <span>
          {{ request.nickname }}
          <span class="request-time">{{ formatRequestTime(request.requestTime) }}</span>
        </span>
      </template>

      <template #label>
        <span v-if="request.status === '待处理'">申请添加你为好友</span>
        <span v-else-if="request.status === '已同意'">申请已同意</span>
        <span v-else-if="request.status === '已拒绝'">申请已拒绝</span>
      </template>

      <template #right-icon>
        <div v-if="request.status === '待处理' && !isRecordExpired(request)">
          <van-button
              v-if="request.status === '待处理'"
              type="primary"
              size="small"
              @click.stop="acceptFriendRequest(request.id)"
          >
            同意
          </van-button>
          <van-button
              v-if="request.status === '待处理'"
              type="danger"
              size="small"
              @click.stop="rejectFriendRequest(request.id)"
          >
            拒绝
          </van-button>
        </div>
        <div v-else>
          <span>{{ `申请${request.status}` }}</span>
        </div>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      friendRequests: [
        {
          id: 1,
          avatar: "https://example.com/avatar1.jpg",
          nickname: "张三",
          requestTime: "2023-12-24T12:00:00", // Example request time
          status: '待处理', // Added status property
        },
        {
          id: 2,
          avatar: "https://example.com/avatar2.jpg",
          nickname: "李四",
          requestTime: "2023-10-25T09:30:00", // Example request time
          status: '待处理', // Added status property
        },
        // Add more friend request objects as needed
      ],
    };
  },
  computed: {
    isRecordExpired() {
      return (record) => {
        const expirationTime = new Date(record.requestTime);
        expirationTime.setDate(expirationTime.getDate() + 7); // Set expiration to 7 days later
        const currentTime = new Date();
        return expirationTime < currentTime;
      };
    },
  },
  methods: {
    goToFriendDetail(id) {
      // TODO: Handle navigation to friend detail page
    },
    acceptFriendRequest(id) {
      // TODO: Handle accepting friend request
      const request = this.friendRequests.find(req => req.id === id);
      if (request) {
        request.status = '已同意';
      }
    },
    rejectFriendRequest(id) {
      // TODO: Handle rejecting friend request
      const request = this.friendRequests.find(req => req.id === id);
      if (request) {
        request.status = '已拒绝';
      }
    },
    formatRequestTime(requestTime) {
      const formattedTime = new Date(requestTime).toLocaleString();
      return formattedTime;
    },
  },
};
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
