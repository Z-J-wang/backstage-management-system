const rules = {
    name: [{
        required: true,
        message: "请输入菜名",
        trigger: "blur"
    }],
    s_Id: [{
        required: true,
        message: "请选择类别",
        trigger: "blur"
    }],
    nowPrice: [{
        required: true,
        message: "请输入今天的价格",
        trigger: "blur"
    }],
    oldPrice: [{
        required: false,
        message: "请输入昨天的价格",
        trigger: "blur"
    }],
    digest: [
        {
            maxLength: 250,
            message: "请输入介绍",
            trigger: "blur"
        }
    ]
}

export default rules;