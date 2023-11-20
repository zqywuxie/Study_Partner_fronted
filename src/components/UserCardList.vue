<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
        :desc=user.profile
        :title="`${user.username}(${user.id})`"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini" type="primary" @click="showUserDetail(user.id)">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>

  <van-popup v-model:show="show">

    <van-image :src="clickUser.avatarUrl"/>
    <van-divider/>
    <van-cell :value="clickUser.city" center title="伙伴城市:"/>

    <van-cell :value="clickUser.profile" center title="伙伴简介:"/>
    <van-cell :value="clickUser.gender == 0?'男':'女'" center title="伙伴性别:"/>
    <van-cell :value="popupText" center/>
  </van-popup>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {ref} from "vue";
import {useRouter} from "vue-router";


interface UserCardListProps {
  userList: UserType[];
  loading: boolean
}

//withDefaults 为变量提供默认初始值
const props = withDefaults(defineProps<UserCardListProps>(), {
  //@ts-ignore
  userList: [] as UserType[],
  loading: true
})


// const updatedUserList = props.userList.map((user) => {
//     const updatedUser = { ...user };
//     updatedUser.tags = JSON.parse(updatedUser.tags);
//     return updatedUser;
// });
//
// const updatedProps = { ...props, userList: updatedUserList };

const popupText = ref('暂无联系方式');
const clickUser = ref<UserType>();
const router = useRouter();
const showUserDetail = (id: any) => {
  router.push({
    path: "/user/detail",
    query: {
      id: id
    }
  })
}

const show = ref(false);
</script>

<style scoped>

</style>