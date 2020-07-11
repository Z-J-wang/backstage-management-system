<template>
    <div>
        <h3>后台管理系统</h3>
        <el-dropdown>
            <i
                class="el-icon-setting"
                style="margin-right: 15px"
            ></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
    </div>
</template>

<script>
export default {
    name: "headerBar"
};
</script>

<style scoped>
h3{
    display: block;
    float: left;
    margin: 0;
    font-size: 24px;
}
</style>