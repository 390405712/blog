(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31c8da74"],{"0300":function(t,s,a){},"369e":function(t,s,a){"use strict";var i=a("0300"),e=a.n(i);e.a},"658b":function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"balance"},[a("div",{staticClass:"banner"},[a("div",{staticClass:"tip"},[a("div",{staticClass:"robot",class:0==t.status?"robot1":1==t.status?"robot2":"robot3"}),0==t.status?a("div",{staticClass:"status0"},[t._v("左右滑动滑块，调整您对于本次赔偿的心里价位，对方无法看到您的出价，系统将在双方出价后，智能提供最优调解方案。")]):t._e(),1==t.status?a("div",{staticClass:"status1"},[a("div",{staticClass:"title"},[t._v("很遗憾，协商未达成！")]),a("div",{staticClass:"content"},[t._v("双方出价差额加大，推荐再次进行报价。")])]):t._e(),2==t.status?a("div",{staticClass:"status1"},[a("div",{staticClass:"title"},[t._v("恭喜！协商成功")]),a("div",{staticClass:"content"},[t._v("您接受方案的意愿将会传达给调解员，期待在调解员的帮助下，您可以摆脱这次纠纷给您带来的烦恼。")])]):t._e(),3==t.status?a("div",{staticClass:"status1"},[a("div",{staticClass:"title"},[t._v("系统生成推荐赔偿方案")]),a("div",{staticClass:"content"},[t._v("您接受方案的意愿将会传达给调解员，期待在调解员的帮助下，您可以摆脱这次纠纷给您带来的烦恼。")])]):t._e()]),a("div",{staticClass:"offer"},[a("div",{staticClass:"left"},[a("div",{staticClass:"name"},[a("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":"my-icon",name:"wenben"}}),t._v("\n            接受方案后将生成一份调解意见书\n          ")],1)])])]),a("div",{staticClass:"center"},[a("div",{staticClass:"center-body",style:{height:2==t.status?"310px":"262px"}},[a("div",{staticClass:"top"},[a("div",{staticClass:"status"},[0==t.status||1==t.status?a("svg",{staticClass:"icon svg-icon",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#my-icon-tiaojietianping"}})]):t._e(),2==t.status?a("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":"my-icon",name:"tongzhiguanli"}}):t._e()],1)]),0==t.status||1==t.status?a("div",{staticClass:"price-tip"},[t._v("如果下次出价，差距较小，系统将会根据双方让步情况，提供偏向于让步较大者的调解方案！")]):t._e(),a("div",{staticClass:"title"},[t._v(" "+t._s(2==t.status?"系统推荐赔偿金额":"我接受的赔偿"))]),a("div",{staticClass:"price"},[t._v(t._s(t.price))]),a("van-slider",{attrs:{"bar-height":"6px","inactive-color":"#DBDDEA","active-color":"#6A78FD","use-button-slot":2==t.status},model:{value:t.price,callback:function(s){t.price=s},expression:"price"}},[a("div",{staticClass:"custom-button",attrs:{slot:"button"},slot:"button"},[a("div",{staticClass:"tag"},[t._v("6000")]),a("div",{staticClass:"star"})])]),a("div",{staticClass:"price-area"},[a("div",[t._v(t._s(t.min))]),a("div",[t._v(t._s(t.max))])]),a("div",{staticClass:"bottom"},[0==t.status||1==t.status?a("van-button",{staticClass:"largeBtn",attrs:{type:"info",size:"large"}},[t._v("出价")]):t._e(),2==t.status?a("van-button",{staticClass:"largeBtn",attrs:{type:"info",size:"large"},on:{click:function(s){return t.accept(!0)}}},[t._v("接受方案")]):t._e(),2==t.status?a("van-button",{staticClass:"transparent-btn",attrs:{type:"default"},on:{click:function(s){return t.accept(!1)}}},[t._v("放弃协商")]):t._e()],1)],1)]),a("div",{staticClass:"fotter"},[a("div",{staticClass:"item",on:{click:function(s){t.history=!0}}},[a("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":"my-icon",name:"lishicaozuo"}}),a("div",[t._v("历史操作")])],1),a("div",{staticClass:"item",on:{click:function(s){return t.selectPath("/reference")}}},[a("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":"my-icon",name:"peichangcankao"}}),a("div",[t._v("赔偿参考")])],1),a("div",{staticClass:"item",on:{click:function(s){return t.selectPath("/")}}},[a("van-icon",{staticClass:"iconfont",attrs:{"class-prefix":"my-icon",name:"tuichu1"}}),a("div",[t._v("  退出  ")])],1)]),a("van-popup",{style:{height:"80%"},attrs:{round:"",position:"bottom"},model:{value:t.history,callback:function(s){t.history=s},expression:"history"}},[a("div",{staticClass:"history"},[a("div",{staticClass:"title"},[t._v("出价记录")]),a("div",{staticClass:"area"},t._l(t.historyData,function(s,i){return a("div",{key:i,staticClass:"item"},[a("div",{staticClass:"user",class:{act:0==i}},[t._v(t._s(s.user)+t._s(s.action))]),a("div",{staticClass:"time"},[t._v(t._s(s.time))])])}),0),a("van-button",{staticClass:"largeBtn",attrs:{type:"info",size:"large"},on:{click:function(s){t.history=!1}}},[t._v("关闭")])],1)]),a("van-dialog",{attrs:{title:"是否确认放弃协商？","show-confirm-button":"","show-cancel-button":"","before-close":t.beforeClose},model:{value:t.acceptDialog,callback:function(s){t.acceptDialog=s},expression:"acceptDialog"}},[a("van-field",{staticClass:"reasonInput",attrs:{type:"textarea",maxlength:"30",size:"large",rows:"1",autosize:"",placeholder:"请填写放弃原因"},model:{value:t.reason,callback:function(s){t.reason=s},expression:"reason"}})],1)],1)},e=[],c={name:"balance",data:function(){return{min:3e3,max:8e3,status:2,price:30,history:!1,acceptDialog:!1,reason:"",historyData:[{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"},{user:"赵健",action:"调整了自己的报价",time:"2分钟前"}]}},methods:{accept:function(t){var s=this;t?this.$Dialog.confirm({title:"确认接受协商？",closeOnClickOverlay:!0}).then(function(){s.$router.push({path:"/report"})}):this.acceptDialog=!0},beforeClose:function(t,s){"confirm"===t?""!==this.reason?(s(),this.$router.push({path:"/offer"})):(s(!1),this.$Notify("请填写放弃原因")):s()},selectPath:function(t){this.$router.push({path:t})}}},n=c,o=(a("369e"),a("2877")),l=Object(o["a"])(n,i,e,!1,null,"05747ff6",null);s["default"]=l.exports}}]);