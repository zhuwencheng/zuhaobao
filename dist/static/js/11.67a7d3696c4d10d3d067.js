webpackJsonp([11],{141:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"tableList",props:["tableData"],methods:{toDetail:function(t){if("undefined"!=typeof nw){var e=nw.Window.get();nw.Window.open("chrome-extension://kbddllogcbdndhohpkalekljdlkohhco/index.html#/orderdetail?id="+t.ID+"&gameName="+t.BIG_GAME_NAME,{position:"center",width:730,height:740,frame:!0,focus:!0,resizable:!1,show:!1},function(t){t.show(),t.moveTo(e.x+50,e.y+50)})}else window.open("#/orderdetail?id="+t.ID+"&gameName="+t.BIG_GAME_NAME)},select:function(t){void 0==t.active?this.$set(t,"active",!0):t.active=!t.active}}}},157:function(t,e,n){e=t.exports=n(80)(),e.push([t.i,"\n.shoplist-table[data-v-618ef678] {\n  position: relative;\n}\n.shoplist-table table[data-v-618ef678] {\n  text-align: center;\n  color: #444;\n  table-layout: fixed;\n}\n.shoplist-table table th[data-v-618ef678] {\n  line-height: 48px;\n  background: #1197d7;\n  color: #fff;\n  font-weight: bold;\n  border: 1px solid #2daae5;\n  padding: 0 5px;\n  font-size: 1.2rem;\n}\n.shoplist-table table td[data-v-618ef678] {\n  line-height: 35px;\n  height: 35px;\n  overflow: hidden;\n  border: 1px solid #d3d3d3;\n  font-size: 12px;\n  background: #efefef;\n  padding: 0 10px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.shoplist-table table td.t-l[data-v-618ef678] {\n  text-align: left;\n}\n.shoplist-table table tr[data-v-618ef678] {\n  cursor: pointer;\n}\n.shoplist-table table tr:hover td[data-v-618ef678],\n.shoplist-table table tr.active td[data-v-618ef678] {\n  background: #65c6f4 !important;\n  color: #fff;\n}\n.shoplist-table table tr.us td[data-v-618ef678] {\n  background: #fff;\n}\n","",{version:3,sources:["F:/new-work/xb-b2b/src/components/tableList/main.vue"],names:[],mappings:";AACA;EACE,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,oBAAoB;CACrB;AACD;EACE,kBAAkB;EAClB,oBAAoB;EACpB,YAAY;EACZ,kBAAkB;EAClB,0BAA0B;EAC1B,eAAe;EACf,kBAAkB;CACnB;AACD;EACE,kBAAkB;EAClB,aAAa;EACb,iBAAiB;EACjB,0BAA0B;EAC1B,gBAAgB;EAChB,oBAAoB;EACpB,gBAAgB;EAChB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,gBAAgB;CACjB;AACD;;EAEE,+BAA+B;EAC/B,YAAY;CACb;AACD;EACE,iBAAiB;CAClB",file:"main.vue",sourcesContent:["\n.shoplist-table[data-v-618ef678] {\n  position: relative;\n}\n.shoplist-table table[data-v-618ef678] {\n  text-align: center;\n  color: #444;\n  table-layout: fixed;\n}\n.shoplist-table table th[data-v-618ef678] {\n  line-height: 48px;\n  background: #1197d7;\n  color: #fff;\n  font-weight: bold;\n  border: 1px solid #2daae5;\n  padding: 0 5px;\n  font-size: 1.2rem;\n}\n.shoplist-table table td[data-v-618ef678] {\n  line-height: 35px;\n  height: 35px;\n  overflow: hidden;\n  border: 1px solid #d3d3d3;\n  font-size: 12px;\n  background: #efefef;\n  padding: 0 10px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.shoplist-table table td.t-l[data-v-618ef678] {\n  text-align: left;\n}\n.shoplist-table table tr[data-v-618ef678] {\n  cursor: pointer;\n}\n.shoplist-table table tr:hover td[data-v-618ef678],\n.shoplist-table table tr.active td[data-v-618ef678] {\n  background: #65c6f4 !important;\n  color: #fff;\n}\n.shoplist-table table tr.us td[data-v-618ef678] {\n  background: #fff;\n}\n"],sourceRoot:""}])},174:function(t,e,n){var a=n(157);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(81)("52dd8f7e",a,!0)},213:function(t,e,n){n(174);var a=n(31)(n(141),n(226),"data-v-618ef678",null);t.exports=a.exports},226:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"shoplist-table"},[n("table",[t._m(0),t._v(" "),t._l(t.tableData,function(e,a){return n("tr",{key:e.id,class:{us:0===e.goodsUser,active:e.active},on:{dblclick:function(n){t.toDetail(e)},click:function(n){t.select(e)}}},[n("td",{attrs:{title:e.ID}},[t._v(t._s(e.ID))]),t._v(" "),n("td",{attrs:{title:e.GAME_NAME}},[t._v(t._s(e.GAME_NAME))]),t._v(" "),n("td",{staticClass:"t-l",attrs:{title:e.GOODS_TITLE}},[t._v(t._s(e.GOODS_TITLE))]),t._v(" "),n("td",{attrs:{title:e.ROLE_NAME}},[t._v(t._s(e.ROLE_NAME))]),t._v(" "),n("td",{attrs:{title:e.GRADING_ID}},[t._v(t._s(e.GRADING_ID))]),t._v(" "),n("td",{attrs:{title:e.GRADING_ID}},[t._v(t._s(e.GRADING_FRAME_NAME))]),t._v(" "),n("td",{attrs:{title:e.HERO_NUM}},[t._v(t._s(e.HERO_NUM))]),t._v(" "),n("td",{attrs:{title:e.CUTIS_NUM}},[t._v(t._s(e.CUTIS_NUM))]),t._v(" "),n("td",{attrs:{title:e.IF_PLAY_QUALIFYING}},[t._v(t._s(e.IF_PLAY_QUALIFYING))]),t._v(" "),n("td",{attrs:{title:e.GOODS_STATUS}},[t._v(t._s(e.STATUS_NAME))]),t._v(" "),n("td",{attrs:{title:e.LEASE_PRICE}},[t._v(t._s(t._f("money")(e.LEASE_PRICE)))]),t._v(" "),n("td",{attrs:{title:e.FOREGIFT}},[t._v(t._s(t._f("money")(e.FOREGIFT)))]),t._v(" "),n("td",{attrs:{title:e.HOUR_LEASE}},[t._v(t._s(e.SHORT_LEASE))])])})],2)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",{staticStyle:{width:"5em"}},[t._v("商品ID")]),t._v(" "),n("th",{staticStyle:{width:"6em"}},[t._v("游戏区")]),t._v(" "),n("th",[t._v("标题")]),t._v(" "),n("th",{staticStyle:{width:"6em"}},[t._v("角色名")]),t._v(" "),n("th",{staticStyle:{width:"6em"}},[t._v("段位")]),t._v(" "),n("th",{staticStyle:{width:"6em"}},[t._v("段位框")]),t._v(" "),n("th",{staticStyle:{width:"3em"}},[t._v("英雄")]),t._v(" "),n("th",{staticStyle:{width:"3em"}},[t._v("皮肤")]),t._v(" "),n("th",{staticStyle:{width:"3em"}},[t._v("排位")]),t._v(" "),n("th",{staticStyle:{width:"4em"}},[t._v("状态")]),t._v(" "),n("th",{staticStyle:{width:"3em"}},[t._v("时租")]),t._v(" "),n("th",{staticStyle:{width:"4em"}},[t._v("押金")]),t._v(" "),n("th",{staticStyle:{width:"2em"}},[t._v("最短")])])}]}}});