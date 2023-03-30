<template>
  <div>
    <van-card
        v-for="team in props.teamList"
        :thumb="avatar"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ '最大人数: ' + team.maxNum }}
        </div>
        <div>
          {{ `队伍人数: : ${team.hasJoinNum}/${team.maxNum} ` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + moment(team.expireTime).format('YYYY-MM-DD HH:mm:ss') }}
        </div>
        <div>
          {{ '创建时间: ' + moment(team.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="!team.hasJoin&&team.userId!==currentUser?.id" size="small" type="primary" plain
                    @click="preJoinTeam(team)">加入队伍
        </van-button>

        <van-button v-if="currentUser?.id==team.userId" size="small" plain @click="doUpdateTeam(team.id)">更新队伍
        </van-button>

        <van-button v-if="team.hasJoin" size="small" plain @click="doTeamDetail(team.id)">查看队伍
        </van-button>
        <van-button v-if="team.hasJoin&&team.userId!=currentUser?.id" size="small" type="primary"
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="currentUser?.id==team.userId" size="small" type="primary" @click="doDeleteTeam(team.id)">
          解散队伍
        </van-button>
      </template>
    </van-card>
    <van-popup v-model:show="show" closeable @close="canclePopup">
      <div class="popup">
        <div class="popup_title">
          <div class="popup_title_">请输入队伍密码</div>
        </div>
        <!-- 密码输入框 -->
        <van-password-input
            :value="password"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
        />
        <div class="popup_yes" @click="onpaymentyes">确认</div>
      </div>
    </van-popup>
    <div class="popup_">
      <!-- 数字键盘 -->
      <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import avatar from "../assets/avatar.jpg"
import moment from "moment";
import myAxios from "../plugins/MyAxios";
import {useRouter} from "vue-router";

import {Toast} from "vant";

import {getCurrentUser} from "../service/user";
import {onMounted, ref} from "vue";

const show = ref(false)
const showKeyboard = ref(false)
const currentUser = ref()
const password = ref('')
const joinTeamId = ref(0)
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})
const onInput = (key) => {
  password.value = (password.value + key).slice(0, 6);
}
const onDelete = () => {
  password.value = password.value.slice(0, password.value.length - 1)
}
const onpaymentyes = () => {
  doJoinTeam()
  // console.log("确定支付" + password.value)
}
const canclePopup = () => {
  password.value = ''
  show.value = false
}

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const router = useRouter();

/**
 * 加入队伍
 */

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id
  if (team.status == 0) {
    doJoinTeam()
  } else {
    show.value = true;
  }

}
const doJoinTeam = async () => {
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    Toast.success('加入成功');
    show.value = false
  } else {
    Toast.fail('加入失败' + (res.description ? `，${res.description}` : ''));
  }
}


const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    teamId: id,
  });
  if (res?.code === 0) {
    Toast.success('解散队伍成功');
  } else {
    Toast.fail('解散队伍失败' + (res.description ? `，${res.description}` : ''));
  }
}
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id,
  });
  if (res?.code === 0) {
    Toast.success('退出成功');
  } else {
    Toast.fail('退出失败' + (res.description ? `，${res.description}` : ''));
  }
}

const doUpdateTeam = (id: number) => {
  router.push({
    path: "/team/update",
    query: {
      id
    }
  })
}

const doTeamDetail = (id: number) => {
  router.push({
    path: "/team/detail",
    query: {
      id
    }
  })
}
</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}

.popup {
  width: 350px;
  height: 280px;
  padding-top: 16px;
  text-align: center;
  border-radius: 7px;
  z-index: 3;
}

.van-popup--center {
  border-radius: 7px;
  overflow: hidden;
}

.popup_title {
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.popup_title_ {
  text-align: center;
}

.popup_yes {
  margin: 0 auto;
  margin-top: 50px;
}

.popup_ {
  position: fixed;
  bottom: 0;
  z-index: 99999;
}
</style>
