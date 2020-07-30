// custom-validator.js -> element-ui 自定义表单验证规则

// 金额校验
let validatePrice = (rule, value, callback) => {
    if (isNaN(value)) {
        callback(new Error("请输入正确的金额"));
    } else {
        callback();
    }
};

export default {
    validatePrice
}