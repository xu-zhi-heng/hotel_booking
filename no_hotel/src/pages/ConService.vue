<template>
  <div class="chat-content">
    <!-- recordContent 聊天记录数组-->
    <div v-for="(itemc,indexc) in recordContent" :key="indexc">
      <!-- 对方 -->
      <div class="word" v-if="!itemc.mineMsg">
        <img :src="itemc.headUrl">
        <div class="info">
          <p class="time">{{itemc.nickName}}  {{chatTime(itemc.timestamp)}}</p>
          <div class="info-content">{{itemc.contactText}}</div>
        </div>
      </div>

      <!-- 我的 -->
      <div class="word-my" v-else>
        <div class="info">
          <p class="time">{{itemc.nickName}}  {{chatTime(itemc.timestamp)}}</p>
          <div class="info-content">{{itemc.contactText}}</div>
        </div>
        <img :src="itemc.headUrl">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ConService",
      data() {
        return {

        }
      }
    }
</script>

<style scoped>
  .chat-content {
    width: 100%;
    padding: 20px;
  }
  .word {
    display: flex;
    margin-bottom: 20px;
  }
  .word img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .word .info {
    margin-left: 10px;
  }
  .word .time{
    font-size: 12px;
    color: rgba(51,51,51,0.8);
    margin: 0;
    height: 20px;
    line-height: 20px;
    margin-top: -5px;
  }
  .word .info-content{
    padding: 10px;
    font-size: 14px;
    background: #fff;
    position: relative;
    margin-top: 8px;
  }
  .word .info-content::before{
    position: absolute;
    left: -8px;
    top: 8px;
    content: '';
    border-right: 10px solid #FFF;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }


  .word-my {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .word-my img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .word-my .info {
    width: 90%;
    margin-left: 10px;
    text-align: right;
  }
  .word-my .time{
    font-size: 12px;
    color: rgba(51,51,51,0.8);
    margin: 0;
    height: 20px;
    line-height: 20px;
    margin-top: -5px;
    margin-right: 10px;
  }
  .word-my .info-content{
    max-width: 70%;
    padding: 10px;
    font-size: 14px;
    float: right;
    margin-right: 10px;
    position: relative;
    margin-top: 8px;
    background: #A3C3F6;
    text-align: left;
  }
  .word-my .info-content::after{
    position: absolute;
    right: -8px;
    top: 8px;
    content: '';
    border-left: 10px solid #A3C3F6;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
</style>
