<template>
    <div id="collect">
      {{collectList}}
      {{rooms}}
    </div>
</template>

<script>
  import {select, getRoomInfoById, getRoomDelById, getRoomInfoByRoomNum} from "../api/index";
    export default {
      name: "Collect",
      data() {
        return {
          collectList: [],
          rooms: []
        }
      },
      created() {
        let params = new URLSearchParams();
        params.append("userId",this.$route.query.userId)
        select(params).then(res => {
         if(res.code == 1) {
           for(let item of res.collects) {
             getRoomDelById(item.roomId).then(res => {
               if(res.code == 1) {
                 this.rooms.push(res.roomDelById)
               }
             }).catch(err => {
               console.log(err)
             })
             this.collectList.push(item)
           }
         }
        }).catch(err => {
          console.log(err)
        })
      },
      mounted() {
        console.log("mounted")
      }
    }
</script>

<style scoped>

</style>
