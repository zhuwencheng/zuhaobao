<template>
    <div class="shoplist-table">
        <table>
            <tr>
                <th>商品ID</th>
                <th>游戏区</th>
                <th width="200">标题</th>
                <th style="width:8em;">角色名</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>时长</th>
                <th>租金</th>
                <th>状态</th>
                <th>复制</th>
            </tr>
            <tr :class="{us:item.goodsUser===0}" v-for="(item,index) in tableData" :key="item.id" @dblclick="toDetail(item)">
                <td>{{item.GOODS_ID}}</td>
                <td :title="item.GAME_NAME">{{item.GAME_NAME}}</td>
                <td :title="item.GOODS_TITLE" class="t-l">{{item.GOODS_TITLE}}</td>
                <td :title="item.BIG_GAME_NAME">{{item.BIG_GAME_NAME}}</td>
                <td :title="item.BEGIN_TIME">{{item.BEGIN_TIME}}</td>
                <td :title="item.END_TIME">{{item.END_TIME}}</td>
                <td :title="item.HOURS">{{item.HOURS}}</td>
                <td :title="item.AMOUNT">{{item.AMOUNT | money}}</td>
                <td :title="item.ORDER_STATUS">{{item.STATUS_NAME}}</td>
                <td @click="copyClipText(item)" class="btn">复制</td>
            </tr>
        </table>
        <span id="targetElem"></span>
    </div>
</template>
<script>
import Clipboard from 'clipboard';
export default {
    name: 'orderTableList',
    props: ['tableData'],
    methods: {
        copyClipText(item) {
            const _this = this;
            const copyText = '租赁时段：' + item.BEGIN_TIME + '~' + item.END_TIME + '\n'
                + '客户用户名：' + (item.RENT_PEOPLE || '') + '\n'
                + '登录码：' + (item.ORDER_NO || '') + '\n'
                + '区服：' + (item.GAME_ALL_NAME || '') + '\n'
                + '角色名：' + (item.ROLE_NAME || '') + '\n'
                + '请在专用登录器将客户用户名与登录码输入相应的位置，点击“开始游戏”，游戏登陆成功前请不要移动鼠标或键盘。XP系统遇到密码错误或者不输入密码的情况麻烦亲多试几次哦！';
            let clipboard = new Clipboard('.btn', { text: function() { return copyText; } });
            clipboard.on('success', function(e) {
                _this.$message.success('复制成功！');
                setTimeout(function() { clipboard.destroy(); }, 1);
            });
            clipboard.on('error', function(e) {
                _this.$message.error('复制失败，请手动选择复制！');
            });
        },
        toDetail(item) {
            if (typeof nw != "undefined") {
                const win = nw.Window.get();
                nw.Window.open('chrome-extension://kbddllogcbdndhohpkalekljdlkohhco/index.html#/orderdetail?id=' + item.GOODS_ID + '&gameName=' + item.BIG_GAME_NAME + '&orderNo=' + item.ORDER_NO, {
                    position: 'center',
                    width: 730,
                    height: 760,
                    frame: true,
                    focus: true,
                    resizable: false,
                    show: false
                }, function(newwin) {
                    newwin.show();
                    newwin.moveTo(win.x + 50, win.y + 50);
                });
            } else {
                window.open('#/orderdetail?id=' + item.GOODS_ID + '&gameName=' + item.BIG_GAME_NAME + '&orderNo=' + item.ORDER_NO);
            }
        }
    }
}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

