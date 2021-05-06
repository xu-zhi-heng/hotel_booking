<template>
    <div id="login">
      <div class="login-container">
        <!--头部-->
        <div class="login-header">
          <p>无人酒店欢迎你</p>
        </div>
        <!--头像-->
        <div class="login-logo">
          <img :src="header_img"/>
          <p>{{username}}</p>
        </div>
        <!--input表单:手机登陆-->
        <div class="form-group" v-show="change">
          <div class="form-item">
            <label for="phone">
              <img src="../assets/picture/login/phone.png"/>
            </label>
            <input id="phone" placeholder="请输入手机号" v-model="phoneNum" required />
          </div>
          <div class="form-item">
            <label for="phone">
              <img src="../assets/picture/login/code.png"/>
            </label>
            <input id="code" placeholder="请输入验证码" type="text" v-model="code" required/>
            <button v-show="!isGet" @click="getCode">获取验证码</button>
            <button v-show="isGet">{{time}}秒后可重新发送</button>
          </div>
        </div>
        <!--input表单:账号密码登陆-->
        <div class="form-group" v-show="!change">
          <div class="form-item">
            <label for="account">
              <img src="../assets/picture/login/用户.png"/>
            </label>
            <input id="account" placeholder="请输入用户账号" v-model="username" required />
          </div>
          <div class="form-item">
            <label for="password">
              <img src="../assets/picture/login/key.png"/>
            </label>
            <input id="password" placeholder="请输入密码" type="text" v-model="password" required/>
          </div>
        </div>

        <!--按钮-->
        <div class="button-group">
          <div v-show="change">
            <button class="login-btn" @click="loginByPhone">登陆</button>
            <button class="change-login" @click="changeType" >账号登陆</button>
          </div>

          <div v-show="!change">
            <button class="login-btn" @click="loginByAccount">登陆</button>
            <button class="change-login" @click="changeType" >手机登陆</button>
          </div>
        </div>
        <!--随便逛逛-->
        <div class="casual">
          <router-link to="/register">还没有账号,去注册</router-link>
        </div>
        <!--第三方登陆-->
        <div class="order-login">
          <p>
            使用第三方账户登陆
          </p>
          <ul>
            <li >
              <router-link to="/#">
                <img src="../assets/picture/login/QQ.png"/>
              </router-link>
            </li>
            <li>
              <router-link to="/#">
                <img src="../assets/picture/login/微信.png"/>
              </router-link>
            </li>
            <li>
              <router-link to="/#">
                <img src="../assets/picture/login/微博.png"/>
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <router-link to="/home" style="font-size: 18px;text-align: center;color: white">
            <p>回到首页</p>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
  import {loginByPhone,loadingInfoByAccount,loadingInfoByPhone,loginByAccount,sendCode} from "../api/index";
  import qs from 'qs'
    export default {
      name: "Login",
      data() {
        return {
          isGet: false,       // 验证码是否发送
          change: true,       // 改变登陆方式
          username: '',        // 用户的用户名
          password: '',       // 用户的密码
          phoneNum: '',          // 用户的手机号码
          code: '',           // 验证码
          header_img: 'https://www.runoob.com/wp-content/uploads/2017/01/vue.png',  // 初始头像,
          time: 60            // 时间
        }
      },
      methods: {
        async loginByPhone() {
          if(this.phone == "") {
            this.$toast.fail('请输入手机号');
            return;
          }
          if(this.code == "") {
            this.$toast.fail('请输入验证码');
            return;
          }
          let params = new URLSearchParams();
          params.append("phoneNum",this.phoneNum)
          params.append("code",this.code);
          loginByPhone(params).then(res => {
            if(res.code == 1) {
              this.$toast.success(res.msg);
              window.sessionStorage.setItem("userInfo",JSON.stringify(res.userMsg));
              this.$router.push({path: "/home"});
            }else {
              this.$toast.fail(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        },
        async loginByAccount() {
          if(this.username == "") {
            this.$toast.fail('请输入账号');
            return;
          }
          if(this.password == "") {
            this.$toast.fail('请输入密码');
            return;
          }
          let params = new URLSearchParams();
          params.append("username",this.username)
          params.append("password",this.password);
          loginByAccount(params).then(res => {
            if(res.code == 1) {
              this.$toast.success(res.msg);
              window.sessionStorage.setItem("userInfo",JSON.stringify(res.userMsg));
              this.$router.push({path: "/home"});
            }else {
              this.$toast.fail(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        },
        // 改变登陆类型
        changeType() {
          this.change = !this.change
        },
        // 输入账号时更新用户信息
        setInfo(username,avator) {
          this.username = username
          this.header_img = avator
        },
        // 获取验证码
        getCode() {
          let params = new URLSearchParams()
          console.log(this.phoneNum)
          params.append("phoneNum",this.phoneNum)
          sendCode(params).then(res => {
            if(res.code == 1) {
              this.$toast.success(res.msg)
              this.isGet = !this.isGet;
              let timeId = setInterval(function () {
                this.time--;
                if(this.time == 0) {
                  clearInterval(timeId)
                  this.isGet = !this.isGet;
                }
              },1000)
            }else {
              this.$toast.success(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      watch: {
        phoneNum: {
          handler() {
            loadingInfoByPhone(this.phoneNum).then(res => {
              if(res.code == 1) {
                this.setInfo(res.userMsg.username,res.userMsg.avator)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        },
        username: {
          handler() {
            loadingInfoByAccount(this.username).then(res => {
              if(res.code == 1) {
                this.setInfo(res.userMsg.username,res.userMsg.avator)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
      }
    }
</script>


<style scoped>
  #login {
    background-image: linear-gradient(#37ecba,#72afd3);
    background-size: cover;
    background-repeat: no-repeat;
    color: #ffffff;
  }
  .login-container {
    height: 100vh;
    background-color:rgba(0, 0, 0, 0.4);
  }
  /*登陆头*/
  .login-header {
    padding: 5%;
  }
  .login-header p {
    font-size: 20px;
    text-align: center;
    color: #fff;
  }
  /*头像*/
  .login-logo {
    padding: 5%;
    text-align: center;
  }
  .login-logo img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: 1px solid burlywood;
  }
  .login-logo p {
    margin-top: 2%;
    font-size: 14px;
    text-align: center;
    letter-spacing: 2px;
  }
  /*登陆表单*/
  .form-group {
    padding: 5%;
  }
  .form-item {
    border-bottom: 1px solid #ffffff;
    margin-top: 5%;
  }
  .form-item img {
    width: 25px;
    position: absolute;
    margin-top: 2%;
  }
  .form-item input {
    outline: none;
    border: 0;
    margin-left: 12%;
    height: 40px;
    background-color: transparent;
    color: #ffffff;
    width: 55%;
  }
  .form-item button{
    outline: none;
    background: transparent;
    border: 1px #00cc99 dashed;
    color: #ffffff;
    height: 30px;
    border-radius: 5px;
    float: right;
    padding: 1%;
    font-size: 14px;
  }
  /*按钮组*/
  .button-group {
    padding: 5%;
  }
  .button-group .login-btn {
    width: 90%;
    background: #00cc99;
    border-radius: 20px;
    height: 35px;
    text-align: center;
    margin-top: 4%;
    margin-left: 4%;
    outline: none;
    font-size: 18px;
    border: 0;
  }
  .button-group .change-login {
    width: 90%;
    margin-top: 4%;
    margin-left: 4%;
    height: 35px;
    border-radius: 20px;
    background: transparent;
    text-align: center;
    border: 1px solid #ffffff;
  }
  .casual {
    text-align: center;
  }
  .casual a {
    color: #ffffff;
    font-size: 18px;
  }
  .order-login {
    padding: 5%;
  }
  .order-login p{
    display: block;
    position: relative;
    color: #cccccc;
    font-size: 14px;
    text-align: center;
  }
  .order-login p:before {
    position: absolute;
    content: " ";
    height: 1px;
    background-color: #cccccc;
    width: 20%;
    top: 50%;
    left: 10%;
  }
  .order-login p:after {
    content: "";
    height: 1px;
    background-color: #cccccc;
    width: 20%;
    position: absolute;
    top: 50%;
    right: 10%;
  }
  .order-login ul {
    height: 50px;
    margin-left: 25%;
    margin-top: 5%;
  }
  .order-login li {
    width: 25%;
    float: left;
  }
  .order-login ul li a {
    color: black;
  }
  .order-login ul li a img {
    width: 35px;
    height: 35px;
  }
</style>
