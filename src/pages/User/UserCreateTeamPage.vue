<template>
  <div id="teamPage">
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
const value = ref('');
const onSearch = (val) => {
  listTeam(val);
};

const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/my/create");
  if (res.code == 0) {
    teamList.value = res?.data
  } else {
    Toast.fail("队伍加载失败,请重试加载")
  }
}
onMounted(async () => {
  listTeam();
})
const doJoinTeam = () => {
  router.push(({
    path: "/team/add"
  }))
}
</script>

<style scoped>

</style>