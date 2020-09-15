<template>
  <div class="window-container">
    <div class="login">
      <h2 class="text-l">后台管理系统</h2>
      <el-form
        ref="loginForm"
        status-icon
        label-width="80px"
        class="demo-ruleForm"
        :model="loginForm"
        :rules="rules"
        @keyup.native.enter="submitForm('loginForm')"
      >
        <el-form-item
          label="账号"
          prop="account"
        >
          <el-input v-model.trim="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model.trim="loginForm.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="16">
            <el-form-item
              label="验证码"
              prop="verifiyCode"
            >
              <el-input
                v-model.trim="loginForm.verifiyCode"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"> <img
              :src="VCode_imgSrc"
              @click="verifitCodeRefresh"
            /> </el-col>
        </el-row>
        <el-form-item>
          <el-button
            type="primary"
            class="submit"
            @click="submitForm('loginForm')"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      VCode_imgSrc:
        this.$store.state.server_url + `/api/verification-code/getCode`,
      loginForm: {
        account: "",
        password: "",
        verifiyCode: "",
      },

      rules: {
        account: [
          { required: true, message: "请输入账户", trigger: "blur" },
          {
            max: 18,
            min: 6,
            message: "账户字符在6-18之间",
            trigger: "blur",
          },
        ],

        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],

        verifiyCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * 表单提交
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginForm.verifiyCode = this.loginForm.verifiyCode.toLowerCase();
          this.login(this.loginForm);
        }
      });
    },

    /**
     * 验证码获取
     */
    verifitCodeRefresh() {
      this.VCode_imgSrc = `${this.$store.state.server_url
        }/api/verification-code/getCode?${Math.random()}`;
    },

    /**
     * 登录
     */
    async login(data) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        let res = await this.$HttpApi.login(data);
        if (res.data.code === 1000) {
          let auth = res.data.data.auth;
          this.$Cookie.setUserInfo(res.data.data.account);
          this.$Cookie.setCookie("auth", auth);
          this.$Cookie.setToken(res.data.data.token);
          if (auth === 2) {
            this.$router.push({ path: "/personalInfo" });
          } else if (auth === 1) {
            this.$router.push({ path: "/BMYX/product" });
          } else if (auth == 0) {
            this.$router.push({ path: "/accountManagement" });
          }
        } else {
          this.$message.error(res.data.msg);
        }
      } finally {
        loading.close();
        this.verifitCodeRefresh();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.window-container {
}
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 30px;
  border: 1px solid #c5c2c2;
  border-radius: 20px;
  .submit {
    width: 100%;
  }
}
</style>
