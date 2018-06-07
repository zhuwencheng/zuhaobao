<template>
    <div class="config">
        <h3>选择业务范围</h3>
        <div class="game-item" v-for="(item, index) in gameList" :key="item.id">
            <div class="l-game-logo">
                <img :src="require('../../images/'+item.name_en+'.png')||''" /> {{item.game_name}}
            </div>
            <div class="r-game-tool">
                <span :class="{btn:true,disabled:!item.isEnable}" @click="setEnable(item,1)">开启</span>
                <span :class="{btn:true,disabled:item.isEnable}" @click="setEnable(item,0)">关闭</span>
                <span class="fr to-top" @click="toTop(index,item)">置顶</span>
                <em class="fr to next" @click="to(index,item,1)"></em>
                <em class="fr to pre" @click="to(index,item,-1)"></em>
            </div>
        </div>
        <span class="next-step" @click="toNext">下一步</span>
    </div>
</template>

<script>
export default {
    name: 'config',
    data() {
        return {
            gameList: []
        }
    },
    methods: {
        toTop(index, item) {
            this.gameList.splice(index, 1);
            this.gameList.unshift(item);
        },
        to(index, item, a) {
            if ((index === 0 && a === -1) || (index === this.gameList.length - 1 && a === 1)) {
                return;
            };
            this.gameList.splice(index, 1);
            this.gameList.splice(index + a, 0, item);
        },
        toNext() {
            const _this = this;
            const beseUrl = this.$store.state.config.testUrl;
            _this.gameList.map(function(item, i) {
                item.sort = i + 1;
            });
            const queryParams = _this.gameList;
            this.$http.post(beseUrl + 'goods/updateGameByUserId', queryParams).then(function(res) {
                if (res.body.code === '1') {
                    _this.$router.push({ name: 'shoplist' });
                } else if (res.body.code === '3') {
                    _this.$goLogin();
                    return;
                } else {
                    this.$message.error(res.body.message);
                }
            });
        },
        setEnable(item,status){
            if(status===0){
                const filterList=this.gameList.filter(function(a){
                    return a.isEnable==1;
                });
                if(filterList.length<2){
                    this.$message.warning('不能全部关闭！');
                    return;
                }
            };
            item.isEnable=status;
        }

    },
    created() {
        const _this = this;
        const beseUrl = this.$store.state.config.testUrl;
        const params = {
            userId: localStorage.userId
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
                this.gameList = res.body.result;
            } else if (res.body.code === '3') {
                _this.$goLogin();
                return;
            } else {
                this.$message.error(res.body.message);
            }
        });
    }
}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

