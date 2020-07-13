<template>
    <el-cascader
        :id="id"
        :name="name"
        :value="district"
        :options="options_area"
        :props="{ label:'name',children:'cities',value:'name' }"
        :size="size"
        filterable
        clearable
        style="width:100%"
        @change="handleChange"
    ></el-cascader>
</template>

<script>
import city from "../../../../public/chinaProvince.js";

export default {
    props: {
        size: {
            type: String,
            default: "medium" // medium / small / mini
        },
        width: {
            type: Number
        },
        district: {
            type: Array
        },
        id: {
            type: String
        },
        name: {
            type: String
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
            options_area: city.provinces
        };
    },
    methods: {
        handleChange(value) {
            this.$emit("returnBack", value);
        }
    }
};
</script>