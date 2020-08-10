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
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="formItem.name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品类别" prop="s_Id">
                    <el-select
                        v-model="formItem.s_Id"
                        clearable
                        placeholder="请选择"
                        style="width:100%;"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.name == '全部'"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台价格" prop="nowPrice">
                    <el-input
                        v-model="formItem.nowPrice"
                        placeholder="请输入平台价格"
                        @change="changeNowPrice()"
                        @input="inputNowPrice()"
                    ></el-input>
                </el-form-item>
                <el-form-item label="市面价格" prop="oldPrice">
                    <el-input
                        v-model="formItem.oldPrice"
                        @change="changeOldPrice()"
                        @input="inputOldPrice()"
                        placeholder="请输入市面价格"
                    ></el-input>
                </el-form-item>
                <el-form-item label="商品图片" prop="imgSrcList">
                    <el-row>
                        <el-col :span="24">
                            <el-alert
                                class="upload_warn"
                                description="注意：您对图片的所有操作将直接被记录。"
                                type="warning"
                                show-icon
                                :closable="false"
                            ></el-alert>
                            <upload-image-list
                                :action="action"
                                :imageUrlList="formItem.imgSrcList"
                                @updateImgSrcList="updateImgSrcList"
                                @delUploadImage="delUploadImage"
                            ></upload-image-list>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="商品介绍" prop="detail">
                    <el-input
                        v-model="formItem.detail"
                        type="textarea"
                        maxlength="400"
                        show-word-limit
                        placeholder="请输入商品介绍"
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
import uploadImageList from "@c/common/From_tools/UploadImageList.vue";
import validate_rules from "./validate-rule";

export default {
    name: "changeItem",
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
            title: "修改一条菜品",
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
    components: {
        uploadImageList,
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
            this.$confirm("确认关闭？")
                .then(() => {
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
            if (ret.status === 200 && ret.data.code == 1000) {
                this.$message({
                    message: "商品信息更新成功！",
                    type: "success",
                });
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
                console.log(`删除图片：${this.formItem.imgSrc}`);
                flat = true;
            } else {
                console.log(`删除图片失败`);
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