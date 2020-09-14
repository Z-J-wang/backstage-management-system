<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :destroy-on-close="true"
    >
        <div>
            <el-form
                :model="formItem"
                :rules="rules"
                ref="form"
                label-width="80px"
                label-position="left"
            >
                <el-form-item
                    label="发信人"
                    prop="name"
                >
                    <el-input
                        v-model="formItem.name"
                        placeholder="请输入发信人"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="发信时间"
                    prop="datetime"
                >
                    <el-date-picker
                        v-model="formItem.datetime"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        style="width:100%"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item
                    label="邮箱"
                    prop="email"
                >
                    <el-input
                        v-model="formItem.email"
                        placeholder="请输入邮箱"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="个人网站链接"
                    prop="website"
                >
                    <el-input
                        v-model="formItem.website"
                        placeholder="请输入个人网站链接"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="主题"
                    prop="subject"
                >
                    <el-input
                        v-model="formItem.subject"
                        type="textarea"
                        maxlength="400"
                        show-word-limit
                        placeholder="请输入主题"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="内容"
                    prop="content"
                >
                    <el-input
                        v-model="formItem.content"
                        type="textarea"
                        maxlength="400"
                        show-word-limit
                        placeholder="请输入内容"
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
    name: "CreateNewMessage",
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            formItem: {
                name: "",
                datetime: "",
                email: "",
                website: "",
                subject: "",
                content: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入发信人",
                        trigger: "blur",
                    },
                ],
                datetime: [
                    {
                        required: true,
                        message: "请输入发信时间",
                        trigger: "blur",
                    },
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur",
                    },
                ],
                website: [
                    // {
                    //     required: true,
                    //     message: "请输入博客介绍图片链接",
                    //     trigger: "blur"
                    // }
                ],
                subject: [
                    {
                        required: true,
                        message: "请输入主题",
                        trigger: "blur",
                    },
                ],
                content: [
                    {
                        required: true,
                        message: "请输入内容",
                        trigger: "blur",
                    },
                    {
                        maxLength: 250,
                        message: "限定长度为250个字符",
                        trigger: "blur",
                    },
                ],
            },
            title: "新增一条教育经历记录",
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        },
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        },
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        },
                    },
                ],
            },
        };
    },
    methods: {
        handleClose() {
            this.$confirm("确认关闭？")
                .then(() => {
                    this.$refs["form"].resetFields();
                    this.$emit("close");
                })
                .catch(() => {});
        },
        onSubmit(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let data = this.createMsg(this.formItem);
                    if (data) {
                        this.$message({
                            type: "success",
                            message: "新增成功",
                        });
                        this.$emit("close");
                        this.$parent.getData();
                    }
                } else {
                    return false;
                }
            });
        },

        /***************************** ajax 操作部分 Start  *********************************/
        async createMsg(form) {
            let res = await this.$HttpApi.createMsg(form);
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