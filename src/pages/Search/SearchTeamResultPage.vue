<template>
  <team-card-list :team-list="res" :loading="loading"></team-card-list>
  <van-empty v-if="!res||res.length<1" description="搜索结果为空"/>
</template>

<script setup>
import {useRoute} from "vue-router";
import myAxios from "../../plugins/MyAxios.ts";
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import qs from "qs"
import UserCardList from "../../components/UserCardList.vue";
import TeamCardList from "../../components/TeamCardList.vue";

const route = useRoute()
const loading = ref(true)
const res = ref()
onMounted(async () => {
  res.value = JSON.parse(route.query.teamList)
  console.log(res)
  loading.value = false
})

</script>

<style scoped>

</style>