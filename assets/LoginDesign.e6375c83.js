import{ba as T,bj as q,bi as k,ca as N,aI as m,b as g,cb as d,aT as e,bv as C,bb as s,bf as o,bs as G,ce as D,bd as r,d8 as L}from"./vendor.5ecbfc3b.js";import{D as j,B as n,E as A}from"./index.48474fd0.js";import"./vendor_core_js_pure.42317256.js";import"./vendor_axios.5abceb0c.js";import"./vendor_react_epic_spinners.391a1898.js";import"./vendor_mui_datatables.cb4acd6b.js";import"./vendor_lodash.e638c0fa.js";import"./vendor_react_slick.f5eccc0b.js";import"./vendor_react_easy_edit.a45942fe.js";import"./vendor_react_player.581c7f95.js";const E=T(()=>({loginContainer:{padding:n.spacing(3,2),maxWidth:400,display:"flex",flexDirection:"column",alignItems:"center"},container:{display:"flex",flexDirection:"column",alignItems:"center",margin:n.spacing(4)}})),P=()=>{const a=E(),u=q(),{isAuthenticated:i}=k(t=>t.auth),l=N(),[p,y]=m.useState(),f=t=>u(A({response:t})),I=()=>({enrollmentKey:localStorage.getItem("enrollmentKey"),time:localStorage.getItem("time"),studentId:localStorage.getItem("studentId")}),{enrollmentKey:b,time:c}=I();g.exports.useEffect(()=>{if(c&&b){const t=parseInt(j(c),10),h=new Date(JSON.parse(t));parseInt(d(h).diff(d(),"seconds"),10)>0?y(!0):(localStorage.removeItem("answerList"),localStorage.removeItem("enrollmentKey"),localStorage.removeItem("index"),localStorage.removeItem("time"),localStorage.removeItem("testStarted"))}},[]),g.exports.useEffect(()=>{i&&l("/students",{replace:!0})},[i]);const w=()=>{alert("There was some issue with Google Login. Contact the admin.")},x=m.useCallback(()=>{const t=[{quote:"Anyone who has never made a mistake has never tried anything new",author:"Albert Einstein"},{quote:"The only person who is educated is the one who has learned how to learn \u2026and change.",author:"Carl Rogers"},{quote:"Be the change that you wish to see in the world.",author:"Mahatma Gandhi"},{quote:"Education is the most powerful weapon which you can use to change the world.",author:"Nelson Mandela"},{quote:"Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",author:"Rumi"}];return t[Math.floor(Math.random()*t.length)]},[]),{quote:v,author:S}=x();return e(C,{container:!0,spacing:0,alignItems:"center",justifyContent:"center",style:{margin:""},children:s(o,{className:a.container,children:[p?e(G,{variant:"text",color:"primary",onClick:()=>l(-1),size:"large",children:"Go Back to Test"}):null,s(D,{className:a.loginContainer,children:[e(o,{children:e(r,{variant:"h5",component:"h3",children:"NavGurukul Admissions"})}),e(o,{style:{height:n.spacing(5)}}),e(o,{children:e(L.exports.GoogleLogin,{clientId:"34917283366-b806koktimo2pod1cjas8kn2lcpn7bse.apps.googleusercontent.com",buttonText:"Login",onSuccess:f,onFailure:w,scope:"profile email"})}),e(o,{style:{height:n.spacing(7)}}),s(o,{className:a.quoteContainer,children:[e(o,{className:a.quoteText,children:e(r,{variant:"body1",children:v})}),e(o,{className:a.quoteAuthor,children:e(r,{variant:"body2",style:{textAlign:"right",fontWeight:"bold"},children:`- ${S}`})})]})]})]})})};export{P as default};
