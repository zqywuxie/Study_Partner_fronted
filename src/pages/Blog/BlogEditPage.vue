<template>
  <div id="blogEditPage">
    <van-field
        v-model="title"
        show-error
        label="标题"
        placeholder="请输入博文标题"
        style="margin-bottom: 15px; border-radius: 12px;"
        input-align="center"
        :rules="[{ required: true, message: '请输入博文标题' }]"
    />

    <van-field
        v-model="content"
        rows="4"
        autosize
        type="textarea"
        label="内容"
        placeholder="请输入博文内容"
        style="margin-bottom: 15px; border-radius: 12px;"
        input-align="center"
        :rules="[{ required: true, message: '请输入博文内容' }]"
    />

    <van-uploader
        v-model="fileList"
        preview-size="100"
        multiple
        :max-count="5"
        :max-size="2 * 1024 * 1024"
        @oversize="overSize"
        :preview-full-image="false"
        style="margin-bottom: 15px; border-radius: 12px;"
    >
      <template #default>
        <div class="updateArea">
          <van-icon name="add-o" class="updateIcon" size="50px" />
        </div>
      </template>
    </van-uploader>

    <van-button
        style="width: 80%; margin-left: 10%; margin-top: 10px; border-radius: 12px;"
        plain
        round
        type="primary"
        @click="publishBlog"
    >
      发布
    </van-button>

    <van-overlay :show="addingOverlay">
      <div class="wrapper">
        <van-loading vertical>
          <template #icon>
            <van-icon name="star-o" size="30" />
          </template>
          添加中...
        </van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {getCurrentUser} from "../../service/user";
import myAxios from "../../plugins/MyAxios";

const addingOverlay = ref(false)
const fileList = ref([])
const title = ref("")
const content = ref("")
const router = useRouter()
const user = ref()
const blogId = ref()
const onClickLeft = () => {
  router.push("/")
};
const publishBlog = async () => {
  if (title.value === '') {
    Toast.fail("请填写标题")
  }
  if (content.value === '') {
    Toast.fail("请填写正文")
  }
  addingOverlay.value = true
  if (!blogId.value) {
    let formData = new FormData();
    for (let i = 0; i < fileList.value.length; i++) {
      formData.append("images", fileList.value[i].file)
    }
    formData.append("title", title.value)
    formData.append("content", content.value)
    let res = await myAxios.post("/blog/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    if (res?.code === 0) {
      addingOverlay.value = false
      Toast.success("添加成功")
      await router.replace("/")
    } else {
      addingOverlay.value = false
      Toast.success("添加失败" + (res.message ? `,${res.message}` : ''))
    }
  } else {
    let formData = new FormData();
    formData.append("id", blogId.value)
    const imgStr = []
    for (let i = 0; i < fileList.value.length; i++) {
      if (fileList.value[i].url) {
        imgStr.push(fileList.value[i].url)
      } else {
        formData.append("images", fileList.value[i].file)
      }
    }
    let finalImgStr = imgStr.join(",");
    formData.append("imgStr", finalImgStr)
    formData.append("title", title.value)
    formData.append("content", content.value)
    let res = await myAxios.put("/blog/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    if (res?.code === 0) {
      addingOverlay.value = false
      Toast.success("更新成功")
      await router.replace("/blog?id=" + blogId.value)
    } else {
      addingOverlay.value = false
      Toast.fail("更新失败," + (res.message ? `,${res.message}` : ''))
    }
  }
};
const overSize = () => {
  Toast.fail("单个图片不能超过2M")
}
let route = useRoute();
onMounted(async () => {
  if (route.query.id) {
    blogId.value = route.query.id
  }
  if (route.query.images) {
    route.query.images.forEach((item) => {
      const image = {
        url: item,
        isImage: true
      }
      fileList.value.push(image)
    })
  }
  if (route.query.title) {
    title.value = route.query.title
  }
  if (route.query.content) {
    content.value = route.query.content
  }
  let currentUser = await getCurrentUser();
  if (currentUser) {
    user.value = currentUser
  } else {
    Toast.fail("未登录")
    await router.replace("/user/login")
  }
})
</script>

<style scoped>
#blogEditPage {
  padding: 15px;
}

.updateArea {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.updateIcon {
  color: #1989fa;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
