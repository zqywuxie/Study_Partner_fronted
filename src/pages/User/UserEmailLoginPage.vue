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
              left-icon="comment"
              v-model="email"
              :rules="[{ required: true, message: '请填写邮箱' }]"
              label="邮箱"
              name="userAccount"
              placeholder="请输入邮箱"
          />
          <van-field
              v-model="checkCaptcha"
              center
              left-icon="sign"
              name="captcha"
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请填写验证码'} ]"
          >
            <template #button>
              <van-button size="small" type="primary" @click="gainCode">{{ time }}</van-button>
            </template>
          </van-field>
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
const email = ref('');
const password = ref('');

const captcha = ref("");
const checkCaptcha = ref("");
const time = ref("获取验证码")
const isClick = ref(true)
const gainCode = async () => {
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  if (isClick) {
    if (regEmail.test(email.value)) {


      let emailUser = await myAxios.get("/user/email?email=" + email);
      if (emailUser.code != 0) {
        Toast.fail(emailUser.description)
      } else {
        const res = await myAxios.get("/mail/getCaptcha?email=" + email.value)  // 获取验证码接口
        if (res.code !== 0) {
          Toast.fail(res.description)
        } else {
          captcha.value = res.data
          Toast.success("验证码发送成功")
          isClick.value = false
          let s = 60
          time.value = s + 's'
          let interval = setInterval(() => {
            s--
            time.value = s + 's'
            if (s < 0) {
              time.value = '重新获取'
              isClick.value = true
              clearInterval(interval)
            }
          }, 1000)
        }
      }


    } else {
      Toast.fail('请输入正确的邮箱')
    }
  }
}
const onSubmit = async () => {
  if (captcha.value !== checkCaptcha.value) {
    Toast.fail("验证码不正确，请重新输入")
  } else {
    const result = await myAxios.post('/user/email/login', {
      email: email.value,
      captcha: captcha.value
    })
    // todo
    console.log(result)
    if (result.code === 0 && result.data) {
      Toast.success("登录成功")
      // const redirectUrl = route?.query?.redirect ?? '/'
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    } else {
      Toast.fail("登录失败")
    }
  }

};
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