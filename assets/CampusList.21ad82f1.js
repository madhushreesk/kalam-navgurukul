import{bi as h,aI as u,b as L,aT as c,bc as b,b$ as g}from"./vendor.5ecbfc3b.js";import{a as y}from"./vendor_axios.5abceb0c.js";import{M as C}from"./index.48474fd0.js";import"./vendor_core_js_pure.42317256.js";import"./vendor_react_epic_spinners.391a1898.js";import"./vendor_mui_datatables.cb4acd6b.js";import"./vendor_lodash.e638c0fa.js";import"./vendor_react_slick.f5eccc0b.js";import"./vendor_react_easy_edit.a45942fe.js";import"./vendor_react_player.581c7f95.js";const w="https://join.navgurukul.org/api/",R=[{name:"id",label:"S.No",options:{filter:!0,sort:!0,customBodyRender:(a,s)=>s.rowIndex+1}},{name:"campus",label:"Name",options:{filter:!0,sort:!0,customBodyRender:(a,s)=>{const e=s.rowData[0],r=a==="All"?"/campus/allcampus/students":`/campus/${e}/students`;return c(g,{to:r,style:{color:"#f05f40"},children:a})}}}],v=()=>{const{loggedInUser:a,roles:s}=h(o=>o.auth),[e,r]=u.useState([]),[d,l]=u.useState(!0),p=async()=>{var o;try{const i=s.findIndex(t=>t.role==="Admin"),n=s.find(t=>t.role==="Campus"),f=((o=n==null?void 0:n.access)==null?void 0:o.map(t=>t.access))||[],x=`${w}campus`,m=await y.get(x);r(i!==-1?[...m.data.data,{campus:"All"}]:[...m.data.data.filter(t=>f.includes(t.id))]),l(!1)}catch{}};return L.exports.useEffect(()=>{(async()=>await p())()},[a]),c(b,{maxWidth:"sm",children:c(C,{title:"Campuses Name",columns:R,data:e,showLoader:d})})};export{v as default};
