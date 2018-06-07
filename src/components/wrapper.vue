<template>
    <router-view></router-view>
</template>

<script>
import Vue from 'vue';
export default Vue.component('wrapper', {
    name: 'wrapper',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    // components: {
    //     Loading,
    //     loseNet
    // },
})
</script>

        <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../css/reset.less';
</style>
