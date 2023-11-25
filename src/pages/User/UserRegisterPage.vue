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

        <van-row justify="center">
          <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1"/>
        </van-row>

        <van-field
            v-model="registerUser.userAccount"
            :rules=Rules
            label="账号"
            name="userAccount"
            left-icon="user-o"
            placeholder="请输入账号"
        />

        <van-field
            v-model="registerUser.userName"
            label="用户名"
            name="userName"
            left-icon="edit"
            placeholder="请输入用户名"
        />
          <van-field
              v-model="registerUser.userPassword"
              :rules=Rules
              label="密码"
              left-icon="lock"
              name="userPassword"
              placeholder="请输入密码"
              type="password"
          />
        <van-field
            v-model="registerUser.checkPassword"
            :rules=Rules
            label="确认密码"
            left-icon="lock"
            name="checkPassword"
            placeholder="请再次输入密码"
            type="password"
        />

        <!--   todo 注册所需要的信息-->
        <!--        <van-field-->
        <!--            v-model="planetCode"-->
        <!--            :rules="[{ required: true, message: '请输入大学！' }]"-->
        <!--            label="编号"-->
        <!--            name="university"-->
        <!--            placeholder="请输入大学"-->
        <!--        />-->


        <van-field
            left-icon="comment"
            v-model="registerUser.email"
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

    </van-form>
  </van-row>


</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {Ref, ref} from 'vue';
import myAxios from "../../plugins/MyAxios";
import {Toast} from "vant";
import friend from '../../assets/logo.png';

const router = useRouter();
const route = useRoute();
const registerUser: Ref<{
  userAccount: string,
  email: string,
  userName: string,
  userPassword: string,
  checkPassword: string,
  captcha: string,
  avatarUrl: string
}> = ref({
  userAccount: '',
  userName: '',
  userPassword: '',
  checkPassword: '',
  email: '',
  captcha: '',
  avatarUrl: ''
});
const avatarUrl = ref('');
const fileList = ref([]);
const avatar = ref();
const time = ref("获取验证码")
const isClick = ref(true)
const checkCaptcha = ref("");
const gainCode = async () => {
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  let {email} = registerUser.value
  if (isClick) {
    if (regEmail.test(email)) {
      let res = await myAxios.get("/user/email?email=" + email);
      if (res.code == 0) {
        Toast.fail("该邮箱已被绑定")
      } else {
        const res = await myAxios.get("/mail/getCaptcha?email=" + email)  // 获取验证码接口
        if (res.code !== 0) {
          Toast.fail(res.description)
        } else {
          registerUser.value.captcha = res.data
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


// 验证器
const validatePasswordAndAccount = (value) => {
  // 修改特殊符号验证的正则表达式
  const specialCharPattern = /[!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]/;
  const chineseCharPattern = /[\u4E00-\u9FA5]/;

  if (specialCharPattern.test(value)) {
    return '不能包含特殊符号';
  } else if (chineseCharPattern.test(value)) {
    return '不能包含中文字符';
  } else if (value.length < 6 || value.length > 20) {
    return '长度必须在6到20个字符之间';
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
    return '必须包含字母和数字';
  } else {
    return true;
  }
};


const Rules = [
  {validator: validatePasswordAndAccount, message: '格式不正确'},
  { required: true, message: '请填写内容'}
];


const onSubmit = async () => {
  Toast.loading("注册中");
  console.log(checkCaptcha.value)
  console.log(registerUser.value.captcha)
  if (checkCaptcha.value !== registerUser.value.captcha) {
    Toast.fail("验证码不正确，请重新查看")
  } else {
    const uploadRes = await myAxios.post("/fileOss/upload", {
      'file': avatar.value,
      'userAccount': registerUser.value.userAccount
    }, {
      headers: {'Content-Type': 'multipart/form-data'},
    })

    if (uploadRes.code == 0) {
      registerUser.value.avatarUrl = uploadRes.data
    }


    const res = await myAxios.post("/user/register", registerUser.value)

    if (res.code == 0) {
      Toast.success("注册成功，等待跳转")
      setTimeout(() => {
        router.push("/user/login")
      }, 500)
    }

  }


};

const afterRead =  (file) => {
  // 此时可以自行将文件上传至服务器
  avatar.value = file.file
};

</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
