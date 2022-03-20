//一个简单的模板字符串函数的实现。
function parseTemplate(template:String,obj:{[propName:string]:any}){
    let reg=/\{\{\w+\}\}/g;
    let matchArray=template.match(reg);
    // console.log(111,matchArray)
    if(matchArray&&matchArray.length>0){
        for(let key in obj){
            if(matchArray.indexOf(`{{${key}}}`)!==-1){
                template=template.replace(`{{${key}}}`,obj[key]);
            }
        }
    }
    return template;
}

//test
let template=`hi, I'm {{name}}, {{age}} years old.`;
let obj={
    name:"tao",
    age:"30"
}
console.log(`output: `,parseTemplate(template,obj));