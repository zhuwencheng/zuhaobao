<template>
    <div class="form" v-if="detailData.detail!=undefined">
        <div class="form-item">
            <label class="l-label">标题</label>
            <el-input v-model="detailData.detail.GOODS_TITLE" class="d-input f-input" :disabled="notMe"></el-input>
        </div>
        <div class="form-item">
            <label class="l-label">角色名</label>
            <el-input v-model="detailData.detail.ROLE_NAME" class="d-input" :disabled="notMe"></el-input>
            <label class="l-label">游戏区</label>
            <el-select v-model="detailData.detail.GAME_ID" @change="changeSelect('GAME_NAME','a')" ref="a" placeholder="请选择" class="d-select" :disabled="notMe">
                <el-option v-for="item in detailData.area" :key="item.ID" :label="item.GAME_NAME" :value="item.ID"></el-option>
            </el-select>
            <label class="l-label">英雄</label>
            <el-input v-model="detailData.detail.HERO_NUM" class="d-input" :disabled="notMe"></el-input>
        </div>
        <div class="form-item">
            <label class="l-label">单双排</label>
            <el-select v-model="detailData.detail.GRADING_ID" placeholder="请选择" class="d-select" :disabled="notMe">
                <el-option v-for="item in detailData.duanwei" :key="item.grading_id" :label="item.grading_name" :value="item.grading_id"></el-option>
            </el-select>
            <label class="l-label">灵活组排</label>
            <el-select v-model="detailData.detail.linghuozupai_id" placeholder="请选择" class="d-select" :disabled="notMe">
                <el-option v-for="item in detailData.duanwei" :key="item.grading_id" :label="item.grading_name" :value="item.id"></el-option>
            </el-select>
            <label class="l-label">段位框</label>
            <el-select v-model="detailData.detail.GRADING_FRAME_ID" placeholder="请选择" class="d-select" :disabled="notMe">
                <el-option v-for="item in detailData.duanwei" :key="item.grading_id" :label="item.grading_name" :value="item.id"></el-option>
            </el-select>
        </div>
        <div class="form-item">
            <label class="l-label">皮肤</label>
            <el-input v-model="detailData.detail.CUTIS_NUM" class="d-input" :disabled="notMe"></el-input>
            <label class="l-label">支持排位</label>
            <el-select v-model="detailData.detail.IF_PLAY_QUALIFYING" placeholder="请选择" class="d-select" :disabled="notMe">
                <el-option v-for="item in qualifyingOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="form-item">
            <label class="l-label">时租</label>
            <el-input v-model="detailData.detail.HOUR_LEASE" class="d-input t-input" :disabled="notMe"></el-input>
            <span class="unit">元/小时</span>
            <label class="l-label" style="width:64px;">押金</label>
            <el-input v-model="detailData.detail.FOREGIFT" class="d-input t-input" :disabled="notMe"></el-input>
            <span class="unit">元</span>
            <label class="l-label" style="margin-left:25px">最短时间</label>
            <el-input v-model="detailData.detail.SHORT_LEASE" class="d-input t-input" :disabled="notMe"></el-input>
            <span class="unit">小时</span>
        </div>
        <div class="form-item">
            <label class="l-label">描述</label>
            <el-input type="textarea" class="d-area" :autosize="{ minRows: 5, maxRows: 5}" v-model="detailData.detail.REMARK" :disabled="notMe"></el-input>
        </div>
        <div class="form-item" v-if="this.detailData.detail.isMe!=='1'">
            <label class="l-label">帐号</label>
            <el-input v-model="detailData.detail.GAME_ACCOUNT" class="d-input" :disabled="notMe"></el-input>
            <label class="l-label">密码</label>
            <el-input v-model="detailData.detail.GAME_PWD" class="d-input" :disabled="notMe"></el-input>
        </div>
    </div>
</template>

<script>
export default {
    name: 'lolForm',
    data() {
        //console.log(this.detailData)
        return {
            detailData: this.detailData,
            notMe: false,
            qualifyingOptions: [
                { label: '支持', value: 0 },
                { label: '禁止', value: 1 },
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

