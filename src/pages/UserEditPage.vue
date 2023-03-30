<template>
    <van-form @submit="onSubmit">
        <van-field
                v-if="isShow"
                v-model="editUser.editValue"
                :name="editUser.editKey"
                :label="editUser.editName"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-row v-if="editUser.editName==='个人简介'" justify="center">
            <van-cell-group inset>
                <van-field
                        v-model="editUser.editValue"
                        rows="5"
                        autosize
                        label="留言"
                        type="textarea"
                        maxlength="50"
                        placeholder="请输入留言"
                        show-word-limit
                />
            </van-cell-group>

        </van-row>
        <van-row v-if="editUser.editName==='头像'" justify="center">
            <van-cell center title="头像">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #value>
                    <van-uploader v-model="fileList" :after-read="OnAfterRead" max-count="1"
                                  multiple/>
                </template>
            </van-cell>

        </van-row>

        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import myAxios from "../plugins/MyAxios";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {getCurrentUser} from "../service/user";
import * as compressorjs from "compressorjs";

const router = useRouter()
const isShow = ref(true);
//获得跳转路由的数据
const route = useRoute()
const editUser = ref({
    editKey: route.query.editKey,
    editName: route.query.editName,
    editValue: route.query.currentValue
})
const fileList = ref([
    {url: editUser.value.editValue, isImage: true},
]);
onMounted(async () => {
    if (editUser.value.editName === '头像' || editUser.value.editName === '个人简介') {
        isShow.value = false;
    }
});


// todo
const OnAfterRead = async (file) => {
    // console.log(file.file)
    console.log("hell")
    // console.log(file.file);

    const fileFile = file.file
    const res = await myAxios.post("/fileOss/upload", {
        'file': fileFile
    }, {
        headers: {'Content-Type': 'multipart/form-data'},
    })
    editUser.value.editValue = res.data;
    // 此时可以自行将文件上传至服务器
    // console.log(res);
    console.log(editUser.value.editValue);
};

const onSubmit = async () => {

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        Toast("用户未登录")
        return
    }
    console.log(editUser.value.editKey)
    console.log(editUser.value.editValue)
    const result = await myAxios.post('/user/change', {
        'id': currentUser.id,
        //动态传参
        [editUser.value.editKey as string]: editUser.value.editValue,
    });
    if (result.code === 0 && result.data > 0) {
        Toast("更新成功")
        router.push("/user")
    } else {
        Toast("更新失败")
    }

};
</script>

<style scoped>

</style>