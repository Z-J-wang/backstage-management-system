<template>
    <el-drawer title="信息详情展示" direction="ltr" :visible.sync="drawerVisible" :before-close="handleClose">
        <el-row class="text-l">
            <el-col :span="8">发信人：</el-col>
            <el-col :span="16">{{ item.name }}</el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">发送时间：</el-col>
            <el-col :span="16">{{ item.datetime }}</el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">邮箱：</el-col>
            <el-col :span="16">{{ item.email }}</el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">个人网站：</el-col>
            <el-col :span="16">
                <el-link type="primary" :href="item.website" target="_blank">{{item.website}}</el-link>
            </el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">主题：</el-col>
            <el-col :span="16">{{ item.subject }}</el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">内容:</el-col>
            <el-col :span="16" class="text-indent-cn">{{ item.content }}</el-col>
        </el-row>
    </el-drawer>
</template>

<script>
export default {
    name: "CheckMessage",
    props: {
        drawerVisible: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object
        }
    },
    methods: {
        handleClose() {
            this.$emit("close");
        }
    }
};
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 50px;
    padding: 0 30px;
}
</style>