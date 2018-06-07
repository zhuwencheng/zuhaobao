<template>
    <div class="shoplist-table">
        <table>
            <tr>
                <th style="width:5em;">商品ID</th>
                <th style="width:6em;">游戏区</th>
                <th>标题</th>
                <th style="width:6em;">角色名</th>
                <th style="width:6em;">段位</th>
                <th style="width:6em;">段位框</th>
                <th style="width:3em;">英雄</th>
                <th style="width:3em;">皮肤</th>
                <th style="width:3em;">排位</th>
                <th style="width:4em;">状态</th>
                <th style="width:3em;">时租</th>
                <th style="width:4em;">押金</th>
                <th style="width:2em;">最短</th>
            </tr>
            <tr :class="{us:item.goodsUser===0,active:item.active}" v-for="(item,index) in tableData" :key="item.id" @dblclick="toDetail(item)" @click="select(item)">
                <td :title="item.ID">{{item.ID}}</td>
                <td :title="item.GAME_NAME">{{item.GAME_NAME}}</td>
                <td :title="item.GOODS_TITLE" class="t-l">{{item.GOODS_TITLE}}</td>
                <td :title="item.ROLE_NAME">{{item.ROLE_NAME}}</td>
                <td :title="item.GRADING_ID">{{item.GRADING_ID}}</td>
                <td :title="item.GRADING_ID">{{item.GRADING_FRAME_NAME}}</td>
                <td :title="item.HERO_NUM">{{item.HERO_NUM}}</td>
                <td :title="item.CUTIS_NUM">{{item.CUTIS_NUM}}</td>
                <td :title="item.IF_PLAY_QUALIFYING">{{item.IF_PLAY_QUALIFYING}}</td>
                <td :title="item.GOODS_STATUS">{{item.STATUS_NAME}}</td>
                <td :title="item.LEASE_PRICE">{{item.LEASE_PRICE | money}}</td>
                <td :title="item.FOREGIFT">{{item.FOREGIFT | money}}</td>
                <td :title="item.HOUR_LEASE">{{item.SHORT_LEASE}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'tableList',
    props: ['tableData'],
    methods: {
        toDetail(item) {
            if (typeof nw!="undefined") {
                const win = nw.Window.get();
                nw.Window.open('chrome-extension://kbddllogcbdndhohpkalekljdlkohhco/index.html#/orderdetail?id=' + item.ID + '&gameName=' + item.BIG_GAME_NAME, {
                    position: 'center',
                    width: 730,
                    height: 740,
                    frame: true,
                    focus: true,
                    resizable: false,
                    show: false
                }, function(newwin) {
                    newwin.show();
                    newwin.moveTo(win.x + 50, win.y + 50);
                });
            } else {
                window.open('#/orderdetail?id=' + item.ID + '&gameName=' + item.BIG_GAME_NAME);
            }
        },
        select(item){
            if(item.active==undefined){
                this.$set(item,'active',true);
            }else{
                item.active=!item.active;
            }
        }
    }
}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

