<template>
  <div id="roomDel" style="margin-top: 15px">
    <van-card v-for="(item,index) in Rooms"
       :key="index"
      :price="item.price"
      :desc="item.des"
      :title="item.title"
      :thumb="item.pic"
    >
      <template #num>
        剩余数量: {{item.number}}
      </template>
      <template #footer>
        <van-button size="mini" @click="Booking(item.id)">预订</van-button>
        <van-button size="mini" @click="View(item.id,item.roomNum)">查看具体信息</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
  import {getRoomDelByType} from "../../api/index";
  export default {
      name: "BigBed",
      data() {
        return {
          Rooms: []
        }
      },
      props: ['typeName'],
      methods: {
        Booking(id) {
          if(window.sessionStorage.getItem("userInfo") == null) {
            this.$toast.fail("您还没有登陆")
          }else {
            this.$router.push({path: '/booking',query: {id: id}})
          }
        },
        View(id,roomNum) {
          console.log(id)
          console.log(roomNum)
          this.$router.push({path: '/detailsPage',query: {id: id,roomNum:roomNum}})
        },
      },
      watch: {
        typeName: {
          handler() {
            getRoomDelByType(this.typeName).then(res => {
              this.Rooms = res.roomByType
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          }
        }
      },
      created() {
        getRoomDelByType("单人间").then(res => {
          this.Rooms = res.roomByType
        }).catch(err => {
          console.log(err)
        })
      }
  }
</script>

<style>
  .van-card__title {
    font-size: 20px;
    padding: 5px;
    font-weight: 800;
  }
  .van-card__desc {
    padding: 5px;
    margin-top: 5px;
  }
  .van-card__price {
    padding-left: 5px;
  }
</style>
