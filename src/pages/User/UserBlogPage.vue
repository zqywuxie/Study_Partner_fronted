<template>
  <div id="userBlogPage">
    <van-pull-refresh
        v-model="refreshLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
    >
      <van-list
          style="margin: 15px"
          v-model:loading="listLoading"
          :finished="listFinished"
          offset="0"
          finished-text="没有更多了"
          @load="onLoad"
      >
<!--        <template #loading>-->
<!--          <van-skeleton>-->
<!--            <template #template>-->
<!--              <div style="display: flex;width: 100%;margin: 15px">-->
<!--                <div :style="{ flex: 1, marginLeft: '16px' }">-->
<!--                  <van-skeleton-paragraph row-width="60%"/>-->
<!--                  <van-skeleton-paragraph row-width="60%"/>-->
<!--                </div>-->
<!--                <van-skeleton-image/>-->
<!--              </div>-->
<!--            </template>-->
<!--          </van-skeleton>-->
<!--        </template>-->
        <blog-card-list :blog-list="blogList"/>
      </van-list>
    </van-pull-refresh>
    <van-empty v-if="blogList?.length<1 && !listLoading" description="数据为空"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import BlogCardList from "../../components/BlogCardList.vue";
import myAxios from "../../plugins/MyAxios.js";
import {Toast} from "vant";

let router = useRouter();
const refreshLoading = ref(false)
const listLoading = ref(false)
const listFinished = ref(false)
const currentPage = ref(0)
const blogList = ref([])

const onLoad = () => {
  currentPage.value++
  listBlogs(currentPage.value)
}

async function listBlogs(currentPage) {
  listLoading.value = true
  const res = await myAxios.get("/blog/list/my/blog?currentPage=" + currentPage)
  console.log(res)
  if (res?.code === 0) {
    if (res.data.records.length === 0) {
      listFinished.value = true
      return
    } else {
      res.data.records.forEach(blog => blogList.value.push(blog))
    }
  } else {
    Toast.fail("博文加载失败，请稍后重试")
  }
  listLoading.value = false
}

const onRefresh = async () => {
  blogList.value = []
  listFinished.value = false
  currentPage.value = 1
  await listBlogs(currentPage.value)
  refreshLoading.value = false
}
</script>

<style scoped>
#userBlogPage {
  margin-top: -25px;
}

</style>
