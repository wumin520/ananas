(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[54],{H64c:function(e,t,a){"use strict";a.r(t);a("g9YV");var r,n,l,o,s=a("wCAj"),i=(a("IzEo"),a("bx4M")),d=(a("Awhp"),a("KrTs")),m=(a("2qtc"),a("kLXV")),c=(a("Pwec"),a("CtXQ")),p=(a("fV52"),a("3I+P")),u=(a("14J3"),a("BMrR")),g=(a("+L6B"),a("2/Rp")),f=(a("jCWc"),a("kPKH")),h=(a("5NDa"),a("5rEg")),v=a("p0pE"),y=a.n(v),E=a("2Taf"),_=a.n(E),b=a("vZ4D"),k=a.n(b),C=a("l4Ni"),q=a.n(C),w=a("ujKo"),x=a.n(w),I=a("rlhR"),N=a.n(I),F=a("MhPg"),L=a.n(F),D=(a("y8nQ"),a("Vl3Y")),S=(a("7Kak"),a("9yH6")),V=a("q1tI"),B=a.n(V),M=a("MuoO"),O=a("zHco"),R=a("iasV"),P=a.n(R),A=S["a"].Group,K=S["a"].Button,j=D["a"].Item,G=["error","processing","warning","success"],H={page:1,task_id:0,goods_id:0,state:-1,p_order_id:0},z=(r=Object(M["connect"])(function(e){var t=e.order,a=e.loading;return{fansData:t.fansData,loading:a.models.order}}),n=D["a"].create(),r(l=n((o=function(e){function t(e){var a;return _()(this,t),a=q()(this,x()(t).call(this,e)),a.getfansData=function(e){var t=a.props.dispatch;t({type:"order/fansList",payload:e})},a.handleSearch=function(e){e.preventDefault();var t=a.props,r=t.dispatch,n=t.form;n.validateFields(function(e,t){if(!e){var a=y()({},t,{updatedAt:t.updatedAt&&t.updatedAt.valueOf()});H={page:1,p_order_id:a.p_order_id,task_id:a.task_id,goods_id:a.goods_id,state:a.state},r({type:"order/fansData",payload:H})}})},a.handleFormReset=function(){var e=a.props,t=e.form,r=e.dispatch,n=e.location,l=n.query;t.resetFields(),r({type:"order/fansData",payload:{task_id:l.task_id}})},a.setModal1Visible=function(e){a.setState({modal1Visible:!0,itemImg:e.proof_images})},a.Closable=function(){a.setState({modal1Visible:!1})},a.onChange=function(e){H.page=e,a.getfansData(H)},a.radioGroupOnChange=function(e){console.log("radioGroupOnChange -> ",e),H.type=e.target.value,a.getfansData(H)},a.next=a.next.bind(N()(a)),a.prev=a.prev.bind(N()(a)),a.state={modal1Visible:!1,itemImg:[]},a}return L()(t,e),k()(t,[{key:"componentDidMount",value:function(){var e=this.props.location,t=e.query;H.task_id=t.task_id||0,this.getfansData(H)}},{key:"next",value:function(){this.slider.slick.slickNext()}},{key:"prev",value:function(){this.slider.slick.slickPrev()}},{key:"renderSimpleForm",value:function(){var e=this.props.form.getFieldDecorator,t=this.props.location,a=t.query,r=a.task_id;return B.a.createElement(D["a"],{onSubmit:this.handleSearch,layout:"inline"},B.a.createElement(u["a"],{gutter:{md:6,lg:24,xl:48}},B.a.createElement(f["a"],{md:5,sm:24},B.a.createElement(j,{label:"\u63a8\u5e7f\u7f16\u53f7"},e("task_id",{initialValue:r})(B.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),B.a.createElement(f["a"],{md:5,sm:24},B.a.createElement(j,{label:"\u5546\u54c1/\u5e97\u94faid"},e("goods_id")(B.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165"})))),B.a.createElement(f["a"],{md:4,sm:24},B.a.createElement("span",{className:P.a.submitButtons},B.a.createElement(g["a"],{type:"primary",htmlType:"submit"},"\u67e5\u8be2"),B.a.createElement(g["a"],{style:{marginLeft:8},onClick:this.handleFormReset},"\u91cd\u7f6e")))))}},{key:"renderForm",value:function(){return this.renderSimpleForm()}},{key:"render",value:function(){var e=this,t=this.props.fansData,a=t.order_stat,r=(t.page_info,t.list),n=this.state,l=n.modal1Visible,o=(n.itemImg,function(t){var a=t.itemImg;return B.a.createElement(m["a"],{style:{top:20},footer:null,visible:l,maskClosable:!0,onCancel:e.Closable.bind()},B.a.createElement(p["a"],{autoplay:!0,dots:!1,ref:function(t){return e.slider=t},bodyStyle:{backgroundColor:"#F6F7F8"}},a.length>0&&a.map(function(e){return B.a.createElement("div",{className:P.a.models},B.a.createElement("a",{href:e,target:"_Blank"},B.a.createElement("img",{src:e,alt:"",className:P.a.hp_img})))})),B.a.createElement("div",{className:P.a.btn},B.a.createElement(c["a"],{type:"left",onClick:e.prev}),B.a.createElement(c["a"],{type:"right",onClick:e.next})))}),g=[{title:"\u7528\u6237\u6635\u79f0",dataIndex:"nick_name",key:"nick_name",width:150},{title:"\u63a8\u5e7f\u7f16\u53f7",dataIndex:"task_id",key:"task_id",width:90},{key:"goods_id",title:"\u5546\u54c1/\u5e97\u94faid",width:110,dataIndex:"goods_id"},{title:"\u5546\u54c1/\u5e97\u94fa\u540d\u79f0",width:143,render:function(e){return B.a.createElement("a",{className:P.a.pro,href:e.goods_url,rel:"noopener noreferrer",target:"_blank"},B.a.createElement("img",{src:e.img,alt:"a",style:{width:50,heigth:50,marginRight:5}}),B.a.createElement("span",{className:P.a.goodsName}," ",e.title))}},{title:"\u72b6\u6001",width:90,render:function(e){return B.a.createElement(d["a"],{status:G[e.state],text:e.state_desc})}},{title:"\u4e0a\u4f20\u65f6\u95f4",width:200,render:function(e){return B.a.createElement("span",null,B.a.createElement("span",null,e.proof_time))}},{title:"\u64cd\u4f5c",width:90,render:function(t){var a,r=e.state.itemImg,n="/order/qfDetail?order_id=".concat(t.order_id);return t.proof_images.length>0&&(a=B.a.createElement("span",null,B.a.createElement("a",{onClick:e.setModal1Visible.bind(e,t)},"\u6536\u85cf\u51ed\u8bc1"),B.a.createElement(o,{itemImg:r}))),B.a.createElement("span",null,B.a.createElement("a",{href:n,target:"_blank"},"\u67e5\u770b"," "),B.a.createElement("br",null),a)}}],h=function(e){var t=e.title,a=e.value,r=e.bordered;return B.a.createElement("div",{className:P.a.headerInfo},B.a.createElement("span",null,t),B.a.createElement("p",null,a),r&&B.a.createElement("em",null))},v=B.a.createElement("div",null),y=B.a.createElement("div",{className:P.a.extraContent},B.a.createElement(A,{onChange:this.radioGroupOnChange,defaultValue:"30,31"},B.a.createElement(K,{value:"30,31"},"\u5168\u90e8\u5708\u7c89"),B.a.createElement(K,{value:"30"},"\u5546\u54c1\u5708\u7c89"),B.a.createElement(K,{value:"31"},"\u5e97\u94fa\u5708\u7c89")));return B.a.createElement(O["a"],{title:" ",content:v},B.a.createElement("div",{className:P.a.standardList},B.a.createElement(i["a"],{bordered:!1},B.a.createElement(u["a"],null,B.a.createElement(f["a"],{sm:8,xs:24},B.a.createElement(h,{title:"\u4eca\u65e5\u5708\u7c89",value:a.daily_num,bordered:!0})),B.a.createElement(f["a"],{sm:8,xs:24},B.a.createElement(h,{title:"\u7d2f\u8ba1\u5708\u7c89",value:a.total_num})))),B.a.createElement("br",null),B.a.createElement(i["a"],{className:P.a.customStyleCard,extra:y},B.a.createElement("div",{className:P.a.tableList},B.a.createElement("div",{className:P.a.tableListForm},this.renderForm()),B.a.createElement(s["a"],{rowKey:function(e){return e.id},columns:g,dataSource:r,pagination:{defaultCurrent:1,current:t.page_info.current_page,pageSize:t.page_info.per_page,total:t.page_info.total_num,onChange:this.onChange}})))))}}]),t}(V["PureComponent"]),l=o))||l)||l);t["default"]=z},iasV:function(e,t,a){e.exports={standardList:"antd-pro-pages-v1-my-order-qf-list-standardList",headerInfo:"antd-pro-pages-v1-my-order-qf-list-headerInfo",listContent:"antd-pro-pages-v1-my-order-qf-list-listContent",listContentItem:"antd-pro-pages-v1-my-order-qf-list-listContentItem",extraContentSearch:"antd-pro-pages-v1-my-order-qf-list-extraContentSearch",customStyleCard:"antd-pro-pages-v1-my-order-qf-list-customStyleCard",tableList:"antd-pro-pages-v1-my-order-qf-list-tableList",tableListOperator:"antd-pro-pages-v1-my-order-qf-list-tableListOperator",tableMargin:"antd-pro-pages-v1-my-order-qf-list-tableMargin",pageBottom:"antd-pro-pages-v1-my-order-qf-list-pageBottom",tableListForm:"antd-pro-pages-v1-my-order-qf-list-tableListForm",submitButtons:"antd-pro-pages-v1-my-order-qf-list-submitButtons",listCard:"antd-pro-pages-v1-my-order-qf-list-listCard",standardListForm:"antd-pro-pages-v1-my-order-qf-list-standardListForm",formResult:"antd-pro-pages-v1-my-order-qf-list-formResult",pro:"antd-pro-pages-v1-my-order-qf-list-pro",goodsName:"antd-pro-pages-v1-my-order-qf-list-goodsName",models:"antd-pro-pages-v1-my-order-qf-list-models",hp_img:"antd-pro-pages-v1-my-order-qf-list-hp_img",btn:"antd-pro-pages-v1-my-order-qf-list-btn"}}}]);