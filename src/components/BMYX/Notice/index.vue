<template>
    <div class="tableContain">
        <div class="explain">
            <p class="text-l">
                <span>
                    <i>通告栏位于小程序首页顶部，用于告知全部用户信息。</i>
                </span>
            </p>
        </div>
        <el-divider>
            <i class="el-icon-mobile-phone"></i>
        </el-divider>
        <el-collapse v-model="activeCollapse" accordion>
            <el-collapse-item title="通告展示" name="1">
                <div class="noticeShow">
                    <el-row :gutter="20">
                        <el-col :span="4" class="text-r">通告内容：</el-col>
                        <el-col :span="18" class="text-l">
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="notice.content"
                                disabled
                            ></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="4" class="text-r">是否开启滚动播放：</el-col>
                        <el-col :span="18" class="text-l">
                            <el-switch
                                v-model="notice.scrollable"
                                disabled
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                            ></el-switch>
                        </el-col>
                    </el-row>
                </div>
            </el-collapse-item>
            <el-collapse-item title="通告编辑" name="2">
                <div class="noticeEditor">
                    <div>
                        <el-form
                            ref="form"
                            :model="newNoticeFrom"
                            label-width="200px"
                            class="text-l"
                        >
                            <el-form-item label="通告内容：" prop="content">
                                <el-input type="textarea" v-model="newNoticeFrom.content"></el-input>
                            </el-form-item>
                            <el-form-item label="是否开启滚动播放：" prop="scrollable">
                                <el-switch v-model="newNoticeFrom.scrollable"></el-switch>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">更新通告</el-button>
                                <el-button @click="onCancel">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    name: "NoticeManagement",
    data() {
        return {
            activeCollapse: "1",
            notice: {
                content: "",
                scrollable: true,
            },
            newNoticeFrom: {
                content: "",
                scrollable: true,
            },
        };
    },
    watch: {
        "newNoticeFrom.scrollable": function (val) {
            let message = "";
            if (val) {
                message = "您将开启通告滚动播放功能";
            } else {
                message = "您将关闭通告滚动播放功能";
            }
            this.$message({
                message: message,
                type: "warning",
            });
        },
    },
    mounted() {
        this.setDataList();
    },
    methods: {
        async setDataList() {
            let data = await this.getData();
            Object.assign(this.notice, data);
            Object.assign(this.newNoticeFrom, data);
        },

        onSubmit() {
            this.$confirm("确认更新通告吗？")
                .then(() => {
                    this.updatedNotice(this.newNoticeFrom);
                })
                .catch(() => {});
        },

        onCancel() {
            this.$confirm("确认取消编辑通告吗？若取消，您当前的编辑将被清空！")
                .then(() => {
                     Object.assign(this.newNoticeFrom, this.notice);
                    this.activeCollapse = "1";
                })
                .catch(() => {});
        },

        // ajax 部分
        /**
         * 条件查询
         */
        async getData() {
            let res = await this.$HttpApi.getBMYXNotice();
            let data = [];
            if (res.status === 200 && res.data.code === 1000) {
                data = res.data.data;
            } else {
                this.$message.error(res.data.msg);
            }

            return data;
        },

        async updatedNotice(data) {
            let ret = await this.$HttpApi.updatedNotice(data);
            if (ret.status === 200 && ret.data.code == 1000) {
                this.$message({
                    message: "通告更新成功！",
                    type: "success",
                });
                this.setDataList();
                this.activeCollapse = "1";
            } else {
                this.$message.error("系统出错，请重试！");
            }
        },
    },
};
</script>

<style scoped lang="less">
.tableContain {
    max-width: 1200px;
    margin-left: 60px;
    .explain {
        span {
            font-size: 18px;
            color: #6b6a6a;
        }
    }
    .noticeShow {
        .el-row {
            margin-top: 50px;
        }
    }
}
</style>