(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[42],{"3/Ye":function(e,t,a){"use strict";a.r(t);a("g9YV");var n,r,l,i,c=a("wCAj"),o=(a("IzEo"),a("bx4M")),s=(a("14J3"),a("BMrR")),d=(a("+L6B"),a("2/Rp")),u=(a("jCWc"),a("kPKH")),m=(a("5NDa"),a("5rEg")),p=(a("Awhp"),a("KrTs")),g=a("p0pE"),h=a.n(g),E=a("2Taf"),f=a.n(E),k=a("vZ4D"),y=a.n(k),_=a("l4Ni"),b=a.n(_),v=a("ujKo"),C=a.n(v),w=a("rlhR"),D=a.n(w),x=a("MhPg"),q=a.n(x),F=(a("2qtc"),a("kLXV")),N=(a("OaEy"),a("2fM7")),O=(a("7Kak"),a("9yH6")),I=(a("y8nQ"),a("Vl3Y")),L=a("q1tI"),A=a.n(L),K=a("MuoO"),R=a("usdK"),S=a("zHco"),T=a("YhlM"),B=a.n(T),M=I["a"].Item,Q=O["a"].Button,P=O["a"].Group,j=["warning","processing","success","error","warning","default"],z=N["a"].Option,G=F["a"].confirm,V={page:1,task_id:0,goods_id:0,state:-1,type:10},Y=(n=Object(K["connect"])(function(e){var t=e.task,a=e.loading;return{listData:t.listData,loading:a.effects["task/fetchBasic"]}}),r=I["a"].create(),n(l=r((i=function(e){function t(e){var a;return f()(this,t),a=b()(this,C()(t).call(this,e)),a.state={tabActiveKey:"haoping"},a.getListData=function(){var e=a.props.dispatch;e({type:"task/fetchBasic",payload:V})},a.handleSearch=function(e){e.preventDefault();var t=a.props,n=t.dispatch,r=t.form;r.validateFields(function(e,t){if(!e){var a=h()({},t,{updatedAt:t.updatedAt&&t.updatedAt.valueOf()});V={page:1,task_id:a.task_id||0,goods_id:a.goods_id||0,state:a.state||-1,type:V.type||-1},n({type:"task/fetchBasic",payload:V})}})},a.handleFormReset=function(){var e=a.props,t=e.form,n=e.dispatch;t.resetFields(),n({type:"task/fetchBasic",payload:{page:1,task_id:0,goods_id:0,state:-1,type:-1}})},a.taskFinish=function(e){var t=a.props.dispatch,n=D()(a);G({title:"\u786e\u8ba4\u8981\u7ec8\u6b62\u5417\uff1f",content:"\u63a8\u5e7f\u7ec8\u6b62\u540e\u4e0d\u80fd\u6062\u590d\uff0c\u5546\u54c1\u5c06\u7acb\u5373\u4e0b\u7ebf\uff0c\u786e\u8ba4\u8981\u7ec8\u6b62\u5417\uff1f",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk:function(){t({type:"task/finishMessage",payload:{page:1,task_id:e.task_id}}).then(function(){n.getListData()})}})},a.goDetail=function(e){var t="/fangdan/list/generalizeDetail";/^3[0|1]$/.test(e.type)&&(t="/fangdan/qfDetail"),R["a"].push("".concat(t,"?task_id=").concat(e.task_id))},a.goPay=function(e){var t="/fangdan/step-form/pay?task_id=".concat(e.task_id,"&goods_id=").concat(e.goods_id,"&need_fetch=1");t=a.addQFQuery(e,t),R["a"].push(t)},a.goOrder=function(e){var t="/order/Index";/^3[0|1]$/.test(e.type)&&(t="/order/qf"),R["a"].push("".concat(t,"?task_id=").concat(e.task_id))},a.addQFQuery=function(e,t){console.log("item -> ",e);var a=t;if(/^3[0|1]$/.test(e.type)){var n=30===e.type?0:1;a+="&qf=".concat(n)}return a},a.goRedact=function(e){var t="/fangdan/step-form/confirm?task_id=".concat(e.task_id,"&goods_id=").concat(e.goods_id,"&action=edit");t=a.addQFQuery(e,t),R["a"].push(t)},a.onChange=function(e){V.page=e,a.getListData(V)},a.handleTabChange=function(e,t){console.log("handleTabChange",e,t),a.setState({tabActiveKey:e}),"haoping"===e?(a.qf=void 0,V.type=10):"quanfen"===e&&(a.qf=1,V.type="30,31"),a.getListData(V)},a.radioGroupOnChange=function(e){console.log("radioGroupOnChange -> ",e),V.type=e.target.value,a.getListData(V)},a.columns=[{title:"\u63a8\u5e7f\u7f16\u53f7",dataIndex:"task_id",key:"task_id",width:90},{key:"goods_id",title:"\u5546\u54c1id",width:120,dataIndex:"goods_id"},{title:"\u5546\u54c1",width:143,render:function(e){return A.a.createElement("a",{className:B.a.pro,href:e.goods_url,rel:"noopener noreferrer",target:"_blank"},A.a.createElement("img",{src:e.img,alt:"a",style:{width:50,heigth:50,marginRight:5}}),A.a.createElement("span",{className:B.a.goodsName}," ",e.title))}},{title:"\u63d0\u4ea4\u65f6\u95f4",dataIndex:"created_at",key:"created_at",width:160},{title:"\u5238\u540e\u4ef7",dataIndex:"after_coupon_price",key:"after_coupon_price",width:100,render:function(e){return A.a.createElement("span",null,"\uffe5",e)}},{key:"coupon_price",width:80,title:"\u4f18\u60e0\u5238",dataIndex:"coupon_price",render:function(e){return A.a.createElement("span",null,e?"\uffe5 ".concat(e):"\u65e0")}},{title:"\u72b6\u6001",width:100,render:function(e){return A.a.createElement(p["a"],{status:j[e.state],text:e.state_desc})}},{title:"\u63a8\u5e7f\u4efd\u6570",width:150,render:function(e){return A.a.createElement("p",{style:{textAlign:"left"}},A.a.createElement("span",null,"\u53d1\u653e\u4efd\u6570 ",e.total_amount),A.a.createElement("br",null),A.a.createElement("span",null,"\u4e0b\u5355\u4eba\u6570 ",e.order_num),A.a.createElement("br",null))}},{title:"\u64cd\u4f5c",width:120,render:function(e){var t;return 0===e.state&&(t=A.a.createElement("span",null,A.a.createElement("a",{onClick:a.goDetail.bind(D()(a),e)},"\u67e5\u770b "),A.a.createElement("a",{onClick:a.goPay.bind(D()(a),e)},"\u652f\u4ed8 "))),1===e.state&&(t=A.a.createElement("a",{onClick:a.goDetail.bind(D()(a),e)},"\u67e5\u770b ")),2===e.state&&(t=A.a.createElement("span",null,A.a.createElement("a",{onClick:a.goDetail.bind(D()(a),e)},"\u67e5\u770b "),A.a.createElement("a",{onClick:a.goOrder.bind(D()(a),e)},"\u8ba2\u5355\u660e\u7ec6 "),A.a.createElement("br",null),A.a.createElement("a",{onClick:a.taskFinish.bind(D()(a),e)},"\u7ec8\u6b62 "))),3===e.state&&(t=A.a.createElement("span",null,A.a.createElement("a",{onClick:a.goDetail.bind(D()(a),e)},"\u67e5\u770b "),A.a.createElement("a",{onClick:a.goRedact.bind(D()(a),e)},"\u7f16\u8f91 "))),4!==e.state&&5!==e.state||(t=A.a.createElement("span",null,A.a.createElement("a",{onClick:a.goDetail.bind(D()(a),e)},"\u67e5\u770b "),A.a.createElement("a",{onClick:a.goOrder.bind(D()(a),e)},"\u8ba2\u5355\u660e\u7ec6 "))),A.a.createElement("span",null,t)}}],a.qf=void 0!==e.location.query.qf,a}return q()(t,e),y()(t,[{key:"componentDidMount",value:function(){var e=this.props.location;V.type=10,void 0!==e.query.qf&&(V.type="30,31",this.setState({tabActiveKey:"quanfen"})),this.getListData(V)}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,t=this.props.listData,a=t.state_select;return A.a.createElement(I["a"],{onSubmit:this.handleSearch,layout:"inline"},A.a.createElement(s["a"],{gutter:{md:6,lg:24,xl:48}},A.a.createElement(u["a"],{md:5,sm:24},A.a.createElement(M,{label:"\u63a8\u5e7f\u7f16\u53f7"},e("task_id")(A.a.createElement(m["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),A.a.createElement(u["a"],{md:5,sm:24},A.a.createElement(M,{label:"\u5546\u54c1/\u5e97\u94faid"},e("goods_id")(A.a.createElement(m["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),A.a.createElement(u["a"],{md:5,sm:24},A.a.createElement(M,{label:"\u72b6\u6001"},e("state")(A.a.createElement(N["a"],{style:{width:"100%"},placeholder:"\u5168\u90e8",onChange:this.selectTypeChange},a.length&&a.map(function(e){return A.a.createElement(z,{key:e.value,value:e.value},e.name)}))))),A.a.createElement(u["a"],{md:4,sm:24},A.a.createElement("span",{className:B.a.submitButtons},A.a.createElement(d["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),A.a.createElement(d["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"renderForm",value:function(){return this.renderSimpleForm()}},{key:"render",value:function(){var e=this,t=this.props,a=t.listData,n=t.match,r=this.state.tabActiveKey,l=a.task_info,i=this.columns,d=[{title:"\u63a8\u5e7f\u7f16\u53f7",dataIndex:"task_id",key:"task_id",width:90},{key:"goods_id",title:"\u5546\u54c1/\u5e97\u94faid",width:120,dataIndex:"goods_id"},{title:"\u5546\u54c1/\u5e97\u94fa\u540d\u79f0",width:143,render:function(e){return A.a.createElement("a",{className:B.a.pro,href:e.goods_url,rel:"noopener noreferrer",target:"_blank"},A.a.createElement("img",{src:e.img,alt:"a",style:{width:50,heigth:50,marginRight:5}}),A.a.createElement("span",{className:B.a.goodsName}," ",e.title))}},{title:"\u63d0\u4ea4\u65f6\u95f4",dataIndex:"created_at",key:"created_at",width:160},{title:"\u5708\u7c89\u7c7b\u578b",key:"type",width:100,render:function(e){return A.a.createElement("span",null,30===e.type?"\u5546\u54c1\u5708\u7c89":"\u5e97\u94fa\u5708\u7c89")}},{title:"\u72b6\u6001",width:100,render:function(e){return A.a.createElement(p["a"],{status:j[e.state],text:e.state_desc})}},{title:"\u63a8\u5e7f\u4efd\u6570",width:150,render:function(e){return A.a.createElement("p",{style:{textAlign:"left"}},A.a.createElement("span",null,"\u53d1\u653e\u4efd\u6570 ",e.total_amount),A.a.createElement("br",null),A.a.createElement("span",null,"\u6536\u85cf\u4eba\u6570 ",e.order_num),A.a.createElement("br",null))}},{title:"\u64cd\u4f5c",width:120,render:function(t){var a;return 0===t.state&&(a=A.a.createElement("span",null,A.a.createElement("a",{onClick:e.goDetail.bind(e,t)},"\u67e5\u770b "),A.a.createElement("a",{onClick:e.goPay.bind(e,t)},"\u652f\u4ed8 "))),1===t.state&&(a=A.a.createElement("a",{onClick:e.goDetail.bind(e,t)},"\u67e5\u770b ")),2===t.state&&(a=A.a.createElement("span",null,A.a.createElement("a",{onClick:e.goDetail.bind(e,t)},"\u67e5\u770b "),A.a.createElement("a",{onClick:e.goOrder.bind(e,t)},"\u63a8\u5e7f\u6548\u679c"),A.a.createElement("br",null),A.a.createElement("a",{onClick:e.taskFinish.bind(e,t)},"\u7ec8\u6b62 "))),3===t.state&&(a=A.a.createElement("span",null,A.a.createElement("a",{onClick:e.goDetail.bind(e,t)},"\u67e5\u770b "),A.a.createElement("a",{onClick:e.goRedact.bind(e,t)},"\u7f16\u8f91 "))),4!==t.state&&5!==t.state||(a=A.a.createElement("span",null,A.a.createElement("a",{onClick:e.goDetail.bind(e,t)},"\u67e5\u770b "),A.a.createElement("a",{onClick:e.goOrder.bind(e,t)},"\u63a8\u5e7f\u6548\u679c "))),A.a.createElement("span",null,a)}}];this.qf&&(i=d);var m=function(e){var t=e.title,a=e.value,n=e.bordered;return A.a.createElement("div",{className:B.a.headerInfo},A.a.createElement("span",null,t),A.a.createElement("p",null,a),n&&A.a.createElement("em",null))},g=A.a.createElement("div",null),h=[{key:"haoping",tab:"\u514d\u5355\u8bd5\u7528"},{key:"quanfen",tab:"\u5708\u7c89\u6536\u85cf"}];console.log(n,"1");var E=this.qf?A.a.createElement("div",{className:B.a.extraContent},A.a.createElement(P,{onChange:this.radioGroupOnChange,defaultValue:"30,31"},A.a.createElement(Q,{value:"30,31"},"\u5168\u90e8\u5708\u7c89"),A.a.createElement(Q,{value:"30"},"\u5546\u54c1\u5708\u7c89"),A.a.createElement(Q,{value:"31"},"\u5e97\u94fa\u5708\u7c89"))):"";return A.a.createElement(S["a"],{title:"\u653e\u5355\u5217\u8868",content:g,tabList:h,tabActiveKey:r,onTabChange:this.handleTabChange},A.a.createElement("div",{className:B.a.standardList},A.a.createElement(o["a"],{bordered:!1},A.a.createElement(s["a"],null,A.a.createElement(u["a"],{sm:8,xs:24},A.a.createElement(m,{title:"\u8fdb\u884c\u4e2d",value:l.running_num,bordered:!0})),A.a.createElement(u["a"],{sm:8,xs:24},A.a.createElement(m,{title:"\u5ba1\u6838\u4e2d",value:l.verifying_num,bordered:!0})),A.a.createElement(u["a"],{sm:8,xs:24},A.a.createElement(m,{title:"\u5df2\u5b8c\u6210",value:l.finish_num})))),A.a.createElement("br",null),A.a.createElement(o["a"],{className:B.a.customStyleCard,extra:E},A.a.createElement("div",{className:B.a.tableList},A.a.createElement("div",{className:B.a.tableListForm},this.renderForm()),A.a.createElement(c["a"],{rowKey:function(e){return e.id},columns:i,dataSource:a.list,pagination:{defaultCurrent:1,current:a.page_info.current_page,pageSize:a.page_info.per_page,total:a.page_info.total_num,onChange:this.onChange}})))))}}]),t}(L["PureComponent"]),l=i))||l)||l);t["default"]=Y}}]);