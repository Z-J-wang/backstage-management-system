 const rules = {
     name: [{
         required: true,
         message: "姓名不能为空",
         trigger: "blur"
     }],
     placeOfBirth: [{
         required: true,
         message: "籍贯不能为空",
         trigger: "blur"
     }],
     birthday: [{
         required: true,
         message: "出生日期不能为空",
         trigger: "blur"
     }],
     nationality: [{
         required: true,
         message: "国籍不能为空",
         trigger: "blur"
     }],
     presentAddress: [{
         required: true,
         message: "现居地不能为空",
         trigger: "blur"
     }],
     introducts: [{
         required: true,
         message: "现居地不能为空",
         trigger: "blur"
     }]
 }

 export default rules;