<template>
    <el-form
      :model="formData"
      :rules="rules"
      ref="FormRef"
      class="demo-ruleForm"
    >
      <el-form-item
        label="品牌名称"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input v-model="formData.username" autocomplete="off" />
      </el-form-item>
      
      <el-form-item label="成立日期" :label-width="formLabelWidth" prop="birthday">
        <el-date-picker
          v-model="formData.birthday"
          type="date"
          placeholder="请选择日期"
          @change="handleDateChange"
        />
      </el-form-item>
      <el-form-item label="经营年份" :label-width="formLabelWidth" prop="age">
        <el-input-number v-model="formData.age" :min="1" :max="150"/>
      </el-form-item>
      
     
      <el-form-item label="官网" :label-width="formLabelWidth" prop="email">
        <el-input v-model="formData.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="formData.address" type="textarea" />
      </el-form-item>
      
      <el-form-item label="产品定位" :label-width="formLabelWidth" prop="work">
        <el-input v-model="formData.content" type="textarea" />

      </el-form-item>
      <el-form-item label="宣传标语" :label-width="formLabelWidth" prop="hobby">
        <el-input v-model="formData.content" type="textarea" />
      </el-form-item>
      <el-form-item label="是否启用" :label-width="formLabelWidth" prop="isValid">
        <el-switch v-model="formData.isValid"></el-switch>
      </el-form-item>
    </el-form>
</template>
<script setup>
import { onMounted, reactive,  ref } from "vue";
// 引入接口
import { deaprtmentSelectData, addUserList, userListUpdate } from '@/api/apis.js';
// 引入公共日期处理方法
import { getDateTime, formatDate, getAgeFromBirthday } from '@/utils/index.js'
// 引入消息提示组件
import { ElMessage } from 'element-plus';
// 接收父组件传递form对象
const props = defineProps({
    formData:{
        type: Object,
    },
})

// 声明调用父组件方法
const emit = defineEmits(['returnSuccess']);

// Dom 挂载之后
onMounted(() => {
    // 获取用户部门下拉数据
    getDepartmentSelectData();
})
// 新增/编辑弹框相关参数
const FormRef = ref()
const formLabelWidth = '140px'

// 表单校验
const rules = reactive({
  username: [{ required: true, message: '请填写用户姓名', trigger: 'change' }],
  sex: [{ required: true, message: '请填写性别', trigger: 'change' }],
  birthday: [{ required: true, message: '请填写生日', trigger: 'change' }],
  age: [{ required: true, message: '请填写年龄', trigger: 'change' }],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  email: [{ required: true, message: '请填写邮箱', trigger: 'change' }],
  address: [{ required: true, message: '请填写居住地址', trigger: 'change' }],
})

// 根据生日计算年龄
const handleDateChange = (value) => {
  if (value) {
    // 转换为时间戳，并且保存为整数
    props.formData.age = getAgeFromBirthday(value);
  }
}

// 获取部门下拉数据
const departSelectData = ref([]);
const getDepartmentSelectData = () => {
  deaprtmentSelectData().then((res) => {
      if (res.data) {
          departSelectData.value = res.data.data.departmentSelectData;
      } else {
          ElMessage.error("服务器内部错误");
      }
  })
}

// 新增/编辑，提交用户信息
const onSubmit = () => {
    FormRef.value.validate(async (valid) => {
        if (!valid) return
        try {
          if (props.formData.id) {
            userListUpdate(props.formData).then((res) => {
              console.log('编辑数据成功')
              console.log(ElMessage)
              ElMessage({
                message: '编辑用户成功',
                type: 'success',
              })
              // 调用父组件方法
              emit('returnSuccess', res.data.data);
            })
          } else {
            props.formData.birthday = formatDate(props.formData.birthday);
            props.formData.date = getDateTime('day');
            props.formData.isValid = true;
            addUserList(props.formData)
              .then((res) => {
                ElMessage({
                  message: '添加用户成功',
                  type: 'success',
                })
                props.formData.id = res.data.data.id
                // 调用父组件方法
                emit('returnSuccess', res.data.data);
              })
              .catch((err) => { })
          }
        } catch (error) {
            console.log(error)
        }
    })
}

// 暴露子组件方法，供父组件调用
defineExpose({
    onSubmit
})
</script>