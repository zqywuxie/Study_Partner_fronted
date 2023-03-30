<template>
    <template v-if="user">
        <van-cell-group inset>
            <van-cell to="/user/update">
                <van-card
                        :desc="user.profile"
                        :thumb="user.avatarUrl"
                        :title="user?.username"

                >
                    <template #tags>
                        <van-tag v-for="tag in user.tags" plain style="margin-right: 8px;margin-top: 8px" type="primary">
                            {{ tag}}
                        </van-tag>
                    </template>
                </van-card>
            </van-cell>
            <van-divider/>

            <!--      <van-cell :value="user.planetCode" center title="编号">-->
            <!--        <template #icon>-->
            <!--          <van-icon name="manager-o" size="18"/>-->
            <!--        </template>-->
            <!--      </van-cell>-->
            <van-divider/>
            <van-cell center is-link title="我创建的队伍" to="/user/createTeam">
                <template #icon>
                    <van-icon name="cluster-o" size="18"/>
                </template>
            </van-cell>
            <van-divider/>
            <van-cell center is-link title="我加入的队伍" to="/user/joinTeam">
                <template #icon>
                    <van-icon name="friends-o" size="18"/>
                </template>
            </van-cell>

            <van-divider/>

            <van-cell :value="moment(user.createTime).format('yyyy-MM-DD HH:mm:ss')" center title="注册时间">
                <template #icon>
                    <van-icon name="clock-o" size="18"/>
                </template>
            </van-cell>
            <van-divider/>
            <van-cell center title="退出登录" @click="quit">
                <template #icon>
                    <van-icon name="close" size="18"/>
                </template>
            </van-cell>
        </van-cell-group>
    </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/MyAxios";
import moment from "moment";
import {Toast} from "vant";
import {getCurrentUser} from "../service/user";

const router = useRouter()


/**
 * 用户类别
 */
// const User = {
//   id: 1,
//   username: "123",
//   userAccount: "123",
//   avatarUrl: "https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/5339/5e926a2bb7773958.jpg",
//   profile: "123",
//   gender: "男",
//   phone: "123",
//   email: "123",
//   userStatus: "123",
//   userRole: 1213,
//   planetCode: "1",
//   tags: "123",
//   createTime: new Date()
// };
const user = ref([])
const quite = () => {
    const result = myAxios.post("/user/outLogin")
        .then((res) => {
            console.log(res)
            if (res?.data === 1 && res?.code === 0) {
                Toast("退出成功")
                window.location.reload()
            } else {
                Toast("退出失败")
            }
        })


}
onMounted(async () => {
    const result = await getCurrentUser()
    if (result) {
        user.value = result
        user.value.tags =JSON.parse(result.tags)
        Toast("获得用户信息成功")
    } else {
        Toast("获得用户信息失败")
    }
})

</script>

<style scoped>

</style>