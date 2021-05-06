<template>
    <div id="home">
      <van-sticky>
        <van-row class="search">
          <van-col span="18">
            <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              input-align="center"
              shape="round"
              background="#00a388"
            />
          </van-col>
          <van-col span="3" v-show="!isLogout">
            <router-link to="/login" tag="button" class="btn login">登陆</router-link>
          </van-col>
          <van-col span="3" v-show="!isLogout">
            <router-link to="/Register" tag="button" class="btn register">注册</router-link>
          </van-col>

          <div @click="logout">
            <van-col span="6" v-show="isLogout" >
              <router-link to="/login" tag="button" class="btn logout">退出登陆</router-link>
            </van-col>
          </div>
        </van-row>


        <van-tabs v-model="tab_active" swipeable @change="ChangeTab">
          <van-tab :title="item.typeName" v-for="(item,index) in roomTypes" :key="index" :name="item.typeName"></van-tab>
        </van-tabs>
      </van-sticky>

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <RoomDel :typeName="tab_active"></RoomDel>
      </van-pull-refresh>

      <hr/>

      <div style="height: 50px;background: transparent;text-align: center;"></div>

      <Tabbar></Tabbar>

    </div>
</template>

<script>
  import {getAllRoomType} from '../api/index'
  import RoomDel from "../components/Room/RoomDel";
  import Tabbar from "../components/Tabbar";
  export default {
      name: "Home",
      props: ['typeName'],
      components: {
        RoomDel,
        Tabbar
      },
      data() {
        return {
          isLogout: false,    // 是否退出登陆,用来显示是登陆还是退出
          tab_active: '',      //
          value: '',          // 用来搜索的值
          roomTypes: [],      // 房间的类型
          ChangeType: [],     // 通过点击来更换组件
          isLoading: false,    // 刷新
        }
      },
      created() {
        getAllRoomType().then(res => {
          if(res.code == 1) {
            console.log(res)
            this.roomTypes = res.allRoomType;
            this.tab_active = this.roomTypes[0].typeName
          }
        }).catch(err => {
          console.log(err)
        })
        const userInfo = window.sessionStorage.getItem("userInfo");
        if(userInfo != null) {
          this.isLogout = !this.isLogout
        }
      },
      methods: {
        ChangeTab(name,title) {
          // console.log(this.tab_active)
        },
        // 退出
        logout() {
          window.sessionStorage.removeItem("userInfo")
          this.isLogout = false
          this.$toast.success('退出成功');
        },
        //刷新
        onRefresh() {
          setTimeout(() => {
            this.$toast.success('刷新成功');
            this.isLoading = false;
            this.count++;
          }, 1000);
        },
      }
    }
</script>

<style scoped>
  .search {
    background: #00a388;
  }
  .btn {
    margin-top: 0.9rem;
    background-color: #79bd8f;
    color: #ffffff;
    border: 0;
    outline: none;
    padding: 0.25rem;
    border-radius: 1rem;
    width: 3rem;
  }
  .login {
    margin-left: -0.45rem;
  }
  .register {
    margin-left: -0.15rem;
  }
  .logout {
    width: 5rem;
  }
</style>
