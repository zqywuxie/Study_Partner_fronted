<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="updateTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="updateTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="updateTeamData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
              v-model="updateTeamData.expireTime"
              @confirm="showPicker = false"
              @cancel="showPicker=false"
              type="datetime"
              title="请选择过期时间"
              :min-date="minDate"
          />
        </van-popup>
        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="updateTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="updateTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(updateTeamData.status) === 2"
            v-model="updateTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
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

import {useRouter, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/MyAxios";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();
// 展示日期选择器
const showPicker = ref(false);
const minDate = new Date();
const updateTeamData = ref({})
const id = route.query.id;
onMounted(async () => {
  if (id <= 0) {
    Toast.fail("查询队伍不存在");
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id: id
    }
  })
  if (res?.code === 0) {
    updateTeamData.value = res.data
  } else {
    Toast.fail("加载队伍失败,请重新尝试")
  }
})

// 提交
const onSubmit = async () => {
  const postData = {
    ...updateTeamData.value,
    status: Number(updateTeamData.value.status)
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    Toast.success('更新成功');
    router.push({
      path: '/team',
      //replace 表示无法回退页面
      replace: true,
    });
  } else {
    Toast.success('更新失败');
  }
}
</script>

<style scoped>
#teamPage {

}
</style>
