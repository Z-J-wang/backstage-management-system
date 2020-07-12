<template>
    <div class="personalInfo">
        <el-row>
            <el-col
                :span="12"
                style="padding-left:60px;"
            >
                <el-row>
                    <el-col :span="18">
                        <el-form
                            ref="form"
                            :model="personalInfo"
                            label-width="100px"
                        >
                            <el-form-item label="姓名">
                                <div class="p-l-60">
                                    <el-input v-model="personalInfo.name"></el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="籍贯">
                                <div class="p-l-60">
                                    <el-input v-model="personalInfo.placeOfBirth"></el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="出生日期">
                                <div class="p-l-60">
                                    <el-date-picker
                                        v-model="personalInfo.birthday"
                                        type="date"
                                        placeholder="请选择出生日期"
                                        style="width: 100%"
                                    >
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="国籍">
                                <div class="p-l-60">
                                    <el-input v-model="personalInfo.nationality"></el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="现居地">
                                <div class="p-l-60">
                                    <district-select v-model="personalInfo.presentAddress" width="100%" size="medium"></district-select>
                                </div>
                            </el-form-item>
                        </el-form>

                    </el-col>
                </el-row>
            </el-col>
            <el-col
                :span="12"
                style="text-align: left"
            >
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
            personalInfo: {
                name: "xxx",
                birthday: "1996.10.04",
                placeOfBirth: "广东湛江",
                nationality: "中国",
                presentAddress:  ["广东省", "湛江市"],
                introducts: "Vest"
            }
        };
    },
    components: {
        headPortrait,
        districtSelect
    }
};
</script>

<style lang="less" scoped>
// .personalInfo{
//     padding-top: 100px;
// }
</style>