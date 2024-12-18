<template>
  <div>
    <el-container>
      <el-header>
        <div style="width:400px">
          <p style="float: left;">
          
          </p>
          <p style="float: left;font-size: 25px; font-weight: bold">
            欢迎来到手表信息中心管理系统
          </p>
        </div>

      </el-header>
      <el-main>
        <el-card class="login_card">
          <el-form  :model="form" :rules="rules" ref="ruleFormRef" label-width="80px">
            <el-form-item  label="账号：" prop="username">
              <el-input  v-model="form.username" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">登录</el-button>
              <el-button type="primary" @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
      <el-footer>
        <p>详情信息 | 个性推荐 | 产地详情 | 细节详解 | 产品种类 </p>
        <p>Watch © 2024-2034 <el-tag>公众号：手表圈子</el-tag></p>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { userLoginStore } from '@/store/store.js';
// 路由实例化
const loginStore = userLoginStore();

const form = reactive({
  username: "",
  password: "",
});
const ruleFormRef = ref();

// 表单校验
const rules = reactive({
  username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});
// 表单提交
const onSubmit = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 调用登录方法
      loginStore.login(form);
    } else {
      return false;
    }
  });
};
// 重置方法
const resetForm = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.resetFields();
};
</script>

<style scoped>
.el-container {
  height: 800px;
}

.el-header {
  height: 10%;
}

.el-main {
  height: 80%;
  background-image: url("../assets/img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 120%;
  background-position-y: bottom;
}

.login_card {
  margin: 100px 200px;
  width: 20%;
  min-width: 200px;
  height: 200px;
  border-radius: 20%;
  background:transparent;
}

.el-footer {
  height: 10%;
  text-align: center;
}
</style>
