<template>
    <div id="detailspage">
      <div class="details-header">
        <van-nav-bar title="商品页面" left-arrow @click-left="onClickLeft"></van-nav-bar>
      </div>

      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" :src="image"/>
        </van-swipe-item>
      </van-swipe>

      <div class="room_info" style="padding: 10px">
        <h3 style="margin-left: 10px">房间信息</h3>
        <div class="room_info_header">
          <ul>
            <li>
              <img src="../assets/picture/detailsPage/面积-线.png"/>
              {{roomInfo.size}}平方米
            </li>
            <li>
              <img src="../assets/picture/detailsPage/楼层.png"/>
              楼层{{floor}}
            </li>
            <li>
              <img src="../assets/picture/detailsPage/入住人.png"/>
              入住{{roomInfo.people}}人
            </li>
            <li>
              <img src="../assets/picture/detailsPage/早餐.png"/>
              {{roomInfo.isFood == 0 ? "无早餐" : "有早餐"}}
            </li>
            <li>
              <img src="../assets/picture/detailsPage/床.png"/>
              双人床1.8
            </li>
            <li>
              <img src="../assets/picture/detailsPage/禁止吸烟.png"/>
              {{roomInfo.isSmoke == 0 ? "不可吸烟" : "可吸烟"}}
            </li>
          </ul>
        </div>
        <div style="clear: both"></div>
      </div>

      <div class="room_equipment">
        <div class="convenient">
          <div class="title">
            <span>便利设施 :</span>
          </div>
          <div class="des">
            <span>{{roomInfo.device}}</span>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="bathroom">
          <div class="title">
            <span>浴室 :</span>
          </div>
          <div class="des">
            <span>{{roomInfo.bath}}</span>
          </div>
        </div>
        <div style="clear: both"></div>
        <div class="price">
          <div class="title">
            <span>单价 : </span>
          </div>
          <div class="des">
            <span>{{price}}元(一晚)</span>
          </div>
        </div>
      </div>



      <div class="details-footer">
        <van-goods-action>
          <van-goods-action-icon icon="like-o" text="收藏" @click="onClickIconLike" v-show="!isLike"/>
          <van-goods-action-icon icon="like" text="收藏" @click="onClickIconLike" v-show="isLike" color="red"/>
          <van-goods-action-icon icon="phone-o" text="咨询" @click="onClickIconAsk" />
          <van-goods-action-button
            type="danger"
            text="立即预订"
            color="#7232dd"
            @click="onClickButton"
          />
        </van-goods-action>
      </div>
    </div>
</template>

<script>
    import {getRoomDelById,getRoomInfoById,getRoomInfoByRoomNum,collect,deleteCollect,isLike} from "../api";
    export default {
      name: "Detailspage",
      data() {
        return {
          isLike: false,
          roomInfo: {}, // 房间的基本信息
          floor: '',    // 楼层
          price: '',    // 单价
          images: [],
        }
      },
      methods: {
        onClickLeft() {
          this.$router.push({path: '/home'})
        },
        onClickIconLike() {
          let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"))
          if(userInfo == null){
            this.$toast.fail("您还没有登陆!!!")
          }else {
            if(!this.isLike) {
              let params = new URLSearchParams()
              params.append("userId",userInfo.id)
              params.append("roomId",this.roomInfo.id)
              collect(params).then(res => {
                if(res.code == 1) {
                  this.$toast.success("收藏成功")
                  this.isLike = !this.isLike
                }else {
                  this.$toast.success("失败")
                }
              }).catch(err => {
                console.log(err)
              })
            }else {
              let params = new URLSearchParams()
              params.append("userId",userInfo.id)
              params.append("roomId",this.roomInfo.id)
              deleteCollect(params).then(res => {
                if(res.code == 1) {
                  this.isLike = !this.isLike
                  this.$toast.success("您已取消收藏")
                }else {
                  this.$toast.success(res.msg)
                }
              }).catch(err => {
                console.log(err)
              })
            }
          }
        },
        onClickButton() {
          if(window.sessionStorage.getItem("userInfo") == null){
            this.$toast.fail("您还没有登陆!!!")
          }else {
            this.$router.push({path: '/booking',query: {id: this.$route.query.id}})
          }
        },
        onClickIconAsk() {

        }
      },
      created() {
        getRoomDelById(this.$route.query.id).then(res => {
          console.log(res)
          this.floor = res.roomDelById.floor;
          this.price = res.roomDelById.price;
          this.images = res.roomDelById.pic.split('+');

          let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"))
          let params = new URLSearchParams()
          params.append("userId",userInfo.id)
          params.append("roomId",res.roomDelById.id)
          isLike(params).then(res => {
            if(res.code == 1) {
              this.isLike = true
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })


        getRoomInfoByRoomNum(this.$route.query.roomNum).then(res => {
          console.log(res)
          this.roomInfo = res.roomInfoByRoomNum
        }).catch(err => {
          console.log(err)
        })
      }
    }
</script>

<style>
  #detailspage {
    background-color: #f4f3f8;
    height: 100vh;
  }
 #detailspage .van-swipe {
   width: 100%;
   height: 240px;
 }
  #detailspage .van-swipe .van-swipe__track .van-swipe-item img{
    width: 100%;
    height: 100%;
  }
  #detailspage .room_info {
    background-color: white;
  }
  #detailspage .details-header {
    border-bottom: 1px solid gold;
    background: #f4f3f8;
  }
  #detailspage .room_info_header ul{
    width: 100%;
    margin-left: 35px;
  }
 #detailspage .room_info_header ul li {
   float: left;
   width: 50%;
   margin-top: 10px;
   padding: 5px 0;
 }
  #detailspage .room_equipment {
    margin-top: 10px;
    background: white;
    height: 150px;
  }
  #detailspage .room_equipment .convenient {
    margin-top: 15px;
    padding: 5px 15px;
  }
  #detailspage .room_equipment .convenient .title {
    float: left;
    color: #c8c9cc;
  }
  #detailspage .room_equipment .convenient .des {
    float: right;
    width: 65%;
  }
  #detailspage .room_equipment .bathroom {
    padding: 5px 15px;
    margin-top: 20px;
  }
  #detailspage .room_equipment .bathroom .title {
    float: left;
    color: #c8c9cc;
  }
  #detailspage .room_equipment .bathroom .des {
    float: right;
    width: 65%;
  }
  #detailspage .room_equipment .price {
    padding: 5px 15px;
    margin-top: 10px;
  }
  #detailspage .room_equipment .price .title {
    float: left;
    color: #c8c9cc;
  }
  #detailspage .room_equipment .price .des {
    float: right;
    width: 65%;
  }
</style>
