const rules = {
    account: [{
        required: true,
        message: "请输入账户",
        trigger: "blur"
    }, {
        max: 18,
        min: 6,
        message: "账号字符在6-18之间",
        trigger: "blur",
    },],
    password: [{
        required: true,
        message: "请输入密码",
        trigger: "blur"
    }, {
        max: 18,
        min: 6,
        message: "密码字符在6-18之间",
        trigger: "blur",
    },],
    auth: [
        {
            required: true,
            message: "请选择账户权限",
            trigger: "blur"
        }
    ]
}

export default rules;