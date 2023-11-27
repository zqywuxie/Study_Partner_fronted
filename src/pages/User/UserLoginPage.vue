<template>
  <div class="UserLogin">
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
              left-icon="phone-o"
              :rules="[{ required: true, message: '请填写用户名' }]"
              label="账号"
              name="userAccount"
              placeholder="请输入账号"
          />
          <van-field
              v-model="password"
              left-icon="lock"
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
      <div class="ways" style="margin-top: -5px">
        <span>其他登录方式</span>
        <van-grid>
          <van-grid-item @click="()=>{Toast.fail('暂不支持QQ登录')}">
            <template #icon>
              <van-icon name="qq" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>
            </template>
          </van-grid-item>
          <van-grid-item @click="()=>{Toast.fail('暂不支持微信登录')}">
            <template #icon>
              <van-icon name="wechat" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>
            </template>
          </van-grid-item>
          <van-grid-item to="/user/email/login">
            <template #icon>
              <van-icon name="envelop-o" size="23" style="margin-bottom: 8px;color: #0a0dd2"/>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </van-row>
    <copyright/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import myAxios from "../../plugins/MyAxios.ts";
import {Toast} from "vant";
import {useRouter, useRoute} from "vue-router";
import friend from "../../assets/logo.png"
import Copyright from "../../components/CopyRight.vue";

const router = useRouter()
const route = useRoute()
const userAccount = ref('');
const password = ref('');

const onSubmit = async () => {
  const result = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: password.value
  })
  if (result.code === 0 && result.data) {
    Toast("登录成功")
    // const redirectUrl = route?.query?.redirect ?? '/'
    setTimeout(() => {
      window.location.href = "/"
    }, 1000)
  } else {
    Toast("登录失败")
  }
};

const QQLogin = ()=> {

}
</script>


<style scoped>

.ways {
  width: 80%;
  margin: 7.6667vw auto;
  text-align: center;
}

.ways > span {
  display: block;
  margin-bottom: 5.3333vw;
  color: #999999;
}

.ways div {
  display: flex;
  width: 80%;
  margin: 0 auto;
  justify-content: space-around;
}

.ways div span {
  font-size: 8.3333vw;
}

</style>