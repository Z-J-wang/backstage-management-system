<template>
    <div class="personalInfo" @click="AlleditorClose">
        <el-row>
            <el-col :span="12" style="padding-left:60px;">
                <el-row>
                    <el-col :span="18">
                        <el-form ref="personalInfo" :model="personalInfo" :rules="rules" label-width="100px">
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
                                                @dblclick="name_editor = true; editorGetFocus('placeOfBirth');"
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
                            <el-form-item label="籍贯">
                                <div class="p-l-60">
                                    <div style="text-align:left;" v-show="!placeOfBirth_editor">
                                        {{personalInfo.placeOfBirth}}
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
                                    <el-input
                                        id="placeOfBirth"
                                        v-model="personalInfo.placeOfBirth"
                                        v-show="placeOfBirth_editor"
                                        @click.stop.native
                                    ></el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="出生日期">
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
                            <el-form-item label="国籍">
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
                            <el-form-item label="现居地">
                                <div class="p-l-60">
                                    <div style="text-align:left;" v-show="!presentAddress_editor">
                                        {{formatOfPresentAddress}}
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
                            <el-form-item label="个人简介">
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
                            <el-form-item style="margin-top: 100px;">
                                <el-button type="primary" @click="onSubmit('personalInfo')">立即创建</el-button>
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
import headPortrait from "./HeadPortrait.vue";
import districtSelect from "../common/From_tools/DIstrictSelect.vue";

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
                name: "xxx",
                birthday: "1996-10-04",
                placeOfBirth: "广东湛江",
                nationality: "中国",
                presentAddress: ["广东省", "湛江市"],
                introducts: "Vest"
            },

            rules:{
                name: [{required: true, message: '请输入活动名称', trigger: 'blur'}]
            }
        };
    },
    computed: {
        // 现居地格式化
        formatOfPresentAddress() {
            return this.personalInfo.presentAddress.join(" / ");
        }
    },
    components: {
        headPortrait,
        districtSelect
    },
    methods: {
        AlleditorClose() {
            this.name_editor = false;
            this.placeOfBirth_editor = false;
            this.birthday_editor = false;
            this.nationality_editor = false;
            this.presentAddress_editor = false;
            this.introducts_editor = false;
        },
        editorGetFocus(id) {
            const elem = document.getElementById(id);
            setTimeout(function() {
                elem.focus();
            }, 0);
        },
        onSubmit(){

        },
        resetForm(from){
            this.$refs[from].resetFields();
        }
    }
};
</script>

<style lang="less" scoped>
// .personalInfo{
//     padding-top: 100px;
// }
</style>