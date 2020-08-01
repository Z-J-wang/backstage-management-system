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
                <el-form-item label="菜名" prop="name">
                    <el-input v-model="formItem.name" placeholder="请输入菜名"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="s_Id">
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
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="今天价格" prop="nowPrice">
                    <el-input
                        v-model="formItem.nowPrice"
                        placeholder="请输入今天价格"
                        @change="changeNowPrice()"
                        @input="inputNowPrice()"
                    ></el-input>
                </el-form-item>
                <el-form-item label="昨天价格" prop="oldPrice">
                    <el-input
                        v-model="formItem.oldPrice"
                        @change="changeOldPrice()"
                        @input="inputOldPrice()"
                        placeholder="请输入昨天价格"
                    ></el-input>
                </el-form-item>
                <el-form-item label="图片链接" prop="imgSrc">
                    <el-row>
                        <el-col :span="12">
                            <upload-image
                                :imageUrl="formItem.imgSrc"
                                :action="action"
                                @updateImgSrc="updateImgSrc"
                                width="120"
                                height="120"
                            ></upload-image>
                        </el-col>
                        <el-col :span="12">
                            <div style="text-align: left; padding-top:30px">
                                点击左侧，进行菜品图片上传
                                <br />注意，图片上传完成及图片修改完毕
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="介绍" prop="detail">
                    <el-input
                        v-model="formItem.detail"
                        type="textarea"
                        maxlength="400"
                        show-word-limit
                        placeholder="请输入博客摘要"
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
import uploadImage from "@c/common/From_tools/UploadImage.vue";
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
            action: "http://localhost:3000/api/bmyx/uploadImage",
            title: "修改一条菜品",
            cur_imgSrc: '',
            options: [],
            rules: Object.assign(validate_rules, 
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
                        required: true,
                        message: "请输入价格",
                        trigger: "blur",
                    },
                    { validator: validatePrice, trigger: "blur" },
                ],
            })
        };
    },
    async mounted() {
        this.options = await this.getSort();
    },
    components: {
        uploadImage,
    },
    watch:{
        formItem(val){
            this.cur_imgSrc = val.imgSrc;
            console.log(this.formItem.imgSrc)
            console.log(this.cur_imgSrc)
        }
    },
    methods: {
         /**
         * 更新图片 src
         */
        updateImgSrc(imgSrc) {
            this.formItem.imgSrc = imgSrc;
            console.log(`新增图片：${this.formItem.imgSrc}`);
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
            let imgsrc = this.formItem.imgSrc;
            this.$confirm("确认关闭？")
                .then(() => {
                    console.log(imgsrc)
                    console.log(this.cur_imgSrc)
                    if(imgsrc !== this.cur_imgSrc){
                        this.delUploadImage(imgsrc)
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
            let newImgSrc = ret.data.data.rows[0].imgSrc;
            if (ret.status === 200 && ret.data.code == 1000) {
                this.$message({
                    message: "商品信息更新成功！",
                    type: "success",
                });
                if(newImgSrc !== this.cur_imgSrc){
                    this.delUploadImage(this.cur_imgSrc);
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
            let res = await this.$HttpApi.delUploadImage(filename);
            let flat = false;
            if (res.status === 200 && res.data.code === 1000) {
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