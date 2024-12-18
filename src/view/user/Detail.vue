<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>品牌详情</span>
                    <el-button size="mini" style="float:right" @click="router.go(-1)">返回</el-button>
                </div>
            </template>
            <el-form>
                <el-form-item label="品牌:">
                    {{ userDetail.username }}
                </el-form-item>
                <el-form-item label="成立日期:">
                    {{ userDetail.birthday }}
                </el-form-item>
                <el-form-item label="经营年份:">
                    {{ userDetail.age }}
                </el-form-item>
                
                
                <el-form-item label="官网:">
                    {{ userDetail.email }}
                </el-form-item>
                <el-form-item label="创建日期:">
                    {{ userDetail.date }}
                </el-form-item>
                <el-form-item label="地址:">
                    {{ userDetail.address }}
                </el-form-item>
                <el-form-item label="产品定位:">
                    {{ userDetail.work }}
                </el-form-item>
                <el-form-item label="宣传标语:">
                    {{ userDetail.hobby  }}
                </el-form-item>
                <el-form-item label="备注:">
                    {{ userDetail.content }}
                </el-form-item>
                <el-form-item label="是否启用:">
                    {{ userDetail.isValid ? '否' : '是' }}
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getUserDetail } from '@/api/apis.js';
const route = useRoute();
const router = useRouter();
const userDetail = reactive({
    id: ''
})

// DOM加载前请求接口
onBeforeMount(() => {
    if (route.query.id) {
        getUserDetail(route.query.id).then((res) => {
            if (res.data) {
                console.log(res);
                Object.assign(userDetail, res.data.data);
            } else {
                ElMessage.error("服务器内部错误");
            }
        })
    }
})
</script>

<style lang="scss" scoped>

</style>