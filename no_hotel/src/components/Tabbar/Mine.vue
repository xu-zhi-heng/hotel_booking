<template>
    <div id="mine">
      <div class="mine-header">
        <router-link to="/modifyUserInf">
          <i style="position: absolute;top: 0.3rem;right: 0.3rem;">
            <van-icon name="setting-o" size="20" color="#ffffff"></van-icon>
          </i>
        </router-link>
        <img src="../../assets/picture/我的/head.png"/>
        <div class="mine-header-user">
          <div class="user-img">
            <img :src="header_img"/>
          </div>
          <div class="user-inf" style="padding: 0 5px; min-width: 125px">
            <h2 style="color: #ffffff;font-size: 1rem;padding-top: 0.8rem;font-weight: 600;text-align: center">
              {{username}}
              <router-link to="/modifyUserInf" style="color:white;">
                <i style="float: right">
                  <van-icon name="edit" size="20"></van-icon>
                </i>
              </router-link>
            </h2>
          </div>
        </div>
      </div>


      <div class="mine-place">
        <router-link class="place-grid" to="/face">
          <div class="grid-icon">
            <img src="../../assets/picture/我的/8_7人脸识别.png"/>
          </div>
          <div class="grid-text">
            <h2>人脸识别</h2>
          </div>
        </router-link>
        <router-link class="place-grid" :to="{path: '/identity',query: userId}">
          <div class="grid-icon">
            <img src="../../assets/picture/我的/证件.png"/>
          </div>
          <div class="grid-text">
            <h2>证件识别</h2>
          </div>
        </router-link>
        <router-link class="place-grid" to="/home">
          <div class="grid-icon">
            <img src="../../assets/picture/我的/优惠卷.png"/>
          </div>
          <div class="grid-text">
            <h2>优惠卷</h2>
          </div>
        </router-link>
        <router-link class="place-grid" :to="{path: '/collect',query: {userId}}">
          <div class="grid-icon">
            <img src="../../assets/picture/我的/收藏.png"/>
          </div>
          <div class="grid-text">
            <h2>收藏浏览</h2>
          </div>
        </router-link>
        <router-link class="place-grid" to="/home">
          <div class="grid-icon">
            <img src="../../assets/picture/我的/我的-联系客服.png"/>
          </div>
          <div class="grid-text">
            <h2>联系客服</h2>
          </div>
        </router-link>
        <router-link class="place-grid" to="/home">
          <div class="grid-icon">
            <img src="../../assets/picture/我的/设置.png"/>
          </div>
          <div class="grid-text">
            <h2>设置</h2>
          </div>
        </router-link>

      </div>

      <div class="mine-landlady">
        <h2 v-show="!isVip">普通用户</h2>
        <h2 v-show="isVip">VIP用户</h2>
      </div>

      <div class="mine-landlady">
        <router-link to="/home">
          <van-nav-bar  left-text="向朋友推荐">
            <template #right>
              <van-icon name="arrow" size="18" color="#c7c7cc"/>
            </template>
          </van-nav-bar>
        </router-link>

        <router-link to="/home">
          <van-nav-bar  left-text="意见反馈">
            <template #right>
              <van-icon name="arrow" size="18" color="#c7c7cc"/>
            </template>
          </van-nav-bar>
        </router-link>


        <router-link to="/home">
          <van-nav-bar  left-text="喜欢我们,打分鼓励一下">
            <template #right>
              <van-icon name="arrow" size="18" color="#c7c7cc"/>
            </template>
          </van-nav-bar>
        </router-link>


        <router-link to="/home">
          <van-nav-bar  left-text="关于我们">
            <template #right>
              <van-icon name="arrow" size="18" color="#c7c7cc"/>
            </template>
          </van-nav-bar>
        </router-link>
        <img src=""/>

      </div>


      <div style="height: 50px;background: #00cc99;text-align: center;"></div>
      <Tabbar></Tabbar>
    </div>
</template>

<script>
  import Tabbar from "../Tabbar";
    export default {
      name: "Mine",
      data() {
        return {
          username: '',
          header_img: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2590128318,632998727&fm=26&gp=0.jpg',
          isVip: false,
          userId: ''
        }
      },
      components: {
        Tabbar
      },
      methods: {

      },
      created() {
        if(window.sessionStorage.getItem("userInfo") != null) {
          this.username = JSON.parse(window.sessionStorage.getItem("userInfo")).username;
          this.header_img = JSON.parse(window.sessionStorage.getItem("userInfo")).avator;
          this.userId = JSON.parse(window.sessionStorage.getItem("userInfo")).id;
        }
      }
    }
</script>

<style>
  #mine {
    font-family: "Myriad Set Pro","Helvetica Neue",Helvetica,Arial,Verdana,sans-serif;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .mine-header {
    width: 100%;
    height: auto;
    position: relative;
  }
  .mine-header img {
    width: 100%;
    height: auto;
    border: 0;
    display: block;
  }
  .mine-header-user {
    position: absolute;
    left: 50%;
    margin-left: -55px;
    width: 110px;
    bottom: 30px;
  }
  .user-img {
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
  .user-img img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 3px solid rgba(255,255,255,0.4);
  }
  .mine-place {
    padding: 0.9rem 0;
    margin: 1rem auto 0;
    position: relative;
    overflow: hidden;
    width: 90%;
    border-radius: 5px;
    background: #fff;
    -moz-box-shadow : 0 0 11px #f1f2f5;
    -webkit-box-shadow: 0 0 11px #f1f2f5;
    -o-box-shadow: 0 0 11px #f1f2f5;
  }
  .place-grid {
    position: relative;
    float: left;
    padding: 1px;
    width: 33.333%;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .grid-icon {
    width: 40px;
    height: 40px;
    margin: 0 auto;
  }
  .grid-icon img {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
  .grid-text {
    display: block;
    text-align: center;
    color: #333;
    font-size: 0.85rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-top: 0.2rem;
  }
  .grid-text h2 {
    font-size: 0.85rem;
    font-weight: normal;
    color: #2b2f32;
  }
  .mine-landlady {
    padding: 0.9rem 0;
    position: relative;
    overflow: hidden;
    background: #fff;
    width: 90%;
    margin: 1rem auto 0;
    border-radius: 5px;
    text-align: center;
    -moz-box-shadow : 0 0 11px #f1f2f5;
    -webkit-box-shadow: 0 0 11px #f1f2f5;
    -o-box-shadow: 0 0 11px #f1f2f5;
  }
  .mine-landlady h2 {
    font-size: 1rem;
    color: #16bd87;
  }
  .van-nav-bar__text {
    color: black;
    font-size: 0.85rem;
    font-weight: normal;
  }
</style>
