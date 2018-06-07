<template>
    <div class="shoplist-table">
        <table>
            <tr>
                <th>游戏区</th>
                <th>游戏帐号</th>
                <th>角色名</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>时长</th>
                <th>租金</th>
                <th>状态</th>
                <th style="width:200px;">订单号</th>
            </tr>
            <tr  :class="{us:item.goodsUser===0}" v-for="(item,index) in tableData" :key="item.id">
                <td :title="item.GAME_ALL_NAME">{{item.GAME_ALL_NAME}}</td>
                <td :title="item.GAME_ACCOUNT">{{item.GAME_ACCOUNT}}</td>
                <td :title="item.ROLE_NAME">{{item.ROLE_NAME}}</td>
                <td :title="item.BEGIN_TIME">{{item.BEGIN_TIME}}</td>
                <td :title="item.END_TIME">{{item.END_TIME}}</td>
                <td :title="item.HOURS">{{item.HOURS}}</td>
                <td :title="item.AMOUNT">{{item.ORDER_ITEM_PRICE| money}}</td>
                <td :title="item.ORDER_STATUS">{{item.STATUS_NAME}}</td>
                <td :title="item.ORDER_NO">{{item.ORDER_NO}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'statiscticTableList',
    props:['tableData'],
    methods: {

    }
}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

