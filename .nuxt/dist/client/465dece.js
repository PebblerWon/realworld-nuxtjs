(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{185:function(t,e,r){"use strict";r.r(e);var n=r(4),o=(r(34),r(29),r(167)),l=r.n(o).a.create({baseURL:"https://conduit.productionready.io"}),c={name:"login",components:{},props:{},data:function(){return{user:{email:"",password:""}}},computed:{isLogin:function(){return"login"===this.$route.name}},methods:{onSubmit:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(111),e.prev=1,e.next=4,l({method:"POST",url:"/api/users/login",data:t.user});case 4:data=e.sent,console.log(data),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})))()}}},m=r(28),component=Object(m.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"auth-page"},[r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 offset-md-3 col-xs-12"},[r("h1",{staticClass:"text-xs-center"},[t._v(t._s(t.isLogin?"Sign in":"Sign up"))]),t._v(" "),r("p",{staticClass:"text-xs-center"},[t.isLogin?r("nuxt-link",{attrs:{to:"/register"}},[t._v("Need an account?")]):t._e(),t._v(" "),t.isLogin?t._e():r("nuxt-link",{attrs:{to:"/login"}},[t._v("Have an account?")])],1),t._v(" "),t._m(0),t._v(" "),r("form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[t.isLogin?t._e():r("fieldset",{staticClass:"form-group"},[r("input",{staticClass:"form-control form-control-lg",attrs:{type:"text",placeholder:"Your Name"}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"form-control form-control-lg",attrs:{type:"text",placeholder:"Email"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"form-control form-control-lg",attrs:{type:"password",placeholder:"Password"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}})]),t._v(" "),r("button",{staticClass:"btn btn-lg btn-primary pull-xs-right"},[t._v("\n            "+t._s(t.isLogin?"Sign in":"Sign up")+"\n          ")])])])])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ul",{staticClass:"error-messages"},[r("li",[t._v("That email is already taken")])])}],!1,null,null,null);e.default=component.exports}}]);