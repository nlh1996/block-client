<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <input type="text" name="" v-model="sendmsg" placeholder="请输入你想发送的内容">
      <button class="btn" @click="send">挖一下</button>
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
    }
  },
  beforeMount() {
    this.initlog()
  },
  mounted() {
    // 接收到消息时触发  
    this.ws.onmessage = (res) => { 
      this.sendmsg = res.data
      Logan.log(this.sendmsg, 1);
    } 
    this.ws2.onmessage = (res) => { 
      this.nextmsg = res.data
    } 
  },

  methods: {

    send() {
      //this.ws.send(this.sendmsg)
      this.ws.send(JSON.stringify({code: 101, msg: this.sendmsg}))
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

    async report() {
      const reportResult = await Logan.report({
        deviceId: 'LocalDeviceIdOrUnionId',
        fromDayString: '2020-01-13',
        toDayString: '2020-01-13'
      });
      console.log(reportResult);
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
