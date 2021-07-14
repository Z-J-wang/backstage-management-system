<template>
  <el-dialog
    width="30%"
    :title="title"
    :destroy-on-close="true"
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
  >
    <div>
      <el-form ref="form" label-width="80px" label-position="left" :rules="rules" :model="formItem">
        <el-form-item label="主题" prop="theme">
          <el-input v-model="formItem.theme" placeholder="请输入主题"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="dateTime">
          <el-date-picker
            v-model="formItem.dateTime"
            type="daterange"
            range-separator="至"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            end-placeholder="结束时间"
            start-placeholder="开始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="detail">
          <el-input
            v-model="formItem.detail"
            type="textarea"
            maxlength="250"
            show-word-limit
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'edit-experience',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },

    formItem: {
      type: Object
    }
  },

  data() {
    return {
      rules: {
        theme: [{ required: true, message: '请输入主题', trigger: 'blur' }],

        dateTime: [{ required: true, message: '请输入时间', trigger: 'blur' }],

        detail: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      },
      title: '教育经历编辑'
    };
  },

  methods: {
    handleClose() {
      this.$confirm('确认关闭？')
        .then(() => {
          this.$refs['form'].resetFields();
          this.$emit('close');
        })
        .catch(() => {});
    },

    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = await this.updateJob({ ...this.formItem });
          if (data) {
            this.$message({
              type: 'success',
              message: '更新成功'
            });
            this.$parent.getData();
            this.$emit('close');
            this.$refs['form'].resetFields();
          }
        } else {
          return false;
        }
      });
    },

    /***************************** ajax 操作部分 Start  *********************************/
    async updateJob(form) {
      let res = await this.$HttpApi.updateJob(form);
      let data = {};
      if (res.status === 200 && res.data.code === 1000) {
        data = res.data.msg;
      } else {
        this.$message.error(res.data.msg);

        return false;
      }

      return data;
    }

    /***************************** ajax 操作部分 End  *********************************/
  }
};
</script>
