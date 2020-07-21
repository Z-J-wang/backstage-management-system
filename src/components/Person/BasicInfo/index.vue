<template>
    <div class="personalInfo" @click="AlleditorClose">
        <el-row>
            <el-col :span="12" style="padding-left:60px;">
                <el-row>
                    <el-col :span="18">
                        <el-form
                            ref="personalInfo"
                            :model="personalInfo"
                            :rules="rules"
                            label-width="100px"
                        >
                            <el-form-item label="姓名" prop="name">
                                <div class="p-l-60">
                                    <div style="text-align:left;" v-show="!name_editor">
                                        {{personalInfo.name}}
                                        <el-tooltip
                                            class="item"
                                            effect="light"
                                            content="双击进行编辑"
                                            placement="right"
                                        >
                                            <i
                                                class="el-icon-edit pointer"
                                                @dblclick="name_editor = true; editorGetFocus('name');"
                                            ></i>
                                        </el-tooltip>
                                    </div>
                                    <el-input
                                        id="name"
                                        v-model="personalInfo.name"
                                        v-show="name_editor"
                                        @click.stop.native
                                    ></el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="籍贯" prop="placeOfBirth">
                                <div class="p-l-60">
                                    <div style="text-align:left;" v-show="!placeOfBirth_editor">
                                        {{personalInfo.placeOfBirth.join(' / ')}}
                                        <el-tooltip
                                            class="item"
                                            effect="light"
                                            content="双击进行编辑"
                                            placement="right"
                                        >
                                            <i
                                                class="el-icon-edit pointer"
                                                @dblclick="placeOfBirth_editor = true; editorGetFocus('placeOfBirth');"
                                            ></i>
                                        </el-tooltip>
                                    </div>
                                    <!-- <el-input
                                        id="placeOfBirth"
                                        v-model="personalInfo.placeOfBirth"
                                        v-show="placeOfBirth_editor"
                                        @click.stop.native
                                    ></el-input>-->
                                    <district-select
                                        id="placeOfBirth"
                                        v-model="personalInfo.placeOfBirth"
                                        v-show="placeOfBirth_editor"
                                        @click.stop.native
                                    ></district-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="出生日期" prop="birthday">
                                <div class="p-l-60">
                                    <div style="text-align:left;" v-show="!birthday_editor">
                                        {{personalInfo.birthday}}
                                        <el-tooltip
                                            class="item"
                                            effect="light"
                                            content="双击进行编辑"
                                            placement="right"
                                        >
                                            <i
                                                class="el-icon-edit pointer"
                                                @dblclick="birthday_editor = true; editorGetFocus('birthday');"
                                            ></i>
                                        </el-tooltip>
                                    </div>
                                    <el-date-picker
                                        id="birthday"
                                        v-show="birthday_editor"
                                        v-model="personalInfo.birthday"
                                        type="date"
                                        placeholder="请选择出生日期"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%"
                                        @click.stop.native
                                    ></el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="国籍" prop="nationality">
                                <div class="p-l-60">
                                    <div style="text-align:left;" v-show="!nationality_editor">
                                        {{personalInfo.nationality}}
                                        <el-tooltip
                                            class="item"
                                            effect="light"
                                            content="双击进行编辑"
                                            placement="right"
                                        >
                                            <i
                                                class="el-icon-edit pointer"
                                                @dblclick="nationality_editor = true; editorGetFocus('nationality')"
                                            ></i>
                                        </el-tooltip>
                                    </div>
                                    <el-input
                                        id="nationality"
                                        v-model="personalInfo.nationality"
                                        v-show="nationality_editor"
                                        @click.stop.native
                                    ></el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="现居地" prop="presentAddress">
                                <div class="p-l-60">
                                    <div style="text-align:left;" v-show="!presentAddress_editor">
                                        {{personalInfo.presentAddress.join(' / ')}}
                                        <el-tooltip
                                            class="item"
                                            effect="light"
                                            content="双击进行编辑"
                                            placement="right"
                                        >
                                            <i
                                                class="el-icon-edit pointer"
                                                @dblclick="presentAddress_editor = true; editorGetFocus('presentAddress')"
                                            ></i>
                                        </el-tooltip>
                                    </div>
                                    <district-select
                                        id="presentAddress"
                                        v-model="personalInfo.presentAddress"
                                        v-show="presentAddress_editor"
                                        @click.stop.native
                                    ></district-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="个人简介" prop="introducts">
                                <div class="p-l-60">
                                    <div style="text-align:left;" v-show="!introducts_editor">
                                        {{personalInfo.introducts}}
                                        <el-tooltip
                                            class="item"
                                            effect="light"
                                            content="双击进行编辑"
                                            placement="right"
                                        >
                                            <i
                                                class="el-icon-edit pointer"
                                                title="双击编辑"
                                                @dblclick="introducts_editor = true; editorGetFocus('introducts')"
                                            ></i>
                                        </el-tooltip>
                                    </div>
                                    <el-input
                                        id="introducts"
                                        type="textarea"
                                        placeholder="请输入内容"
                                        v-model="personalInfo.introducts"
                                        maxlength="150"
                                        show-word-limit
                                        v-show="introducts_editor"
                                        @click.stop.native
                                    ></el-input>
                                </div>
                            </el-form-item>
                            <el-form-item style="margin-top: 100px;" v-show="btn_changeVisible">
                                <el-button type="primary" @click="onSubmit('personalInfo')">确定修改</el-button>
                                <el-button @click="resetForm('personalInfo')">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12" style="text-align: left">
                <head-portrait></head-portrait>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import headPortrait from "./component/HeadPortrait.vue";
