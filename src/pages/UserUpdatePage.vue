<template>
    <template v-if="user">
        <van-cell-group inset>
            <van-divider/>
            <van-cell center is-link title="头像" to="/user/edit" @click="toEdit('avatarUrl', '头像', user.avatarUrl)">
                <img :src="user.avatarUrl" style="height: 48px"/>
            </van-cell>
            <van-divider/>
            <van-cell :value="user.username" center is-link title="昵称" to="/user/edit"
                      @click="toEdit('username', '昵称', user.username)"/>
            <van-divider/>
            <van-cell :value="user.profile" center is-link title="个人简介" to="/user/edit"
                      @click="toEdit('profile', '个人简介', user.profile)"/>
            <van-divider/>
            <van-cell :value="user.userAccount" center title="账号"/>
            <van-divider/>
            <van-cell :value="user.gender===0? '男':'女'" center is-link title="性别"
                      @click="toEdit('gender', '性别', user.gender)"/>
            <!--      toEdit('gender', '性别', user.gender)-->
            <van-divider/>
            <van-cell center is-link title="修改标签" to="/user/editTags" @click="toEdit('tags', '标签', user.tags)"/>
            <van-divider/>
            <van-cell :value="user.phone" center is-link title="电话" to="/user/edit"
                      @click="toEdit('phone', '电话', user.phone)"/>
            <van-divider/>
            <van-cell :value="user.contactInfo" center is-link title="联系方式" to="/user/edit"
                      @click="toEdit('contactInfo', '联系方式', user.contactInfo)"/>
        </van-cell-group>
    </template>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user";
import myAxios from "../plugins/MyAxios";
import {Toast} from "vant";

// const user = {
//
//   id: 1,
//   username: 'niuma',
//   userAccount: '123',
//   avatarURL: 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/359/morentoux.png',
//   gender: '男',
//   phone: '123123',
//   email: '123123123@qwqe.com',
//   planetCode: '123',
//   createTime: new Date(),
// }

const user = ref();
const showGenderEdit = ref(false);
const gender = ref();

onMounted(async () => {
    user.value = await getCurrentUser();
    gender.value = user.value.gender + '';
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
    if (editKey === 'tags') {
        if (currentValue == null) {
            currentValue = '';
        }
        console.log(currentValue)
        router.push({
            path: '/user/editTag',
            query: {
                currentValue,
            }
        })
    } else {
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

</style>
