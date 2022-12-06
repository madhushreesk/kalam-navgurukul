import{bh as G,aI as T,b as O,bb as i,bc as J,aT as e,bd as o,c4 as v,bv as d,bt as g,bw as m,bz as h,bA as f,bB as n,cb as B,co as $,cp as z,cq as _,bx as W,bF as Q,b$ as H,bs as E}from"./vendor.5ecbfc3b.js";import{u as U,C as c}from"./vendor_react_hook_form.882a249a.js";import{a as x}from"./vendor_axios.5abceb0c.js";import{s as X}from"./index.48474fd0.js";import"./vendor_core_js_pure.42317256.js";import"./vendor_react_epic_spinners.391a1898.js";import"./vendor_mui_datatables.cb4acd6b.js";import"./vendor_lodash.e638c0fa.js";import"./vendor_react_slick.f5eccc0b.js";import"./vendor_react_easy_edit.a45942fe.js";import"./vendor_react_player.581c7f95.js";const C="https://join.navgurukul.org/api/",oe=()=>{const{enqueueSnackbar:q}=G(),{handleSubmit:P,formState:{errors:a},control:s,watch:D,reset:V}=U(),[L,N]=T.useState([]),[y,k]=T.useState({campus:[],donor:[],partner:[]}),[u,R]=T.useState({name:"",whatsapp:"",altMobile:"",gender:"",dob:"",district:"",pinCode:"",state:"",city:"",currentStatus:"",qualification:"",schoolMedium:"",caste:"",religion:"",campus:"",campusStatus:"",partner:null,donor:[],stage:null}),A=async t=>{const r=await x.get(`https://api.countrystatecity.in/v1/countries/IN/states/${t}/cities`,{headers:{accept:"application/json","X-CSCAPI-KEY":"TzZrb2p0emtqa29BOW0zTnpLZHdzOVdjNmlubnRDMmtqOEgxRXpFdw=="}});N(r.data)},F=async()=>{const r=(await x.get(`${C}campus`)).data.data.map(({id:b,campus:M})=>({name:M,id:b})),p=(await x.get(`${C}donors`)).data.map(({id:b,donor:M})=>({label:M,value:b})),j=(await x.get(`${C}partners`)).data.data.map(b=>({label:b.name,value:b.id}));k({...y,campus:r,donor:p,partner:[...j]})},I=t=>{const r={name:t.name,gender:t.gender,dob:t.dob,stage:t.stage,whatsapp:t.whatsapp,state:t.state,district:t.district,qualification:t.qualification,current_status:t.currentStatus,school_medium:t.schoolMedium,caste:t.caste,religon:t.religion,donor:u.donor.map(l=>l.value)};t.altMobile&&(r.alt_mobile=t.altMobile),t.city&&(r.city=t.city),t.pinCode&&(r.pin_code=t.pinCode),t.campus&&(r.campus=t.campus,t.campusStatus&&(r.campus_status=t.campusStatus)),u.partner&&(r.partner_id=u.partner.value),x.post(`${C}students/newStudents`,r).then(()=>{q("Data entered successfully",{variant:"success"}),V()}).catch(l=>q(`An Error Occurred : ${l.message}}`,{variant:"error"}))},S=D("state"),w=D("campus");return O.exports.useEffect(()=>{(async()=>await F())()},[]),O.exports.useEffect(()=>{S!==""&&A(S)},[S]),i(J,{maxWidth:"md",sx:{mb:"2.4rem"},children:[e(o,{fontWeight:"medium",variant:"h4",children:"Add New Student Data"}),e(v,{color:"gray",sx:{mt:"0.8rem",mb:"2rem"}}),i(d,{container:!0,spacing:2,children:[i(d,{item:!0,xs:3,children:[e(o,{variant:"h6",children:"Basic Details"}),e(v,{color:"gray",sx:{mt:"0.2rem",width:"120%"}})]}),e(d,{item:!0,xs:9}),e(d,{item:!0,xs:12,children:e(c,{control:s,name:"name",rules:{required:!0},defaultValue:u.name,render:({field:{ref:t,...r}})=>e(g,{fullWidth:!0,required:!0,variant:"outlined",id:"name",inputRef:t,label:"Full Name",placeholder:"Full Name",autoComplete:"off",error:!!a.name,type:"text",helperText:a.name?"Enter Full Name":"Ex. ABC",...r})})}),e(d,{item:!0,xs:12,md:6,children:e(c,{control:s,name:"whatsapp",rules:{required:!0,minLength:10,maxLength:10},defaultValue:u.whatsapp,render:({field:{ref:t,...r}})=>e(g,{fullWidth:!0,required:!0,variant:"outlined",id:"whatsapp",inputRef:t,label:"Mobile No.",placeholder:"Mobile No.",autoComplete:"off",error:!!a.whatsapp,type:"text",helperText:a.whatsapp?a.whatsapp.type==="minLength"||a.whatsapp.type==="maxLength"?"Enter a valid Mobile No.":"Enter Mobile No.":"Ex. 88844xxxxx",...r})})}),e(d,{item:!0,xs:12,md:6,children:e(c,{control:s,name:"altMobile",rules:{minLength:10,maxLength:10},defaultValue:u.altMobile,render:({field:{ref:t,...r}})=>e(g,{fullWidth:!0,variant:"outlined",id:"altMobile",inputRef:t,label:"Alt Mobile No.",placeholder:"Alt Mobile No.",autoComplete:"off",error:!!a.altMobile,type:"text",helperText:a.altMobile?a.whatsapp.type==="minLength"||a.whatsapp.type==="maxLength"?"Enter a valid Mobile No.":"Enter Alt Mobile No.":"Ex. 88844xxxxx",...r})})}),i(d,{item:!0,xs:12,children:[e(c,{control:s,rules:{required:!0,validate:t=>t!=="select gender"},name:"gender",defaultValue:u.gender||"select gender",render:({field:{ref:t,...r}})=>i(m,{variant:"outlined",fullWidth:!0,children:[e(h,{id:"gender-label",children:"Select Gender"}),e(f,{label:"Select Gender",placeholder:"Select Gender",error:!!a.gender,id:"gender",inputRef:t,required:!0,...r,children:[{key:"select gender",en:"Select Gender"},{key:"female",en:"Female"},{key:"male",en:"Male"},{key:"other",en:"Other"},{key:"trans",en:"Transwomen"}].map(l=>e(n,{value:l.key,disabled:l.en==="Select Gender",children:l.en},l.key))})]})}),a.gender?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Please specify Student's gender"}):""]}),e(d,{item:!0,xs:12,children:e(c,{control:s,name:"dob",defaultValue:u.dob||null,rules:{validate:t=>parseInt(B().diff(B(t),"year"),10)>=17},render:({field:{ref:t,...r},fieldState:{isTouched:l}})=>e($,{dateAdapter:z,children:e(_,{disableFuture:!0,id:"dob",label:"Date of Birth",inputRef:t,focused:l,inputFormat:"dd/MM/yyyy",inputVariant:"outlined",renderInput:p=>e(g,{...p,fullWidth:!0,error:!!a.dob,helperText:a.dob?a.dob.type==="validate"?"Age must be greater than 17":"Enter Date of Birth":"Ex. 19/11/2003"}),fullWidth:!0,placeholder:"Date of Birth",error:!!a.dob,...r})})})}),i(d,{item:!0,xs:12,children:[e(c,{control:s,name:"caste",defaultValue:u.caste||"Select Option",rules:{validate:t=>t!=="Select Option"},render:({field:{ref:t,...r}})=>i(m,{fullWidth:!0,variant:"outlined",children:[e(h,{id:"demo-simple-select-outlined-label",children:"Caste/Tribe"}),i(f,{label:"Caste/Tribe",placeholder:"Caste/Tribe",error:!!a.caste,required:!0,inputRef:t,...r,children:[e(n,{value:"Select Option",disabled:!0,children:"Select Option"}),e(n,{value:"scSt",children:"(SC) Scheduled Caste / (ST) Scheduled Tribe"}),e(n,{value:"obc",children:"(OBC) Other Backward Classes"}),e(n,{value:"general",children:"General"}),e(n,{value:"others",children:"Other"})]})]})}),a.caste?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select student' Caste/Tribe"}):""]}),i(d,{item:!0,xs:12,children:[e(c,{control:s,name:"religion",defaultValue:u.religion||"",render:({field:{ref:t,...r}})=>i(m,{fullWidth:!0,variant:"outlined",children:[e(h,{id:"religion-label",children:"Religion"}),i(f,{label:"Religion",placeholder:"Religion",required:!0,inputRef:t,error:!!a.religion,...r,children:[e(n,{value:"",disabled:!0,children:"Select Option"}),e(n,{value:"hindu",children:"Hindu"}),e(n,{value:"islam",children:"Islam"}),e(n,{value:"sikh",children:"Sikh"}),e(n,{value:"christian",children:"Christian"}),e(n,{value:"jain",children:"Jain"}),e(n,{value:"buddhism",children:"Buddhism"}),e(n,{value:"others",children:"Others"})]})]})}),a.religion?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select student's Religion"}):""]})]}),i(d,{container:!0,spacing:2,sx:{mt:"1.2rem"},children:[i(d,{item:!0,xs:3,children:[e(o,{variant:"h6",children:"Address Details"}),e(v,{color:"gray",sx:{mt:"0.2rem",width:"120%"}})]}),e(d,{item:!0,xs:9}),i(d,{item:!0,xs:12,sm:6,children:[e(c,{control:s,defaultValue:u.state||"",name:"state",rules:{required:!0,validate:t=>t!==""},render:({field:{ref:t,...r}})=>i(m,{fullWidth:!0,variant:"outlined",required:!0,children:[e(h,{id:"state-label",children:"Select State"}),i(f,{error:!!a.state,required:!0,inputRef:t,label:"Select State",placeholder:"Select State",...r,children:[e(n,{value:"",disabled:!0,children:"Select State"}),Object.entries(X).map(([l,p])=>e(n,{value:l,children:p},l))]})]})}),a.state?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select student's State"}):""]}),i(d,{item:!0,xs:12,sm:6,children:[e(c,{control:s,defaultValue:u.district||"",name:"district",rules:{required:!0,validate:t=>t!==""},render:({field:{ref:t,...r}})=>i(m,{fullWidth:!0,variant:"outlined",required:!0,disabled:S===""&&!L.length,children:[e(h,{id:"district-label",children:"Select District"}),i(f,{error:!!a.district,required:!0,disabled:S===""&&!L.length,inputRef:t,...r,label:"Select District",placeholder:"Select District",children:[e(n,{value:"",disabled:!0,children:"Select District"}),L.map(({name:l})=>e(n,{value:l,children:l},l))]})]})}),a.district?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select student's District"}):""]}),e(d,{item:!0,xs:12,sm:6,children:e(c,{control:s,defaultValue:u.city,name:"city",render:({field:{ref:t,...r}})=>e(g,{variant:"outlined",inputRef:t,...r,fullWidth:!0,id:"city",label:"City",placeholder:"City",autoComplete:"off",error:!!a.city,helperText:a.city?"Select student's City":"Ex. Bangalore"})})}),e(d,{item:!0,xs:12,sm:6,children:e(c,{control:s,rules:{minLength:6,maxLength:6},defaultValue:u.pinCode,name:"pinCode",render:({field:{ref:t,...r}})=>e(g,{variant:"outlined",fullWidth:!0,id:"pinCode",inputRef:t,label:"Pin Code",placeholder:"Pin Code",autoComplete:"off",error:!!a.pinCode,helperText:a.pinCode?a.pinCode.type==="minLength"||a.pinCode.type==="maxLength"?"Enter a valid Pin Code":"Enter student's Pin Code":"Ex. 4402xx",...r})})})]}),i(d,{container:!0,spacing:2,sx:{mt:"1.2rem"},children:[i(d,{item:!0,xs:3,children:[e(o,{variant:"h6",children:"Qualification Details"}),e(v,{color:"gray",sx:{mt:"0.2rem",width:"120%"}})]}),e(d,{item:!0,xs:9}),i(d,{item:!0,xs:12,sm:6,children:[e(c,{control:s,rules:{validate:t=>t!=="Select Option"},defaultValue:u.currentStatus||"Select Option",name:"currentStatus",render:({field:{ref:t,...r}})=>i(m,{fullWidth:!0,variant:"outlined",children:[e(h,{id:"current-status-label",children:"Current Status"}),i(f,{error:!!a.currentStatus,label:"Current Status",placeholder:"Current Status",inputRef:t,...r,children:[e(n,{value:"Select Option",disabled:!0,children:"Select Option"}),["Nothing","Job","Study","Other"].map(l=>e(n,{value:l.toLowerCase(),children:l},l))]})]})}),a.currentStatus?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select student's Current Status"}):""]}),i(d,{item:!0,xs:12,sm:6,children:[e(c,{control:s,rules:{required:"true",validate:t=>t!==""},defaultValue:u.qualification||"",name:"qualification",render:({field:{ref:t,...r}})=>i(m,{variant:"outlined",fullWidth:!0,required:!0,children:[e(h,{id:"qualification-label",children:"Maximum Qualification"}),i(f,{label:"Maximum Qualification",placeholder:"Maximum Qualification",error:!!a.qualification,required:!0,inputRef:t,...r,children:[e(n,{value:"",disabled:!0,children:"Select Option"}),e(n,{value:"lessThan10th",children:"Less than 10th pass"}),e(n,{value:"class10th",children:"10th pass"}),e(n,{value:"class12th",children:"12th pass"}),e(n,{value:"graduate",children:"Graduated"}),e(n,{value:"iti",children:"ITI"})]})]})}),a.qualification?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select student' Current Qualification"}):""]}),i(d,{item:!0,xs:12,children:[e(c,{control:s,name:"schoolMedium",defaultValue:u.schoolMedium||"",rules:{validate:t=>t!==""},render:({field:{ref:t,...r}})=>i(m,{fullWidth:!0,variant:"outlined",children:[e(h,{id:"school-medium-label",children:"School Medium"}),i(f,{label:"School Medium",placeholder:"School Medium",error:!!a.schoolMedium,inputRef:t,...r,children:[e(n,{value:"",disabled:!0,children:"School Medium"}),Object.entries({hi:["Hindi","\u0939\u093F\u0928\u094D\u0926\u0940"],en:["English","\u0905\u0902\u0917\u094D\u0930\u0947\u091C\u093C\u0940"],ma:["Marathi","\u092E\u0930\u093E\u0920\u0940"],ur:["Urdu","\u0909\u0930\u094D\u0926\u0942"]}).map(([l,p])=>e(n,{value:l,children:p[0]},l))]})]})}),a.schoolMedium?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select student' School Medium"}):""]})]}),i(d,{container:!0,spacing:2,sx:{mt:"1.2rem"},children:[i(d,{item:!0,xs:3,children:[e(o,{variant:"h6",children:"NavGurukul Details"}),e(v,{color:"gray",sx:{mt:"0.2rem",width:"120%"}})]}),e(d,{item:!0,xs:9}),i(d,{item:!0,xs:12,sm:6,children:[e(m,{fullWidth:!0,variant:"outlined",children:e(W,{label:"Select Partner",placeholder:"Select Partner",error:!!a.partner,isClearable:!0,onChange:t=>R(r=>({...r,partner:t})),options:y.partner,menuPortalTarget:document.body,menuPlacement:"top",styles:{menuPortal:t=>({...t,zIndex:9999})}})}),a.partner?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select Partner"}):""]}),i(d,{item:!0,xs:12,sm:6,children:[e(m,{fullWidth:!0,variant:"outlined",children:e(W,{label:"Select Donor",placeholder:"Select Donor",error:!!a.donor,isClearable:!0,onChange:t=>R(r=>({...r,donor:t})),options:y.donor,isMulti:!0,menuPortalTarget:document.body,menuPlacement:"top",styles:{menuPortal:t=>({...t,zIndex:9999})}})}),a.partner?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select Partner"}):""]}),i(d,{item:!0,xs:12,sm:6,children:[e(c,{control:s,name:"campus",defaultValue:u.campus||"",rules:{required:!0,validate:t=>t!==""},render:({field:{ref:t,...r}})=>i(m,{fullWidth:!0,variant:"outlined",required:!0,children:[e(h,{id:"school-medium-label",children:"Select Campus"}),i(f,{label:"Select Campus",placeholder:"Select Campus",error:!!a.campus,required:!0,inputRef:t,...r,children:[e(n,{value:"",disabled:!0,children:"Select Campus"}),y.campus.map(l=>e(n,{value:l.id,children:l.name},l.id))]})]})}),a.campus?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select Campus"}):""]}),i(d,{item:!0,xs:12,sm:6,children:[e(c,{control:s,name:"campusStatus",defaultValue:u.campusStatus||"",render:({field:{ref:t,...r}})=>i(m,{fullWidth:!0,variant:"outlined",disabled:w==="",children:[e(h,{id:"school-medium-label",children:"Select Campus Status"}),i(f,{label:"Select Campus Status",placeholder:"Select Campus Status",error:!!a.campusStatus,disabled:w==="",inputRef:t,...r,children:[e(n,{value:"",disabled:!0,children:"Select Campus Status"}),Object.entries({present:"Present",onLeave:"On Leave",droppedOut:"Dropped Out",gotJobLeftCampus:"Got Job & Left the Campus",alumniInternStayingInCampus:"Alumni/Interns Staying in Campus",teamMember:"Team Member"}).map(([l,p])=>e(n,{value:l,children:p},l))]})]})}),a.campusStatus?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select Campus Status"}):""]}),i(d,{item:!0,xs:12,sm:6,children:[e(c,{control:s,name:"stage",defaultValue:u.stage||"",rules:{required:!0,validate:t=>t!==""},render:({field:{ref:t,...r}})=>i(m,{fullWidth:!0,variant:"outlined",required:!0,children:[e(h,{id:"school-medium-label",children:"Select Stage"}),i(f,{label:"Select Stage",placeholder:"Select Stage",required:!0,error:!!a.stage,inputRef:t,...r,children:[e(n,{value:"",disabled:!0,children:"Select Stage"}),Object.entries({finallyJoined:"Joined",inJob:"In Job"}).map(([l,p])=>e(n,{value:l,children:p},l))]})]})}),a.stage?e(o,{style:{paddingLeft:"0.8rem",paddingTop:"0.4rem",paddingBottom:"0.4rem"},variant:"caption",color:"error",children:"Select Stage"}):""]})]}),i(Q,{sx:{mt:"1.2rem",display:"flex",justifyContent:"flex-end",gap:2},children:[e(H,{to:"/students",children:e(E,{variant:"outlined",color:"primary",children:"Go Back"})}),e(E,{variant:"contained",color:"primary",onClick:P(I),children:"Add Student Data"})]})]})};export{oe as default};