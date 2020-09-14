<template>
    <el-drawer
        direction="ltr"
        title="教育经历详情"
        :visible.sync="drawerVisible"
        :before-close="handleClose"
    >
        <el-row>
            <el-col :span="8">经历：</el-col>
            <el-col
                class="text-l"
                :span="16"
            >{{ item.theme }}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">时间：</el-col>
            <el-col
                class="text-l"
                :span="16"
            >{{ item.dateTime.length > 1 ? item.dateTime.join(" 至 ") : ""}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">详情：</el-col>
            <el-col
                class="text-l text-indent-cn"
                :span="16"
            >{{ item.detail }}</el-col>
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