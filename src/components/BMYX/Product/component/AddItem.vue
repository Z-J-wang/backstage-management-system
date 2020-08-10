<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
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
                        type="text"
                        v-model="formItem.nowPrice"
                        placeholder="请输入平台价格"
                        @change="changeNowPrice()"
                        @input="inputNowPrice()"
                    ></el-input>
                </el-form-item>
                <el-form-item label="商品图片" prop="imgSrcList">
                    <el-row>
                        <el-col :span="24">
                            <upload-image-list
                                :action="action"
                                :headers="headers"
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
import validate_rules from "./validate-rule.js";

export default {
    name: "addNewItem",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        let validatePrice = this.$CustomValidator.validatePrice;
        return {
            action: this.$store.state.server_url+"/api/bmyx/uploadImage",
            options: [],
            title: "新增一条菜品",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            formItem: {
                name: "",
                s_Id: "",
                nowPrice: "",
                imgSrcList: [],
                detail: "",
            },
            rules: Object.assign(
                validate_rules,
                // 此部分为自定义表单验证规则
                {
                    nowPrice: [
                        // 自定义表单验证规则会覆盖 validate_rules.js 中的对应规则，需重写
                        {
                            required: true,
                            message: "请输入今天的价格",
                            trigger: "blur",
                        },
                        { validator: validatePrice, trigger: "blur" },
                    ],
                }
            ),
        };
    },
    components: {
        uploadImageList
    },
    async mounted() {
        this.options = await this.getSort();
    },
    methods: {
        /**
         * 更新图片 src
         */
        updateImgSrcList(imgSrcList) {
            this.formItem.imgSrcList = imgSrcList;
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
         * close 事件
         */
        handleClose() {
            this.$confirm("确认关闭？")
                .then(() => {
                    this.formItem.imgSrcList.forEach(element => {
                        this.delUploadImage(element)
                    });
                    this.$refs["form"].resetFields();
                    this.$emit("close");
                })
                .catch(() => {});
        },
        
        async onSubmit(formName) {
            let valid = await this.$refs[formName].validate();
            if (valid) {
                await this.createNewProduct(this.formItem);
                this.$refs["form"].resetFields();
                this.$emit("close");
            }
        },

        /**
         * 新增一笔商品信息
         */
        async createNewProduct(data) {
            let ret = await this.$HttpApi.createProduct(data);
            if (ret.status === 200 && ret.data.code == 1000) {
                this.$message({
                    message: `${ret.data.data.name} 添加成功！`,
                    type: "success",
                });
                this.$parent.setDataList();
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
            let res = await this.$HttpApi.delUploadImage(filename);
            let flat = false;
            if (res.status === 200 && res.data.code === 1000) {
                console.log(`删除图片：${filename}`);
                flat = true;
            } else {
                console.log("图片删除失败")
                flat = false;
            }

            return flat;
        }
    },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>