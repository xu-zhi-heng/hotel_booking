<template>
    <div id="order">
      <div class="order-header">
        <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft"></van-nav-bar>
      </div>
      <van-sticky>
        <div class="order-menu">
          <van-tabs v-model="active">
            <van-tab title="全部"></van-tab>
            <van-tab title="正在使用"></van-tab>
            <van-tab title="已付款"></van-tab>
            <van-tab title="未付款"></van-tab>
          </van-tabs>
        </div>
      </van-sticky>

      <ul>
        <li v-for="(item,index) in this.orderForm" :key="index">
          <div class="order-all">
            <router-link to="/home">
              <div class="orderlist-header">
                <div class="orderlist-header-time" style="float: left">
                  下单时间: {{item.createTime}}
                </div>
                <div class="orderlist-header-state" style="float: right">
                  已结算
                </div>
                <div style="clear: both"></div>
              </div>
              <div class="orderlist-body">
                <div class="orderlist-body-img" style="float: left">
                  <img :src="item.pic"/>
                </div>
                <div class="orderlist-body-font" style="float: left">
                  <ul>
                    <li class="desc" style="float: left">
                      {{item.name}}{{item.daysNum}}天
                    </li>
                    <li class="money" style="float: right">
                      ￥{{item.totalPrice}}
                    </li>
                    <li class="num" style="float: right">
                      x{{item.daysNum}}
                    </li>
                  </ul>
                </div>
                <div class="orderlist-body-money" style="float: left">
                  <div class="true-money">
                    实付:
                    <label style="font-size: 16px">￥{{item.totalPrice}}</label>
                  </div>
                  <div class="other-money">
                    其他费用x元
                  </div>
                </div>
                <div style="clear: both"></div>
              </div>
              <div class="order-footer">
                订单单号: <span style="float: right">{{item.title}}</span>
              </div>
            </router-link>
          </div>
        </li>
      </ul>

      <Tabbar></Tabbar>
    </div>
</template>

<script>
    import Tabbar from "../Tabbar";
    import {getAllOrderByUserId} from "../../api/index";
    export default {
      name: "Order",
      data() {
        return {
          active: 0,
          orderForm: []
        }
      },
      components: {
        Tabbar
      },
      methods: {
        onClickLeft() {
          this.$router.push({path: '/home'})
        }
      },
      created() {
        getAllOrderByUserId(JSON.parse(window.sessionStorage.getItem("userInfo")).id).then(res => {
          for(let i = 0; i < res.allOrders.length; i++) {
            let item = res.allOrders[i];
            item.pic = res.rooms[i].pic;
            item.name = res.rooms[i].title
            this.orderForm.push(item)
          }
          console.log(this.orderForm)
        }).catch(err => {
          console.log(err)
        })
      }
    }
</script>

<style>
  #order {
    height: 100vh;
  }
  .van-nav-bar .van-icon {
    color: black;
  }
  .van-nav-bar__title {
    color: black;
    font-size: 18px;
  }
  .order-menu .van-tab {
    border-right: 1px #d9d9d9 solid;
  }
  .van-tabs--line .van-tabs__wrap {
    border-bottom: 1px #d9d9d9 solid;
  }

  .orderlist-header {
    width: 94%;
    padding: 0 10px;
    background-color: white;
    border-bottom: 1px #d9d9d9 solid;
  }
  .orderlist-header-time {
    font-size: 12px;
    color: black;
    height: 30px;
    line-height: 30px;
    width: 178px;
  }
  .orderlist-header-state {
    font-size: 12px;
    color: black;
    height: 30px;
    line-height: 30px;
    width: 40px;
  }
  .orderlist-body {
    width: 94%;
    padding: 10px;
    background-color: white;
  }
  .orderlist-body-img {
    width: 67.5px;
    height: 67.5px;
    overflow: hidden;
  }
  .orderlist-body-img img {
    width: 100%;
    height: 100%;
    border: none;
    vertical-align: middle;
    margin-top: 0px;
  }
  .orderlist-body-font {
    width: 77%;
    height: 37.5px;
    margin-left: 7.5px;
  }
  .orderlist-body-font .desc {
    width: 225px;
    height: 37.5px;
    line-height: 18.7px;
    font-size: 14px;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .orderlist-body-font .money {
    color: black;
    font-size: 13px;
    font-weight: 600;
    height: 18.75px;
    line-height: 18.75px;
    text-align: right;
  }
  .orderlist-body-font .num {
    width: 45px;
    height: 18px;
    line-height: 18px;
    font-size: 13px;
    color: #999999;
    text-align: right;
    margin-top: 1px;
  }
  .orderlist-body-money {
    width: 77%;
    margin-left: 7.5px;
  }
  .true-money {
    float: left;
    height: 18.75px;
    color: black;
    font-size: 12px;
    margin-top: 11px;
  }
  .other-money {
    background-color: #ff452c;
    float: right;
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    margin-top: 7.5px;
    text-align: center;
    color: white;
    width: 67.5px;
    padding: 3px;
    border-radius: 10px;
  }
  .order-footer {
    width: 94%;
    background-color: white;
    border-bottom: 1px #d9d9d9 solid;
    font-size: 12px;
    color: black;
    margin: auto;
    border-top: 1px #d9d9d9 solid;
    height: 30px;
    line-height: 30px;
  }
</style>
