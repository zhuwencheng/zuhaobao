<template>
    <div class="orderDetail">
        <component :is="currentForm" :detail-data="detailData" v-if="detailData.detail"></component>
        <div class="tran-detail" v-if="detailData.detail&&detailData.order">
            <ul>
                <li>开始时间：
                    <span class="blue">{{detailData.order.BEGIN_TIME}}</span>
                </li>
                <li>结束时间：
                    <span class="blue">{{detailData.order.END_TIME}}</span>
                </li>
                <li>租赁时间：
                    <span class="blue">{{detailData.order.CREATE_TIME}}</span>
                </li>
                <li>定单金额：
                    <span class="red">{{detailData.order.ORDER_ITEM_PRICE | money}}</span>元</li>
                <li v-if="gameName==='王者荣耀'">剩余时间：
                    <em v-html="timeText" class="cout-time"></em>
                </li>
            </ul>
            <div class="r-detail" v-if="gameName!=='王者荣耀'">
                <p>用户名：{{detailData.order.RENT_PEOPLE}}</p>
                <p>登录密码：{{detailData.order.ORDER_NO}}</p>
                <p>剩余时间：
                    <em v-html="timeText" class="cout-time"></em>
                </p>
            </div>
            <div class="r-code" v-if="gameName==='王者荣耀'">
                <canvas id="canvas" class="img"></canvas>
                <p v-if="tipMsg">{{tipMsg}}</p>
            </div>
        </div>
        <div class="btn-wrapper" v-if="detailData.detail">
            <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="edit" :disabled="notMe">保存修改</el-button>
            <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="unDownShop('down')" :disabled="notMe||detailData.detail.GOODS_STATUS===4" v-if="detailData.detail.GOODS_STATUS!==1">下架</el-button>
            <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="unDownShop('up')" :disabled="notMe" v-if="detailData.detail.GOODS_STATUS===1">上架</el-button>
            <el-button type="primary" :disabled="notMe" @click="deleteOrder" v-loading.fullscreen.lock="fullscreenLoading">删除商品</el-button>
            <el-button type="primary" style="margin-left:103px;" @click="dialogStatusAddTime=true" v-if="detailData.detail.GOODS_STATUS===4&&detailData.detail.GOODS_FLAG!==1">加时续租</el-button>
            <el-button type="primary" @click="stopOrder" v-if="detailData.detail.GOODS_STATUS===4&&detailData.detail.GOODS_FLAG!==1">终止订单</el-button>
            <el-button type="primary" @click="dialogStatusTran=true" v-if="detailData.detail.GOODS_STATUS===3&&detailData.detail.GOODS_FLAG!==1&&orderNo===''" style="margin-left:365px;">转租</el-button>
            <el-button type="primary" @click="copyClipText" v-if="detailData.order" class="copy">复制登录信息</el-button>
        </div>
        <!-- 转租弹窗start -->
        <el-dialog title="" :visible.sync="dialogStatusTran" size="small" class="e-dialog" v-if="detailData.detail&&detailData.detail.GOODS_STATUS===3">
            <div class="tran-dialog">
                <p>
                    <label>时租价：</label>{{detailData.detail.HOUR_LEASE}}元/小时</p>
                <p>
                    <label>租赁时间：</label>
                    <el-input-number v-model="tranTime" :min="detailData.detail.SHORT_LEASE||1" :step=1 size="small"></el-input-number>
                </p>
                <p class="choose-time">
                    <span @click="tranTime=6">6小时</span>
                    <span @click="tranTime=8">8小时</span>
                    <span @click="tranTime=10">10小时</span>
                    <span @click="tranTime=20">20小时</span>
                </p>
                <p>
                    <label>金额：</label>{{tranPrice | money }}元</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tranOrder" v-loading.fullscreen.lock="fullscreenLoading">确认转租</el-button>
            </span>
        </el-dialog>
        <!-- 转租弹窗end -->
        <!-- 加时间续租start -->
        <el-dialog title="" :visible.sync="dialogStatusAddTime" size="small" class="e-dialog" v-if="detailData.detail&&detailData.detail.GOODS_STATUS===4">
            <div class="tran-dialog">
                <p>
                    <label>时租价：</label>{{detailData.detail.HOUR_LEASE}}元/小时</p>
                <p>
                    <label>租赁时间：</label>
                    <el-input-number v-model="tranTime" :min="1" :step=1 size="small"></el-input-number>
                </p>
                <p class="choose-time">
                    <span @click="tranTime=6">6小时</span>
                    <span @click="tranTime=8">8小时</span>
                    <span @click="tranTime=10">10小时</span>
                    <span @click="tranTime=20">20小时</span>
                </p>
                <p>
                    <label>金额：</label>{{tranPrice | money}}元</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="orderAdd" v-loading.fullscreen.lock="fullscreenLoading">确认续租</el-button>
            </span>
        </el-dialog>
        <!-- 加时间续租end -->
        <!-- 取消定单提示框start -->
        <el-dialog title="" :visible.sync="dialogResult" size="small" class="e-dialog" v-if="detailData.detail">
            <div class="tran-dialog">
                <p>
                    请填写维权理由：</p>
                <p>
                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="adultText">
                    </el-input>
                </p>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="adult" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
            </span>
        </el-dialog>
        <!-- 取消定单提示框end -->
        <!-- 终止定单提示框start -->
        <el-dialog title="" :visible.sync="dialogEndOrder" size="small" class="e-dialog" v-if="detailData.detail">
            <div class="tran-dialog">
                <p>确认终止定单?</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="queryStopOrder(1)" v-loading.fullscreen.lock="fullscreenLoading">{{cancelText}}</el-button>
                <el-button type="primary" @click="queryStopOrder(0)" v-loading.fullscreen.lock="fullscreenLoading">订单完成</el-button>
            </span>
        </el-dialog>
        <!-- 终止定单提示框end -->

    </div>
