<template>
  <div id="modifyUserInf">
    <van-sticky>
      <van-nav-bar
        title="修改信息"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </van-sticky>

    <div class="UserInf">
      <van-cell-group>
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader v-model="UserInf.head_portrait"></van-uploader>
          </template>
        </van-field>

        <van-field v-model="UserInf.username" label="用户名"></van-field>
        <van-field v-model="UserInf.email" label="邮箱"/>

        <van-field
          v-model="UserInf.password"
          readonly
          type="password"
          name="passwrod"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #button>
            <van-button size="small" type="primary">修改密码</van-button>
          </template>
        </van-field>

        <van-field v-model="UserInf.Virphone" label="手机号" readonly>
          <template #button>
            <van-button size="small" type="primary">更改手机号</van-button>
          </template>
        </van-field>

        <van-field name="radio" label="性别">
          <template #input>
            <van-radio-group v-model="UserInf.gender" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="0">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
          readonly
          clickable
          name="area"
          :value="UserInf.address"
          label="地区选择"
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="AreaonConfirm"
            @cancel="showArea = false"
          />
        </van-popup>

        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="UserInf.birthday"
          label="出生日期"
          placeholder="点击选择时间"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
            type="date"
            @confirm="DateonConfirm"
            @cancel="showPicker = false"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
      </van-cell-group>
      <div style="margin: 32px;">
        <van-button round block type="info" native-type="submit" @click="submit">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import area from "../assets/area";
  import {update} from "../api/index";
  export default {
      name: "ModifyUserInf",
      data() {
        return {
          UserInf: {
            username: '',
            email: '',
            realPhone: '',
            Virphone: '',
            password: '',
            gender: '0',
            head_portrait: [{ url: 'https://s3.ax1x.com/2020/12/19/rN9xg0.jpg'}],
            address: '',
            birthday: '',
          },
          showArea:false,
          areaList: area,
          showPicker: false,
          minDate: new Date(2020, 0, 1),
          maxDate: new Date(2025, 10, 1),
        }
      },
      methods: {
        onClickLeft() {
          this.$router.push({path: '/mine'})
        },
        AreaonConfirm(values) {
          this.UserInf.address = values
            .filter((item) => !!item)
            .map((item) => item.name)
            .join('-');
          console.log(this.UserInf.address)
          this.showArea = false;
        },
        DateonConfirm(time) {
          let date = new Date(time);
          this.UserInf.birthday = `${date.getFullYear() + 1}年${date.getMonth() + 1}月${date.getDate()}日`;
          this.showPicker = false;
        },
        submit() {
          let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"))
          let params = new URLSearchParams();
          params.append("id",userInfo.id)
          params.append("username",this.UserInf.username)
          params.append("email",this.UserInf.email)
          params.append("password",this.UserInf.password)
          params.append("phoneNum",this.UserInf.Virphone)
          params.append("sex",this.UserInf.gender)
          params.append("location",this.UserInf.address)
          params.append("birth",this.UserInf.birthday)
          params.append("avator","https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1909480718,3489615526&fm=26&gp=0.jpg")
          update(params).then(res => {
            if(res.code == 1) {
              window.sessionStorage.removeItem("userInfo")
              window.sessionStorage.setItem("userInfo",JSON.stringify(res.userMsg))
              this.$toast.success(res.msg);
            }else {
              this.$toast.success(res.msg);
            }
          }).catch(err => {
            console.log(err)
          })
        },
        timestampToTime(timestamp) {
          let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + "-";
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
          return (Y+M+D);
        }
      },
      created() {
        let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"))
        this.UserInf.username = userInfo.username;
        this.UserInf.password = userInfo.password;
        this.UserInf.email = userInfo.email;
        this.UserInf.Virphone = userInfo.phoneNum;
        this.UserInf.gender = JSON.stringify(userInfo.sex);
        this.UserInf.address = userInfo.location;
        this.UserInf.birthday = userInfo.birth
        this.UserInf.head_portrait[0].url = userInfo.avator
      }
    }
</script>

<style scoped>
  #modifyUserInf {
    height: 100vh;
    background-color: #daefe1;
    background-repeat: no-repeat;
    background-size: auto;
  }
  .UserInf {
    margin-top: 20px;
    padding: 0 15px;
  }
  .UserInf .van-cell {
    margin-bottom: 10px;
    border-radius: 20px;
  }
  .UserInf .van-cell-group {
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>
