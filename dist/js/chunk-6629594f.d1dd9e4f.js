(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6629594f"],{"266c":function(t,e,i){},"316c":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"offer"},[i("div",{staticClass:"card"},[i("svg",{staticClass:"icon ",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#my-icon-jinbichi01"}})]),i("div",{staticClass:"title"},[t._v("您对于赔偿金额的心理预期额度？")]),i("div",{staticClass:"question"},[t._v("为了高效化解纠纷，请您谨慎填写自己的预期赔偿金额，协商为围绕双方心理价位，通过双方协商让步，最终根据大量真实案例及各自让步情况，智能推荐最终赔偿金额。")]),i("van-field",{attrs:{type:"number",maxlength:"11",clearable:"",size:"large",placeholder:"请填写您的预期赔偿金额"},model:{value:t.price,callback:function(e){t.price=e},expression:"price"}},[i("van-icon",{staticClass:"iconfont",attrs:{slot:"left-icon","class-prefix":"my-icon",name:"renminbi"},slot:"left-icon"})],1),i("van-button",{staticClass:"largeBtn",attrs:{type:"info",size:"large"},on:{click:t.sendPrice}},[t._v("下一步")]),i("van-button",{staticClass:"transparent-btn",attrs:{type:"default"},on:{click:function(e){return t.selectPath("/reference")}}},[t._v("赔偿参考")])],1)])},s=[],a={name:"offer",data:function(){return{price:""}},watch:{},mounted:function(){},methods:{sendPrice:function(){return""===this.price?this.$Notify("请填写您的预期赔偿金额"):isNaN(this.price)?this.$Notify("您的预期赔偿金额格式有误"):void this.selectPath("/balance")},selectPath:function(t){this.$router.push({path:t})}}},c=a,r=(i("7898"),i("2877")),l=Object(r["a"])(c,n,s,!1,null,"64204b18",null);e["default"]=l.exports},7898:function(t,e,i){"use strict";var n=i("266c"),s=i.n(n);s.a}}]);