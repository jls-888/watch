import{u as F}from"./store-s79pan01.js";import{_ as B,r as i,a as L,c as N,b as l,w as o,d as t,o as S,e as a,f as u}from"./index-CgjYOObe.js";import"./apis-BdUsWhz8.js";const q={__name:"Login",setup(R){const _=F(),n=i({username:"",password:""}),r=L(),g=i({username:[{required:!0,message:"账号不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}]}),b=()=>{r&&r.value.validate(m=>{if(m)_.login(n);else return!1})},c=()=>{r&&r.value.resetFields()};return(m,e)=>{const w=t("el-header"),p=t("el-input"),d=t("el-form-item"),f=t("el-button"),v=t("el-form"),y=t("el-card"),V=t("el-main"),x=t("el-tag"),k=t("el-footer"),C=t("el-container");return S(),N("div",null,[l(C,null,{default:o(()=>[l(w,null,{default:o(()=>e[4]||(e[4]=[a("div",{style:{width:"400px"}},[a("p",{style:{float:"left"}}),a("p",{style:{float:"left","font-size":"25px","font-weight":"bold"}}," 欢迎来到手表信息中心管理系统 ")],-1)])),_:1}),l(V,null,{default:o(()=>[l(y,{class:"login_card"},{default:o(()=>[l(v,{model:n,rules:g,ref_key:"ruleFormRef",ref:r,"label-width":"80px"},{default:o(()=>[l(d,{label:"账号：",prop:"username"},{default:o(()=>[l(p,{modelValue:n.username,"onUpdate:modelValue":e[0]||(e[0]=s=>n.username=s),placeholder:"请输入账号"},null,8,["modelValue"])]),_:1}),l(d,{label:"密码：",prop:"password"},{default:o(()=>[l(p,{modelValue:n.password,"onUpdate:modelValue":e[1]||(e[1]=s=>n.password=s),type:"password",placeholder:"请输入密码"},null,8,["modelValue"])]),_:1}),l(d,null,{default:o(()=>[l(f,{type:"primary",onClick:e[2]||(e[2]=s=>b())},{default:o(()=>e[5]||(e[5]=[u("登录")])),_:1}),l(f,{type:"primary",onClick:e[3]||(e[3]=s=>c())},{default:o(()=>e[6]||(e[6]=[u("重置")])),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1})]),_:1}),l(k,null,{default:o(()=>[e[9]||(e[9]=a("p",null,"详情信息 | 个性推荐 | 产地详情 | 细节详解 | 产品种类 ",-1)),a("p",null,[e[8]||(e[8]=u("Watch © 2024-2034 ")),l(x,null,{default:o(()=>e[7]||(e[7]=[u("公众号：手表圈子")])),_:1})])]),_:1})]),_:1})])}}},E=B(q,[["__scopeId","data-v-1235b9bb"]]);export{E as default};