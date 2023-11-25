<template>
  <van-form @submit="onSubmit">
    <van-field
        v-if="isShow"
        v-model="editUser.editValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="editUser.editName"
        :rules="[{ required: true, message: '请输入内容' }]"
    />
    <van-row v-if="editUser.editName==='个人简介'" justify="center">
      <van-cell-group inset>
        <van-field
            v-model="editUser.editValue"
            rows="5"
            autosize
            label="个人简介"
            type="textarea"
            maxlength="50"
            placeholder="请输入个人简介"
            show-word-limit
        />
      </van-cell-group>

    </van-row>
    <van-row v-if="editUser.editName==='头像'" justify="center">
      <van-cell center title="头像">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #value>
          <van-uploader v-model="fileList" :after-read="OnAfterRead" max-count="1"
                        multiple/>
        </template>
      </van-cell>

    </van-row>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import myAxios from "../../plugins/MyAxios";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {getCurrentUser} from "../../service/user";
import * as compressorjs from "compressorjs";
import {setCurrentUserState} from "../../state/user";

const router = useRouter()
const isShow = ref(true);
//获得跳转路由的数据
const route = useRoute()
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  editValue: route.query.currentValue
})
const fileList = ref([
  {url: editUser.value.editValue, isImage: true},
]);
onMounted(async () => {
  if (editUser.value.editName === '头像' || editUser.value.editName === '个人简介') {
    isShow.value = false;
  }
});


// todo
const OnAfterRead = async (file) => {
  const fileFile = file.file
  const res = await myAxios.post("/fileOss/upload", {
    'file': fileFile
  }, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
  editUser.value.editValue = res.data;
  // 此时可以自行将文件上传至服务器
};
// const goBack = () => {
//   router.go(-1)
//   location.reload()
// }
const onSubmit = async () => {

  const currentUser = await getCurrentUser();
  if (editUser.value.editKey == 'gender') {
    editUser.value.editValue = (editUser.value.editValue == '女' ? '1' : '0')
  }
  if (!currentUser) {
    Toast.fail("用户未登录")
    return
  }
  const result = await myAxios.post('/user/update', {
    'id': currentUser.id,
    //动态传参
    [editUser.value.editKey as string]: editUser.value.editValue,
  });
  if (result.code === 0 && result.data > 0) {
    Toast.success("更新成功")
    setTimeout(() => {
      router.go(-1)
      //todo 缓存中的user信息删除
      setCurrentUserState(null)
      // todo 返回刷新了界面
      // window.location.href = "/user/update"
    }, 1000)

  } else {
    Toast.fail("更新失败")
  }

};
</script>

<style scoped>

</style>