</template>

<script>
import Clipboard from 'clipboard';
import QRCode from 'qrcode';
const lolForm = resolve => require(['../orderDetailForm/lolForm.vue'], resolve);
const cfForm = resolve => require(['../orderDetailForm/cfForm.vue'], resolve);
const wzryForm = resolve => require(['../orderDetailForm/wzryForm.vue'], resolve);
const defaultForm = resolve => require(['../orderDetailForm/defaultForm.vue'], resolve);
export default {
    name: 'orderdetail',
    data() {
        return {
            gameName: this.$route.query.gameName,
            orderId: this.$route.query.id,
            orderNo: this.$route.query.orderNo||'',
            currentForm: lolForm,
            notMe: false,
            fullscreenLoading: false,
            timeText: '',
            //--------------------
            detailData: {},
            //--------------------
            dialogStatusTran: false,
            dialogStatusAddTime: false,
            dialogResult: false,
            dialogEndOrder: false,
            timer: null,
            tranTime: 0,
            tranPrice: 0,
            tipMsg: '该账号为安卓区账号，请先安装安卓专用上号器，使用专用上号器扫描左侧二维码登录游戏。',
            adultText: '',//维权信息,
            cancelText: ''
        }
    },
    methods: {
        countdowm(timestamp) {
            let _this = this;
            _this.timer = setInterval(function() {
                let nowTime = new Date();
                let endTime = new Date(timestamp);
                let t = endTime.getTime() - nowTime.getTime();
                if (t > 0) {
                    let day = Math.floor(t / 86400000);
                    let hour = Math.floor((t / 3600000) % 24);
                    let min = Math.floor((t / 60000) % 60);
                    let sec = Math.floor((t / 1000) % 60);
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    let format = '';
                    if (day > 0) {
                        format = `<span style="color:#f00">${day}</span>天<span>${hour}</span>小时<span style="color:#f00">${min}</span>分<span style="color:#f00">${sec}</span>秒`;
                    }
                    if (day <= 0 && hour > 0) {
                        format = `<span style="color:#f00">${hour}</span>小时<span style="color:#f00">${min}</span>分<span style="color:#f00">${sec}</span>秒`;
                    }
                    if (day <= 0 && hour <= 0) {
                        format = `<span style="color:#f00">${min}</span>分<span style="color:#f00">${sec}</span>秒`;
                    }
                    _this.timeText = format;
                } else {
                    clearInterval(_this.timer);
                }
            }, 1000);
        },
        copyClipText(e) {
            const _this = this;
            const copyText = '租赁时段：' + _this.detailData.order.BEGIN_TIME + '~' + _this.detailData.order.END_TIME + '\n'
                + '登录码：' + _this.detailData.order.ORDER_NO + '\n'
                + '区服：' + _this.detailData.detail.GAME_ALL_NAME + '\n'
                + '上号器安装后，请在专用上号器器相应的位置输入登陆码，点击”普通登录“即可开始游戏，租号开挂会被检测，请勿尝试开挂！';
            let clipboard = new Clipboard('.copy', { text: function() { return copyText; } });
            clipboard.on('success', function(e) {
                _this.$message.success('复制成功！');
                setTimeout(function() { clipboard.destroy(); }, 1);
            });
            clipboard.on('error', function(e) {
                _this.$message.error('复制失败，请手动选择复制！');
            });
        },
        resetForm() {//设置表单
            switch (this.gameName) {
                case '英雄联盟':
                    this.currentForm = lolForm;
                    break;
                case '穿越火线':
                    this.currentForm = cfForm;
                    break;
                case '王者荣耀':
                    this.currentForm = wzryForm;
                    break;
                default:
                    this.currentForm = defaultForm;


            }
        },
        queryDetail() {//查询详情
            const _this = this;
            const beseUrl = _this.$store.state.config.testUrl;
            const params = {
                goodsId: _this.orderId,
                userId: localStorage.userId,
                orderNo:_this.orderNo
            };
            _this.$http(
                {
                    url: beseUrl + 'goods/user/goodsDetail',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    _this.detailData = res.body.result;
                    console.log(res.body.result);
                    _this.reset();
                    if (_this.detailData.order && _this.gameName === "王者荣耀") {
                        _this.setCode();
                    };

                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.$message.error(res.body.message);
                }
            });
        },
        reset() {
            this.tranTime = 0;
            this.tranPrice = 0;
            clearInterval(this.timer);
        },
        tranOrder() {//转租
            const _this = this;
            _this.fullscreenLoading = true;
            const beseUrl = _this.$store.state.config.testUrl;
            const params = {
                gameId: _this.orderId,
                userId: localStorage.userId,
                count: _this.tranTime
            };
            _this.$http(
                {
                    url: beseUrl + 'order/user/createOrder',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    _this.$message.success('转租成功！');
                    _this.dialogStatusTran = false;
                    _this.fullscreenLoading = false;
                    _this.queryDetail();

                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.fullscreenLoading = false;
                    _this.$message.error(res.body.message);
                }
            });
        },
        orderAdd() {//加时间续租
            const _this = this;
            _this.fullscreenLoading = true;
            const beseUrl = _this.$store.state.config.testUrl;
            const params = {
                orderId: _this.detailData.order.ORDER_NO,
                userId: localStorage.userId,
                count: _this.tranTime
            };
            _this.$http(
                {
                    url: beseUrl + 'order/user/updateByOrderItemTime',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    _this.$message.success('加时成功！');
                    _this.dialogStatusAddTime = false;
                    _this.fullscreenLoading = false;
                    _this.queryDetail();

                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.fullscreenLoading = false;
                    _this.$message.error(res.body.message);
                }
            });
        },
        adult() {//维权接口
            const _this = this;
            _this.fullscreenLoading = true;
            const beseUrl = _this.$store.state.config.testUrl;
            const params = {
                orderId: _this.detailData.order.ORDER_ID,//_this.detailData.order.ORDER_NO,
                rightReason: 0,
                rightsProtection: _this.adultText
            };
            _this.$http(
                {
                    url: beseUrl + 'arbitration/leaseeSubArbitration',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    _this.$message.success('维权成功！');
                    _this.dialogResult = false;
                    _this.fullscreenLoading = false;
                    _this.queryDetail();

                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.fullscreenLoading = false;
                    _this.$message.error(res.body.message);
                }
            });
        },
        setCode() {
            const _this = this;
            if (_this.detailData.detail.GAME_ALL_NAME && _this.detailData.detail.GAME_ALL_NAME.indexOf('苹果') !== -1) {
                _this.tipMsg = '该账号为苹果QQ区账号，请使用微信扫码后使用safari打开';
            }
            const text = "http://h5.xubei.com/slogin?buyname=" + _this.detailData.detail.userName + '&order_no=' + _this.detailData.order.ORDER_NO;
            window.setTimeout(function() {
                QRCode.toCanvas(canvas, text, function() { });
            }, 100);
        },
        queryStopOrder(type) {//终止订单
            const _this = this;
            _this.dialogEndOrder = false;
            if (type === 1 && _this.detailData.detail.isMe === "1") {
                _this.dialogResult = true;
                return;
            }
            _this.fullscreenLoading = true;
            const beseUrl = _this.$store.state.config.testUrl;
            const params = {
                orderId: _this.detailData.order.ORDER_NO,
                userId: localStorage.userId,
                type: type
            };
            _this.$http(
                {
                    url: beseUrl + 'order/user/overOrder',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    console.log(res.body);
                    _this.$message.success('操作成功！');
                    _this.dialogStatusAddTime = false;
                    _this.fullscreenLoading = false;
                    _this.queryDetail();

                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.fullscreenLoading = false;
                    _this.$message.error(res.body.message);
                }
            });
        },
        deleteOrder() {//删除商品
            const _this = this;
            _this.fullscreenLoading = true;
            const beseUrl = _this.$store.state.config.testUrl;
            const params = {
                goodsId: _this.orderId,
                userId: localStorage.userId,
            };
            _this.$http(
                {
                    url: beseUrl + 'goods/user/deleteGoods',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    console.log(res.body);
                    _this.$message.success('删除成功！');
                    _this.fullscreenLoading = false;
                    _this.queryDetail();

                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.fullscreenLoading = false;
                    _this.$message.error(res.body.message);
                }
            });
        },
        edit() {//下架商品
            const _this = this;
            _this.fullscreenLoading = true;
            const beseUrl = _this.$store.state.config.testUrl;
            let params = JSON.parse(JSON.stringify(_this.detailData.detail));
            params.userId = localStorage.userId;
            params.goodsId = _this.orderId;
            _this.$http(
                {
                    url: beseUrl + 'goods/user/updateGoods',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    console.log(res.body);
                    _this.$message.success('修改成功！');
                    _this.fullscreenLoading = false;
                    _this.queryDetail();

                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.fullscreenLoading = false;
                    _this.$message.error(res.body.message);
                }
            });
        },
        unDownShop(type) {//下架商品
            const _this = this;
            _this.fullscreenLoading = true;
            const beseUrl = _this.$store.state.config.testUrl;
            const params = {
                goodsId: _this.orderId,
                userId: localStorage.userId,
                status: type
            };
            _this.$http(
                {
                    url: beseUrl + 'goods/user/updownGoods',
                    method: 'jsonp',
                    params: params,
                    data: params
                }
            ).then(function(res) {
                if (res.body.code === '1') {
                    console.log(res.body);
                    _this.$message.success('操作成功！');
                    _this.fullscreenLoading = false;
                    _this.queryDetail();

                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    _this.fullscreenLoading = false;
                    _this.$message.error(res.body.message);
                }
            });
        },
        stopOrder() {
            const _this = this;
            _this.dialogEndOrder = true;
            _this.detailData.detail.isMe === '1' ? _this.cancelText = '维权订单' : _this.cancelText = '取消订单';
        }
    },
    created() {
        this.resetForm();
        this.queryDetail();
    },
    watch: {
        detailData() {
            this.detailData.detail.isMe === '1' || this.detailData.detail.GOODS_FLAG === 1 ? this.notMe = true : this.notMe = false;
            if (this.detailData.order && this.detailData.order.END_DATE) {
                this.countdowm(this.detailData.order.END_DATE);
            }
        },
        tranTime() {
            this.tranPrice = this.tranTime * this.detailData.detail.HOUR_LEASE;
        }
    }
}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

