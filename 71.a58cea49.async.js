(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[71],{Ci30:function(a,e,t){"use strict";t.r(e);t("IzEo");var n=t("bx4M"),l=(t("14J3"),t("BMrR")),r=(t("jCWc"),t("kPKH")),m=(t("7Kak"),t("9yH6")),s=(t("Znn+"),t("ZTPi")),c=t("q1tI"),i=t.n(c),o=t("mOP9"),d=t("ZhIB"),E=t.n(d),u=t("wd/R"),g=t.n(u),p=t("hFLe"),v=t.n(p),b=t("KTCi"),k=s["a"].TabPane,N=m["a"].Group,x=m["a"].Button,f=Object(c["memo"])(function(a){var e=a.salesData,t=a.loading,m=a.radioGroupOnChange,c=e.length;if(c<7)return"";for(var d=[],u=c-1;u>=0;u-=1){var p=e[u],f="";f=u===c-1?"\u4eca\u5929":g()(p.x).format("M\u6708DD\u65e5"),u>c-8&&d.push({title:f,total:p.y}),p.x=f}var h=i.a.createElement("div",{className:v.a.extraContent},i.a.createElement(N,{onChange:m,defaultValue:"0"},i.a.createElement(x,{value:"0"},"\u514d\u5355\u8bd5\u7528"),i.a.createElement(x,{value:"1"},"\u5708\u7c89\u5f15\u6d41")));return i.a.createElement(n["a"],{loading:t,bordered:!1,bodyStyle:{padding:0}},i.a.createElement("div",{className:v.a.salesCard},i.a.createElement(s["a"],{tabBarExtraContent:i.a.createElement("div",{className:v.a.salesExtraWrap},i.a.createElement(o["a"],{to:"/fangdan/list"},"\u653e\u5355\u5217\u8868>")),size:"large",tabBarStyle:{marginBottom:24}},i.a.createElement(k,{tab:"\u653e\u5355\u6982\u51b5",key:"sales"},i.a.createElement(n["a"],{bordered:!1,className:v.a.customStyleCard,extra:h},i.a.createElement(l["a"],null,i.a.createElement(r["a"],{xl:16,lg:12,md:12,sm:24,xs:24},i.a.createElement("div",{className:v.a.salesBar},i.a.createElement(b["a"],{height:295,title:"",data:e}))),i.a.createElement(r["a"],{xl:8,lg:12,md:12,sm:24,xs:24},i.a.createElement("div",{className:v.a.salesRank},i.a.createElement("h4",{className:v.a.rankingTitle},"\u6700\u8fd17\u65e5\u6570\u636e"),i.a.createElement("ul",{className:v.a.rankingList},d.map(function(a,e){return i.a.createElement("li",{key:a.title},i.a.createElement("span",{className:"".concat(v.a.rankingItemNumber," ").concat(e<3?v.a.active:"")},e+1),i.a.createElement("span",{className:v.a.rankingItemTitle,title:a.title},a.title),i.a.createElement("span",{className:v.a.rankingItemValue},E()(a.total).format("0,0")))}))))))))))});e["default"]=f}}]);