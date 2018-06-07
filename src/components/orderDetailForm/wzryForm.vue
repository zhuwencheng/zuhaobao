<template>
    <div class="form" v-if="detailData.detail!=undefined">
        <div class="form-item">
            <label class="l-label">标题</label>
            <el-input v-model="detailData.detail.GOODS_TITLE"  placeholder="请输入内容" class="d-input f-input" :disabled="notMe"></el-input>
        </div>
        <div class="form-item">
            <label class="l-label">角色名</label>
            <el-input v-model="detailData.detail.ROLE_NAME" class="d-input" :disabled="notMe"></el-input>
            <label class="l-label">游戏区</label>
            <el-select v-model="detailData.detail.GAME_ID"  @change="changeSelect('GAME_NAME','a')" ref="a" placeholder="请选择" class="d-select" :disabled="notMe">
                <el-option v-for="item in detailData.area" :key="item.ID" :label="item.GAME_NAME" :value="item.ID"></el-option>
            </el-select>
            <label class="l-label">等级</label>
            <el-input v-model="detailData.detail.GRADE_ID" placeholder="请输入内容" class="d-input" :disabled="notMe"></el-input>
            
        </div>
        <div class="form-item">
            <label class="l-label">点券</label>
            <el-input v-model="detailData.detail.COUPON" placeholder="" class="d-input" :disabled="notMe"></el-input>
            <label class="l-label">金币</label>
            <el-input v-model="detailData.detail.GOLD_COINS" placeholder="" class="d-input" :disabled="notMe"></el-input>
        </div>
        <div class="form-item">
            <label class="l-label">时租</label>
            <el-input v-model="detailData.detail.HOUR_LEASE" placeholder="请输入内容" class="d-input t-input" :disabled="notMe"></el-input>
            <span class="unit">元/小时</span>
            <label class="l-label" style="width:64px;">押金</label>
            <el-input v-model="detailData.detail.FOREGIFT" placeholder="请输入内容" class="d-input t-input" :disabled="notMe"></el-input>
            <span class="unit">元</span>
            <label class="l-label" style="margin-left:25px">最短时间</label>
            <el-input v-model="detailData.detail.SHORT_LEASE" placeholder="请输入内容" class="d-input t-input" :disabled="notMe"></el-input>
            <span class="unit">小时</span>
        </div>
        
        <div class="form-item">
            <label class="l-label">描述</label>
            <el-input type="textarea" class="d-area" :autosize="{ minRows: 5, maxRows: 5}" placeholder="请输入内容" v-model="detailData.detail.REMARK" :disabled="notMe"></el-input>
        </div>
        <div class="form-item" v-if="this.detailData.detail.isMe!=='1'">
            <label class="l-label">帐号</label>
            <el-input v-model="detailData.detail.GAME_ACCOUNT" placeholder="请输入内容" class="d-input" :disabled="notMe"></el-input>
            <label class="l-label">密码</label>
            <el-input v-model="detailData.detail.GAME_PWD" placeholder="请输入内容" class="d-input" :disabled="notMe"></el-input>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wzryForm',
    data() {
        //console.log(this.detailData)
        return {
            detailData: this.detailData,
            notMe: false,
            selectOptions01: [
                { label: '准许使用', value: 0 },
                { label: '禁止使用', value: 1 },
            ],
            selectOptions02: [
                { label: '准许使用', value: 0 },
                { label: '禁止使用', value: 1 },
            ]
        }
    },
    props: ['detailData'],
    methods: {
        changeSelect(a, b) {
            const _this = this;
            window.setTimeout(function() {
                const label = _this.$refs[b].$children[0].value;
                _this.detailData.detail[a]=label;
            },10);
        }
    },
    mounted() {
        this.detailData.detail.isMe === '1' || this.detailData.detail.GOODS_FLAG===1 ? this.notMe = true : this.notMe = false;
    }
}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

