<template>
    <div id="booking">
      <div class="booking_header">
        <van-nav-bar
          title="房间预订"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
          fixed
        >
          <template #right>
            <van-icon name="more-o" size="18" />
          </template>
        </van-nav-bar>
        <div style="height: 46px"></div>
        <div class="room-name">
          <span>{{RoomName}}</span>
        </div>
      </div>

      <div class="booking_inf">
        <div class="booking_date">
          <div class="check">
            <p>住房日期</p>
          </div>
          <div class="check_date">
            <p @click="show = true">{{LiveDate}}</p>
            <van-calendar v-model="show" type="range" @confirm="onConfirm" />
          </div>
        </div>

        <div class="room_type">
          <div style="float: left;margin-left: 1.5rem;color:#d5d0d0; line-height: 3.5rem;">
            <p>房间类型</p>
          </div>
          <div style="float: right;margin-right: 1.5rem;color:#fcfcfc;line-height: 3.5rem;font-size: 17px">
            <p>{{RoomType}}</p>
          </div>
        </div>

        <div class="total_date">
          <div style="color: #d5d0d0;float: left;margin-left: 1.5rem;padding-top: 1rem">
            <p style="font-size: 18px;padding-top: 0.2rem;">{{RoomId}}号房间({{TotalDate}}天)</p>
            <p style="font-size: 14px;color: #846d99;margin-top: 0.2rem">其他费用</p>
          </div>
          <div style="color: #fcfcfc;float: right;margin-right: 1.5rem;padding-top: 2rem;padding-top: 1rem">
            <p style="font-size: 18px;padding-top: 0.2rem">￥{{RoomPirce}}</p>
            <p style="font-size: 14px;margin-top: 0.1rem;margin-left: 1rem">￥{{OtherPrice}}</p>
          </div>
        </div>

        <div class="guest">
          <div style="float: left;margin-left: 1.5rem;color:#d5d0d0; line-height: 3.5rem;">
            <p>用户</p>
          </div>
          <div style="float: right;margin-right: 1.5rem;color:#fcfcfc;line-height: 3.5rem; font-size: 17px">
            <p>{{Customer}}</p>
          </div>
        </div>

        <div class="total_price">
          <div style="float: left;margin-left: 1.5rem;color:#d5d0d0; padding-top: 2rem;">
            <p>总金额</p>
          </div>
          <div style="float: right;margin-right: 1.5rem;color:#fcfcfc;padding-top: 0.8rem; font-size: 35px;font-weight: 600">
            <p>￥{{totalPrice}}</p>
          </div>
        </div>

        <div class="notes">
          <div style="padding: 20px 21px">
            <span>备注:</span>
            <input v-model="note"/>
          </div>
        </div>

        <div class="tips">
          <div style="padding: 10px 21px">
            <span style="font-size: 25px">tips:</span>:{{tips}}
          </div>
        </div>

        <div class="pay">
          <div class="pay-btn">
            <button @click="PayForLoading">PAY FOR NOW</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {getRoomDelById,insertOrder} from "../api/index";
    export default {
      name: "Booking",
      data() {
        return {
          LiveDate: '选择日期',
          TotalDate: 'x', // 总共要住多少天
          show: false,

          RoomId: '',   //房间号
          RoomType: '', //房间类型
          RoomName: '', //房间名称
          Customer: '', //预订的用户

          UnitPrice: 0, //该房间的单价
          RoomPirce: 0, //住多少天的总共价钱
          OtherPrice: 0, //其他的费用
          totalPrice: 0, //总共的价格
          tips: '请确认信息点击付款后即可',
          note: ''
        }
      },
      methods: {
        onClickLeft() {
          this.$router.push({path: '/home'})
        },
        onClickRight() {

        },
        formatDate(date) {
          return `${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirm(date) {
          const [start, end] = date;
          this.show = false;
          this.LiveDate = `${this.formatDate(start)} - ${this.formatDate(end)}`;
          this.TotalDate = (end - start) / 1000 / 60 / 60 / 24;
          this.RoomPirce = this.TotalDate * this.UnitPrice;
          this.totalPrice = parseFloat(this.RoomPirce + this.OtherPrice).toFixed(2)
          console.log(this.totalPrice)
        },
        PayForLoading() {
          if(JSON.parse(window.sessionStorage.getItem("userInfo")).faceToken == null) {
            this.$toast.fail("您还没认证身份,请前往信息页进行人脸和身份识别")
            this.$router.push({path: '/mine'})
          }else {
            let params = new URLSearchParams();
            params.append("daysNum",this.TotalDate)
            params.append("roomType",this.RoomType)
            params.append("userId",JSON.parse(window.sessionStorage.getItem("userInfo")).id)
            params.append("roomNum",this.RoomId)
            params.append("totalPrice",this.totalPrice)
            params.append("state",0)
            params.append("note",this.note)
            params.append("faceToken",JSON.parse(window.sessionStorage.getItem("userInfo")).faceToken)
            this.$toast.loading({
              message: '加载中...',
              forbidClick: true,
            })
            insertOrder(params).then(res => {
              console.log(res)
              if(res.code == 1) {
                this.$toast.success(res.msg);
                this.$router.push({path: '/order'})
              }else {
                this.$toast.success(res.msg);
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
      },
      created() {
        getRoomDelById(this.$route.query.id).then(res => {
          console.log(res)
          this.RoomName = res.roomDelById.title
          this.RoomType = res.typeName
          this.RoomId = res.roomDelById.roomNum
          this.Customer = JSON.parse(window.sessionStorage.getItem("userInfo")).username
          this.UnitPrice = res.roomDelById.price
          this.RoomPirce = res.roomDelById.price
          this.totalPrice = res.roomDelById.price
        }).catch(err => {
          console.log(err)
        })
      }
    }
</script>

<style>
  #booking {
    height: 100vh;
    font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
  }
  .booking_header .van-nav-bar {
    background-color: #271f1c;
  }
  .booking_header .van-nav-bar__arrow {
    margin-top: -4px;
  }
  .booking_header .van-nav-bar__text {
    color: #dadbdd;
  }
  .booking_header .van-nav-bar .van-icon {
    color: #dadbdd;
  }
  .booking_header .van-nav-bar__title {
    color: #dadbdd;
  }
  .room-name {
    height: 3rem;
    width: 100%;
    background-image: url("../assets/picture/room/single/1.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    border-bottom: 1px solid #393939;
    border-top: 1px solid #393939;
  }
  .room-name span {
    font-size: 1.2rem;
    letter-spacing: 2px;
    color: white;
    font-weight: 600;
    margin-left: 2rem;
    line-height: 3rem;
  }
  .booking_inf {
    background-color: #161616;
  }
  .booking_date {
    border-bottom: 1px solid #393939;
    border-top: 1px solid #393939;
    height: 5rem;
  }
  .check {
    float: left;
    color: #d5d0d0;
    margin-left: 1.5rem;
    line-height: 5rem;
  }
  .check_date {
    float: right;
    color: #fcfcfc;
    margin-right: 1.5rem;
    line-height: 5rem;
    font-size: 17px;
  }
  .van-calendar__day {
    color: black;
  }
  .van-calendar__day--disabled {
    color: #c8c9cc !important;
  }
  .room_type {
    height: 3.5rem;
    border-bottom: 1px solid #393939;
  }
  .guest {
    height: 3.5rem;
    border-bottom: 1px solid #393939;
  }
  .total_date {
    border-bottom: 1px solid #393939;
    height: 5rem;
  }
  .total_price {
    height: 4rem;
    border-bottom: 1px solid #393939;
  }
  .tips {
    height: 6rem;
    border-bottom: 1px solid #393939;
    color: #fcfcfc;
  }
  .notes {
    color: #fcfcfc;
    border-bottom: 1px solid #393939;
    height: 4rem;
  }
  .notes input {
    border: none;
    height: 100%;
    width: 30%;
    float: right;
    background: transparent;
  }
  .pay {
    height: 4.285rem;
    border-bottom: 1px solid #393939;
  }
  .pay-btn {
    height: 100%;
    width: 100%;
  }
  .pay-btn button {
    border: 0;
    height: 100%;
    width: 100%;
    background-color: #3b2151;
    color: #fffcff;
    font-size: 20px;
    font-weight: 600;
  }
</style>
