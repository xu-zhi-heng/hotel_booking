<template>
    <div id="tabbar">
      <van-tabbar v-model="tabbar_active">
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="smile-comment-o" to="/news">消息</van-tabbar-item>
        <van-tabbar-item icon="orders-o" to="/order">订单</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "Tabbar",
        props: {
          index: {
            type: Number,
            default() {
              return 0
            }
          }
        },
        data() {
          return {
            tabbar_active: 0,
          }
        },
        methods: {

        },
        created() {
          this.tabbar_active = this.index
        }
    }
</script>

<style scoped>

</style>
