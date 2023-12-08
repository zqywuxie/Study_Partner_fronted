<template>
  <van-row justify="center">
    <van-image
        width="100"
        :src=campusImage
        style="background-position:center"
    />
  </van-row>
  <!--  第一步根据邮箱判断用户 /-->
  <div v-if="one">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="email"
            name="useraccount"
            label="邮箱"
            placeholder="请输入绑定的邮箱"
            :rules="[{ required: true, message: '请输入绑定的邮箱' }]"
        />
      </van-cell-group>
      <div style="margin: 30px 16px 16px;">
        <van-button style="margin-top: 10px" round block type="primary" native-type="submit">
          确认
        </van-button>
      </div>
    </van-form>
  </div>
  <!-- 第二部输入验证码-->
  <div v-if="two">
    <van-cell center>
      <template #title>
        <!--        <span style="font-size: 20px;font-weight: bold;margin-left: 16px">为{{ username }}修改密码</span>-->
        <span style="font-size: 20px;font-weight: bold;margin-left: 16px">输入验证码</span>

      </template>
      <van-button size="small" type="primary" @click="gainCode">{{ time }}</van-button>

    </van-cell>
    <van-password-input
        :value="captcha"
        :length="4"
        :mask="false"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
    />
    <van-number-keyboard
        v-model="captcha"
        :show="showKeyboard"
        @blur="showKeyboard = false"
    />
    <div style="margin: 30px 16px 16px;">
      <van-button style="margin-top: 10px" round block type="primary" @click="checkCode">
        确认
      </van-button>
    </div>
  </div>
  <div v-if="three">
    <van-field
        v-model="password"
        required
        type="password"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
    />
    <van-field
        v-model="confirmPassword"
        required
        type="password"
        label="确认新密码"
        placeholder="请输入新密码"
        :rules="[{ validator, message: '两次输入的密码不一致' }]"
    />
    <div style="margin: 30px 16px 16px;">
      <van-button style="margin-top: 10px" round block type="primary" @click="confirmUpdate">
        确认
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../../plugins/MyAxios";
import {Toast} from "vant";
import campusImage from "../../assets/logo.png"

const time = ref("获取验证码")
const isClick = ref(true)

const one = ref(true)
const two = ref(false)
const three = ref(false)
const confirmPassword = ref('')
const password = ref('');
let code = ref('');
const captcha = ref('')
const showKeyboard = ref(false);
let router = useRouter();
const email = ref()
const gainCode = async () => {
  if (isClick) {
    const res = await myAxios.get("/mail/getCaptcha?email=" + email.value)  // 获取验证码接口
    if (res.code !== 0) {
      Toast.fail(res.description)
    } else {
      code.value = res.data
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
}
const onClickLeft = () => {
  router.push("/")
};
const validator = () => {
  return password.value === confirmPassword.value;
}
const username = ref("")
const onSubmit = async () => {
  let res = await myAxios.get("/user/email?email=" + email.value);
  if (res?.code === 0) {
    username.value = res.data
    // code.value = await myAxios.get("/mail/getCaptcha?email=" + email.value)
    one.value = false
    two.value = true
  } else {
    Toast("失败" + (res.data.message ? `,${res.data.message}` : ''))
  }
}
const checkCode = async () => {
  if (code.value == captcha.value) {
    two.value = false
    three.value = true
  } else {
    Toast("验证码不正确，请重新输入")
  }
}
const confirmUpdate = async () => {
  if (password.value != confirmPassword.value) {
    Toast.fail("两次密码输入不一致")
    //todo
  } else {
    let res = await myAxios.put("/user/forget/update", {
      email: email.value,
      password: password.value,
    });
    if (res?.code === 0) {
      Toast.success("修改密码成功")
      await router.replace("/user")
    } else {
      Toast.fail("修改密码失败" + (res.message ? `,${res.message}` : ''))
    }
  }

}
</script>

<style scoped>

</style>
