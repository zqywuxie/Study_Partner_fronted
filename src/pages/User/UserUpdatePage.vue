<template>
  <div id="userUpdatePage">
    <template v-if="user">
      <div>
        <van-cell icon="photo-o" title="头像" is-link center @click="handleClick">
          <van-image
              round
              width="3rem"
              height="3rem"
              :src="imgSrc"
          />

          <!--          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" preview-size="60px">-->
          <!--            <img :src="imgSrc" style="width: 48px;height: 48px;border-radius: 50%" alt=""/>-->
          <!--          </van-uploader>-->
        </van-cell>
        <van-cell icon="user-o" title="用户账号" :value="user.useraccount"/>
        <van-cell icon="contact" title="昵称" is-link :value="user.username"
                  @click="toEdit('username','昵称',user.username)"/>
        <van-cell title="标签" @click="toEdit('tags', '标签', user.tags)" is-link>
          <template #icon>
            <van-icon name="like-o" style="top: 5px;margin-left: 5px;right: 5px;color: #ff0000"/>
          </template>
        </van-cell>
        <van-cell icon="award-o" :value="user.profile" center is-link title="个人简介" to="/user/edit"
                  @click="toEdit('profile', '个人简介', user.profile)"/>
        <!--            <van-text-ellipsis :content="user.profile || '还没有填写个性签名'"/>-->

        <!--       todo 更新 /-->
        <van-cell icon="user-circle-o" title="性别" is-link @click="()=>showPicker=true">
          <span v-if="user.gender===1">男</span>
          <span v-if="user.gender===0">女</span>
          <span v-if="user.gender===2">保密</span>
          <span v-if="user.gender!=0&&user.gender!=1&&user.gender!=2">{{ "还没有填写性别" }}</span>
          <template #icon>
            <van-icon v-if="user.gender===1" name="user-circle-o"
                      style="top: 5px;margin-left: 5px;right: 5px;color: #0029ff"/>
            <van-icon v-if="user.gender===0" name="user-circle-o"
                      style="top: 5px;margin-left: 5px;right: 5px;color: #ff0000"/>
            <van-icon v-if="user.gender===2" name="user-circle-o" style="top: 5px;margin-left: 5px;right: 5px"/>
          </template>
        </van-cell>
        <van-cell icon="phone-o" title="电话" is-link :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
        <van-cell icon="send-gift-o" title="邮箱" is-link :value="user.email || '还没有填写邮箱'"
                  @click="toEdit('email','邮箱',user.email)"/>
        <van-cell icon="setting-o" title="修改密码" is-link to="/update/password"/>
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
              title="性别"
              :columns="genders"
              @confirm="onConfirmGender"
              @cancel="()=>showPicker=false"
          />
        </van-popup>

        <van-dialog v-model:show="showDialog" title="更换头像" @confirm="handleConfirm" show-cancel-button>
          <div class="uploader-container">
            <van-uploader
                v-model="fileList"
                :max-count="1"
                preview-size="200px"
                :max-size="2 * 1024 * 1024"
                @oversize="overSize"
            >
              <img :src="imgSrc" style="width: 100%; height: 100%; border-radius: 50%" alt=""/>
            </van-uploader>
          </div>
        </van-dialog>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {onMounted, ref, watch, watchEffect} from "vue";
import {getCurrentUser} from "../../service/user";
import myAxios from "../../plugins/MyAxios";
import {Dialog, Toast} from "vant";
import {setCurrentUserState} from "../../state/user";

const VanDialog = Dialog.Component;

const user = ref();
const showGenderEdit = ref(false);
const gender = ref();
const imgSrc = ref('')
const showPicker = ref(false);
const showDialog = ref(false)
const fileList = ref([]);
const genders = [
  {text: '男', value: '1'},
  {text: '女', value: '0'},
  {text: '保密', value: '2'}
];
onMounted(async () => {
  user.value = await getCurrentUser();
  gender.value = user.value.gender + '';
  imgSrc.value = user.value.avatarUrl
})

const router = useRouter();
const handleClick = () => {
  showDialog.value = true
}


const handleConfirm = async () => {
  let formData = new FormData();
  formData.append("file", fileList.value[0].file)
  formData.append("useraccount", user.value.useraccount)

  //todo 更新头像
  formData.append("type", "update_avatar")
  const res = await myAxios.post("/fileOss/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  console.log(res)
  if (res?.code === 0) {
    Toast.success("更新成功")
    imgSrc.value = res?.data
  } else {
    Toast.fail("更新失败：" + res.message)
  }
  fileList.value = []
}
const refresh = () => {
  location.reload();
}
const onConfirmGender = async ({value}) => {
  const res = await myAxios.post("/user/update", {
    gender: value,
    id: user.value.id
  })
  if (res?.code === 0) {
    Toast.success("修改成功")
  } else {
    Toast.fail("修改失败")
  }
  showPicker.value = false
  // todo 刷新的方法
  refresh()
};
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  if (editKey === 'tags') {
    if (currentValue == null) {
      currentValue = '';
    }

    router.push({
      path: '/user/editTag',
      query: {
        currentValue,
      }
    })
  } else {
    if (editKey == 'gender') {
      currentValue === '1' ? '男' : '女'
    }
    router.push({
      path: '/user/edit',
      query: {
        editKey,
        editName,
        currentValue,
      }
    })
  }
}

const overSize = () => {
  Toast.fail("单个图片不能超过2M")
}

const doEditGender = async () => {
  const res = await myAxios.post("/user/update", {
    'id': user.value.id,
    'gender': gender.value,
  })
  if (res.code === 0 && res.data > 0) {
    Toast.success("修改成功！");
    window.location.reload();
  } else {
    Toast.fail("更新失败！");
  }
}
</script>

<style scoped>
#userUpdatePage {
  margin-top: -25px;
}

:deep(.van-uploader__upload) {
  border-radius: 50%;
}

:deep(.van-uploader__preview-image) {
  border-radius: 50%;
}

:deep(.van-cell) {
  padding-left: 23px;
  padding-right: 16px;
}
</style>
