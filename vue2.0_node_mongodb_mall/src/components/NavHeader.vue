<template>
    <header class="header">
        <svgIcon></svgIcon>
        <div class="navbar">
            <div class="navbar-left-container">
                <a href="/">
                    <img class="navbar-brand-logo" src="/static/logo1.png">
                </a>
                <span class="navbar-brand-logo-title">Mall</span>
            </div>
            <div class="navbar-right-container" style="display: flex;">
                <div class="navbar-menu-container">
                    <span v-text="nickName"></span>
                    <!--<a href="/" class="navbar-link">我的账户</a>-->
                    <span class="navbar-link"></span>
                    <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true" v-if="loginBtnFlag">Login</a>
                    <a href="javascript:void(0)" class="navbar-link" v-if="logoutBtnFlag" @click="logout">Logout</a>
                    <div class="navbar-cart-container">
                        <span class="navbar-cart-count"></span>
                        <a class="navbar-link navbar-cart-link" href="/#/cart">
                            <svg class="icon-cart">
                                <use xlink:href="#icon-cart"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">Login in</div>
                    <button class="md-close" @click="loginModalFlag = false">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <div class="error-wrap">
                            <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
                        </div>
                        <ul>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input type="text" tabindex="1" name="loginname"
                                       class="regi_login_input regi_login_input_left" placeholder="User Name"
                                       data-type="loginname" v-model="userName">
                            </li>
                            <li class="regi_form_input noMargin">
                                <i class="icon IconPwd"></i>
                                <input type="password" tabindex="2" name="password"
                                       class="regi_login_input regi_login_input_left login-input-no input_text"
                                       placeholder="Password" v-model="userPwd">
                            </li>
                        </ul>
                    </div>
                    <div class="message">
                        <a href="javascript:;" class="btn-login" @click="login">登 录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag = false"></div>
    </header>
</template>
<style>
    .header {
        width: 100%;
        background-color: white;
        font-family: "moderat", sans-serif;
        font-size: 16px;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 70px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 5px 20px 10px 20px;
    }

    .navbar-left-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: -20px;
    }

    .navbar-brand-logo {
        /*width: 120px;*/
        width: 40px;
        height: 40px;
        margin: 20px;
    }

    .navbar-brand-logo-title{

    }

    .header a, .footer a {
        color: #666;
        text-decoration: none;
    }

    a {
        -webkit-transition: color .3s ease-out;
        transition: color .3s ease-out;
    }

    .navbar-right-container {
        display: none;
        justify-content: flex-start;
        align-items: center;
    }

    .navbar-menu-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10px;
    }

    .navbar-link {
        padding-left: 15px;
    }

    .navbar-cart-container {
        position: relative;
    }

    .navbar-cart-count {
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -9px;
        right: -11px;
        width: 20px;
        border-radius: 10px;
        color: white;
        background-color: #eb767d;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
    }

</style>
<script type="text/ecmascript-6">
    import svgIcon from  '../components/svgIcon.vue'
    import '../assets/css/login.css'
    export default{
        data(){
            return {
                loginModalFlag: false,
                userName: '',
                userPwd: '',
                errorTip: false,
                nickName: '',
                loginBtnFlag: true,
                logoutBtnFlag: false,
                api_host: process.env.API_HOST
            }
        },
        components:{
            svgIcon
        },
        mounted:function () {
            this.checkLogin();
        },
        methods: {
            checkLogin(){
                this.$http.get(this.api_host + '/users/checkLogin').then((response)=>{

                    let res = response.data;
                    if(res.status == '0' && res.result){
                        this.nickName = res.result.userName;
                        this.logoutBtnFlag = true;
                        this.loginBtnFlag = false;
                    }
                });
            },
            login(){
                if (!this.userName || !this.userPwd) {
                    alert("用户名或者密码不能为空！");
                    return;
                }
                var url =this.api_host + '/users/login';
                var params = {
                    userName: this.userName,
                    userPwd: this.userPwd
                }
                this.$http.post(url, params)
                    .then((response) => {
                        let res = response.data;
                        if (res.status === "0") {
                            this.errorTip = false;
                            this.loginModalFlag = false;
                            this.nickName = res.result.userName;
                            this.loginBtnFlag = false;
                            this.logoutBtnFlag = true;
                            alert("登陆成功！");
                        } else {
                            this.errorTip = true;
                            alert("登陆失败！");
                        }
                    });

            },
            logout(){

                this.$http.post(this.api_host+'/users/logout').then((response)=>{
                    let res = response.data;
                    if(res.status === "0"){
                        this.loginBtnFlag = true;
                        this.logoutBtnFlag = false;
                        this.nickName =""
                        alert("账户已退出");
                    }
                });
            }

        }
    }
</script>
