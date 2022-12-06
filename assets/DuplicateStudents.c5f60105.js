import{bh as j,ca as K,bH as L,bj as z,bi as G,aI as i,aT as r,bs as v,b as U,bb as D,bk as Y,bd as q}from"./vendor.5ecbfc3b.js";import{M as H}from"./vendor_mui_datatables.cb4acd6b.js";import{a as b}from"./vendor_axios.5abceb0c.js";import{F as O,G as W,H as J,b as h,c as E}from"./index.48474fd0.js";import"./vendor_core_js_pure.42317256.js";import"./vendor_lodash.e638c0fa.js";import"./vendor_react_epic_spinners.391a1898.js";import"./vendor_react_slick.f5eccc0b.js";import"./vendor_react_easy_edit.a45942fe.js";import"./vendor_react_player.581c7f95.js";const w="https://join.navgurukul.org/api/",oe=()=>{const{enqueueSnackbar:k}=j(),l=K(),{name:c,number:d}=L(),a=z(),A=()=>a(E(!0)),p=()=>a(E(!1)),{lang:N}=G(e=>e.ui),[B,I]=i.useState(null),[s,$]=i.useState({data:[],pendingInterviewStage:"checking"}),T=async e=>{try{const t=`0${d}`;A();const u=`${w}helpline/register_exotel_call`,f=await b.get(u,{params:{ngCallType:"getEnrolmentKey",From:t,partner_id:B,student_id:e}});return p(),f}catch(t){throw k("Something went wrong",{variant:"error",anchorOrigin:{vertical:"top",horizontal:"center"}}),p(),Error(t.message)}},_=[{name:"id",label:"Re-Test",options:{filter:!1,customBodyRender:i.useCallback((e,t)=>r(v,{disabled:t.rowData[1]==="pendingEnglishInterview",variant:"contained",color:"primary",style:{fontSize:"10px"},onClick:async()=>{const u=await T(e),[f,M,P]=c.split("_");a(O({firstName:f,middleName:M,lastName:P,mobileNumber:d})),a(W(u.data.key)),a(J(e)),l("/test/instructions"),p()},children:"Re-Test"}),[])}},{name:"stage",label:"Stage",options:{filter:!1,customBodyRender:e=>h[e]}},{name:"stage",label:"Book Slot",options:{filter:!1,customBodyRender:i.useCallback((e,t)=>r(v,{disabled:t.rowData[1]!=="pendingEnglishInterview",variant:"contained",color:"primary",style:{fontSize:"10px"},onClick:()=>{l({pathname:`/bookSlot/${t.rowData[0]}`})},children:"Book Slot"}),[])}},{name:"total_marks",label:"Marks",options:{filter:!1,customBodyRender:(e,t)=>t.rowData[1]==="enrolmentKeyGenerated"&&e===null?"Last Test Not Submitted":e}},{name:"key",label:"Key",options:{filter:!1,display:!1,viewColumns:!1}}],y={stageMessage:{en:`Your  ${h[s.pendingInterviewStage]} is still pending. You\u2019re not required to give the online test now. We will soon complete your admission process.`,hi:`\u0906\u092A\u0915\u093E  ${h[s.pendingInterviewStage]}  \u0905\u092D\u0940 \u092D\u0940 \u091A\u0932 \u0930\u0939\u093E \u0939\u0948\u0902\u0964 \u0905\u092D\u0940 \u0906\u092A\u0915\u094B \u0911\u0928\u0932\u093E\u0907\u0928 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0926\u0947\u0928\u0947 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0939\u092E \u091C\u0932\u094D\u0926 \u0939\u0940 \u0906\u092A\u0915\u0940 \u092A\u094D\u0930\u0935\u0947\u0936 \u092A\u094D\u0930\u0915\u094D\u0930\u093F\u092F\u093E (\u090F\u0921\u092E\u093F\u0936\u0928 \u092A\u094D\u0930\u094B\u0938\u0947\u0938) \u092A\u0942\u0930\u0940 \u0915\u0930 \u0926\u0947\u0902\u0917\u0947\u0964`},testFailedMessage:{en:", Your previous attempts were unsuccessful/test failed, please give the 1st stage of the online test again.",hi:", \u0906\u092A\u0915\u0947 \u092A\u093F\u091B\u0932\u0947 \u091F\u0947\u0938\u094D\u091F \u0905\u0938\u092B\u0932 \u0930\u0939\u0947 \u092F\u093E \u0906\u092A \u092A\u093E\u0938 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u090F, \u0915\u0943\u092A\u092F\u093E \u0911\u0928\u0932\u093E\u0907\u0928 \u091F\u0947\u0938\u094D\u091F \u0935\u093E\u092A\u0938 \u0938\u0947 \u0926\u0947\u0964"}},x=()=>{const e=d;b.get(`${w}check_duplicate`,{params:{Name:c.split("_").join(""),Number:e}}).then(async t=>{const u=t.data.data;u.alreadyGivenTest&&$({...s,data:u.data,pendingInterviewStage:u.data[0].stage})})},R=async e=>{try{const t=await b.get(`${w}partners/slug/${e}`,{});I(t.data.data.id)}catch{l("/notFound")}};U.exports.useEffect(()=>{const e=window.location.href.split("partnerLanding/")[1];e&&R(e),x()},[]);const{data:C}=s,S=N;let n,m="",o;const g=c.split("_"),{pendingInterviewStage:F}=s;return g.length===3?[n,m,o]=g:[n,o]=g,D(Y,{children:[D(q,{variant:"h5",id:"modal-title",children:["Student Status",r("br",{})]}),r(H,{title:F==="enrolmentKeyGenerated"||F==="testFailed"?`${n.concat(" ",m," ",o)}
            ${y.testFailedMessage[S]}`:`${n.concat(" ",m," ",o)}${y.stageMessage[S]}`,columns:_,data:C,options:{viewColumns:!1,print:!1,download:!1,exportButton:!0,pageSize:100,selectableRows:"none",rowsPerPage:20,rowsPerPageOptions:[20,40,60],toolbar:!1,filter:!1,responsive:"vertical"}})]})};export{oe as default};