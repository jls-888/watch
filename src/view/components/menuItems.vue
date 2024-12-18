<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-menu-item
      v-if="!subItem.children"
      :index="subItem.url"
      :route="subItem.url"
      @click="saveActiveNav(subItem.url)"
    >
      <el-icon>
        <component :is="subItem.icon"></component>
      </el-icon>
      <span>{{ subItem.title }}</span>
    </el-menu-item>
    <!--有多级菜单-->
    <el-sub-menu
      v-if="subItem.children"
      :key="subItem.url"
      :index="subItem.url"
    >
      <template #title>
        <el-icon>
          <component :is="subItem.icon"></component>
        </el-icon>
        <span> {{ subItem.title }}</span>
      </template>
      <!--递归组件，把遍历的值传回子组件，完成递归调用-->
      <menu-items :menuList="subItem.children"></menu-items>
    </el-sub-menu>
  </template>
</template>

<script setup>
// 接收父组件传递菜单对象
defineProps({
  menuList:{
    type: [],
  }
})
// 声明调用父组件方法
const emit = defineEmits(['changePath']);
// 保存链接的激活状态
const saveActiveNav = (path) => {
  // 调用父组件方法
  emit('changePath', path);
}
</script>

<style scoped>
.icons {
  width: 24px;
  height: 18px;
}
</style>
