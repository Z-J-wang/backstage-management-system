<template>
  <el-dialog
    width="30%"
    :title="titleMap.get(type)"
    :destroy-on-close="true"
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
  >
    <div v-if="dialogVisible">
      <el-form ref="form" label-width="80px" label-position="left" :rules="rules" :model="formItem">
        <el-form-item label="技能名称" prop="name">
          <el-input v-model="formItem.name" placeholder="请输入技能名称"></el-input>
        </el-form-item>
        <el-form-item label="熟练度">
          <div style="width: 400px">
            <dashboard v-model="formItem.level" />
          </div>
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
import dashboard from './dashboard.vue';
export default {
  name: 'create-new-experience',
  props: {
    formItem: {
      type: Object,
      default: function () {
        return {
          name: '',
          level: 0
        };
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      require: true
    }
  },
  components: {
    dashboard
  },
  data() {
    const titleMap = new Map([
      ['create', '新增一条技能记录'],
      ['edit', '编辑技能记录']
    ]);
    return {
      titleMap,
      rules: {
        name: [{ required: true, message: '请输入技能名称', trigger: 'blur' }]
      },

      title: '新增一条技能记录'
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
          if (this.type === 'create') {
            this.create({ ...this.formItem });
          } else if (this.type === 'edit') {
            this.updated({ ...this.formItem });
          }
        } else {
          return false;
        }
      });
    },

    /***************************** ajax 操作部分 Start  *********************************/
    async create(form) {
      let res = await this.$HttpApi.createSkills(form);
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
    },

    async updated(form) {
      let res = await this.$HttpApi.updateSkills(form);
      let data = {};
      if (res.status === 200 && res.data.code === 1000) {
        data = res.data.data;
        this.$message({
          type: 'success',
          message: '修改成功'
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
