<template>
    <el-date-picker
        v-model="dateTime"
        type="date"
        align="right"
        style="width:100%"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        @onClick="setTime()"
        @change="handleChange"
    ></el-date-picker>
</template>

<script>
export default {
    name: "DatePickerHasShortcuts",

    // 自定义组件实现v-model
    model: {
        prop: "dateTime",
        event: "returnBack",
    },

    props: {
        size: {
            type: String,
            default: "medium", // medium / small / mini
        },

        width: {
            type: Number,
        },

        dateTime: {
            type: String,
        },
    },

    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },

                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        },
                    },

                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        },
                    },

                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        },
                    },
                ],
            },
        };
    },
    methods: {
        handleChange(value) {
            console.log(value);
            this.$emit("returnBack", value);
        },
    },
};
</script>