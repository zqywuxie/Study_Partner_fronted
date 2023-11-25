<template>
  <div class="emoji">
    <div class="close-btn" @click="cancelSelection">×</div>
    <ul class="emoji-default">
      <li v-for="(item, index) in emojiArr" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {emojis} from '../mock/messageItem'

const emojiArr: Array<string> = emojis().split(',')

const cancelSelection = () => {
  // 处理取消选择的逻辑，例如关闭表情选择框
  console.log('Cancel selection');
}
</script>

<style scoped>
.emoji {
  max-height: 100px;
  overflow-y: auto;
  max-width: 200px;
  position: relative; /* 使得子元素的绝对定位相对于该容器 */
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

.emoji-default {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
}

.emoji-default li {
  margin: 5px;
}
</style>
