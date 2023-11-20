<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="secret"/>
    </van-tabs>

    <van-button type="primary" @click="toAddTeam" class="add_button" icon="plus"/>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="!teamList||teamList.length<1" description="数据为空"/>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/MyAxios.ts";
import TeamCardList from "../../components/TeamCardList.vue";
import {Toast} from "vant";

const router = useRouter()
const teamList = ref([])
const searchText = ref('');
const active = ref(0);
const onSearch = (val) => {
  listTeam(val);
};

const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status
    }
  });
  if (res.code == 0) {
    teamList.value = res?.data
  } else {
    Toast.fail("队伍加载失败,请重试加载")
  }
}
onMounted(async () => {
  listTeam();
})
const toAddTeam = () => {
  router.push(({
    path: "/team/add"
  }))
}

const onTabChange = (name) => {
  if (name == 'public') {
    listTeam(searchText.value, 0)
  } else {
    listTeam(searchText.value, 2)
  }
}
</script>

<style scoped>
</style>