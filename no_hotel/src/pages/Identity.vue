<template>
    <div id="face">
      <div class="photo">
        <div class="line"></div>
        <div class="video">
          <video id="video" width="375px" height="520px" autoplay="autoplay"></video>
        </div>
        <div class="bottom"></div>
        <canvas id="canvas" width="375px" height="520px"></canvas>
      </div>
      <div class="btns">
        <button @click="takePhoto()">拍照</button>
        <button @click="upload()">上传</button>
        <button @click="back()">返回</button>
      </div>
    </div>
</template>

<script>
  import qs from 'qs'
  import Axios from 'axios'
  export default {
        name: "Face",
        data() {
          let img;
          return {
            mediaStreamTrack: null,
            video: { width: 375, height: 520 },
            img
          }
        },
        methods: {
          openMedia() {
            let constraints = {
              video: this.video,
              audio: false
            };
            //获得video摄像头
            this.video = document.getElementById('video');
            let promise = navigator.mediaDevices.getUserMedia(constraints);
            promise.then((mediaStream) => {
              // mediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks()[1];
              this.mediaStreamTrack=mediaStream.getVideoTracks()
              this.video.srcObject = mediaStream;
              this.video.play();
            });
          },
          takePhoto() {
            //获得Canvas对象
            let video = document.getElementById('video');
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 375, 520);
            // toDataURL  ---  可传入'image/png'---默认, 'image/jpeg'
            canvas.style.display = 'block';
            video.style.display = 'none';
            this.closeMedia();
            document.querySelector(".line").style.zIndex = 0;
            let img = document.getElementById('canvas').toDataURL();
            // 这里的img就是得到的图片
            this.img = img;
            console.log('img-----', this.img);
            // 从后台得到数据
          },
          closeMedia() {
            let stream = document.getElementById('video').srcObject;
            let tracks = stream.getTracks();
            tracks.forEach(function(track) {
              track.stop();
            });
            document.getElementById('video').srcObject = null;
          },
          back() {
            this.$router.push("/mine")
            this.closeMedia()
          },
          upload() {
            //上传
            Axios.post("http://localhost:8888/id/getInfo",qs.stringify({
              id: JSON.parse(window.sessionStorage.getItem("userInfo")).id,
              img: this.img
            })).then(res => {
              console.log(res)
            })
          },
        },
      mounted() {
          this.openMedia()
      }
    }
</script>

<style scoped>
  #face {
    margin: 0;
    padding: 0;
  }
  .btns {
    display: flex;
    width: 375px;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
  }
  .btns button {
    width: 90%;
    outline: none;
    border: none;
    color: white;
    padding: 10px 5px;
    flex: 1;
    border: 1px solid white;
    font-size: 20px;
    background-color: #00cc99;
    border-radius: 20px;
  }
  .photo {
    width: 350px;
    height: 520px;
    border: 4px solid rgba(3, 169, 244, 0.2);
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 auto;
  }
  .photo:before,.photo:after,.bottom:before,.bottom:after {
    content: "";
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    border: 0.2rem solid transparent;
  }
  .photo:before {
    left: 0;
    border-left-color: #03a9f4;
  }
  .photo:before {
    top: 0;
    border-top-color: #03a9f4;
  }
  .photo:after {
    right: 0;
    border-top-color: #03a9f4;
  }
  .photo:after {
    top: 0;
    border-right-color: #03a9f4;
  }
  .bottom:before {
    left: 0;
    border-left-color: #03a9f4;
  }
  .bottom:before {
    bottom: 0;
    border-bottom-color: #03a9f4;
  }
  .bottom:after {
    right: 0;
    border-right-color: #03a9f4;
  }
  .bottom:after {
    bottom: 0;
    border-bottom-color: #03a9f4;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .video {
    position: absolute;
    top: 0;
    z-index: 1;
  }
  #canvas {
    display: none;
    position: absolute;
    top: 0;
  }
  .line {
    width: 100%;
    height: calc(100% - 2px);
    background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #03a9f4 211%);
    border-bottom: 2px solid #03a9f4;
    animation: radar-beam 1.5s infinite;
    animation-timing-function: cubic-bezier(0.3, 0, 0.43, 0.7);
    animation-delay: 0.4s;
    position: absolute;
    z-index: 300000;
  }
  @keyframes radar-beam {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
</style>
