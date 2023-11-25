<template>
  <div class="notification-container">
    <van-cell-group>
      <van-cell v-for="(notification, index) in notifications" :key="index">
        <template #title>
          <div class="notification-header">
            <span class="notification-time">{{ notification.time }}</span>
            <span class="notification-type">{{ notification.type }}</span>
          </div>
        </template>
        <template #label>
          <div class="notification-content">{{ notification.content }}</div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const notifications = ref([
  {
    time: '10:30 AM',
    type: 'System Update',
    content: 'The system will undergo maintenance at 11:00 AM. Please be prepared for a brief interruption.',
  },
  {
    time: 'Yesterday',
    type: 'New Feature',
    content: 'Introducing a new feature: Dark Mode! Try it out in your settings.',
  },
  // Add more notifications as needed
]);
</script>

<style scoped>
.notification-container {
  padding: 15px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-time {
  font-size: 14px;
  color: #999;
}

.notification-type {
  font-size: 14px;
  color: #0c792e; /* Darken the color */
}

.notification-content {
  margin-top: 10px; /* Add more space between messages */
  font-size: 16px;
  color: #333; /* Darken the color */
}
</style>
