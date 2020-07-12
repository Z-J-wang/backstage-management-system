<template>
    <el-cascader
        :value="district"
        :options="options_area"
        :props="{ label:'name',children:'cities',value:'name' }"
        filterable
        clearable
        @change="handleChange"
        :size="size"
        :style="width?`width:${width}`:''"
    ></el-cascader>
</template>

<script>
import city from "../../../../public/chinaProvince.js";

export default {
    props: {
        size: {
            type: String,
            default: "small "
        },
        width: {
            type: Number
        },
        district: {
            type: Array
        }
    },
    // 自定义组件实现v-model
    model: {
        prop: "district",
        event: "returnBack"
    },
    data() {
        return {
            value: [],
            options_area: city.provinces,
        };
    },
    methods: {
        handleChange(value) {
            this.$emit("returnBack", value);
        }
    }
};
</script>