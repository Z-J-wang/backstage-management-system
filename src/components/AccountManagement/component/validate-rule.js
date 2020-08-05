const rules = {
    account: [{
        required: true,
        message: "请输入账户",
        trigger: "blur"
    }],
    password: [{
        required: true,
        message: "请输入密码",
        trigger: "blur"
    }],
    auth: [
        {
            required: true,
            message: "请选择账户权限",
            trigger: "blur"
        }
    ]
}

export default rules;