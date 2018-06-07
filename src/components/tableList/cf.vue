<template>
    <div class="shoplist-table">
        <table>
            <tr>
                <th style="width:5em">商品ID</th>
                <th style="width:5em">游戏区</th>
                <th>标题</th>

                <th style="width:5em;">英雄武器</th>
                <th style="width:5em">时租</th>
                <th style="width:5em">押金</th>
                <th style="width:5em">最短时间</th>
            </tr>
           <tr :class="{us:item.goodsUser===0,active:item.active}" v-for="(item,index) in tableData" :key="item.id" @dblclick="toDetail(item)" @click="select(item)">
                <td :title="item.ID">{{item.ID}}</td>
                <td :title="item.GAME_NAME">{{item.GAME_NAME}}</td>
                <td :title="item.GOODS_TITLE" class="t-l">{{item.GOODS_TITLE}}</td>
                <td :title="item.HERO">{{item.HERO}}</td>
                <td :title="item.LEASE_PRICE">{{item.LEASE_PRICE | money}}</td>
                <td :title="item.FOREGIFT">{{item.FOREGIFT | money}}</td>
                <td :title="item.HOUR_LEASE">{{item.SHORT_LEASE}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'cfTableList',
    props: ['tableData'],
    methods: {
        toDetail(item) {
            if (typeof nw!="undefined") {
                const win = nw.Window.get();
                nw.Window.open('chrome-extension://kbddllogcbdndhohpkalekljdlkohhco/index.html#/orderdetail?id=' + item.ID + '&gameName=' + item.BIG_GAME_NAME, {
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

