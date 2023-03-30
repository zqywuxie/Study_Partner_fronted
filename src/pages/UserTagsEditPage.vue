<template>
    <form action="/">
        <van-search
                v-model="searchText"
                placeholder="请输入要搜索的标签"
                show-action
                @cancel="onCancel"
                @search="onSearch"
        />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <van-divider v-if="activeIds.length===0" content-position="center">有标签才会显示在主页喔</van-divider>
    <van-row gutter="15" style="padding: 0 15px">
        <van-col v-for="tag in activeIds">
            <van-tag closeable size="small" type="primary" @close="doClose(tag)">
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>

    <van-divider content-position="left">可选择标签</van-divider>
    <van-tree-select
            v-model:active-id="activeIds"
            v-model:main-active-index="activeIndex"
            :items="tagsList"
    />
    <div style="padding: 15px">
        <van-button block type="primary" @click="doEditTags">修改</van-button>
    </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {useRoute} from "vue-router/dist/vue-router";
import {getCurrentUser} from "../service/user";
import myAxios from "../plugins/MyAxios";
import {Toast} from "vant";
import UserTagsList from "../constants/UserTagsList";

const router = useRouter();
const route = useRoute();
const editTags = ref({
    currentValue: route.query.currentValue,
})
const searchText = ref('');
const activeIds = ref([]);
const activeIndex = ref(0);
//列表原数据
const originTagsList = UserTagsList;
const tagsList = ref(originTagsList);

const onSearch = (val) => {
    //为了不改变原数组这里要深拷贝，否则children还是对象应用
    // let filterArr=JSON.parse(JSON.stringify(originTagsList))
    // tagsList.value = filterArr.map(parentTag => {
    //       parentTag.children = parentTag.children
    //           .filter(item => item.text.includes(searchText.value));
    //       return parentTag;
    //     })

    //方法2：
    tagsList.value = originTagsList.map(parentTag => {
        const tempChildren = [...parentTag.children];
        const tempParentTag = {...parentTag};
        tempParentTag.children = tempChildren
            .filter(item => item.text.includes(searchText.value));
        return tempParentTag;
    })
};

const onCancel = () => {
    searchText.value = '';
    tagsList.value = originTagsList;
};


//将原有标签设置进去
onMounted(() => {
    const currentTags = editTags.value.currentValue + '';
    activeIds.value = JSON.parse(currentTags);
})

//移除标签
const doClose = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
        return item !== tag;
    })
}

const doEditTags = async () => {
    if (activeIds.value.length >= 6) {
        Toast.fail("最多只能选择6个标签喔！");
        return
    }
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        Toast.fail("用户未登录")
        return;
    }
    const res = await myAxios.post("/user/change", {
        id: currentUser.id,
        tags: JSON.stringify(activeIds.value),
    })
    if (res.code === 0 && res.data > 0) {
        Toast.success("修改成功！");
        router.back();
    } else {
        Toast.fail("更新失败！");
    }
}
</script>

<style scoped>

</style>
