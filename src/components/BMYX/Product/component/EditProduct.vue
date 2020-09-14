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
                :model="formItem"
                label-width="80px"
                label-position="left"
                :rules="rules"
            >
                <el-form-item
                    prop="name"
                    label="商品名称"
                >
                    <el-input
                        v-model="formItem.name"
                        placeholder="请输入商品名称"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="s_Id"
                    label="商品类别"
                >
                    <el-select
                        v-model="formItem.s_Id"
                        clearable
                        style="width:100%;"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                            :disabled="item.name == '全部'"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="nowPrice"
                    label="平台价格"
                >
                    <el-input
                        v-model="formItem.nowPrice"
                        placeholder="请输入平台价格"
                        @change="changeNowPrice()"
                        @input="inputNowPrice()"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="oldPrice"
                    label="市面价格"
                >
                    <el-input
                        v-model="formItem.oldPrice"
                        placeholder="请输入市面价格"
                        @input="inputOldPrice()"
                        @change="changeOldPrice()"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="videoSrc"
                    label="视频链接"
                >
                    <el-row>
                        <el-col :span="24">
                            <upload-video
                                width="120"
                                height="120"
                                :action="action"
                                :videoUrl="formItem.videoSrc"
                                @updatevideoSrc="updatevideoSrc"
                            ></upload-video>
                        </el-col>
                        <el-col :span="24">
                            <div style="text-align: left;line-height: 20px;">
                                提示：<br>
                                视频不能大于50M，且视频时长最长为1:30秒。
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                    label="商品图片"
                    prop="imgSrcList"
                >
                    <el-row>
                        <el-col :span="24">
                            <el-alert
                                show-icon
                                type="warning"
                                class="upload_warn"
                                description="注意：您对图片的所有操作将直接被记录。"
                                :closable="false"
                            ></el-alert>
                            <upload-image-list
                                :action="action"
                                :imageUrlList="formItem.imgSrcList"
                                @delUploadImage="delUploadImage"
                                @updateImgSrcList="updateImgSrcList"
                            ></upload-image-list>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                    prop="detail"
                    label="商品介绍"
                >
                    <el-input
                        v-model="formItem.detail"
                        maxlength="30"
                        type="textarea"
                        show-word-limit
                        placeholder="请输入商品介绍"
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
import uploadVideo from "@c/common/From_tools/UploadVideo.vue";
import uploadImageList from "@c/common/From_tools/UploadImageList.vue";
import validate_rules from "./validate-rule";

export default {
    name: "EditProduct",
    components: {
        uploadImageList,
        uploadVideo,
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
        formItem: {
            type: Object,
        },
    },
    data() {
        let validatePrice = this.$CustomValidator.validatePrice;
        return {
            action: this.$store.state.server_url + "/api/bmyx/uploadImage",
            title: "修改商品信息",
            cur_video: "", // 修改前的视频
            options: [],
            rules: Object.assign(
                validate_rules,
                // 此部分为自定义表单验证规则
                {
                    nowPrice: [
                        // 自定义表单验证规则会覆盖 validate_rules.js 中的对应规则，需重写
                        {
                            required: true,
                            message: "请输入价格",
                            trigger: "blur",
                        },
                        { validator: validatePrice, trigger: "blur" },
                    ],
                    oldPrice: [
                        // 自定义表单验证规则会覆盖 validate_rules.js 中的对应规则，需重写
                        {
                            required: false,
                            message: "请输入价格",
                            trigger: "blur",
                        },
                        { validator: validatePrice, trigger: "blur" },
                    ],
                }
            ),
        };
    },
    async mounted() {
        this.options = await this.getSort();
    },
    watch: {
        formItem(val) {
            this.cur_video = val.videoSrc;
            console.log(this.formItem.videoSrc);
            console.log(this.cur_video);
        },
    },
    methods: {
        /**
         * 更新图片 src
         */
        updateImgSrcList(imgSrcList) {
            this.formItem.imgSrcList = imgSrcList;
            this.updatedProduct(this.formItem);
            console.log(`新增图片：${this.formItem.imgSrcList}`);
        },

        /**
         * 更新视频 src
         */
        updatevideoSrc(videoSrc) {
            this.formItem.videoSrc = videoSrc;
            console.log(`新增视频：${this.formItem.videoSrc}`);
        },

        /**
         * 今天价格的 change 事件
         */
        changeNowPrice() {
            let price = Number(this.formItem.nowPrice);
            this.formItem.nowPrice = price.toFixed(2);
        },

        /**
         * 今天价格的 input 事件
         */
        inputNowPrice() {
            this.formItem.nowPrice = this.formItem.nowPrice.match(
                /\d+(\.\d{0,2})?/
            )
                ? this.formItem.nowPrice.match(/\d+(\.\d{0,2})?/)[0]
                : "";
        },

        /**
         * 昨天价格的 change 事件
         */
        changeOldPrice() {
            let price = Number(this.formItem.oldPrice);
            this.formItem.oldPrice = price.toFixed(2);
        },

        /**
         * 昨天价格的 input 事件
         */
        inputOldPrice() {
            this.formItem.oldPrice = this.formItem.oldPrice.match(
                /\d+(\.\d{0,2})?/
            )
                ? this.formItem.oldPrice.match(/\d+(\.\d{0,2})?/)[0]
                : "";
        },

        /**
         * close 事件
         */
        handleClose() {
            let videoSrc = this.formItem.videoSrc;
            this.$confirm("确认关闭？")
                .then(() => {
                    if (videoSrc !== this.cur_video) {
                        this.delUploadImage(videoSrc);
                    }
                    this.$emit("close");
                    this.$refs["form"].resetFields();
                })
                .catch(() => {});
        },

        async onSubmit(formName) {
            let valid = await this.$refs[formName].validate();
            if (valid) {
                this.updatedProduct(this.formItem);
                this.$emit("close");
                this.$parent.setDataList();
            }
        },

        async updatedProduct(data) {
            let ret = await this.$HttpApi.updatedProduct(data);
            let newVideoSrc = ret.data.data.rows[data.id].videoSrc;
            if (ret.status === 200 && ret.data.code == 1000) {
                this.$message({
                    message: "商品信息更新成功！",
                    type: "success",
                });
                if (newVideoSrc !== this.cur_video) {
                    this.delUploadImage(this.cur_video);
                }
            } else {
                this.$message.error("系统出错，请重试！");
            }
        },

        /**
         * 获取类别
         */
        async getSort() {
            let res = await this.$HttpApi.getBMYXSort();
            let data = [];
            if (res.status === 200 && res.data.code === 1000) {
                data = res.data.data;
            } else {
                this.$message.error(res.data.msg);
            }

            return data;
        },

        /**
         * 删除图片
         */
        async delUploadImage(filename) {
            let index = this.formItem.imgSrcList.indexOf(filename);
            this.formItem.imgSrcList.splice(index, 1);

            let res = await this.$HttpApi.delUploadImage(filename);
            let flat = false;
            if (res.status === 200 && res.data.code === 1000) {
                this.updatedProduct(this.formItem);
                console.log(`删除文件：${this.formItem.imgSrc}`);
                flat = true;
            } else {
                console.log(`删除文件失败`);
                flat = false;
            }

            return flat;
        },
    },
};
</script>

<style lang="less">
.upload_warn {
    .el-alert__content {
        p {
            line-height: 20px;
            margin: 0;
        }
    }
    i {
        font-size: 16px !important;
        width: 16px !important;
    }
}
</style>