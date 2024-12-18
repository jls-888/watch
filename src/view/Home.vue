<template>
    <div>
        <el-container class="home-container">
            <el-header>
                <el-row>
                    <el-col :span="4">
                        <p class="system-name">手表信息管理系统</p>
                    </el-col>
                    <el-col :offset="12" :span="8" style="min-width: 150px">
                        <el-dropdown style="float: right; margin: 20px 10px">
                            <span class="el-dropdown-link" style="color:#fff; cursor: pointer">
                                {{loginStore.helloUser}}&nbsp;&nbsp; <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <el-avatar shape="square" :src="avatar" style="margin: 10px; float: right"></el-avatar>
                    </el-col>
                </el-row>
            </el-header>
            <el-container style="overflow: auto">
                <!-- 菜单 -->
                <el-aside>
                    <div class="toggle-button" @click="isCollapse = !isCollapse">
                        <el-icon :size="20">
                            <Expand v-if="isCollapse" />
                            <Fold v-if="!isCollapse" />
                        </el-icon>
                    </div>
                    <el-menu router :default-active="activePath" class="el-menu-vertical-demo" :collapse="isCollapse">
                        <menuItems :menuList="menuList" @changePath="returnPath"></menuItems>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>Copyright © 2024 Watch</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue'
// 头像
import avatar from "@/assets/img/avator.jpg"
// 引入菜单接口
import { getMenuList } from '@/api/apis.js'
// 引入菜单组件
import menuItems from './components/menuItems.vue'
// 引入pinia,用户状态管理库
import { userLoginStore } from '@/store/store.js'
import { useRouter } from 'vue-router'
const loginStore = userLoginStore();
// 路由实例化
const router = useRouter();
const menuList = ref([]);
const isCollapse = ref(false);
// DOM加载后，调用菜单接口
onMounted(() => {
  getMenuList().then((res) => {
    menuList.value = res.data.data.menuList
    console.log(menuItems.value)
  })
})
const activePath = computed(() => {
  return router.currentRoute.value.path;
})
// 退出登录
const logout = () => {
    loginStore.logout();
}
const returnPath = (path) => {
    console.log('return path==', path);
}
</script>

<style scoped>
.home-container {
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 100%;
    background: #f2f3f5;
}

.el-header {
    background: #182135;
    padding: 0 10px;
    overflow: hidden;
}

.system-name {
    color: #fff;
    font-size: 18px;
}

.el-aside {
    background: white;
    width: auto !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-footer {
    color: #cccccc;
    text-align: center;
    line-height: 60px;
}

.el-footer:hover {
    color: #2661ef;
}

.toggle-button {
    background-color: #d9e0e7;
    font-size: 18px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    color: black;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu-item.is-active {
    color: #fff !important;
    font-size: 15px;
    font-weight: bold;
    background-color: #2661ef !important;
    border-radius: 2px;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    margin: 2px 5px 0px 2px;
}
.el-dropdown-link:focus {
    outline: none;
}
</style>