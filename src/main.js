import Vue from 'vue';
import vueResource from 'vue-resource';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import Wrapper from './components/wrapper.vue';
import router from './router/router-new';
import store from './store/store';
import Vuex from 'vuex';


Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(Router);
router.beforeEach((to, from, next) => {
    next();
})
const goLogin = function () {
    const _this = this;
    _this.$message.error('登录已失效，请重新登录！');
    window.setTimeout(function () {
        _this.$router.push({ name: 'login' });
    }, 1000);
}
Vue.prototype.$goLogin = goLogin;
Vue.filter('money',function(value){
    if (!value) return '0.00';
    return Number.prototype.toFixed.call(value,2);
});//过滤器
Vue.use(vueResource);
var app7 = new Vue({
    el: '#app',
    store,
    watch: {
        '$route'(to, from, next) {

            //this.$indicator.open('Loading...');
            //console.log(to,from);
        }
    },
    components: {
        wrapper: Wrapper
    },
    router
});