(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[43],{APJA:function(e,t,a){"use strict";a.r(t);a("g9YV");var n,l,r,i,o=a("wCAj"),s=(a("IzEo"),a("bx4M")),c=(a("Awhp"),a("KrTs")),d=(a("iQDF"),a("+eQT")),p=(a("14J3"),a("BMrR")),m=(a("+L6B"),a("2/Rp")),u=(a("jCWc"),a("kPKH")),h=(a("5NDa"),a("5rEg")),f=a("p0pE"),g=a.n(f),E=a("2Taf"),y=a.n(E),v=a("vZ4D"),_=a.n(v),k=a("l4Ni"),b=a.n(k),D=a("ujKo"),w=a.n(D),C=a("rlhR"),T=a.n(C),x=a("MhPg"),L=a.n(x),Y=(a("2qtc"),a("kLXV")),q=(a("OaEy"),a("2fM7")),A=(a("y8nQ"),a("Vl3Y")),M=(a("7Kak"),a("9yH6")),N=a("q1tI"),S=a.n(N),F=a("MuoO"),K=a("zHco"),O=a("wd/R"),I=a.n(O),R=a("YhlM"),P=a.n(R),j=M["a"].Button,B=M["a"].Group,G=A["a"].Item,J=["processing","success","default","error"],V=q["a"].Option,z=Y["a"].confirm,H={page:1,task_id:0,goods_id:0,state:-1,type:-1},Q=(n=Object(F["connect"])(function(e){var t=e.task,a=e.loading;return{planData:t.planData,loading:a.effects["task/planList"]}}),l=A["a"].create(),n(r=l((i=function(e){function t(e){var a;return y()(this,t),a=b()(this,w()(t).call(this,e)),a.state={startTime:"",endTime:"",tabActiveKey:"haoping"},a.handleTabChange=function(e,t){console.log("handleTabChange",e,t),a.setState({tabActiveKey:e}),"haoping"===e?(a.qf=void 0,H.type=10):"quanfen"===e&&(a.qf=1,H.type="30,31"),a.getListData(H)},a.getListData=function(e){var t=a.props.dispatch;t({type:"task/planList",payload:e})},a.planDown=function(e){var t=a.props.dispatch,n=T()(a);z({title:"\u786e\u8ba4\u8981\u4e0b\u67b6\u5417\uff1f",content:"\u4e0b\u67b6\u540e\u6392\u671f\u5c06\u6682\u505c\uff0c\u6682\u505c\u5f53\u5929\u5546\u54c1\u4e0d\u4f1a\u5c55\u793a\uff0c\u786e\u8ba4\u8981\u4e0b\u67b6\u5417\uff1f",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:function(){t({type:"task/planDownData",payload:{task_plan_id:e.task_plan_id}}).then(function(){n.getListData(H)})}})},a.planUp=function(e){var t=a.props.dispatch,n=T()(a);z({title:"\u786e\u8ba4\u8981\u4e0a\u67b6\u5417\uff1f",content:"\u8bf7\u786e\u4fdd\u60a8\u7684\u4f63\u91d1/\u4ef7\u683c\u6216\u5546\u54c1\u72b6\u6001\u7b26\u5408\u300a\u5546\u54c1\u4e0a\u67b6\u89c4\u5219\u300b",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:function(){t({type:"task/planUpData",payload:{task_plan_id:e.task_plan_id}}).then(function(){n.getListData(H)})}})},a.handleSearch=function(e){e.preventDefault();var t=a.props,n=t.dispatch,l=t.form,r=a.state,i=r.startTime,o=r.endTime;l.validateFields(function(e,t){if(!e){var a=g()({},t,{updatedAt:t.updatedAt&&t.updatedAt.valueOf()});H={page:1,task_id:a.task_id||0,goods_id:a.goods_id||0,state:a.state||-1,type:H.type||-1,start_time:i||"",end_time:o||""},n({type:"task/planList",payload:H})}})},a.handleFormReset=function(){var e=a.props,t=e.form,n=e.dispatch;t.resetFields(),H={page:1,task_id:0,goods_id:0,state:-1,type:-1},n({type:"task/planList",payload:H})},a.selectPlanTime=function(e){var t=I()(e[0]).format("YYYY-MM-DD"),n=I()(e[1]).format("YYYY-MM-DD");a.setState({startTime:t,endTime:n})},a.onChange=function(e){H.page=e,a.getListData(H)},a.radioGroupOnChange=function(e){console.log("radioGroupOnChange -> ",e),H.type=e.target.value,a.getListData(H)},a.qf=void 0!==e.location.query.qf,a}return L()(t,e),_()(t,[{key:"componentDidMount",value:function(){var e=this.props.location;H.type=10,void 0!==e.query.qf&&(H.type="30,31",this.setState({tabActiveKey:"quanfen"})),this.getListData(H)}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,t=this.props.planData,a=t.state_select;return S.a.createElement(A["a"],{onSubmit:this.handleSearch,layout:"inline"},S.a.createElement(p["a"],{gutter:{md:6,lg:24,xl:48}},S.a.createElement(u["a"],{md:5,sm:24},S.a.createElement(G,{label:"\u63a8\u5e7f\u7f16\u53f7"},e("task_id")(S.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),S.a.createElement(u["a"],{md:5,sm:24},S.a.createElement(G,{label:"\u5546\u54c1/\u5e97\u94faid "},e("goods_id")(S.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),S.a.createElement(u["a"],{md:5,sm:24},S.a.createElement(G,{label:"\u72b6\u6001"},e("state")(S.a.createElement(q["a"],{style:{width:"100%"},placeholder:"\u5168\u90e8",onChange:this.selectTypeChange},a.length&&a.map(function(e){return S.a.createElement(V,{key:e.value,value:e.value},e.name)}))))),S.a.createElement(u["a"],{md:4,sm:24},S.a.createElement("span",{className:P.a.submitButtons},S.a.createElement(m["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),S.a.createElement(m["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))),S.a.createElement(p["a"],{colSpan:"5"},S.a.createElement(G,{label:"\u63a8\u5e7f\u65e5\u671f"},e("endTime")(S.a.createElement(d["a"].RangePicker,{format:"YYYY-MM-DD",onChange:this.selectPlanTime})))))}},{key:"renderForm",value:function(){return this.renderSimpleForm()}},{key:"render",value:function(){var e=this,t=this.props.planData,a=t.header_info,n=[{title:"\u6392\u671f\u65f6\u95f4",dataIndex:"plan_time",key:"plan_time",width:120},{key:"goods_id",title:"\u5546\u54c1/\u5e97\u94faid",width:120,dataIndex:"goods_id"},{title:"\u5546\u54c1/\u5e97\u94fa\u540d\u79f0",width:143,render:function(e){return S.a.createElement("a",{className:P.a.pro,href:e.goods_url,rel:"noopener noreferrer",target:"_blank"},S.a.createElement("img",{src:e.img,alt:"a",style:{width:50,heigth:50,marginRight:5}}),S.a.createElement("span",{className:P.a.goodsName}," ",e.title))}},{title:"\u63a8\u5e7f\u7f16\u53f7",dataIndex:"task_id",key:"task_id",width:90},{title:"\u5238\u540e\u4ef7",width:100,dataIndex:"after_coupon_price",key:"after_coupon_price",render:function(e){return S.a.createElement("span",null,"\uffe5",e)}},{key:"coupon_price",title:"\u4f18\u60e0\u5238",width:100,dataIndex:"coupon_price",render:function(e){return S.a.createElement("span",null,e?"\uffe5 ".concat(e):"\u65e0")}},{title:"\u72b6\u6001",width:100,render:function(e){return S.a.createElement(c["a"],{status:J[e.state],text:e.state_desc})}},{title:"\u63a8\u5e7f\u4efd\u6570",width:150,render:function(e){return S.a.createElement("p",{style:{textAlign:"left"}},S.a.createElement("span",null,"\u53d1\u653e\u4efd\u6570 ",e.total_amount),S.a.createElement("br",null),S.a.createElement("span",null,"30"===e.type||"31"===e.type?"\u6536\u85cf":"\u4e0b\u5355","\u4eba\u6570 ",e.order_num),S.a.createElement("br",null))}},{title:"\u64cd\u4f5c",width:120,render:function(t){var a;return 0===t.state&&(a=S.a.createElement("span",null,S.a.createElement("a",{onClick:e.planDown.bind(e,t)},"\u4e0b\u67b6"))),3===t.state&&(a=S.a.createElement("span",null,S.a.createElement("a",{onClick:e.planUp.bind(e,t)},"\u4e0a\u67b6"))),S.a.createElement("span",null,a)}}],l=function(e){var t=e.title,a=e.value,n=e.bordered;return S.a.createElement("div",{className:P.a.headerInfo},S.a.createElement("span",null,t),S.a.createElement("p",null,a),n&&S.a.createElement("em",null))},r=S.a.createElement("div",null),i=[{key:"haoping",tab:"\u514d\u5355\u8bd5\u7528"},{key:"quanfen",tab:"\u5708\u7c89\u6536\u85cf"}],d=this.qf?S.a.createElement("div",{className:P.a.extraContent},S.a.createElement(B,{onChange:this.radioGroupOnChange,defaultValue:"30,31"},S.a.createElement(j,{value:"30,31"},"\u5168\u90e8\u5708\u7c89"),S.a.createElement(j,{value:"30"},"\u5546\u54c1\u5708\u7c89"),S.a.createElement(j,{value:"31"},"\u5e97\u94fa\u5708\u7c89"))):"";return S.a.createElement(K["a"],{title:"\u6392\u671f\u5217\u8868",content:r,tabList:i,tabActiveKey:this.state.tabActiveKey,onTabChange:this.handleTabChange},S.a.createElement("div",{className:P.a.standardList},S.a.createElement(s["a"],{bordered:!1},S.a.createElement(p["a"],null,S.a.createElement(u["a"],{sm:8,xs:24},S.a.createElement(l,{title:"\u4eca\u65e5",value:a.day_num,bordered:!0})),S.a.createElement(u["a"],{sm:8,xs:24},S.a.createElement(l,{title:"\u672c\u5468",value:a.week_num,bordered:!0})),S.a.createElement(u["a"],{sm:8,xs:24},S.a.createElement(l,{title:"\u672c\u6708",value:a.month_num})))),S.a.createElement("br",null),S.a.createElement(s["a"],{className:P.a.customStyleCard,extra:d},S.a.createElement("div",{className:P.a.tableList},S.a.createElement("div",{className:P.a.tableListForm},this.renderForm()),S.a.createElement(o["a"],{rowKey:function(e){return e.id},columns:n,dataSource:t.list,pagination:{defaultCurrent:1,current:t.page_info.current_page,pageSize:t.page_info.per_page,total:t.page_info.total_num,onChange:this.onChange}})))))}}]),t}(N["PureComponent"]),r=i))||r)||r);t["default"]=Q}}]);