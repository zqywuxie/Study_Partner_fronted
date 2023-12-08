<template>
  <div id="teamPage">
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="secret"/>
    </van-tabs>
    <van-button type="primary" @click="toggleButtons" class="ellipsis_button" icon="ellipsis"></van-button>
    <div v-if="showButtons" class="button-group">
      <van-button type="primary" @click="toSearch" class="search_button" icon="search"></van-button>
      <van-button type="primary" @click="toAddTeam" class="add_button" icon="plus"></van-button>
      <van-button type="primary" @click="toggleButtons" class="ellipsis_button" icon="ellipsis"></van-button>

    </div>
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="!teamList||teamList.length<1" description="数据为空"/>
  </div>


  <div v-if="showInput" class="comment-overlay" @click="toggleCommentInput">
    <div class="comment-input-container">
      <van-field
          left-icon="info"
          v-model="searchText"
          :autosize="{ minHeight: 32 }"
          type="textarea"
          rows="1"
          placeholder="队伍名/介绍(模糊查询)"
          :border="false"
          style="flex: 1; position: relative; padding-left: 16px; border-bottom: 1px solid #C1C1C1; padding-right: 2px;"
          @click.stop
          ref="commentInput"
      />

      <van-icon
          class-prefix="my-icon"
          name="shangchuan"
          size="40"
          color="#4387f6"
          @click="toTeamResult"
      />
    </div>
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
const showButtons = ref(false)
const showInput = ref(false)
const toSearch = () => {
  showInput.value = true
};

const toggleCommentInput = () => {
  showInput.value = !showInput.value;
}
const toggleButtons = () => {
  showButtons.value = !showButtons.value;
}

const toTeamResult = async () => {
  let public_val = await searchTeam(searchText.value, 0)
  let private_val = await searchTeam(searchText.value, 1)
  let res = public_val.concat(private_val)
  await router.push({
    path: '/team/search',
    query: {
      teamList: JSON.stringify(res)
    }
  })
}
const searchTeam = async (val, status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status
    }
  });
  if (res.code == 0) {
    Toast.success('搜索队伍成功，准备展示')
    return res.data
  } else {
    Toast.fail("搜索队伍失败,请重试加载或联系管理员")
  }
}
const listTeam = async (val, status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status
    }
  });
  console.log(res)
  if (res.code == 0) {
    teamList.value = res?.data
  } else {
    Toast.fail("队伍加载失败,请重试加载")
  }
}
onMounted(async () => {
  await listTeam('');
})
const toAddTeam = () => {
  router.push(({
    path: "/team/add"
  }))
}

const onTabChange = (name) => {
  if (name == 'public') {
    listTeam('', 0)
  } else {
    listTeam('', 1)
  }
}
</script>

<style scoped>
.comment-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; /* 添加淡入淡出的过渡效果 */
  z-index: 9999;
}

.comment-overlay.active {
  background-color: rgba(0, 0, 0, 0.5); /* 显示时的背景颜色 */
}


.comment-input-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 80%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
}

/* Add the following style to override the transparency in the van-field */
.comment-input-container .van-field {
  background-color: #ffffff !important; /* Use !important to ensure it overrides other styles */
}
</style>