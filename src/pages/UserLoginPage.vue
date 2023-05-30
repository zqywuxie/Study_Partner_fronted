<template>
  <van-row justify="center">
    <van-form @submit="onSubmit">


      <!-- 居中 -->
      <van-row justify="center">
        <van-image
            :src="friend"
            height="5rem"
            position="center"
            round
            width="5rem"/>
      </van-row>

      <van-row justify="center">
        <h3>"寻找志同道合的朋友"</h3>
      </van-row>
      <van-divider/>
      <van-cell-group inset>
        <van-field
            v-model="userAccount"
            :rules="[{ required: true, message: '请填写用户名' }]"
            label="账号"
            name="userAccount"
            placeholder="请输入账号"
        />
        <van-field
            v-model="password"
            :rules="[{ required: true, message: '请填写密码' }]"
            label="密码"
            name="userPassword"
            placeholder="请输入密码"
            type="password"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button block native-type="submit" round type="primary">
          提交
        </van-button>
      </div>
      <van-divider/>

      <van-cell title="" to="/user/register" value="还没有账号？注册"></van-cell>

    </van-form>
  </van-row>
  <copyright/>
</template>

<script setup>
import {ref} from "vue";
import myAxios from "../plugins/MyAxios.ts";
import {Toast} from "vant";
import {useRouter, useRoute} from "vue-router";
import friend from "../assets/logo.png"
import Copyright from "../components/CopyRight.vue";
const router = useRouter()
const route = useRoute()
const userAccount = ref('');
const password = ref('');

const onSubmit = async () => {
  const result = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: password.value
  })
  console.log(result)
  if (result.code === 0 && result.data) {
    Toast("登录成功")
    const redirectUrl=route?.query?.redirect??'/'
    window.location.href=redirectUrl
  } else {
    Toast("登录失败")
  }
};
</script>

<style scoped>

</style>