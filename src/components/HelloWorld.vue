<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <input type="text" name="" v-model="sendmsg" placeholder="请输入你想发送的内容">
      <button class="btn" @click="send">挖一下</button>
    </div>
    <div style="margin-left:14px">
      <input type="text" name="" v-model="receive" placeholder="此处接收返回信息">
      <button class="btn">返回显示</button>
    </div>

    <div>
      <input type="text" name="" v-model="nextmsg" placeholder="此处显示上一个区块">
      <button class="btn" @click="next">发日志</button>
    </div>
  </div>
</template>

<script>
import Logan from 'logan-web';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ws: function() { return this.$store.state.ws },
    ws2: function() { return this.$store.state.ws2 }
  },
  data() {
    return {
      sendmsg: '',
      nextmsg: '',
      receive: ''
    }
  },
  beforeMount() {
    this.initlog()
  },
  mounted() {
    // 接收到消息时触发  
    this.ws.onmessage = (res) => { 
      console.log(JSON.parse(res.data).data.arr)
      this.receive = res.data
      // 存日志
      Logan.log(this.receive, 1);
    } 
    this.ws2.onmessage = (res) => { 
      this.nextmsg = res.data
    } 
  },

  methods: {
    send() {
      //this.ws.send(this.sendmsg)
      this.ws.send(JSON.stringify({id: 101, data: {msg: this.sendmsg, cc: 111}}))
      this.sendmsg = ''
    },

    next() {
      this.report()
    },

    initlog() {
      Logan.initConfig({
        reportUrl: 'http://localhost:3000/clog',
        errorHandler: function(e) { console.log(e) }
      });
    },

    // 发送日志,记得改时间
    async report() {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      if(m < 10){
        m = '0' + m
      }
      var d = date.getDate()
      if(d < 10){
        d = '0' + d
      }
      date = y + '-' + m + '-' + d
      const reportResult = await Logan.report({
        deviceId: 'LocalDeviceIdOrUnionId',
        fromDayString: date,
        toDayString: date
      })
      console.log(reportResult)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

input {
  width: 300px;
  padding: 5px;
}

.btn {
  margin-left: 10px;
  cursor: pointer;
}
</style>
