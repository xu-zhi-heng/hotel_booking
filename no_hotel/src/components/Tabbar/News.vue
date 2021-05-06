<template>
    <div id="news">
      <van-sticky>
        <van-nav-bar
          title="消息中心"
          left-arrow
          @click-left="onClickLeft"
        >
        </van-nav-bar>
      </van-sticky>

      <div class="messageBox">
        <div class="message" v-for="(item,index) in message" :key="index">
          <div class="left">
            <img :src="item.img"/>
          </div>
          <div class="right">
            <div class="right_1">
              <p class="title">{{item.title}}</p>
              <span class="date">{{item.date}}</span>
            </div>
            <div class="right_2">
              <div class="des">
                {{item.des}}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import Tabbar from "../Tabbar";
    export default {
      name: "News",
      data() {
        return {
          message: [
            {
              img: require('../../assets/picture/news/message1.png'),
              title: '酒店活动',
              des: '注入酒店大优惠，全场酒店房间打8折',
              date: '昨天'
            },
            {
              img: require('../../assets/picture/news/message2.png'),
              title: '商品通知',
              des: '您的房间已经开始使用',
              date: '昨天'
            },
            {
              img: require('../../assets/picture/news/message3.png'),
              title: '优惠卷',
              des: '您有1张优惠券明日即将到期，优惠额50.0元，快去用掉...',
              date: '昨天'
            },
            {
              img: require('../../assets/picture/news/message4.png'),
              title: '系统通知',
              des: '感谢您注册本无人酒店App，首次注册获得一次抽奖机会，立即去...',
              date: '昨天'
            },
          ]
        }
      },
      components: {
          Tabbar
      },
      methods: {
        onClickLeft() {
          this.$router.push({path: '/home'})
        }
      }
    }
</script>

<style>
  #news {
    height: 100vh;
  }
  .messageBox {
    background-color: #ffffff;
    padding: 0 0.6rem;
  }
  .message {
    width: 100%;
    border-bottom: 1px solid #eee;
    height: 2.7rem;
    padding: 0.6rem 0;
  }
  .left {
    float: left;
    width: 3.2rem;
    height: 2.7rem;
    overflow: hidden;
  }
  .left img {
    width: 2.7rem;
    height: 100%;
    border: none;
    overflow: hidden;
  }
  .right {
    height: 3rem;
    flex: 1;
  }
  .right .right_1 {
    color: #999;
    height: 1.4rem;
    overflow: hidden;
    padding-top: 0.3rem;
  }
  .right_1 .title {
    color: #333;
    float: left;
    font-size: 0.9rem;
    max-width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .right_1 .date {
    float: right;
    display: block;
    font-size: 0.75rem;
  }
  .right .right_2 {
    color: #999;
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .right_2 .des {
    color: #999;
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .van-nav-bar__content {
    border-bottom: 1px solid #eee;
  }
</style>
