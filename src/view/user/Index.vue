<template>
    <div>
        <el-card>
            <el-input style="width:440px" v-model="searchForm.username" placeholder="请输入品牌名称" class="input-with-select">
            </el-input>
            <el-button type="primary" :icon="Search"  @click="searchUser" class="ml20">搜索</el-button>
            <el-button type="primary" :icon="Refresh"  @click="resetSearch" class="ml20">重置</el-button>
        </el-card>
        <el-card>
            <el-button type="primary" :icon="Plus" @click="dialogVisibleShow">添加</el-button>
            <el-button type="primary" v-show="batchDelFlag" :icon="Delete" @click="delBatchUser">批量删除</el-button>
            <el-table :data="tableData" 
                      border 
                      style="width: 100%;margin-top:20px"
                      @selection-change="handleSelectionChange"
                      >
                <el-table-column type="selection" width="55" />
                <el-table-column prop="username" label="品牌名称" width="100" />
                <el-table-column prop="age" label="经营年份" width="110" sortable/>
                <el-table-column prop="email" label="官网" width="180" />
                <el-table-column prop="birthday" label="成立日期" width="110" sortable />
                <el-table-column prop="work" label="产品定位" width="180" />
                <el-table-column prop="address" label="地址" width="150" />
                <el-table-column prop="hobby" label="宣传标语" width="260"></el-table-column> 
                <el-table-column prop="date" label="创建日期" width="110" sortable/>
                <el-table-column prop="isValid" label="是否启用" width="100" >
                  <template #default="scope_01">
                    <el-switch v-model="scope_01.row.isValid" width="10px" ></el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="330">
                    <template #default="scope">
                        <el-button type="info" size="small"
                            @click="() => router.push({ path: '/user/detail', query: { id: scope.row.id } })">
                            详情
                        </el-button>
                        <el-button type="primary" size="small" @click="editorClick(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteUser_b(index)">删除</el-button>
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
        :title="`${dialogData.title}品牌`"
        draggable="true"
    >
        <UserForm ref="formRef" :formData="dialogData.FormData"  @returnSuccess="returnSuccess"></UserForm>
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
import { getUserList, delUser } from '@/api/apis.js';
// 引入用户表单组件
import UserForm from './components/UserForm.vue'
import { useRouter } from 'vue-router'
// 路由实例化
const router = useRouter();
// Dom 挂载之后
onMounted(() => {
    // 获取用户列表数据
    getUserData();
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
const getUserData = () => {
    getUserList(searchForm).then((res) => {
        if (res.data) {
            console.log(res);
            tableData.value = res.data.data.userList;
            total.value = res.data.data.total;
        } else {
            ElMessage.error("服务器内部错误");
        }
    })
}
// 查询列表
const searchUser = () => {
    searchForm.page = 1;
    getUserData();
}
// 重置查询条件
const resetSearch = () => {
    searchForm.username = '';
    getUserData();
}

// 列表分页查询
const handleSizeChange = (size) => {
    searchForm.size = size;
    getUserData();
}
const handleCurrentChange = (current) => {
    searchForm.page = current;
    getUserData();
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
const deleteUser_b = (index) => {
    ElMessageBox.confirm(
        '确定要删除该品牌信息吗?',
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
// 删除用户（后台模拟）
const deleteUser_e = (id) => {
    ElMessageBox.confirm(
        '确定要删除该用户信息吗?',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        delUser({ id: id }).then((res) => {
            if (res.data) {
                console.log(res);
                ElMessage.success("删除成功")
                tableData.value = res.data.data.userList;
                total.value = res.data.data.total;
            } else {
                ElMessage.error("服务器内部错误");
            }
        })
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
const delBatchUser = () => {
    ElMessageBox.confirm(
        '确定要删除选中用户信息吗?',
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