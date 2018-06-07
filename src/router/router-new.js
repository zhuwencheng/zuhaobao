import Vue from 'vue'
import Router from 'vue-router'
export default new Router({
    routes: [
        { path: '/', redirect: { name: 'login' } },
        //------------------
        { path: '/login', name: 'login', component: resolve => require(['components/login/main.vue'], resolve) },//登录页
        { path: '/config', name: 'config', component: resolve => require(['components/config/main.vue'], resolve) },//配置页面
        { path: '/shoplist', name: 'shoplist', component: resolve => require(['components/shopList/main.vue'], resolve) },//商品列表页
        { path: '/order', name: 'order', component: resolve => require(['components/order/main.vue'], resolve) },//商品列表页
        { path: '/statistic', name: 'order', component: resolve => require(['components/statistic/main.vue'], resolve) },//商品列表页
        { path: '/orderdetail', name: 'orderdetail', component: resolve => require(['components/orderdetail/main.vue'], resolve) },//商品列表页
    ]
});
