<template>
    <div id="register">
      <div class="register-container">
        <div class="register-header">
          <router-link to="/login">
            &lt;
            <span>登陆</span>
          </router-link>
        </div>
        <div class="form-group">
          <div class="form-item">
            <label for="phone">
              <img src="../assets/picture/login/phone.png"/>
            </label>
            <input id="phone" type="text" placeholder="请输入手机号" required v-model="phoneNum"/>
          </div>
          <div class="form-item">
            <label for="code">
              <img src="../assets/picture/login/code.png"/>
            </label>
            <input id="code" type="text" placeholder="请输入验证码" required v-model="code"/>
            <button v-show="!isGet" @click="getCode">获取验证码</button>
            <button v-show="isGet">{{time}}秒后可重新发送</button>
          </div>
          <div class="form-item">
            <label for="password">
              <img src="../assets/picture/login/key.png"/>
            </label>
            <input id="password" type="password" required placeholder="请填写密码" v-model="password"/>
          </div>
          <div class="form-item">
            <label for="respassword">
              <img src="../assets/picture/login/key.png"/>
            </label>
            <input id="respassword" type="password" required placeholder="请确认密码" v-model="respassword"/>
          </div>
        </div>
        <div class="button-group" @click="register">
          <button class="register-btn">注册</button>
        </div>
        <div class="authorization">
          <input type="checkbox" v-model="isAgree"/>
          <span class="m1-5">注册使用即表示同意</span>
          <span class="protocol">用户协议及版本声明</span>
        </div>
        <div class="go-login">
          <router-link to="/login">已有账号?去登陆</router-link>
        </div>
        <div class="tourism">
          <img src="../assets/picture/login/酒店.png"/>
          <img src="../assets/picture/login/住宿.png"/>
          <img src="../assets/picture/login/旅游.png"/>
        </div>
      </div>
    </div>
</template>

<script>
    import {insert,sendCode} from "../api/index";
    import qs from "qs";
    export default {
        name: "Register",
        data() {
          return {
            isGet: false,
            time: 60,
            phoneNum: '',
            code: '',
            password: '',
            respassword: '',
            isAgree: false
          }
        },
        methods: {
          register() {
            if(this.isAgree === true) {
              if(this.password === this.respassword) {
                let params = new URLSearchParams()
                params.append("phoneNum",this.phoneNum)
                params.append("code",this.code)
                params.append("password",this.password)
                insert(params).then(res => {
                  if(res.code == 1) {
                    this.$toast.success(res.msg);
                    window.sessionStorage.setItem("userInfo",JSON.stringify(res.userMsg));
                    this.$router.push({path: "/home"});
                  }else {
                    this.$toast.success(res.msg);
                  }
                }).catch(err => {
                  console.log(err)
                })
              }
            }
          },
          getCode() {
            let params = new URLSearchParams()
            params.append("phoneNum",this.phoneNum)
            sendCode(params).then(res => {
              if(res.code == 1) {
                this.$toast.success(res.msg)
                this.isGet = !this.isGet;
                let timeId = setInterval(function () {
                  if(this.time == 0) {
                    clearInterval(timeId)
                    this.isGet = !this.isGet;
                  }
                  this.time--;
                },1000)
              }else {
                this.$toast.success(res.msg)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
    }
</script>
<style scoped>
  #register {
    background-image: linear-gradient(#96deda,#50c9c3);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .register-container {
    height: 100vh;
  }
  .register-header {
    padding: 5%;
  }
  .register-header a {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
  .register-header a span {
    margin-left: 2%;
  }
  .form-group {
    padding: 5%;
  }
  .form-group .form-item {
    margin-top: 5%;
    border-bottom: 1px solid #ffffff;
  }
  .form-group .form-item input {
    border: 0;
    outline: none;
    width: 55%;
    height: 40px;
    background-color: transparent;
    margin-left: 12%;
    font-size: 16px;
  }
  .form-group .form-item img {
    width: 25px;
    position: absolute;
    margin-top: 2%;
  }
  .form-group .form-item button {
    background-color: transparent;
    border: 1px dashed #00cc99;
    color: white;
    padding: 1%;
    float: right;
    height: 30px;
    border-radius: 5px;
    font-size: 13px;
  }

  .button-group {
    padding: 5%;
  }
  .button-group .register-btn {
    width: 90%;
    height: 35px;
    background-color: #00cc99;
    border: 0;
    outline: none;
    border-radius: 20px;
    margin-top: 4%;
    margin-left: 4%;
  }

  .authorization {
    padding: 0 5%;
    font-size: 14px;
    color: #ffffff;
  }
  .authorization input {
    width: 18px;
    height: 18px;
    position: absolute;
    margin-left: 6%;
  }
  .authorization .m1-5 {
    margin-left: 13%;
  }
  .authorization .protocol {
    color: #00cc99;
    text-decoration: underline;
  }
  .go-login {
    padding: 5%;
  }
  .go-login a {
    float: right;
    color: #ffffff;
  }
  .tourism {
    padding: 5%;
  }
  .tourism img {
    width: 50px;
    height: 50px;
    margin-left: 14%;
    margin-top: 20%;
  }
</style>
