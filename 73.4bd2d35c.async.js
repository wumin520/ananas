(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[73],{Unbs:function(e,t,a){"use strict";a.r(t);a("IzEo");var n=a("bx4M"),r=(a("g9YV"),a("wCAj")),l=(a("/zsF"),a("PArb")),i=(a("Awhp"),a("KrTs")),o=(a("7Kak"),a("9yH6")),d=a("q1tI"),c=a.n(d),s=a("mOP9"),u=a("hFLe"),m=a.n(u),p=["default","success"],k=o["a"].Group,_=o["a"].Button,g=[{key:"plan_time",title:"\u6295\u653e\u65f6\u95f4",width:100,dataIndex:"plan_time",render:function(e){return e.split(" ")[1]}},{key:"1",title:"\u63a8\u5e7f\u7f16\u53f7",width:100,dataIndex:"task_plan_id"},{key:"goods_id",title:"\u5546\u54c1id",width:120,dataIndex:"goods_id"},{key:"2",title:"\u5546\u54c1",className:m.a.resultColumns,render:function(e){return c.a.createElement("a",{className:m.a.resultColumnsDiv,href:e.goods_url,rel:"noopener noreferrer",target:"_blank"},c.a.createElement("img",{src:e.img,alt:"a",style:{width:50,heigth:50}}),c.a.createElement("span",null," ",e.title))}},{key:"3",title:"\u5238\u540e\u4ef7",dataIndex:"after_coupon_price",render:function(e){return"\uffe5 ".concat(e)}},{key:"4",title:"\u4f18\u60e0\u5238",dataIndex:"coupon_price",render:function(e){return c.a.createElement("span",null,e?"\uffe5 ".concat(e):"\u65e0")}},{key:"5",title:"\u6392\u671f\u72b6\u6001",render:function(e){return c.a.createElement(i["a"],{status:p[e.state],text:e.state_desc})}},{key:"6",title:"\u4eca\u65e5\u5b8c\u6210\u60c5\u51b5",render:function(e){return c.a.createElement("div",{className:m.a.taskInfo},c.a.createElement("p",null,"\u53d1\u653e\u4efd\u6570 ",e.total_amount),c.a.createElement("p",null,"\u4e0b\u5355\u4eba\u6570 ",e.order_num))}},{key:"7",title:"\u64cd\u4f5c",render:function(e){return c.a.createElement(d["Fragment"],null,c.a.createElement(s["a"],{to:"/fangdan/list/generalizeDetail?&task_id=".concat(e.task_id)},"\u67e5\u770b"),c.a.createElement(l["a"],{type:"vertical"}),c.a.createElement(s["a"],{to:"/order/Index?task_id=".concat(e.task_id)},"\u8ba2\u5355\u660e\u7ec6"))}}],E=[{key:"plan_time",title:"\u6295\u653e\u65f6\u95f4",width:100,dataIndex:"plan_time",render:function(e){return e.split(" ")[1]}},{key:"1",title:"\u63a8\u5e7f\u7f16\u53f7",width:100,dataIndex:"task_plan_id"},{key:"goods_id",title:"\u5546\u54c1/\u5e97\u94faid",width:120,dataIndex:"goods_id"},{key:"2",title:"\u5546\u54c1/\u5e97\u94fa\u540d\u79f0",className:m.a.resultColumns,render:function(e){return c.a.createElement("a",{className:m.a.resultColumnsDiv,href:e.goods_url,rel:"noopener noreferrer",target:"_blank"},c.a.createElement("img",{src:e.img,alt:"a",style:{width:50,heigth:50}}),c.a.createElement("span",null," ",e.title))}},{key:"5",title:"\u72b6\u6001",render:function(e){return c.a.createElement(i["a"],{status:p[e.state],text:e.state_desc})}},{key:"6",title:"\u63a8\u5e7f\u4efd\u6570",render:function(e){return c.a.createElement("div",{className:m.a.taskInfo},c.a.createElement("p",null,"\u53d1\u653e\u4efd\u6570 ",e.total_amount),c.a.createElement("p",null,"\u6536\u85cf\u4eba\u6570 ",e.order_num))}},{key:"7",title:"\u64cd\u4f5c",render:function(e){return c.a.createElement(d["Fragment"],null,c.a.createElement(s["a"],{to:"/fangdan/qfDetail?&task_id=".concat(e.task_id)},"\u67e5\u770b"),c.a.createElement(l["a"],{type:"vertical"}),c.a.createElement(s["a"],{to:"/order/qf?task_id=".concat(e.task_id)},"\u63a8\u5e7f\u6548\u679c"))}}],f=Object(d["memo"])(function(e){var t=e.data,a=e.loading,l=e.radioOnChange,i=e.tableType,o=c.a.createElement("div",{style:{marginBottom:20},className:m.a.extraContent},c.a.createElement(k,{onChange:l,defaultValue:"10"},c.a.createElement(_,{value:"10"},"\u514d\u5355\u8bd5\u7528"),c.a.createElement(_,{value:"30,31"},"\u5708\u7c89\u5f15\u6d41"))),d=g;return 1===i&&(d=E),c.a.createElement(n["a"],{loading:a,bordered:!1,title:"\u4eca\u65e5\u63a8\u5e7f\u4e2d",extra:c.a.createElement(s["a"],{to:"/fangdan/plan"},"\u6392\u671f\u5217\u8868>"),style:{marginTop:24}},o,c.a.createElement(r["a"],{rowKey:function(e){return e.id},size:"small",loading:a,dataSource:t,columns:d,pagination:{style:{marginBottom:0},pageSize:5}}))});t["default"]=f}}]);