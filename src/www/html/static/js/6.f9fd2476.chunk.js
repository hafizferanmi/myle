(this["webpackJsonpmyle-concierge"]=this["webpackJsonpmyle-concierge"]||[]).push([[6],{1241:function(e,t,a){},1258:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return V}));var n=a(0),l=a.n(n),i=a(1044),s=a(1052),r=a(988),o=a(1059),h=a(1048),d=a(1242),c=a.n(d),m=a(43),p=a(38),u=a(181),g=a(64),b=a(1256),E=a(19),f=a(1164),_=a(1235),C=a(1162),x=a(1163),y=a(1165),w=a(62),v=a(1062),k=a(1230),F=a(1231),S=a(487),P=a(995),U=a(1232),A=a(25);const W={dialog_title:{textAlign:"center",color:"#2B2D39",fontSize:20,fontWeight:500,letterSpacing:.5,padding:"30px 0 0"},container_dialog:{width:350,margin:"26px 58px 28px",padding:0},container_btn:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 58px 30px"}};class I extends n.Component{constructor(e){super(e),this.state={first_name:"",last_name:"",email:"",phone:"",password:"",role:"",roles:[{value:"admin",label:"Admin"}]},this.handleChange=this._handleChange.bind(this),this.cancel=this._cancel.bind(this),this.add=this._add.bind(this)}_handleChange(e){this.setState({[e.target.name]:e.target.value})}_cancel(){this.props.handleClose()}_add(){let e={first_name:this.state.first_name,last_name:this.state.last_name,email:this.state.email,phone_number:this.state.phone};this.props.create(e).then(()=>{this.props.handleClose()},()=>{this.props.handleClose()})}render(){const e=this.props,t=e.open,a=e.handleClose,n=this.state,i=n.name,s=n.email,r=n.phone;n.password,n.role,n.roles;return l.a.createElement(v.a,{open:t,onClose:a,"aria-labelledby":"draggable-dialog-title"},l.a.createElement(k.a,{style:W.dialog_title},"Add user"),l.a.createElement(F.a,{style:W.container_dialog},l.a.createElement("div",{style:{flexDirection:"row",display:"flex",justifyContent:"space-between"}},l.a.createElement(S.a,null,l.a.createElement(P.a,{id:"outlined-full-width",label:"First name",value:i,onChange:this.handleChange,type:"text",name:"first_name",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0},style:{width:170}})),l.a.createElement(S.a,null,l.a.createElement(P.a,{id:"outlined-full-width",label:"Last name",value:i,onChange:this.handleChange,type:"text",name:"last_name",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0},style:{width:170}}))),l.a.createElement(S.a,{fullWidth:!0},l.a.createElement(P.a,{id:"outlined-full-width",label:"Email",value:s,onChange:this.handleChange,type:"text",name:"email",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0}})),l.a.createElement(S.a,{fullWidth:!0},l.a.createElement(P.a,{id:"outlined-full-width",label:"Phone number",value:r,onChange:this.handleChange,type:"text",name:"phone",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0}}))),l.a.createElement(U.a,{style:W.container_btn},l.a.createElement(w.a,{color:"gray",width:"158px",textTransform:!0,clicked:this.cancel},"Cancel"),l.a.createElement(w.a,{color:"blue",width:"158px",textTransform:!0,clicked:this.add,processing:this.props.processing},"Add")))}}var L=Object(E.a)((function(e){return{processing:e.settings.create_user_processing}}),(function(e){return{dispatch:e,create:t=>e(A.a.SettingsActions.createUser(t))}}))(I);const D={dialog_title:{textAlign:"center",color:"#2B2D39",fontSize:20,fontWeight:500,letterSpacing:.5,padding:"30px 0 0"},container_dialog:{width:350,margin:"26px 58px 28px",padding:0},container_btn:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 58px 30px"}};class j extends n.Component{constructor(e){super(e),this.state={first_name:this.props.user.first_name?this.props.user.first_name:"",last_name:this.props.user.last_name?this.props.user.last_name:"",email:this.props.user.email?this.props.user.email:"",phone:this.props.user.phone_number?this.props.user.phone_number:"",role:this.props.user.role?this.props.user.role:"admin",roles:[{value:"admin",label:"Admin"}]},this.handleChange=this._handleChange.bind(this),this.cancel=this._cancel.bind(this),this.edit=this._edit.bind(this)}_handleChange(e){this.setState({[e.target.name]:e.target.value})}_cancel(){this.props.handleClose()}_edit(){let e={first_name:this.state.first_name,last_name:this.state.last_name,email:this.state.email,phone_number:this.state.phone};this.props.edit(this.props.user.id,e).then(()=>{this.props.handleClose()},()=>{this.props.handleClose()})}render(){const e=this.props,t=e.open,a=e.handleClose,n=this.state,i=n.first_name,s=n.last_name,r=n.email,o=n.phone;n.role,n.roles;return l.a.createElement(v.a,{open:t,onClose:a,"aria-labelledby":"draggable-dialog-title"},l.a.createElement(k.a,{style:D.dialog_title},"Edit user"),l.a.createElement(F.a,{style:D.container_dialog},l.a.createElement("div",{style:{flexDirection:"row",display:"flex",justifyContent:"space-between"}},l.a.createElement(S.a,null,l.a.createElement(P.a,{id:"outlined-full-width",label:"First name",value:i,onChange:this.handleChange,type:"text",name:"first_name",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0},style:{width:170}})),l.a.createElement(S.a,null,l.a.createElement(P.a,{id:"outlined-full-width",label:"Last name",value:s,onChange:this.handleChange,type:"text",name:"last_name",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0},style:{width:170}}))),l.a.createElement(S.a,{fullWidth:!0},l.a.createElement(P.a,{id:"outlined-full-width",label:"Email",value:r,onChange:this.handleChange,type:"email",name:"email",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0}})),l.a.createElement(S.a,{fullWidth:!0},l.a.createElement(P.a,{id:"outlined-full-width",label:"Phone number",value:o,onChange:this.handleChange,type:"text",name:"phone",fullWidth:!0,margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0}}))),l.a.createElement(U.a,{style:D.container_btn},l.a.createElement(w.a,{color:"gray",width:"158px",textTransform:!0,clicked:this.cancel},"Cancel"),l.a.createElement(w.a,{color:"blue",width:"158px",textTransform:!0,clicked:this.edit,processing:this.props.processing},"Edit")))}}var N=Object(E.a)((function(e){return{processing:e.settings.create_user_processing}}),(function(e){return{dispatch:e,edit:(t,a)=>e(A.a.SettingsActions.updateUser(t,a))}}))(j);const T={row:{cursor:"pointer"},online:{height:25,width:78,borderRadius:2,backgroundColor:"#85C63A",color:"#FFFFFF",fontSize:12,fontWeight:500,textTransform:"uppercase",textAlign:"center",lineHeight:"25px"},offline:{height:25,width:78,borderRadius:2,backgroundColor:"#8E8E93",color:"#FFFFFF",fontSize:12,fontWeight:500,textTransform:"uppercase",textAlign:"center",lineHeight:"25px"}};class R extends n.Component{constructor(e){super(e),this.handleEditUser=this._handleEditUser.bind(this)}_handleEditUser(){this.props.onEditUser(this.props.user)}render(){const e=this.props.user;return l.a.createElement(C.a,{style:T.row,onClick:this.handleEditUser},l.a.createElement(x.a,{component:"th",scope:"row"},"".concat(e.first_name," ").concat(e.last_name)),l.a.createElement(x.a,null,e.email),l.a.createElement(x.a,null,e.phone_number),l.a.createElement(x.a,null,"Role"))}}var z=R;const B={toolbar:{container:{height:85,padding:20,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #dfdfdf"}}};class O extends l.a.Component{constructor(e){super(e),this.state={add_user:!1,edit_user:!1,user:""},this.handleAdd=this._handleAdd.bind(this),this.handleClose=this._handleClose.bind(this),this.onEditUser=this._onEditUser.bind(this)}_handleAdd(e){this.setState({add_user:!0})}_handleClose(){this.setState({add_user:!1,edit_user:!1,user:""})}_onEditUser(e){this.setState({edit_user:!0,user:e})}render(){const e=this.state,t=e.add_user,a=e.edit_user,i=e.user;return l.a.createElement(n.Fragment,null,l.a.createElement("div",{style:B.toolbar.container},l.a.createElement(u.a,{variant:"h6"},"Team"),l.a.createElement(w.a,{color:"dark",width:"158px",textTransform:!0,clicked:this.handleAdd},"Add User")),l.a.createElement(f.a,null,l.a.createElement(_.a,null,l.a.createElement(C.a,null,l.a.createElement(x.a,null,"Name"),l.a.createElement(x.a,null,"Email"),l.a.createElement(x.a,null,"Phone"),l.a.createElement(x.a,null,"Role"))),l.a.createElement(y.a,null,this.props.users.map((e,t)=>l.a.createElement(z,{key:t,user:e,onEditUser:this.onEditUser})))),t&&l.a.createElement(L,{open:t,handleClose:this.handleClose}),a&&l.a.createElement(N,{open:a,handleClose:this.handleClose,user:i}))}}var H=Object(E.a)((function(e){return{users:e.settings.users}}),(function(e){return{dispatch:e}}))(O),J=a(993);a(1241);const M={textField:{maxWidth:350}};class q extends l.a.Component{constructor(e){super(e),this.state={name:"",email:"",password:"",number:""},this.handleChange=this._handleChange.bind(this),this.handleChangePassword=this._handleChangePassword.bind(this),this.handleChangeNumber=this._handleChangeNumber.bind(this),this.initState=this._initState.bind(this),this.handleUpdate=this._handleUpdate.bind(this)}_initState(){this.setState({name:"".concat(this.props.user.first_name," ").concat(this.props.user.last_name),email:this.props.user.email,number:this.props.user.phone_number})}_handleChange(e){this.setState({error:!1,[e.target.name]:e.target.value})}_handleChangePassword(){}_handleChangeNumber(){}_handleUpdate(){let e=this.state.name.split(" "),t={first_name:e[0],last_name:e[1]?e[1]:"",email:this.state.email,phone_number:this.state.number};this.props.updateUser(this.props.user.id,t)}componentDidMount(){null!==this.props.user&&this.initState()}componentWillReceiveProps(e){null!==e.user&&e.user!==this.props.user&&this.setState({name:"".concat(e.user.first_name," ").concat(e.user.last_name),email:e.user.email,number:e.user.phone_number})}render(){const e=this.state,t=e.name,a=e.email,n=e.password,i=e.number;return l.a.createElement("main",{className:"account-settings-container"},l.a.createElement("div",{className:"toolbar"},l.a.createElement(u.a,{variant:"h6"},"Account settings"),l.a.createElement("div",{className:"btn-container"},l.a.createElement(w.a,{color:"gray",width:"149px",clicked:this.initState},"Cancel changes"),l.a.createElement(w.a,{color:"dark",width:"120px",clicked:this.handleUpdate},"Update"))),l.a.createElement(J.a,{className:"form-container"},l.a.createElement(S.a,null,l.a.createElement(P.a,{id:"standard-name",label:"Full name",style:M.textField,value:t,onChange:this.handleChange,margin:"normal",variant:"outlined",type:"text",name:"name",InputLabelProps:{shrink:!0}})),l.a.createElement(S.a,null,l.a.createElement(P.a,{id:"standard-name",label:"Email",style:M.textField,value:a,onChange:this.handleChange,margin:"normal",variant:"outlined",type:"text",name:"email",InputLabelProps:{shrink:!0}})),l.a.createElement(S.a,{style:{flexDirection:"row"}},l.a.createElement(P.a,{id:"standard-name",label:"Password",style:M.textField,value:n,onChange:this.handleChange,margin:"normal",variant:"outlined",type:"text",name:"password",InputLabelProps:{shrink:!0}}),l.a.createElement("div",{className:"btn-container"},l.a.createElement(w.a,{color:"gray",width:"99px",clicked:this.handleChangePassword},"Change"))),l.a.createElement(S.a,{style:{flexDirection:"row"}},l.a.createElement(P.a,{id:"standard-name",label:"Mobile number",placeholder:"+1 45 8696960-5",style:M.textField,value:i,onChange:this.handleChange,margin:"normal",variant:"outlined",type:"text",name:"number",InputLabelProps:{shrink:!0}}),l.a.createElement("div",{className:"btn-container"},l.a.createElement(w.a,{color:"gray",width:"99px",clicked:this.handleChangeNumber},"Change")))))}}var G=Object(E.a)((function(e){return{user:e.app.user}}),(function(e){return{dispatch:e,updateUser:(t,a)=>e(A.a.AppActions.updateUser(t,a))}}))(q);const K=l.a.forwardRef((e,t)=>l.a.createElement(m.a,Object.assign({innerRef:t},e))),Q={sidebar:{container:{position:"absolute",height:"100%",backgroundColor:"#FFFFFF",borderRight:"1px solid #dfdfdf",width:255}},title:{container:{height:84,padding:10,display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center"},text:{marginLeft:15,color:"#2B2D39",fontSize:20,fontWeight:500,letterSpacing:.5,lineHeight:24,marginTop:15}},container:{width:"100%",height:"100%",backgroundColor:"#FFF"},content:{container:{marginLeft:255,height:"100%",position:"relative"}},link:{textDecoration:"none",color:"#2B2D39",fontSize:14,fontWeight:500,letterSpacing:.44}};class V extends l.a.PureComponent{render(){return l.a.createElement("div",{style:Q.container},l.a.createElement("div",{style:Q.sidebar.container},l.a.createElement("div",{style:Q.title.container},l.a.createElement(c.a,{style:{fontSize:40}}),l.a.createElement(u.a,{paragraph:!0,variant:"h5",style:Q.title.text},"Settings")),l.a.createElement(s.a,null),l.a.createElement(i.a,{style:{padding:0}},l.a.createElement(b.a,{to:"/settings/team",color:"inherit",component:K,style:Q.link},l.a.createElement(r.a,{button:!0,selected:"/settings/team"===g.a.location.pathname},l.a.createElement(o.a,null),l.a.createElement(h.a,{primary:"Team"}))),l.a.createElement(b.a,{to:"/settings/account",color:"inherit",component:K,style:Q.link},l.a.createElement(r.a,{button:!0,selected:"/settings/account"===g.a.location.pathname},l.a.createElement(o.a,null),l.a.createElement(h.a,{primary:"Account Settings"}))),l.a.createElement(b.a,{to:"/settings/billing",color:"inherit",component:K,style:Q.link},l.a.createElement(r.a,{button:!0,selected:"/settings/billing"===g.a.location.pathname},l.a.createElement(o.a,null),l.a.createElement(h.a,{primary:"Billing"}))))),l.a.createElement("div",{style:Q.content.container},l.a.createElement(p.b,{path:"/settings/",exact:!0,component:H}),l.a.createElement(p.b,{path:"/settings/team",exact:!0,component:H}),l.a.createElement(p.b,{path:"/settings/account",exact:!0,component:G})))}}}}]);