(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[33],{VhHv:function(e,a,t){"use strict";t.r(a);t("IzEo");var l,n,r,i,s=t("bx4M"),o=t("jehZ"),c=t.n(o),m=(t("+L6B"),t("2/Rp")),p=(t("5NDa"),t("5rEg")),d=(t("fOrg"),t("+KLJ")),u=(t("OaEy"),t("2fM7")),h=t("2Taf"),f=t.n(h),g=t("vZ4D"),E=t.n(g),b=t("l4Ni"),y=t.n(b),w=t("ujKo"),v=t.n(w),C=t("MhPg"),x=t.n(C),k=(t("y8nQ"),t("Vl3Y")),I=t("q1tI"),D=t.n(I),O=t("MuoO"),q=t("zHco"),M=t("dZCc"),S=t.n(M),T=D.a.createElement("div",null),j=(l=Object(O["connect"])(function(e){var a=e.withdraw,t=e.loading;return{withdrawData:a.withdrawData,loading:t.models.withdraw}}),n=k["a"].create(),l(r=n((i=function(e){function a(){var e,t;f()(this,a);for(var l=arguments.length,n=new Array(l),r=0;r<l;r++)n[r]=arguments[r];return t=y()(this,(e=v()(a)).call.apply(e,[this].concat(n))),t.state={visible:!0},t.handleClose=function(){t.setState({visible:!1})},t.selectTypeChange=function(e){t.triggerChange({value:e})},t.triggerChange=function(e){var a=t.props.onChange;a&&a(Object.assign({},t.state,e))},t.handleSubmit=function(e){e.preventDefault();var a=t.props.form;a.validateFieldsAndScroll(function(e,a){if(!e){console.log("Received values of form: ",a);var l=t.props.dispatch;l({type:"withdraw/exchange",payload:a})}})},t}return x()(a,e),E()(a,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e({type:"withdraw/exchangePage"})}},{key:"render",value:function(){var e=this.props,a=e.form,t=e.withdrawData,l=a.getFieldDecorator,n=this.state.visible,r=u["a"].Option,i={labelCol:{xs:{span:24},sm:{span:2}},wrapperCol:{xs:{span:24},sm:{span:6}}},o={wrapperCol:{xs:{span:24,offset:0},sm:{span:24,offset:1}}};return D.a.createElement(q["a"],{title:"\u6211\u8981\u63d0\u73b0",content:T},D.a.createElement(s["a"],null,D.a.createElement("p",{className:S.a.title},"\u63d0\u73b0"),D.a.createElement("div",{style:{display:"inline-block"}},n?D.a.createElement(d["a"],{message:"\u4e3a\u786e\u4fdd\u60a8\u7684\u8d44\u91d1\u5b89\u5168\uff0c\u4e00\u65e6\u6253\u6b3e\u6210\u529f\uff0c\u6682\u4e0d\u652f\u6301\u66f4\u6362\u94f6\u884c\u5361\u3002",type:"info",showIcon:!0,closable:!0,afterClose:this.handleClose}):null),D.a.createElement("div",{className:S.a.formBlock},D.a.createElement(k["a"],c()({},i,{onSubmit:this.handleSubmit}),D.a.createElement(k["a"].Item,{label:"\u8d26\u6237\u4f59\u989d"},"\uffe5",t.balance),D.a.createElement(k["a"].Item,{label:"\u63d0\u73b0\u91d1\u989d"},l("money",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u63d0\u73b0\u91d1\u989d!"}]})(D.a.createElement(p["a"],{style:{width:200},type:"text",placeholder:"\u8bf7\u8f93\u5165\u63d0\u73b0\u91d1\u989d"}))),D.a.createElement(k["a"].Item,{label:"\u771f\u5b9e\u59d3\u540d"},l("realname",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d"}]})(D.a.createElement(p["a"],{style:{width:200},type:"text",placeholder:"\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d"}))),D.a.createElement(k["a"].Item,{label:"\u94f6\u884c\u5361\u53f7"},l("card_number",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u94f6\u884c\u5361\u53f7!"}]})(D.a.createElement(p["a"],{style:{width:200},type:"text",placeholder:"\u8bf7\u8f93\u5165\u94f6\u884c\u5361\u53f7"}))),D.a.createElement(k["a"].Item,{label:"\u5f00\u6237\u884c"},l("bank_id",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9!"}]})(D.a.createElement(u["a"],{placeholder:"\u8bf7\u9009\u62e9",style:{width:120},onChange:this.selectTypeChange},t.bank_list.length&&t.bank_list.map(function(e){return D.a.createElement(r,{key:e.id,value:e.id},e.name)})))),D.a.createElement(k["a"].Item,o,D.a.createElement(m["a"],{type:"primary",disabled:!0,htmlType:"submit"},"\u6682\u672a\u5f00\u653e")))),D.a.createElement("div",null,D.a.createElement("ul",null,D.a.createElement("li",{style:{marginBottom:"10px",fontWeight:"bold"}},"\u8bf4\u660e"),D.a.createElement("li",{style:{fontWeight:"bold"}},"\u7533\u8bf7\u63d0\u73b0\u9700\u6ee1\u8db3\u4ee5\u4e0b\u6761\u4ef6\uff1a"),D.a.createElement("li",null,"1.\u8d26\u6237\u4f59\u989d\u2265100"),D.a.createElement("li",null,"2.\u8d26\u53f7\u4fe1\u606f\u586b\u5199\u5b8c\u6574\u5e76\u5df2\u901a\u8fc7\u8ba4\u8bc1"),D.a.createElement("li",null,"3.\u7533\u8bf7\u65f6\u95f4\u4e3a\u6bcf\u67081-20\u53f7"),D.a.createElement("li",null,"4.\u4e0a\u7b14\u63d0\u73b0\u7533\u8bf7\u5df2\u5ba1\u6838"),D.a.createElement("li",{style:{marginTop:"10px",fontWeight:"bold"}},"\u8bf7\u5982\u5b9e\u586b\u5199\u94f6\u884c\u5361\u4fe1\u606f\uff0c\u6253\u6b3e\u5931\u8d25\u5c06\u9000\u56de\u4f59\u989d\u4e2d\uff0c\u82e5\u56e0\u4fe1\u606f\u4e0d\u6b63\u786e\u5bfc\u81f4\u65e0\u6cd5\u63d0\u73b0\uff0c\u8d85\u591a\u5ba2\u4e0d\u627f\u62c5\u7531\u6b64\u4ea7\u751f\u7684\u4e00\u5207\u8d23\u4efb\u548c\u8d39\u7528\u3002")))))}}]),a}(I["PureComponent"]),r=i))||r)||r);a["default"]=j}}]);