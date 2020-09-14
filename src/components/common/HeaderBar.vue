<template>
    <div>
        <h3>后台管理系统</h3>
        <el-dropdown>
            <i
                class="el-icon-setting"
                style="margin-right: 15px"
            ></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>{{ userInfo || '管理员'}}</span>
    </div>
</template>

<script>
export default {
    name: "headerBar",
    data() {
        return {
            userInfo: {},
        };
    },
    mounted() {
        this.userInfo = this.$Cookie.getUserInfo();
    },
    methods: {
        logout() {
            let res = this.$HttpApi.logout();
            if (res.status === 200 && res.data.data.code !== 1000) {
                this.$message.error(res.data.msg);
            } else {
                this.$Cookie.removeToken();
                this.$Cookie.removeUserInfo();
                this.$Cookie.removeCookie("auth");
                this.$router.push({ name: "login" });
            }
        },
    },
};
</script>

<style scoped>
h3 {
    display: block;
    float: left;
    margin: 0;
    font-size: 24px;
}
</style>