import{r as p,G as g,c as b,b as o,w as e,H as v,d as s,o as x,e as u,u as y,f as n,t as d,m as B}from"./index-CgjYOObe.js";import{e as D}from"./apis-BdUsWhz8.js";const k={class:"card-header"},w={__name:"Detail",setup(C){const i=v(),_=B(),a=p({id:""});return g(()=>{i.query.id&&D(i.query.id).then(l=>{l.data?(console.log(l),Object.assign(a,l.data.data)):ElMessage.error("服务器内部错误")})}),(l,t)=>{const c=s("el-button"),r=s("el-form-item"),m=s("el-form"),f=s("el-card");return x(),b("div",null,[o(f,{class:"box-card"},{header:e(()=>[u("div",k,[t[2]||(t[2]=u("span",null,"系列详情",-1)),o(c,{size:"mini",style:{float:"right"},onClick:t[0]||(t[0]=N=>y(_).go(-1))},{default:e(()=>t[1]||(t[1]=[n("返回")])),_:1})])]),default:e(()=>[o(m,null,{default:e(()=>[o(r,{label:"系列名称:"},{default:e(()=>[n(d(a.name),1)]),_:1}),o(r,{label:"推出日期:"},{default:e(()=>[n(d(a.date),1)]),_:1}),o(r,{label:"价格:"},{default:e(()=>[n(d(a.grade),1)]),_:1})]),_:1})]),_:1})])}}};export{w as default};
