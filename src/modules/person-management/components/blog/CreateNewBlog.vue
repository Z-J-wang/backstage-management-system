<template>
  <el-dialog
    width="30%"
    :title="title"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <div>
      <el-form
        ref="form"
        label-width="80px"
        label-position="left"
        :rules="rules"
        :model="formItem"
      >
        <el-form-item
          prop="title"
          label="博客标题"
        >
          <el-input
            v-model="formItem.title"
            placeholder="请输入博客标题"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发布时间"
          prop="publishTime"
        >
          <el-date-picker
            v-model="formItem.publishTime"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="博客链接"
          prop="href"
        >
          <el-input
            v-model="formItem.href"
            placeholder="请输入博客链接"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="imgSrc"
          label="图片链接"
        >
          <el-input
            v-model="formItem.imgSrc"
            placeholder="请输入博客介绍图片链接"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="digest"
          label="博客摘要"
        >
          <el-input
            v-model="formItem.digest"
            maxlength="400"
            type="textarea"
            show-word-limit
            placeholder="请输入博客摘要"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        @click="onSubmit('form')"
      >提 交</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'create-new-blog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      formItem: {
        title: '',
        publishTime: '',
        href: '',
        imgSrc: '',
        digest: '',
      },

      rules: {
        title: [
          {
            required: true,
            message: '请输入博客标题',
            trigger: 'blur',
          },
        ],

        publishTime: [
          {
            required: true,
            message: '请输入博客发布时间',
            trigger: 'blur',
          },
        ],

        href: [
          {
            required: true,
            message: '请输入博客链接',
            trigger: 'blur',
          },
        ],

        imgSrc: [
          // {
          //     required: true,
          //     message: "请输入博客介绍图片链接",
          //     trigger: "blur"
          // }
        ],

        digest: [
          // {
          //     required: true,
          //     message: "请输入博客摘要",
          //     trigger: "blur"
          // },
          {
            maxLength: 250,
            message: '请输入博客摘要',
            trigger: 'blur',
          },
        ],
      },

      title: '新增一条教育经历记录',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },

        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          },
        ],
      },
    };
  },

  methods: {
    handleClose() {
      this.$confirm('确认关闭？')
        .then(() => {
          this.$refs['form'].resetFields();
          this.$emit('close');
        })
        .catch(() => { });
    },

    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = this.createBlog(this.formItem);
          if (data) {
            this.$message({
              type: 'success',
              message: '新增成功',
            });
            this.$emit('close');
            this.$parent.getData();
          }
        } else {
          return false;
        }
      });
    },

    /***************************** ajax 操作部分 Start  *********************************/
    async createBlog(form) {
      let res = await this.$HttpApi.createBlog(form);
      let data = {};
      if (res.status === 200 && res.data.code === 1000) {
        data = res.data.data;
      } else {
        this.$message.error(res.data.msg);

        return false;
      }

      return data;
    },

    /***************************** ajax 操作部分 End  *********************************/
  },
};
</script>
