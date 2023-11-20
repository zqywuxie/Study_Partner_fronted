<template>
  <template v-if="teamData">
    <van-cell-group inset>
      <van-cell>
        <van-card
            :desc="teamData.description"
            :thumb="teamData.avatarUrl===null || teamData.avatarUrl==='' ? teamImgs[Math.round(Math.random()*4)]:teamData.avatarUrl"
            :title="teamData?.name"
        >
          <template #tags>
            <van-tag plain style="margin-right: 8px; margin-top: 8px" type="danger">
              {{
                teamStatusEnum[teamData.status]
              }}
            </van-tag>
          </template>
        </van-card>
      </van-cell>
      <van-divider/>
      <van-cell :value="teamData.id" center title="队伍ID">
        <template #icon>
          <van-icon name="points" size="18"/>
        </template>
      </van-cell>
      <van-divider/>
      <van-cell :value="teamData.name" center title="队伍名">
        <template #icon>
          <van-icon name="award-o" size="18"/>
        </template>
      </van-cell>
      <van-divider/>
      <van-cell :value="teamData.createUser.username" center title="队长">
        <template #icon>
          <van-icon name="manager-o" size="18"/>
        </template>
      </van-cell>
      <van-divider/>
      <van-cell :value="teamData.description" center title="队伍描述">
        <template #icon>
          <van-icon name="label-o" size="18"/>
        </template>
      </van-cell>
      <van-divider/>
      <van-cell :value="teamData.hasJoinNum+' / '+teamData.maxNum" center title="队伍人数">
        <template #icon>
          <van-icon name="friends-o" size="18"/>
        </template>
      </van-cell>
      <van-divider/>
      <van-cell v-if="teamData.expireTime" :value="moment(teamData.expireTime).format('yyyy-MM-DD HH:mm:ss')"
                center title="过期时间">
        <template #icon>
          <van-icon name="underway-o" size="18"/>
        </template>
      </van-cell>
      <van-divider/>
      <van-popover v-model:show="showPopover" placement="right-start">
        <van-grid
            :border="false"
            clickable
            column-num="3"
            square
            style="width: 240px;"
        >
          <van-grid-item
              v-for="operation in operations"
              :icon="operation.icon"
              :text="operation.text"
              @click="doClickEvent(operation.clickEvent)"
          />
        </van-grid>
        <template #reference>
          <van-cell center title="操作">
            <template #icon>
              <van-icon name="info-o" size="18"/>
            </template>
          </van-cell>
        </template>
      </van-popover>
      <van-divider content-position="left">队伍成员</van-divider>
      <user-card-list :loading="false" :userList="teamData.joinUserList"></user-card-list>
    </van-cell-group>
  </template>
  <!--  <van-dialog v-model:show="showPasswordDialog" show-cancel-button title="请输入密码" @cancel="doJoinCancel"-->
  <!--              @confirm="doJoinTeam">-->
  <!--    <van-field v-model="password" placeholder="请输入密码" type="password"/>-->
  <!--  </van-dialog>-->
</template>

<script lang="ts" setup>

// 获取之前的队伍信息
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";
import myAxios from "../../plugins/MyAxios";
import {teamStatusEnum} from "../../constants/team";
import teamImgs from "../../service/teamImg";
import moment from "moment";
import UserCardList from "../../components/UserCardList.vue";
import {TeamType} from "../../models/team";
import {getCurrentUser} from "../../service/user";

const route = useRoute();
const router = useRouter();
const teamData = ref();
const showPasswordDialog = ref(false);
const password = ref('');
const currentUser = ref();
const joinTeamId = ref();
const showPopover = ref(false);
const operations = ref([]);

const id = route.query.id;
onMounted(async () => {
      currentUser.value = await getCurrentUser();
      if (id <= 0) {
        Toast.fail('加载队伍失败');
        return;
      }
      const res = await myAxios.get("/team/get", {
        params: {
          id,
        }
      });
      console.log(res)

      if (res?.code === 0) {
      // 对tags进行json序列化
        if (res.data) {
          res.data.joinUserList.forEach(user => {
            if (user) {
              user.tags = JSON.parse(user.tags)
            }
          })
        }
        teamData.value = res.data;
      } else {
        Toast.fail('加载队伍失败' + res.description);
        router.push({
          path: '/team',
        })
      }

      if (teamData.value.userId === currentUser.value?.id) {
        operations.value.push({text: '更新队伍', clickEvent: "updateTeam", icon: "add-o"});
      }

      if (!teamData.value.hasJoin) {
        operations.value.push({text: '加入队伍', clickEvent: "joinTeam", icon: "contact"});
      } else {
        operations.value.push({text: '退出队伍', clickEvent: "quitTeam", icon: "close"});
      }

      if (teamData.value.userId === currentUser.value?.id) {
        operations.value.push({text: '解散队伍', clickEvent: "deleteTeam", icon: "delete"});
      }

    }
)

const doClickEvent = (operationName: string) => {
  if (operationName === "joinTeam") {
    preJoinTeam(teamData.value);
  }
  if (operationName === "quitTeam") {
    doQuitTeam(teamData.value.id);
  }
  if (operationName === "updateTeam") {
    doUpdateTeam(teamData.value.id);
  }
  if (operationName === "deleteTeam") {
    doDeleteTeam(teamData.value.id);
  }
}

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}


const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    Toast.success('加入成功');
    doJoinCancel();

  } else {
    Toast.fail('加入失败' + (res.description ? `，${res.description}` : ''));
    doJoinCancel();
  }
}
const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    Toast.success('退出成功');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    Toast.fail('退出失败' + (res.description ? `，${res.description}` : ''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    teamId: id
  });
  if (res?.code === 0) {
    Toast.success('退出成功');
    router.push({
      path: '/team',
      replace: true,
    });
  } else {
    Toast.fail('退出失败' + (res.description ? `，${res.description}` : ''));
  }
}
</script>

<style scoped>

</style>
