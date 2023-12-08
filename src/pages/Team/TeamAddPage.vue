<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>

        <van-row justify="center">
          <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1"/>
        </van-row>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
            left-icon="search"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
            left-icon="description"
        />
        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
            left-icon="underway-o"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
              v-model="addTeamData.expireTime"
              @confirm="showPicker = false"
              type="datetime"
              title="请选择过期时间"
              :min-date="minDate"
          />
        </van-popup>
        <van-field name="stepper" label="最大人数" left-icon="friends-o">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态" left-icon="clock-o">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 1"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="Rules"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../../plugins/MyAxios";
import {Toast} from "vant";


const validatePassword = (value) => {

  if (value.length < 6 || value.length > 20) {
    return '长度必须在6到20个字符之间';
  }
};
const Rules = [
  {required: true, message: '请填写内容'},
  {validator: validatePassword},
];
const fileList = ref([]);
const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  avatar.value = file.file
};
const router = useRouter();
// 展示日期选择器
const showPicker = ref(false);

const avatar = ref()

const minDate = new Date();

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "password": "",
  "status": 0,
  "avatarUrl": ""
}


// 需要用户填写的表单数据
const addTeamData = ref({...initFormData})

// 提交
const onSubmit = async () => {
  const uploadRes = await myAxios.post("/fileOss/upload", {
    'file': avatar.value,
  }, {
    headers: {'Content-Type': 'multipart/form-data'},
  })

  console.log(uploadRes)
  if (uploadRes.code == 0) {
    addTeamData.value.avatarUrl = uploadRes.data
  }

  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    Toast.success('队伍添加成功，正在跳转');
    setTimeout(() => {
      router.push({
        path: '/team',
        //replace 表示无法回退页面
        replace: true,
      });
    }, 500)

  } else {
    Toast.success('添加失败');
  }
}
</script>

<style scoped>
#teamPage {

}
</style>
