<template>
    <el-drawer
        title="教育经历详情"
        direction="ltr"
        :visible.sync="drawerVisible"
        :before-close="handleClose"
    >
        <el-row>
            <el-col :span="8">经历：</el-col>
            <el-col :span="16" class="text-l">{{ item.theme }}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">时间：</el-col>
            <el-col
                :span="16"
                class="text-l"
            >{{ item.dateTime.length > 1 ? item.dateTime.join(" 至 ") : ""}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">详情：</el-col>
            <el-col :span="16" class="text-l text-indent-cn">{{ item.detail }}</el-col>
        </el-row>
    </el-drawer>
</template>

<script>
export default {
    name: "CheckExperience",
    props: {
        drawerVisible: {
            type: Boolean,
            default: false,
        },
        item: {
            type: Object,
        },
    },
    methods: {
        handleClose() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 50px;
    padding: 0 30px;
}
</style>