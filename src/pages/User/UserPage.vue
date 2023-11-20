<template>
  <div id="userPage">
    <template v-if="user">
      <van-space style="margin-left: 20px;margin-top: 15px">
        <van-image
            round
            width="80"
            height="80"
            :src="user?.avatarUrl"
            @click="toUserUpdatePage"

        />
        <van-cell :title="user.username" is-link to="/user/update" style="width: 260px" :center="true">

        </van-cell>
      </van-space>
      <van-cell :value="user.profile" center is-link title="个人简介"/>
      <van-cell center style="margin-top: 15px">
        <template #title>
          <span style="margin-left: 20px">我的标签</span>
        </template>
        <template #value>
          <van-tag v-for="tag in user.tags" plain type="danger" style="margin-right: 8px;margin-top: 8px">
            {{ tag }}
          </van-tag>
        </template>
      </van-cell>
      <van-grid :border="false" style="padding: 10px">
        <!--        todo 自定义图标-->
        <van-grid-item text="创建的队伍" to="/user/createTeam">
          <template #icon>
            <van-icon class-prefix="my-icon" name="wochuangjiande" size="23" style="margin-bottom: 8px;color: #0048ff"/>
          </template>
        </van-grid-item>
        <van-grid-item text="加入的队伍" to="/user/joinTeam">
          <template #icon>
            <van-icon class-prefix="my-icon" name="jiarubanji" size="23" style="margin-bottom: 8px;color: #11d35d"/>
          </template>
        </van-grid-item>
        <van-grid-item text="我的博文" to="/user/blog">
          <template #icon>
            <van-icon class-prefix="my-icon" name="wofadetiezi" size="23" style="margin-bottom: 8px;color: #10d1d9"/>
          </template>
        </van-grid-item>
        <van-grid-item text="好友列表" to="/my/friends">
          <template #icon>
            <van-icon name="contact" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>
          </template>
        </van-grid-item>
        <van-grid-item text="关注列表" to="/my/follow">
          <template #icon>
            <van-icon  name="friends" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>
          </template>
        </van-grid-item>

        <van-grid-item text="粉丝列表" to="/my/fans">
          <template #icon>
            <van-icon class-prefix="my-icon" name="wodefensi" color="#65cdf2" size="23"/>
          </template>
        </van-grid-item>
        <!--        <van-grid-item text="用户签到" @click="userSign(user.id)">-->
        <!--          <template #icon>-->
        <!--            <van-icon name="bulb-o" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>-->
        <!--          </template>-->
        <!--        </van-grid-item>-->
        <!--        <van-grid-item text="历史签到" @click="toUserSignPage">-->
        <!--          <template #icon>-->
        <!--            <van-icon name="records" size="23" style="margin-bottom: 8px;color: #0c9dea"/>-->
        <!--          </template>-->
        <!--        </van-grid-item>-->
        <!--        <van-grid-item text="联系作者" @click="customerService">-->
        <!--          <template #icon>-->
        <!--            <van-icon class-prefix="my-icon" name="fankui" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>-->
        <!--          </template>-->
        <!--        </van-grid-item>-->
      </van-grid>
      <van-cell title="我的信息" style="padding: 20px" is-link to="/user/update" :center="true">
        <template #icon>
          <van-icon name="setting-o" size="20" style="margin-right: 5px" color="#1989fa"/>
        </template>
      </van-cell>
      <div style="margin: 16px;">
        <van-button style="background-color:#f3f0f0 ;margin-left: 60px;margin-top: 10px;width: 220px; font-size: 16px"
                    round
                    type="default" native-type="submit"
                    @click="logout">
          退 出
        </van-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import myAxios from "../../plugins/MyAxios";
import moment from "moment";
import {Toast} from "vant";
import {getCurrentUser} from "../../service/user";

const router = useRouter()
const user = ref([])
const route = useRoute()
watch(route, (to, from) => {
  console.log("123")
  router.go(0)
})

const toUserUpdatePage = () => {
  router.push("/user/update")
}
const quite = () => {
  const result = myAxios.post("/user/outLogin")
      .then((res) => {
        if (res?.data === 1 && res?.code === 0) {
          Toast("退出成功")
          refresh();
        } else {
          Toast("退出失败")
        }
      })
}
onMounted(async () => {
  const result = await getCurrentUser()
  if (result) {
    user.value = result
    user.value.tags = JSON.parse(result.tags)
    // user.value = JSON.parse(result.tags)
    Toast("获得用户信息成功")
  } else {
    Toast("获得用户信息失败")
  }
})

const refresh = () => {
  location.reload();
}
</script>

<style scoped>
#userPage {
  margin-top: -20px;
}

:deep(.van-grid-item__text) {
  font-size: 12px;
}
</style>