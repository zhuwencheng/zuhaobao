<template>
    <div class="shoplist">
        <div class="menu">
            <Cmenu class="fr"></Cmenu>
            <div class="gamelist-menu">
                <span v-for="(item, index) in gameList" :key="item.name_en" :class="{active: item.name_en===currentGame}" @click="link(item,index)">{{item.game_name}}</span>
            </div>

        </div>
        <!-- 导航区域 end -->
        <div class="filter">
            <div class="filter-item" v-if="gameSupRegion">
                <div class="label">
                    游戏区
                </div>
                <div class="filter-list single">
                    <span v-for="(item, index) in gameSupRegion" @click="setGameSupRegion(item)" :key="item.ID" :class="{active:item.GAME_NAME===queryParams.gameSupRegion}">{{item.GAME_NAME}}</span>
                </div>
            </div>
            <div class="filter-item" v-if="gameRegion">
                <div class="label">
                    游戏服
                </div>
                <div class="filter-list single">
                    <span v-for="(item, index) in gameRegion" @click="setGameRegion(item)" :key="item.ID" :class="{active:item.GAME_NAME===queryParams.gameRegion}">{{item.GAME_NAME}}</span>
                </div>
            </div>
            <div class="filter-item" v-if="filter[currentGame]">
                <div class="label">
                    筛选
                </div>
                <div class="filter-list multiselect">
                    <span :class="{op:true,active:queryParams[item.val]}" v-for="(item, index) in filter[currentGame].mSpan" :key="item.val" @click="triggerQuery(item)">{{item.name}}</span>
                    <!-- 自定义筛选多选模式 end -->
                    <select v-model="queryParams.selectVal" @change="queryGameList">
                        <option span v-for="(item, index) in filter[currentGame].select" :key="item.val" :value="item.val">{{item.name}}</option>
                        <!-- 自定义下拉模式 end -->
                    </select>
                    <select v-model="searchParams.search" @change="queryGameList">
                        <option span v-for="(item, index) in filter[currentGame].search" :key="item.val" :value="item.val">{{item.name}}</option>
                        <!-- 自定义条件搜索 end -->
                    </select>
                    <div class="search-box">
                        <input type="text" placeholder="商品/角色" v-model="searchParams.searchText">
                        <span @click="queryGameList(true)"></span>
                    </div>
                    <div class="least-time" v-if="currentGame!=='yxlm'">最短租赁时间：
                        <span :class="{op:true,active:queryParams.leastTime==item.val}" v-for="(item, index) in filter.ty.leastTime" :key="item.val" @click="queryParams.leastTime=item.val;queryGameList()">{{item.name}}</span>
                    </div>
                    <span class="refesh" @click="queryGameList">刷新</span>
                </div>
            </div>
            <div class="filter-item" v-else>
                <div class="label">
                    筛选
                </div>
                <div class="filter-list multiselect">
                    <span :class="{op:true,active:queryParams[item.val]}" v-for="(item, index) in filter.ty.mSpan" :key="item.val" @click="triggerQuery(item)">{{item.name}}</span>
                    <!-- 自定义筛选多选模式 end -->
                    <select v-model="queryParams.selectVal" @change="queryGameList">
                        <option span v-for="(item, index) in filter.ty.select" :key="item.val" :value="item.val">{{item.name}}</option>
                        <!-- 自定义下拉模式 end -->
                    </select>
                    <select v-model="searchParams.search" @change="queryGameList">
                        <option span v-for="(item, index) in filter.ty.search" :key="item.val" :value="item.val">{{item.name}}</option>
                        <!-- 自定义条件搜索 end -->
                    </select>
                    <div class="search-box">
                        <input type="text" placeholder="商品/角色" v-model="searchParams.searchText">
                        <span @click="queryGameList(true)"></span>
                    </div>
                    <div class="least-time">最短租赁时间：
                        <span :class="{op:true,active:queryParams.leastTime==item.val}" v-for="(item, index) in filter.ty.leastTime" :key="item.val" @click="queryParams.leastTime=item.val;queryGameList()">{{item.name}}</span>
                    </div>
                    <span class="refesh" @click="queryGameList">刷新</span>
                </div>
            </div>
        </div>
        <div class="tip">{{msg}} <span class="refesh fr" @click="copyClipTextAll">复制列表</span> <span class="refesh fr" @click="copyClipText">复制选中条目</span></div>
        <component :is="currentTable" :tableData='tableList'></component>
        <div class="page">
            <el-pagination layout="prev, pager, next" :total="pageCount" v-if="pageCount>10" :current-page.sync="pageIndex" @current-change="changePage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
