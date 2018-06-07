<template>
    <div class="statistic">
        <div class="menu">
            <Cmenu class="fr"></Cmenu>
            <div class="gamelist-menu">
                <span class="active">销售统计</span>
            </div>

        </div>
        <!-- 导航区域 end -->
        <div class="filter">
            <div class="filter-item">
                结束时间
                <el-date-picker v-model="queryParams.startTime" type="date" placeholder="选择起始时间" @change="setStartDate" size="small" :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker v-model="queryParams.endTime" type="date" placeholder="选择结束时间" @change="setEndDate" size="small" :picker-options="pickerOptions1">
                </el-date-picker>
                <select v-model="queryParams.search">
                    <option span v-for="(item, index) in filter.search" :key="item.val" :value="item.val">{{item.name}}</option>
                    <!-- 自定义条件搜索 end -->
                </select>
                <div class="search-box">
                    <input type="text" placeholder="商品/角色" v-model="queryParams.searchText">
                    <span @click="queryOrderList(true)"></span>
                </div>
            </div>
            <div class="filter-item">
                共计
                <span class="red">{{pageCount}}</span> 笔
                <span class="red">{{sumHours}}</span> 小时
                <span class="red">{{sumPrice}}</span>元
            </div>
            <div class="filter-item">
                <span :class="{op:true,active:item.val===queryParams.orderType}" v-for="(item ,i) in filter.orderType" :key="item.val" @click="changeStatus(item)">{{item.name}}</span>
            </div>

        </div>
        <component :is="currentTable" :tableData='tableList'></component>
        <div class="page">
            <el-pagination layout="prev, pager, next" :total="pageCount" :current-page="pageIndex" @current-change="changePage" v-if="pageCount>10">
            </el-pagination>
        </div>
    </div>
</template>

<script>
const tableList = resolve => require(['../tableList/statisctic.vue'], resolve);
import Nav from '../nav/main.vue';
export default {
    name: 'statistic',
    components: {
        Cmenu: Nav
    },
    data() {
        const _this = this;
        return {
            currentTable: tableList,
            sumPrice: 0,
            sumHours: 0,
            tableList: [],
            pageCount: 1,
            pageIndex: 1,
            queryParams: {
                userId: localStorage.userId,
                pageIndex: 1,//当前页
                search: '',//搜索key
                orderType: '',
                searchText: '',//搜索关键字
                startTime: '',
                endTime: ''
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() >= new Date(_this.queryParams.endTime).getTime();
                }
            },
            pickerOptions1: {
                disabledDate(time) {
                     return time.getTime() < new Date(_this.queryParams.startTime).getTime() - 86400001;
                }
            },
            filter: {
                search: [{ name: '请选择', val: '' }, { name: '游戏帐号', val: 'yxzh' }, { name: '订单编号', val: 'ddbh' }, { name: '商品ID', val: 'id' }],
                orderType: [{ name: '全部', val: '' }, { name: '出租', val: 1 }, { name: '转租', val: 2 }]
            },
            //testData:[{name:'111',val:'zysp'},{name:'woshi',val:'sd'}]
        }
    },
    methods: {
        // test(){
        //     console.log(111)
        // },
        setStartDate(a) {
            this.queryParams.startTime = a;
            this.queryOrderList();
        },
        setEndDate(a) {
            this.queryParams.endTime = a;
            this.queryOrderList();
        },
        changePage(val) {
            this.queryParams.pageIndex = val;
            this.pageIndex = val;
            this.queryOrderList('changePage');
        },
        changeStatus(item) {
            this.queryParams.orderType = item.val;
            this.queryOrderList();
        },
        queryOrderList(hasSearch) {
            const _this = this;
            const beseUrl = _this.$store.state.config.testUrl;
            if (hasSearch !== true) {
                _this.queryParams.search = '';
                console.log(111)
            }
            const params = _this.queryParams;
            _this.$http(
                {
                    url: beseUrl + 'goods/user/findStatisticsByUser',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    _this.tableList = res.body.result.list;
                    console.log(res.body.result);
                    _this.pageCount = parseInt(res.body.result.pageCount);
                    _this.queryOrderNum(hasSearch);
                    if(hasSearch!=="changePage"){
                        _this.pageIndex = parseInt(res.body.result.pageIndex);
                    };
                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.$message.error(res.body.message);
                }
            });
        },
        queryOrderNum(hasSearch) {
            const _this = this;
            const beseUrl = _this.$store.state.config.testUrl;
            if (hasSearch !== true) {
                _this.queryParams.search = '';
            }
            const params = _this.queryParams;
            _this.$http(
                {
                    url: beseUrl + 'goods/user/findByUserOrderCount',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    _this.sumPrice = res.body.result.sum.SUM_PRICE || 0;
                    _this.sumHours = res.body.result.sum.SUM_HOURS || 0;
                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.$message.error(res.body.message);
                }
            });
        }
    },
    created() {
        this.queryOrderList();
        //this.queryOrderNum();
    },
    watch: {

    }

}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