import districtSelect from "@c/common/From_tools/DIstrictSelect.vue";
import validate_rules from "./validate_rules.js"; // 引入 validate rules

export default {
    name: "peronal-info",
    data() {
        return {
            /* 编辑器控制器 */
            name_editor: false,
            placeOfBirth_editor: false,
            birthday_editor: false,
            nationality_editor: false,
            presentAddress_editor: false,
            introducts_editor: false,

            // 个人基础数据
            personalInfo: {
                name: "Jay",
                gender: true,
                birthday: "1996-10-04",
                placeOfBirth: ["广东省", "深圳市"],
                nationality: "中国",
                presentAddress: ["广东省", "深圳市"],
                introducts: "Web 开发"
            },
            rules: validate_rules,
            btn_changeVisible: false
        };
    },
    components: {
        headPortrait,
        districtSelect
    },
    created() {
        this.getBasicinfo();
    },
    watch: {
        personalInfo: {
            handler: function() {
                this.btn_changeVisible = true;
            },
            deep: true
        }
    },
    methods: {
        /**
         * 隐藏表单控件
         */
        AlleditorClose() {
            this.name_editor = false;
            this.placeOfBirth_editor = false;
            this.birthday_editor = false;
            this.nationality_editor = false;
            this.presentAddress_editor = false;
            this.introducts_editor = false;
        },

        /**
         * input 的 id 获取焦点
         * @param {string} id
         */
        editorGetFocus(id) {
            const elem = document.getElementById(id);
            setTimeout(function() {
                elem.focus();
            }, 0);
        },

        /**
         * 提交修改的个人基础信息
         * @param {string} formName
         */
        async onSubmit(formName) {
            let ret_confirm = await this.$confirm("确认提交？");
            if (ret_confirm) {
                let ret_valid = await this.$refs[formName].validate(); // 进行表单验证
                if (ret_valid) {
                    this.changeBasicinfo(this.personalInfo);
                }
            }
        },

        /**
         * 重置表单
         * @param {string} formName
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ajax 部分 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        /**
         * 获取个人基础信息
         */
        async getBasicinfo() {
            let res = await this.$HttpApi.getBasicinfo();
            if (res.status === 200) {
                this.personalInfo = res.data;
                
                // 获取个人信息后，强制隐藏提价btn
                setTimeout(()=> {
                    this.btn_changeVisible = false;
                }, 0)
            } else {
                this.$message.error("糟糕！！系统出错！请刷新页面重新获取！");
            }
        },

        /**
         * 修改个人基础信息
         * @param {object} params
         */
        async changeBasicinfo(params) {
            let res = await this.$HttpApi.updateBasicinfo(params);
            if (res.status === 200) {
                this.$message({
                    message: "个人基础信息更新成功！"
                });
            } else {
                this.$message.error("糟糕！！系统出错！请重试！");
            }
        }
    }
};
</script>

<style lang="less" scoped>
// .personalInfo{
//     padding-top: 100px;
// }
</style>