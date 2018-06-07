import Vuex from 'vuex';
import Vue from 'vue'
import Config from '../config';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    userInfo: null,
    isLoading:false,
    isLoseNet:false,
    config:Config,
    appUrl:null,
    noticeDetailData:null,
    enterUrl:null
  },
  mutations: {
    setUserInfo (state,n) {
      state.userInfo=n;
    },
    refeshIsLoseNet(state,status){
        state.isLoseNet=status;
    },
    refeshIsLoading(state,status){
        state.isLoading=status;
    },
    setNotice(state,data){
      state.noticeDetailData=data;
    },
    setEnterUrl(state,url){
      state.enterUrl=url;
    }
  }
});