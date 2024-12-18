// store/store.js
import { defineStore } from 'pinia';
import { reactive,computed } from "vue";
import { LoginInfo } from '../api/apis.js';
import { ElMessage } from "element-plus";
import router from "../router/index";
 
export const userLoginStore = defineStore('loginInfo', () => {
    const loginInfo = reactive({
        username: '',
        token: '',
    })

    // getter 
    const helloUser = computed(() => {
        return "您好！ " + loginInfo.username;
    })
 
    // 同步action 
    const setLoginInfo = (username,token) => {
        loginInfo.username = username;
        loginInfo.token = token;
    }
    
    // 异步登录
    const login = (form) => {
        LoginInfo(form).then((res) => {
            if (res.data) {
                if (res.data.code == 200) {
                    loginInfo.username = form.username;
                    router.push("/home");
                } else {
                    ElMessage.error(res.data.data.message);
                }
            } else {
                ElMessage.error("服务器内部错误");
            }
        })
    }

    // 同步退出
    const logout = () => {
        loginInfo.username = '';
        loginInfo.token = '';
        // 清除缓存
        sessionStorage.clear();
        router.push("/login");
    }
    return{
        loginInfo,
        helloUser,
        setLoginInfo,
        login,
        logout
      }
})