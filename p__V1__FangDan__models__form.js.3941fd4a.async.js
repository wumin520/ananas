(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[47],{HHfT:function(e,a,t){"use strict";t.r(a);var n=t("gWZ8"),r=t.n(n),s=t("p0pE"),o=t.n(s),c=(t("miYZ"),t("tsqr")),u=t("d6i3"),d=t.n(u),i=t("7DNP"),p=t("dCQc");a["default"]={namespace:"form",state:{pddGoodUrl:"",pddZSId:"",goodsDetail:{goods_id:"",cate_name:"",title:"",detailImgRecordUrl:[],coupon_info:{coupon_discount:0},commission_rate:"",commission:"",price:"",coupon_price:0,comment_limit:0,comment_keyword:""},category_list:[],category_id:"",taskPayInfo:{rebate_money:"",num:"",total_money:"",wait_pay:"",balance:"",can_pay:"",pay_notice:""},schedules:[],startTime:"",endTime:"",taskId:"",zs_duo_id:""},effects:{queryGoodsDetail:d.a.mark(function e(a,t){var n,r,s,o,c,u,l,y;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,s=t.put,e.next=4,r(p["B"],n);case 4:if(o=e.sent,console.log("queryGoodsDetail -> res ",o,n),!o||"ok"!==o.status){e.next=16;break}return c=o.payload,u=c.mall_detail,l=c.goods_detail,u.mall_id&&(l={goods_id:u.mall_id,title:u.mall_name,detailImgRecordUrl:[u.url]}),e.next=11,s({type:"saveState",payload:{goodsDetail:l,pddGoodUrl:n.goods_id,pddZSId:n.zs_duo_id}});case 11:if(0===n.auto_redirect){e.next=16;break}return y="/fangdan/step-form/confirm",void 0!==n.qf&&(y="/fangdan/qf/confirm?qf=".concat(n.qf)),e.next=16,s(i["routerRedux"].push(y));case 16:case"end":return e.stop()}},e)}),queryPayInfoByTaskId:d.a.mark(function e(a,t){var n,r,s,o;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,s=t.put,e.next=4,r(p["D"],n);case 4:return o=e.sent,e.next=7,s({type:"saveState",payload:{taskPayInfo:o.payload.data}});case 7:case"end":return e.stop()}},e)}),publishTask:d.a.mark(function e(a,t){var n,r,s,o,c,u;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,s=t.put,e.next=4,r(p["x"],n);case 4:if(o=e.sent,!o||"ok"!==o.status){e.next=14;break}return c=o.payload.task_id,u="/fangdan/step-form/pay?task_id=".concat(c,"&goods_id=").concat(n.goods_id),""!==n.qf&&(u+="&qf=".concat(n.qf)),console.log(u,"publishTask 1"),e.next=12,s(i["routerRedux"].push(u));case 12:return e.next=14,s({type:"saveState",payload:{taskId:c}});case 14:case"end":return e.stop()}},e)}),pay:d.a.mark(function e(a,t){var n,r,s,o;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,s=t.put,e.next=4,r(p["t"],n);case 4:if(o=e.sent,!o||"ok"!==o.status){e.next=8;break}return e.next=8,s(i["routerRedux"].push("/fangdan/step-form/result?task_id=".concat(n.task_id,"&type=").concat(n.type)));case 8:case"end":return e.stop()}},e)}),checkPrivige:d.a.mark(function e(a,t){var n,r,s;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,e.next=4,r(p["d"],n);case 4:return s=e.sent,e.abrupt("return",s);case 6:case"end":return e.stop()}},e)}),queryCategoryList:d.a.mark(function e(a,t){var n,r,s,o;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,s=t.put,e.next=4,r(p["n"],n);case 4:return o=e.sent,e.next=7,s({type:"saveState",payload:{category_list:o.payload.category_list}});case 7:case"end":return e.stop()}},e)}),queryTaskDetail:d.a.mark(function e(a,t){var n,r,s,o,c,u,i,l,y,m,f,h,v;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,s=t.put,e.next=4,r(p["P"],n);case 4:if(o=e.sent,!o||"ok"!==o.status){e.next=14;break}for(c=o.payload,u=c.plan_list,i=c.data,l=[],y=u.length,m=y>0&&u[0].plan_time,f=y>0&&u[y-1].plan_time,h=0;h<y;h+=1)v=u[h],l.push({day:v.plan_time,amount:v.total_amount});return e.next=14,s({type:"saveState",payload:{taskId:i.task_id||"",startTime:m,endTime:f,category_id:i.category_id,schedules:l}});case 14:case"end":return e.stop()}},e)}),submitRegularForm:d.a.mark(function e(a,t){var n,r;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,e.next=4,r(p["h"],n);case 4:c["a"].success("\u63d0\u4ea4\u6210\u529f");case 5:case"end":return e.stop()}},e)}),submitStepForm:d.a.mark(function e(a,t){var n,r,s;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,s=t.put,e.next=4,r(p["h"],n);case 4:return e.next=6,s({type:"saveStepFormData",payload:n});case 6:return e.next=8,s(i["routerRedux"].push("/fangdan/step-form/schedule"));case 8:case"end":return e.stop()}},e)}),submitAdvancedForm:d.a.mark(function e(a,t){var n,r;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,e.next=4,r(p["h"],n);case 4:c["a"].success("\u63d0\u4ea4\u6210\u529f");case 5:case"end":return e.stop()}},e)}),saveSchedules:d.a.mark(function e(a,t){var n,r;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.put,e.next=4,r({type:"saveSchedulesData",payload:n});case 4:case"end":return e.stop()}},e)}),setScheduleTime:d.a.mark(function e(a,t){var n,r;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.put,e.next=4,r({type:"saveScheduleTime",payload:n});case 4:case"end":return e.stop()}},e)}),updateState:d.a.mark(function e(a,t){var n,r;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.put,e.next=4,r({type:"saveState",payload:n});case 4:case"end":return e.stop()}},e)})},reducers:{saveState:function(e,a){var t=a.payload;return o()({},e,t)},saveScheduleTime:function(e,a){var t=a.payload;return o()({},e,{startTime:t.startTime,endTime:t.endTime,schedules:r()(t.schedules)})},saveSchedulesData:function(e,a){var t=a.payload;return o()({},e,{schedules:[].concat(r()(e.schedules),[t])})},saveStepFormData:function(e,a){var t=a.payload;return o()({},e,{goodsDetail:o()({},e.goodsDetail,t)})}}}}}]);