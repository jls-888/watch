<template>
    <el-form
      :model="formData"
      :rules="rules"
      ref="FormRef"
      class="demo-ruleForm"
    >
      <el-form-item
        label="系列名"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input v-model="formData.name" autocomplete="off" />
      </el-form-item>
      
      <el-form-item label="推出日期" :label-width="formLabelWidth" prop="date">
        <el-date-picker
          v-model="formData.date"
          type="date"
          placeholder="请选择日期"
          @change="handleDateChange"
        />
      </el-form-item>
      <el-form-item label="品牌" :label-width="formLabelWidth" prop="subject">
        <el-input v-model="formData.subject" autocomplete="off" />
      </el-form-item>
      
     
      <el-form-item label="价格" :label-width="formLabelWidth" prop="grade">
        <el-input v-model="formData.grade" type="number" />
      </el-form-item>
    </el-form>
</template>


<script setup>
import { onMounted, reactive,  ref } from "vue";
// 引入接口
import {gradeListUpdate, addGradeList} from '@/api/apis.js';
// 引入公共日期处理方法
import { getDateTime} from '@/utils/index.js'
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
    // getDepartmentSelectData();
})
// 新增/编辑弹框相关参数
const FormRef = ref()
const formLabelWidth = '140px'

// 表单校验
const rules = reactive({
  name: [{ required: true, message: '请填写姓名', trigger: 'change' }],
  sex: [{ required: true, message: '请填写性别', trigger: 'change' }],
  date: [{ required: true, message: '请填写日期', trigger: 'change' }],
  subject: [{ required: true, message: '请填写学科', trigger: 'change' }],
  type: [{ required: true, message: '请选择成绩类型', trigger: 'change' }],
  grade: [{ required: true, message: '请填写成绩', trigger: 'change' }],
})



// 新增/编辑，成绩信息
const onSubmit = () => {
    FormRef.value.validate(async (valid) => {
        if (!valid) return
        try {
          if (props.formData.id) {
            gradeListUpdate(props.formData).then((res) => {
              console.log('编辑数据成功')
              console.log(ElMessage)
              ElMessage({
                message: '编辑成绩信息成功',
                type: 'success',
              })
              // 调用父组件方法
              emit('returnSuccess', res.data.data);
            })
          } else {
            // props.formData.birthday = formatDate(props.formData.birthday);
            props.formData.date = getDateTime('day');
            // props.formData.isValid = true;
            addGradeList(props.formData)
              .then((res) => {
                ElMessage({
                  message: '添加成绩信息成功',
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