const tableList = resolve => require(['../tableList/main.vue'], resolve);
const defaultTableList = resolve => require(['../tableList/default.vue'], resolve);
const cfTableList = resolve => require(['../tableList/cf.vue'], resolve);
const wzryTableList = resolve => require(['../tableList/wzry.vue'], resolve);
import Nav from '../nav/main.vue';
export default {
    name: 'shopList',
    components: {
        Cmenu: Nav
    },
    data() {
        return {
            currentGame: '',
            currentGameIndex: 0,
            gameList: [],//顶部导航数据
            msg: '',
            pageIndex: 1,
            pageCount: 1,
            gameRegion: [],//游戏服
            gameSupRegion: [],//游戏区
            cfMsg: [
                "*山东一区、北方大区、山东二区、河南二区已经合并、您可以选择以上区服的账号进行游戏",
                "*山西一区、南方大区、湖南一区、湖南二区、湖北一区、湖北二区已经合并、您可以选择以上区服的账号进行游戏",
                "*福建一区、安徽一区、上海一区、上海二区、浙江一区、浙江二区已经合并、您可以选择以上区服的账号进行游戏",
                "*吉林一区、黑龙江一区、辽宁一区、辽宁二区、辽宁三区已经合并、您可以选择以上区服的账号进行游戏",
                "*河北一区、山西一区、北京一区、北京二区、北京三区、北京四区已经合并、您可以选择以上区服的账号进行游戏",
                "*四川一区、四川二区、重庆一区、云南一区、陕西一区已经合并、您可以选择以上区服的账号进行游戏",
                "*广东一区、广东二区、广东三区、广西四区、广西一区合并、您可以选择以上区服的账号进行游戏"
            ],
            filter: {
                yxlm: {
                    mSpan: [{ name: '可排位', val: 'kpw' }, { name: '无押金', val: 'wyj' }, { name: '自有商品', val: 'zysp' }, { name: '高段位', val: 'gdw' }, { name: '多皮肤', val: 'dpf' }],
                    select: [{ name: '全部商品', val: '' }, { name: '可租赁', val: '3' }, { name: '租赁中', val: '5' }, { name: '仓库中', val: '1' }],
                    search: [{ name: '请选择', val: '' }, { name: '关键字', val: 'gjz' }, { name: '商品ID', val: 'id' }, { name: '角色名', val: 'jsm' }],
                    leastTime: [{ name: '2小时', val: 2 }, { name: '3小时', val: 3 }]
                },
                cyhx: {
                    mSpan: [{ name: '自有商品', val: 'zysp' }],
                    select: [{ name: '全部商品', val: '' }, { name: '可租赁', val: '3' }, { name: '租赁中', val: '5' }, { name: '仓库中', val: '1' }],
                    search: [{ name: '请选择', val: '' }, { name: '关键字', val: 'gjz' }, { name: '商品ID', val: 'id' }, { name: '角色名', val: 'jsm' }],
                    leastTime: [{ name: '2小时', val: 2 }, { name: '3小时', val: 3 }]
                },
                ty: {
                    mSpan: [{ name: '无押金', val: 'wyj' }, { name: '自有商品', val: 'zysp' }],
                    select: [{ name: '全部商品', val: '' }, { name: '可租赁', val: '3' }, { name: '租赁中', val: '5' }, { name: '仓库中', val: '1' }],
                    search: [{ name: '请选择', val: '' }, { name: '关键字', val: 'gjz' }, { name: '商品ID', val: 'id' }, { name: '角色名', val: 'jsm' }],
                    leastTime: [{ name: '2小时', val: 2 }, { name: '3小时', val: 3 }]
                }
            },
            queryParams: {
                gameRegion: '',//游戏服
                userId: localStorage.userId,
                gameSupRegion: '',//游戏区
                currentGame: this.$route.query.type,//游戏类别
                selectVal: '',//自定义下拉
                pageIndex: 1,//当前页
                search: '',//搜索key
                searchText: '',//搜索关键字
                leastTime: '',
            },
            searchParams: {
                search: '',//搜索key
                searchText: '',//搜索关键字
            },
            currentTable: null,
            tableList: []
        }
    },
    methods: {
        copyClipText(e) {
            const _this = this;
            let copyText = '';
            let num =0;
            _this.tableList.forEach(function(item, i) {
                if(!item.active){
                    return;
                };
                if (_this.currentGame == 'yxlm') {
                    copyText += item.ID + ' —— ' + item.GAME_NAME + ' —— ' + item.GOODS_TITLE + ' —— ' + item.ROLE_NAME + '—— ' + item.GRADING_ID + ' —— 英雄:' + item.HERO_NUM + ' —— 皮肤:' + item.CUTIS_NUM + ' —— 排位:' + item.IF_PLAY_QUALIFYING+ ' —— 时租:' + item.LEASE_PRICE + '\n';
                } else if (_this.currentGame == 'cyhx') {
                    copyText += item.ID + ' —— ' + item.GAME_NAME + ' —— ' + item.GOODS_TITLE  + ' —— 英雄武器:' + (item.HERO||'')+ ' —— 时租:' + item.LEASE_PRICE + '\n';
                } else if (_this.currentGame == 'wzry') {
                    copyText += item.ID + ' —— ' + item.GAME_NAME + ' —— ' + item.GOODS_TITLE + ' —— ' + item.ROLE_NAME+ ' —— 时租:' + item.LEASE_PRICE + '\n';
                } else {
                    copyText += item.ID + ' —— ' + item.GAME_NAME + ' —— ' + item.GOODS_TITLE +' —— 时租:' + item.LEASE_PRICE + '\n';
                }
                num++;
            });
            if(num===0){
                _this.$message.warning('请选择复制的条目！');
                return;
            }
            let clipboard = new Clipboard('.refesh', { text: function() { return copyText; } });
            clipboard.on('success', function(e) {
                _this.$message.success('复制成功！');
                setTimeout(function() { clipboard.destroy(); }, 1);
            });
            clipboard.on('error', function(e) {
                _this.$message.error('复制失败，请手动选择复制！');
            });
        },
        copyClipTextAll() {
            const _this = this;
            let copyText = '';
            _this.tableList.forEach(function(item, i) {
                if (_this.currentGame == 'yxlm') {
                    copyText += item.ID + ' —— ' + item.GAME_NAME + ' —— ' + item.GOODS_TITLE + ' —— ' + item.ROLE_NAME + '—— ' + item.GRADING_ID + ' —— 英雄:' + item.HERO_NUM + ' —— 皮肤:' + item.CUTIS_NUM + ' —— 排位:' + item.IF_PLAY_QUALIFYING+ ' —— 时租:' + item.LEASE_PRICE + '\n';
                } else if (_this.currentGame == 'cyhx') {
                    copyText += item.ID + ' —— ' + item.GAME_NAME + ' —— ' + item.GOODS_TITLE  + ' —— 英雄武器:' + (item.HERO||'')+ ' —— 时租:' + item.LEASE_PRICE + '\n';
                } else if (_this.currentGame == 'wzry') {
                    copyText += item.ID + ' —— ' + item.GAME_NAME + ' —— ' + item.GOODS_TITLE + ' —— ' + item.ROLE_NAME+ ' —— 时租:' + item.LEASE_PRICE + '\n';
                } else {
                    copyText += item.ID + ' —— ' + item.GAME_NAME + ' —— ' + item.GOODS_TITLE +' —— 时租:' + item.LEASE_PRICE + '\n';
                }
            });
            let clipboard = new Clipboard('.refesh', { text: function() { return copyText; } });
            clipboard.on('success', function(e) {
                _this.$message.success('复制成功！');
                setTimeout(function() { clipboard.destroy(); }, 1);
            });
            clipboard.on('error', function(e) {
                _this.$message.error('复制失败，请手动选择复制！');
            });
        },
        changePage(val) {
            this.queryParams.pageIndex = val;
            this.pageIndex = val;
            this.queryGameList('changePage');
        },
        setGameRegion(item) {
            this.queryParams.gameRegion = item.GAME_NAME;
            this.queryGameList();
            if (this.currentGame === 'cyhx') {
                let msg = this.cfMsg.filter(function(a) {
                    return a.indexOf(item.GAME_NAME) != -1;
                });
                this.msg = msg[0];
            }
        },
        setGameSupRegion(item) {
            this.queryParams.gameSupRegion = item.GAME_NAME;
            if (this.gameRegion && this.gameRegion.length > 0 && this.gameSupRegion.length > 0) {
                this.resetGameRegion(item);
                this.queryParams.gameRegion = '';
            }
            this.queryGameList();
        },
        resetGameRegion(item) {//重置服务器信息，针对于穿越火线特例
            const _this = this;
            const beseUrl = this.$store.state.config.testUrl;
            const params = {
                parentId: item.ID,
                gameId: _this.gameList[_this.currentGameIndex].ids
            };
            _this.$http(
                {
                    url: beseUrl + 'goods/findChdByGameParent',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    const result = res.body.result;
                    _this.gameRegion = result;
                    _this.gameRegion.unshift({ ID: '', GAME_NAME: '全部' });

                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.$message.error(res.body.message);
                }
            });
        },
        link(item, index) {
            this.$router.push({ name: 'shoplist', query: { type: item.name_en, index: index } });
        },
        reset() {
            switch (this.currentGame) {
                case 'yxlm':
                    this.currentTable = tableList;
                    break;
                case 'cyhx':
                    this.currentTable = cfTableList;
                    break;
                case 'wzry':
                    this.currentTable = wzryTableList;
                    break;
                default:
                    this.currentTable = defaultTableList;

            };
            this.queryGameRegion();
            this.msg = '';
            this.queryParams = {
                gameRegion: [],//游戏服
                gameSupRegion: [],//游戏区
                userId: localStorage.userId,
                currentGame: this.currentGame,//游戏类别
                selectVal: '',//自定义下拉
                pageIndex: 1,//当前页
                search: '',//搜索key
                searchText: '',//搜索关键字
                leastTime: '',
            };
            this.searchParams = {
                search: '',//搜索key
                searchText: '',//搜索关键字
            };//重置查询条件
            this.queryGameList();
        },//更换类别，重置状态
        triggerQuery(item) {
            const queryKey = item.val;
            if (this.queryParams[queryKey]) {
                this.$delete(this.queryParams, queryKey);
            } else {
                this.$set(this.queryParams, queryKey, 1);
            };
            this.queryGameList();
        },//设置自定义多选
        queryGameRegion() {
            const _this = this;
            const beseUrl = this.$store.state.config.testUrl;
            const params = {
                gameId: _this.gameList[_this.currentGameIndex].ids || this.gameList[_this.currentGameIndex].id
            };
            _this.$http(
                {
                    url: beseUrl + 'goods/findChdByGameId',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    _this.gameRegion = res.body.result.server;
                    _this.gameSupRegion = res.body.result.area;//GAME_NAME
                    if (_this.gameRegion && _this.gameRegion.length > 0) {
                        _this.gameRegion.unshift({ ID: '', GAME_NAME: '全部' });
                    };
                    if (_this.gameSupRegion && _this.gameSupRegion.length > 0) {
                        console.log(_this.gameSupRegion)
                        _this.gameSupRegion.unshift({ ID: '', GAME_NAME: '全部' });
                    };
                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.$message.error(res.body.message);
                }
            });
        },//查询游戏区
        queryGameList(hasSearch) {
            const _this = this;
            const beseUrl = _this.$store.state.config.testUrl;
            if (hasSearch === true && _this.searchParams.search != "") {
                _this.queryParams.search = _this.searchParams.search;
                _this.queryParams.searchText = _this.searchParams.searchText;
            } else {
                _this.queryParams.search = '';
            };
            const params = _this.queryParams;
            params.currentGame = _this.gameList[_this.currentGameIndex].game_name;
            _this.$http(
                {
                    url: beseUrl + 'goods/user/findGoodsList',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                console.log(res.body);
                if (res.body.code === '1') {
                    _this.tableList = res.body.result.goodses;
                    _this.pageCount = parseInt(res.body.result.pageCount);
                    if (hasSearch !== "changePage") {
                        _this.pageIndex = parseInt(res.body.result.pageIndex);
                    };
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
        const _this = this;
        const beseUrl = this.$store.state.config.testUrl;
        const params = {
            userId: localStorage.userId,
            isShow: 1
        };
        _this.$http(
            {
                url: beseUrl + 'goods/user/findGameByUserId',
                method: 'jsonp',
                params: params,
                data: params
            }
        ).then(function(res) {
            if (res.body.code === '1') {
                var currentResult;
                _this.gameList = res.body.result;
                if (this.$route.query.type) {
                    currentResult = res.body.result[this.$route.query.index];
                    _this.currentGameIndex = this.$route.query.index;
                } else {
                    currentResult = res.body.result[0];
                }
                _this.currentGame = currentResult.name_en;
            } else if (res.body.code === '3') {
                _this.$goLogin();
                return;
            } else {
                _this.$message.error(res.body.message);
            }
        });
    },
    watch: {
        $route() {
            this.currentGameIndex = this.$route.query.index;
            this.currentGame = this.$route.query.type;
        },
        currentGame(val) {
            this.reset();
        }
    }

}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

