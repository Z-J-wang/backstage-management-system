<template>
  <el-dialog
    width="30%"
    :title="title"
    :destroy-on-close="true"
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
  >
    <div v-if="dialogVisible">
      <el-form ref="form" label-width="80px" label-position="left" :rules="rules" :model="formItem">
        <el-form-item label="项目名称" prop="theme">
          <el-input v-model="formItem.theme" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="dateTime">
          <el-date-picker
            v-model="formItem.dateTime"
            type="monthrange"
            style="width: 100%;"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="detail">
          <the-editor v-model="formItem.detail" editorName="content" />
          <!-- <el-input
            v-model="formItem.detail"
            type="textarea"
            maxlength="250"
            show-word-limit
            placeholder="请输入描述"
          ></el-input>-->
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
  name: 'create-new-experience',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      formItem: {
        theme: '',
        dateTime: '',
        detail: ''
      },

      rules: {
        theme: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],

        dateTime: [{ required: true, message: '请输入时间', trigger: 'blur' }],

        detail: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      },

      title: '新增一条项目经历记录'
    };
  },

  methods: {
    handleClose() {
      this.$refs['form'].resetFields();
      this.$nextTick(() => {
        this.$emit('close');
      });
    },

    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.create({ ...this.formItem });
        } else {
          return false;
        }
      });
    },

    /***************************** ajax 操作部分 Start  *********************************/
    async create(form) {
      console.log(form);
      let res = await this.$HttpApi.createProject(form);
      let data = {};
      if (res.status === 200 && res.data.code === 1000) {
        data = res.data.data;
        this.$message({
          type: 'success',
          message: '新增成功'
        });
        this.$refs['form'].resetFields();
        this.$emit('close');
        this.$parent.getData();
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
