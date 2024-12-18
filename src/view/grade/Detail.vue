<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>系列详情</span>
                    <el-button size="mini" style="float:right" @click="router.go(-1)">返回</el-button>
                </div>
            </template>
            <el-form>
                <el-form-item label="系列名称:">
                  {{ gradeDetail.name }}
                </el-form-item>
                
                <el-form-item label="推出日期:">
                  {{ gradeDetail.date }}
                </el-form-item>


                <el-form-item label="价格:">
                  {{ gradeDetail.grade }}
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getGradeDetail } from '@/api/apis.js';
const route = useRoute();
const router = useRouter();
const gradeDetail = reactive({
    id: ''
})

// DOM加载前请求接口
onBeforeMount(() => {
    if (route.query.id) {
        getGradeDetail(route.query.id).then((res) => {
            if (res.data) {
                console.log(res);
                Object.assign(gradeDetail, res.data.data);
            } else {
                ElMessage.error("服务器内部错误");
            }
        })
    }
})
</script>

