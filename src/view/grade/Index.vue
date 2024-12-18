<template>
  <div>
    <el-card>
      <el-button type="primary" :icon="Plus" @click="dialogVisibleShow">添加</el-button>
      <el-button type="primary" v-show="batchDelFlag" :icon="Delete" @click="delBatchGrade">批量删除</el-button>
      <el-table :data="tableData"
                border
                style="width: 100%;margin-top:20px"
                @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="产品名称" width="150" />
        
        <el-table-column prop="date" label="推出日期" width="110" sortable />
        <el-table-column prop="subject" label="品牌名称" width="150" />

        <el-table-column prop="grade" label="售价" width="100" />

        <el-table-column label="操作" width="256">
          <template #default="scope">
            <el-button type="info" size="small"
                       @click="() => router.push({ path: '/grade/detail', query: { id: scope.row.id } })">
              详情
            </el-button>
            <el-button type="primary" size="small" @click="editorClick(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteGrade_b(index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination style="margin-top:20px" :current-page="searchForm.page" :page-size="searchForm.size"
                     :page-sizes="[10, 20, 30, 40]" layout="->,total, sizes, prev, pager, next, jumper" :total="total"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
  </div>
  <el-dialog
      v-model="dialogVisible"
      :title="`${dialogData.title}系列`"
      draggable="true"
  >
    <GradeForm ref="formRef" :formData="dialogData.FormData"  @returnSuccess="returnSuccess"></GradeForm>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="onSubmit()">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script setup>
// 引入图标插件
import {
  Search,
  Refresh,
  Plus,
  Delete,
} from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from "vue";
// 引入消息提示组件
import { ElMessage, ElMessageBox } from 'element-plus';
// 引入接口
import {getUserList, delUser, getGradeList} from '@/api/apis.js';
// 引入用户表单组件
import GradeForm from './components/GradeForm.vue'
import { useRouter } from 'vue-router'
// 路由实例化
const router = useRouter();
// Dom 挂载之后
onMounted(() => {
  // 获取用户列表数据
  getGradeData();
})
// 用户数据
let tableData = ref([]);
let total = ref(0);
// 搜索条件

const searchForm = reactive({
  page: 1,
  size: 10,
  username: ''
})

// 获取用户列表
const getGradeData = () => {
  getGradeList(searchForm).then((res) => {
    if (res.data) {
      console.log(res);
      tableData.value = res.data.data.gradeList;
      total.value = res.data.data.total;
    } else {
      ElMessage.error("服务器内部错误");
    }
  })
}
// 查询列表
const searchUser = () => {
  searchForm.page = 1;
  getGradeData();
}
// 重置查询条件
const resetSearch = () => {
  searchForm.username = '';
  getGradeData();
}

// 列表分页查询
const handleSizeChange = (size) => {
  searchForm.size = size;
  getGradeData();
}
const handleCurrentChange = (current) => {
  searchForm.page = current;
  getGradeData();
}
// 新增弹框相关参数
const dialogVisible = ref(false);
const dialogData = reactive({
  title: '添加',
  FormData: {},
})
// 添加弹窗
const dialogVisibleShow = () => {
  dialogData.FormData = {
    username: '',
    birthday: '',
    age: '',
    sex: 1,
    department: '',
    email: '',
    work: '',
    address: '',
    content: '',
    isValid: true,
  }
  dialogVisible.value = true
}
// 编辑弹窗
const editorClick = (item) => {
  dialogVisible.value = true
  dialogData.FormData = item
  console.log('edit==',dialogData.FormData)
  dialogData.isView = false
  dialogData.title = '编辑'
}
const formRef = ref();
// 新增，提交用户信息
const onSubmit = () => {
  formRef.value.onSubmit();
}

const returnSuccess = (data) => {
  tableData.value = data;
  dialogVisible.value = false;
}
// 删除用户（前台模拟）
const deleteGrade_b = (index) => {
  ElMessageBox.confirm(
      '确定要删除该系列信息吗?',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    tableData.value.splice(index, 1);
    total.value = tableData.value.length;
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  })
}

// 列表多选事件
const batchDelFlag = ref(false);
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  if (val.length > 0) {
    batchDelFlag.value = true;
  } else {
    batchDelFlag.value = false;
  }
  //val是选中的数据的数组
  val.forEach(item => {
    const id = item.id
    //判断数组中是否包含某个值
    if (multipleSelection.value.indexOf(id) == -1) {
      multipleSelection.value.push(id);
    }
  })
}

//批量删除用户
const delBatchGrade = () => {
  ElMessageBox.confirm(
      '确定要删除选中的成绩信息吗?',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    multipleSelection.value.filter((a, a_index) => {
      tableData.value.forEach((b, b_index) => {
        if (a == b.id) {
          tableData.value.splice(b_index, 1);
        }
      })
    })
    total.value = tableData.value.length;
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  })
}

</script>

<style scoped>

</style>