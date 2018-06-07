<template>
    <div class="login">
        <div class="login-box">
            <h3>登录</h3>
            <div class="msg">{{error}}</div>
            <div :class="{ error: !usernameStatus , 'form-item':true}">
                <i class="u-icon l-icon"></i>
                <input type="number" placeholder="手机号（必填）" v-model.trim="username" maxlength="11" />
            </div>
            <div :class="{ error: !passwordStatus , 'form-item':true}">
                <i class="p-icon l-icon"></i>
                <i :class="{eye:true,isShow:isShowPsd}" @click="isShowPsd=!isShowPsd"></i>
                <input placeholder="密码" :type="isShowPsd?'text':'password'" @input="setPwd" maxlength="21" ref="password" autocomplete="new-password"/>
            </div>
            <div>
                <el-checkbox v-model="savePwd">记住密码</el-checkbox>
            </div>
            <span class="login-btn" @click="login">立即登录</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            error: '*为了您的账户安全，请勿将密码告诉他人',
            username: '',
            password: '',
            usernameStatus: true,
            passwordStatus: true,
            isShowPsd: false,
            savePwd: false
        }
    },
    methods: {
        tip() {
            this.$messagebox.alert('提示', 'sdf');
        },
        setPwd(e) {
            this.password = e.target.value;
        },
        login() {
            const _this = this;
            _this.sPwd();
            if (_this.username == '' || _this.username.length !== 11) {
                _this.error = '请输入正确的手机号！';
                _this.usernameStatus = false;
                return;
            } else {
                _this.usernameStatus = true;
            }
            if (_this.password == '') {
                _this.error = '请输入正确的密码！';
                _this.passwordStatus = false;
                return;
            } else {
                _this.passwordStatus = true;
            }
            const beseUrl = this.$store.state.config.testUrl;
            const params = {
                userName: _this.username,
                pwd: _this.password
            };
            this.$http(
                {
                    url: beseUrl + 'businessUser/toLogin',
                    method: 'jsonp',
                    params: params
                }
            ).then(function(res) {
                if (res.body.code === "1") {
                    let url = 'config';
                    localStorage.userId = res.body.result.userId;
                    this.$message({
                        message: '登录成功！',
                        type: 'success',
                        duration: 1000
                    });
                    if (res.body.result.isSet === 1) {
                        url = 'shoplist';
                    };
                    window.setTimeout(function() {
                        _this.$router.push({ name: url });
                    }, 1000);
                } else {
                    _this.error = res.body.message;
                }
            }, function(res) {
                _this.error = res.body.message;
            });
        },
        sPwd() {
            if (this.savePwd) {
                localStorage.pwdStatus = true;
                localStorage.pwd = this.password;
                localStorage.username = this.username;
            } else {
                localStorage.pwd = '';
                localStorage.username= '';
                localStorage.pwdStatus = false;
            }
        }
    },
    mounted() {
        const _this = this;
        _this.$refs.password.value=localStorage.pwd||'';
        _this.password=localStorage.pwd;
        this.username=localStorage.username;
        localStorage.pwdStatus === "true" ? _this.savePwd = true : _this.savePwd = false;
    }

}
</script>


<style lang="less" scoped>
@import 'main.less';
</style>

