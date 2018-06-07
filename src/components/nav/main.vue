<template>
    <div class="sys-menu">
        <router-link to="/shoplist" class="sp" active-class="active">商品</router-link>
        <router-link to="/order" class="dd" active-class="active">订单</router-link>
        <router-link to="/statistic" class="tj" active-class="active">统计</router-link>
        <router-link to="/config" class="sz" active-class="active">设置</router-link>
    </div>
</template>

<script>
export default {
    name: 'nav',
}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

