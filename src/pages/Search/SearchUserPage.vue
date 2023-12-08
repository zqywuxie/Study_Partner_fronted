<template>
    <form action="/public">
<!--        <van-search-->
<!--                v-model="searchText"-->
<!--                show-action-->
<!--                placeholder="请输入搜索标签"-->
<!--                @search="onSearch"-->
<!--                @cancel="onCancel"-->
<!--        />-->
      <!-- 添加一个输入框用于自定义标签 -->
      <van-field
          v-model="customTag"
          label="自定义标签"
          placeholder="请输入自定义标签"
      />
      <van-button
          @click="onCustomTagAdd"
          type="primary"
          size="small"
          round
          style="margin-left: auto;"
      >
        添加标签
      </van-button>
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>
    <van-row gutter="16" style="padding: 0 16px">
        <van-col v-for="tag in activeIds">
            <van-tag closeable size="small" type="primary" @close="doclose(tag)">
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>
    <van-divider></van-divider>
    <van-tree-select
            v-model:active-id="activeIds"
            v-model:main-active-index="activeIndex"
            :items="tagList"
    />
    <div style="padding: 20px">
        <van-button type="primary" @click="doSearchUser" block style="margin-top: 10px;">搜索</van-button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";
import UserTagsList from "../../constants/UserTagsList";
import {Toast} from "vant";

const router = useRouter();

const searchText = ref('');

const originTagList = UserTagsList;
//标签列表
let tagList = ref(originTagList);
/**
 *  搜索过滤
 * @param val
 */

const customTag = ref(''); // 用于存储用户输入的自定义标签
const onCustomTagAdd = () => {
  if (customTag.value.trim() === '') {
    Toast.fail('请输入自定义标签');
    return;
  }

  // 检查是否已存在该标签
  if (!activeIds.value.includes(customTag.value)) {
    // 添加用户输入的标签到 activeIds 列表
    activeIds.value.push(customTag.value);
    // 清空输入框
    customTag.value = '';
  } else {
    Toast.fail('该标签已存在');
  }
};
const onSearch = (val) => {
    tagList.value = originTagList.map(parentTag => {
        const tempChildren = [...parentTag.children];
        const tempParentTag = {...parentTag};
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
        return tempParentTag;
    })
};

const doSearchUser = () => {
    router.push({
        path: '/user/list',
        query: {
            tags: activeIds.value
        }
    })
}

//取消  清空
const onCancel = () => {
    searchText.value = '';
    //清空进行一次刷新
    tagList.value = originTagList;
};


//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);


//关闭标签,树状分类也跟着变化
const doclose = (tag) => {
    activeIds.value = activeIds.value.filter(item => {
        return item !== tag;
    })

}

</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: center;
}
</style>